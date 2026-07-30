"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getFrameUrl } from "@/lib/canvas-utils";

export interface UseImageSequenceOptions {
  frameCount: number;
  folderPath?: string;
  filePrefix?: string;
  extension?: string;
  padLength?: number;
  /** Keyframe stride (e.g. 5 means load every 5th frame first across 1..240 for 100% instant timeline coverage) */
  keyframeStep?: number;
}

export interface UseImageSequenceReturn {
  /**
   * Retrieves the exact cached frame image by 1-based index (1..frameCount),
   * or falls back to the nearest loaded keyframe so the animation NEVER freezes.
   */
  getImage: (index: number) => HTMLImageElement | undefined;
  /**
   * Indicates whether initial critical keyframes covering the full sequence are ready.
   */
  isReady: boolean;
  /**
   * Total number of loaded frames.
   */
  loadedCount: number;
  /**
   * Progress percentage (0 - 100).
   */
  progress: number;
  /**
   * Frame 1 image reference for immediate paint.
   */
  firstFrame: HTMLImageElement | null;
}

export function useImageSequence({
  frameCount,
  folderPath = "/hero-sequence",
  filePrefix = "frame_",
  extension = "webp",
  padLength = 4,
  keyframeStep = 4,
}: UseImageSequenceOptions): UseImageSequenceReturn {
  // O(1) in-memory cache ref for loaded frames
  const imageCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  // In-flight loading promises map
  const loadingPromisesRef = useRef<Map<number, Promise<HTMLImageElement>>>(new Map());

  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [firstFrame, setFirstFrame] = useState<HTMLImageElement | null>(null);

  /**
   * Loads a single image frame, decodes it into GPU memory, and caches it.
   */
  const loadSingleFrame = useCallback(
    (index: number, priority: "high" | "low" | "auto" = "auto"): Promise<HTMLImageElement> => {
      // 1. Return cached if available
      if (imageCacheRef.current.has(index)) {
        return Promise.resolve(imageCacheRef.current.get(index)!);
      }

      // 2. Return existing promise if already in flight
      if (loadingPromisesRef.current.has(index)) {
        return loadingPromisesRef.current.get(index)!;
      }

      // 3. Create HTTP request with priority hint & async decoding
      const url = getFrameUrl(folderPath, filePrefix, index, extension, padLength);
      const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.decoding = "async";
        if ("fetchPriority" in img) {
          (img as any).fetchPriority = priority;
        }

        const handleReady = async () => {
          try {
            if (img.decode) {
              await img.decode();
            }
          } catch {
            // Ignore decode failures for partially loaded assets
          }
          imageCacheRef.current.set(index, img);
          loadingPromisesRef.current.delete(index);
          setLoadedCount((prev) => prev + 1);
          resolve(img);
        };

        img.onload = () => {
          handleReady();
        };

        img.onerror = () => {
          loadingPromisesRef.current.delete(index);
          // Retry once on error
          const retryImg = new Image();
          retryImg.decoding = "async";
          if ("fetchPriority" in retryImg) {
            (retryImg as any).fetchPriority = priority;
          }
          retryImg.onload = () => {
            imageCacheRef.current.set(index, retryImg);
            setLoadedCount((prev) => prev + 1);
            resolve(retryImg);
          };
          retryImg.onerror = (err) => reject(err);
          retryImg.src = url;
        };

        img.src = url;

        // If image is already cached in browser memory/disk, resolve immediately
        if (img.complete && img.naturalWidth !== 0) {
          handleReady();
        }
      });

      loadingPromisesRef.current.set(index, promise);
      return promise;
    },
    [folderPath, filePrefix, extension, padLength]
  );

  /**
   * Proactively preloads upcoming frames around current target index with HIGH priority.
   */
  const preloadAhead = useCallback(
    (currentIndex: number, range: number = 6) => {
      const minIndex = Math.max(1, currentIndex - 2);
      const maxIndex = Math.min(frameCount, currentIndex + range);

      for (let i = minIndex; i <= maxIndex; i++) {
        if (!imageCacheRef.current.has(i) && !loadingPromisesRef.current.has(i)) {
          loadSingleFrame(i, "high").catch(() => {});
        }
      }
    },
    [frameCount, loadSingleFrame]
  );

  useEffect(() => {
    let isMounted = true;

    setLoadedCount(0);
    setIsReady(false);
    imageCacheRef.current.clear();
    loadingPromisesRef.current.clear();

    const startFastPreloading = async () => {
      // PHASE 1: Load Frame 1 immediately for instant paint (High Priority)
      try {
        const img1 = await loadSingleFrame(1, "high");
        if (isMounted) {
          setFirstFrame(img1);
        }
      } catch (err) {
        console.warn("[useImageSequence] Initial frame 1 failed to load", err);
      }

      // PHASE 2: Load Keyframes concurrently across 1..frameCount (High Priority)
      // With keyframeStep=4, 60 keyframes cover the entire sequence with zero visual delay.
      const keyframeIndices: number[] = [1];
      for (let i = 1; i <= frameCount; i += keyframeStep) {
        if (i !== 1) keyframeIndices.push(i);
      }
      if (keyframeIndices[keyframeIndices.length - 1] !== frameCount) {
        keyframeIndices.push(frameCount);
      }

      // Fetch all keyframes concurrently across HTTP/2 streams
      await Promise.allSettled(keyframeIndices.map((idx) => loadSingleFrame(idx, "high")));

      if (isMounted) {
        setIsReady(true);
      }

      // PHASE 3: Fill in remaining in-between frames with low priority in spaced idle batches
      // This ensures background preloading NEVER steals network bandwidth or CPU threads from user scroll requests!
      const remainingIndices: number[] = [];
      for (let i = 1; i <= frameCount; i++) {
        if (!imageCacheRef.current.has(i)) {
          remainingIndices.push(i);
        }
      }

      const batchSize = 16;
      for (let i = 0; i < remainingIndices.length; i += batchSize) {
        if (!isMounted) break;
        const chunk = remainingIndices.slice(i, i + batchSize);
        await Promise.allSettled(chunk.map((idx) => loadSingleFrame(idx, "low")));
        // Yield execution to main thread between background batches
        await new Promise((res) => setTimeout(res, 20));
      }
    };

    startFastPreloading();

    return () => {
      isMounted = false;
    };
  }, [frameCount, keyframeStep, loadSingleFrame]);

  /**
   * Retrieves requested frame index or nearest loaded frame (zero-freeze guarantee).
   */
  const getImage = useCallback(
    (index: number): HTMLImageElement | undefined => {
      const safeIndex = Math.min(Math.max(1, index), frameCount);
      const cache = imageCacheRef.current;

      // 1. Direct hit
      if (cache.has(safeIndex)) {
        return cache.get(safeIndex);
      }

      // 2. High-priority lookahead load for missing frame & surrounding scroll window
      preloadAhead(safeIndex, 5);

      // 3. SMART FALLBACK: Find the nearest loaded frame in memory (search radius 1..frameCount)
      let bestMatch: HTMLImageElement | undefined = undefined;
      let minDistance = Infinity;

      for (const [cachedIdx, img] of cache.entries()) {
        const dist = Math.abs(cachedIdx - safeIndex);
        if (dist < minDistance) {
          minDistance = dist;
          bestMatch = img;
        }
      }

      return bestMatch || firstFrame || undefined;
    },
    [frameCount, preloadAhead, firstFrame]
  );

  const progress = Math.round((loadedCount / frameCount) * 100);

  return {
    getImage,
    isReady,
    loadedCount,
    progress,
    firstFrame,
  };
}
