"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { getFrameUrl } from "@/lib/canvas-utils";

export interface UseImageSequenceOptions {
  frameCount: number;
  folderPath?: string;
  filePrefix?: string;
  extension?: string;
  padLength?: number;
  initialPreloadCount?: number;
}

export interface UseImageSequenceReturn {
  /**
   * Retrieves a cached frame image by 1-based index (1..frameCount).
   * Returns HTMLImageElement if loaded, or undefined.
   */
  getImage: (index: number) => HTMLImageElement | undefined;
  /**
   * Indicates whether initial critical frames (Frame 1 + initial batch) are ready.
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
   * Frame 1 image reference for immediate render.
   */
  firstFrame: HTMLImageElement | null;
}

export function useImageSequence({
  frameCount,
  folderPath = "/hero-sequence",
  filePrefix = "frame_",
  extension = "webp",
  padLength = 4,
  initialPreloadCount = 20,
}: UseImageSequenceOptions): UseImageSequenceReturn {
  // Store loaded images in a Ref map to avoid triggering component re-renders per frame
  const imageCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  // Store loading promises to avoid duplicate requests
  const loadingPromisesRef = useRef<Map<number, Promise<HTMLImageElement>>>(new Map());
  
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [firstFrame, setFirstFrame] = useState<HTMLImageElement | null>(null);

  /**
   * Loads a single image frame, returns a promise, and caches it.
   */
  const loadSingleFrame = useCallback(
    (index: number): Promise<HTMLImageElement> => {
      // 1. Return from cache if already loaded
      if (imageCacheRef.current.has(index)) {
        return Promise.resolve(imageCacheRef.current.get(index)!);
      }

      // 2. Return existing promise if load is currently in flight
      if (loadingPromisesRef.current.has(index)) {
        return loadingPromisesRef.current.get(index)!;
      }

      // 3. Create new image request
      const url = getFrameUrl(folderPath, filePrefix, index, extension, padLength);
      const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = url;

        img.onload = () => {
          imageCacheRef.current.set(index, img);
          loadingPromisesRef.current.delete(index);
          setLoadedCount((prev) => prev + 1);
          resolve(img);
        };

        img.onerror = (err) => {
          loadingPromisesRef.current.delete(index);
          // Retry once on error
          const retryImg = new Image();
          retryImg.src = url;
          retryImg.onload = () => {
            imageCacheRef.current.set(index, retryImg);
            setLoadedCount((prev) => prev + 1);
            resolve(retryImg);
          };
          retryImg.onerror = () => reject(err);
        };
      });

      loadingPromisesRef.current.set(index, promise);
      return promise;
    },
    [folderPath, filePrefix, extension, padLength]
  );

  useEffect(() => {
    let isMounted = true;

    // Reset counts on param change
    setLoadedCount(0);
    setIsReady(false);
    imageCacheRef.current.clear();
    loadingPromisesRef.current.clear();

    const initialBatchTarget = Math.min(initialPreloadCount, frameCount);

    const startLoadingSequence = async () => {
      // STEP 1: Load Frame 1 immediately for instant paint
      try {
        const img1 = await loadSingleFrame(1);
        if (isMounted) {
          setFirstFrame(img1);
        }
      } catch (error) {
        console.warn("[useImageSequence] Failed to load initial frame 1", error);
      }

      // STEP 2: Load initial batch (frames 2 to initialBatchTarget) concurrently
      const initialPromises: Promise<HTMLImageElement>[] = [];
      for (let i = 1; i <= initialBatchTarget; i++) {
        initialPromises.push(loadSingleFrame(i));
      }

      await Promise.allSettled(initialPromises);

      if (isMounted) {
        setIsReady(true);
      }

      // STEP 3: Load remaining frames in background using controlled concurrency chunks (e.g. 5 concurrent)
      const chunkSize = 5;
      for (let i = initialBatchTarget + 1; i <= frameCount; i += chunkSize) {
        if (!isMounted) break;

        const chunkPromises: Promise<HTMLImageElement>[] = [];
        for (let j = i; j < i + chunkSize && j <= frameCount; j++) {
          chunkPromises.push(loadSingleFrame(j));
        }

        // Wait for current chunk to finish before queuing next, allowing main thread breathing room
        await Promise.allSettled(chunkPromises);
        // Small delay to keep main thread free for scrolling & smooth 60 FPS canvas renders
        await new Promise((r) => setTimeout(r, 10));
      }
    };

    startLoadingSequence();

    return () => {
      isMounted = false;
    };
  }, [frameCount, initialPreloadCount, loadSingleFrame]);

  const getImage = useCallback((index: number): HTMLImageElement | undefined => {
    // Clamp frame index between 1 and frameCount
    const safeIndex = Math.min(Math.max(1, index), frameCount);
    const cached = imageCacheRef.current.get(safeIndex);

    // If frame is missing during fast scrub, request priority load
    if (!cached && !loadingPromisesRef.current.has(safeIndex)) {
      loadSingleFrame(safeIndex).catch(() => {});
    }

    return cached;
  }, [frameCount, loadSingleFrame]);

  const progress = Math.round((loadedCount / frameCount) * 100);

  return {
    getImage,
    isReady,
    loadedCount,
    progress,
    firstFrame,
  };
}
