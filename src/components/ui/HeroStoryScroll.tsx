"use client";

import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useImageSequence } from "@/hooks/useImageSequence";
import { renderImageToCanvas } from "@/lib/canvas-utils";

// Register ScrollTrigger plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface StoryStep {
  /** Scroll progress start threshold (0.0 to 1.0) */
  start: number;
  /** Scroll progress end threshold (0.0 to 1.0) */
  end: number;
  title: string;
  subtitle?: string;
  tagline?: string;
  position?: "center" | "top-left" | "top-right" | "bottom-center";
  align?: "center" | "left" | "right" | "left-top" | "top-left";
  ctaText?: string;
  ctaHref?: string;
}

export interface HeroStoryScrollProps {
  /** Path to sequence frames folder (default: "/hero-sequence") */
  folderPath?: string;
  /** File prefix (default: "frame_") */
  filePrefix?: string;
  /** Extension (default: "webp") */
  extension?: string;
  /** Total frame count (default: 240) */
  frameCount?: number;
  /** Scroll distance in pixels during which the hero remains pinned (default: "2200px") */
  scrollDistance?: string;
  /** GSAP scrub intensity (default: 0.15 for fast response) */
  scrub?: number | boolean;
  /** Optional custom text steps overlaid over the animation sequence */
  storySteps?: StoryStep[];
  /** Optional custom class name */
  className?: string;
}

const DEFAULT_STORY_STEPS: StoryStep[] = [
  {
    start: 0.04,
    end: 0.32,
    title: "CURATED FOR THE EXTRAORDINARY",
    align: "left",
    position: "top-left",
  },
  {
    start: 0.36,
    end: 0.64,
    title: "PERFORMANCE WITHOUT\nCOMPROMISE.",
    align: "left",
    position: "top-left",
  },
  {
    start: 0.68,
    end: 0.95,
    title: "DRIVE THE\nEXTRAORDINARY.",
    ctaText: "EXPLORE COLLECTION",
    ctaHref: "/cars",
    align: "center",
    position: "center",
  },
];

export const HeroStoryScroll = forwardRef<HTMLDivElement, HeroStoryScrollProps>(
  (
    {
      folderPath = "/hero-sequence",
      filePrefix = "frame_",
      extension = "webp",
      frameCount = 240,
      scrollDistance = "2200px",
      scrub = 0.3,
      storySteps = DEFAULT_STORY_STEPS,
      className = "",
    },
    ref
  ) => {
    // DOM References
    const containerRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Expose root ref
    useImperativeHandle(ref, () => containerRef.current!);

    // Render loop state references
    const currentFrameRef = useRef<number>(1);
    const lastDrawnFrameRef = useRef<number>(-1);
    const targetFrameRef = useRef<number>(1);
    const lerpFrameRef = useRef<number>(1);
    const isLerpingRef = useRef<boolean>(false);
    const rafIdRef = useRef<number | null>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    // Active state for overlay content: "logo" at site load (p=0), "step" when scrolling into text steps
    const [activeMode, setActiveMode] = useState<"logo" | "step" | null>("logo");
    const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
    const [overlayOpacity, setOverlayOpacity] = useState<number>(1);
    const [overlayTranslateY, setOverlayTranslateY] = useState<number>(0);

    // Image preloader custom hook (loads frame 1 immediately, keyframes across 1..240, then in-between frames)
    const { getImage, isReady, loadedCount, firstFrame } = useImageSequence({
      frameCount,
      folderPath,
      filePrefix,
      extension,
      keyframeStep: 4,
    });

    // Track component mount / unmount lifecycle & reset state for clean App Router navigation
    useEffect(() => {
      console.log("[HeroStoryScroll] Component mounted");

      currentFrameRef.current = 1;
      targetFrameRef.current = 1;
      lerpFrameRef.current = 1;
      lastDrawnFrameRef.current = -1;
      isLerpingRef.current = false;

      return () => {
        console.log("[HeroStoryScroll] Component unmounted");
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
      };
    }, []);

    /**
     * Draws the requested frame index onto HTML5 Canvas with aspect-ratio cover and retina DPI logic.
     */
    const drawCanvasFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = getImage(frameIndex) || firstFrame;
      if (!img) return;

      const isFirstDraw = lastDrawnFrameRef.current === -1;
      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const cssWidth = window.innerWidth;
      const cssHeight = window.innerHeight;

      renderImageToCanvas(ctx, img, cssWidth, cssHeight, dpr);
      lastDrawnFrameRef.current = frameIndex;

      if (isFirstDraw) {
        console.log(`[HeroStoryScroll] First frame drawn: ${frameIndex}`);
      }
    };

    /**
     * Synchronizes current target frame and canvas directly to current scroll position.
     * Guarantees accurate frame paint even on page reload mid-scroll.
     */
    const syncToScrollPosition = useCallback(() => {
      const st = scrollTriggerRef.current;
      let progress = 0;

      if (st) {
        st.update();
        progress = st.progress;
      } else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const numericDistance = parseInt(scrollDistance, 10) || 2200;
        const scrolled = -rect.top;
        progress = Math.min(1, Math.max(0, scrolled / numericDistance));
      }

      const targetFrame = Math.min(
        frameCount,
        Math.max(1, Math.floor(progress * (frameCount - 1)) + 1)
      );

      currentFrameRef.current = targetFrame;
      targetFrameRef.current = targetFrame;
      lerpFrameRef.current = targetFrame;
      drawCanvasFrame(targetFrame);
    }, [frameCount, scrollDistance]);

    /**
     * Continuous 60fps/120fps Lerp animation loop.
     * Interpolates discrete PC mouse wheel notches into smooth momentum scrolling.
     */
    const startLerpLoop = () => {
      if (isLerpingRef.current) return;
      isLerpingRef.current = true;

      const loop = () => {
        const target = targetFrameRef.current;
        const current = lerpFrameRef.current;
        const diff = target - current;

        // If target and lerp position are virtually identical, snap and conclude loop
        if (Math.abs(diff) < 0.04) {
          lerpFrameRef.current = target;
          const rounded = Math.round(target);
          if (rounded !== lastDrawnFrameRef.current) {
            drawCanvasFrame(rounded);
          }
          isLerpingRef.current = false;
          rafIdRef.current = null;
          return;
        }

        // Smooth Lerp factor (0.22 gives liquid 60fps/120fps motion without input lag)
        lerpFrameRef.current += diff * 0.22;
        const frameToDraw = Math.round(lerpFrameRef.current);

        if (frameToDraw !== lastDrawnFrameRef.current) {
          drawCanvasFrame(frameToDraw);
        }

        rafIdRef.current = requestAnimationFrame(loop);
      };

      rafIdRef.current = requestAnimationFrame(loop);
    };

    /**
     * RequestAnimationFrame draw scheduler.
     */
    const scheduleDraw = (frameIndex: number) => {
      targetFrameRef.current = frameIndex;
      startLerpLoop();
    };

    // Initial canvas setup on mount & first frame ready
    useEffect(() => {
      if (firstFrame || isReady) {
        syncToScrollPosition();
      }
    }, [firstFrame, isReady, syncToScrollPosition]);

    // Refresh ScrollTrigger and sync frame when initial image sequence is fully preloaded
    useEffect(() => {
      if (isReady) {
        console.log("[HeroStoryScroll] Initial preload complete");
        console.log("[HeroStoryScroll] ScrollTrigger refresh triggered");
        ScrollTrigger.refresh();
        syncToScrollPosition();
      }
    }, [isReady, syncToScrollPosition]);

    // Redraw active frame as in-between background frames arrive
    useEffect(() => {
      if (currentFrameRef.current) {
        drawCanvasFrame(currentFrameRef.current);
      }
    }, [loadedCount]);

    // Handle responsive window resize & bfcache pageshow restoration
    useEffect(() => {
      const handleResize = () => {
        console.log("[HeroStoryScroll] ScrollTrigger refresh triggered (resize)");
        ScrollTrigger.refresh();
        syncToScrollPosition();
      };

      const handlePageShow = (event: PageTransitionEvent) => {
        if (event.persisted) {
          console.log("[HeroStoryScroll] ScrollTrigger refresh triggered (bfcache pageshow)");
          ScrollTrigger.refresh();
          syncToScrollPosition();
        }
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("pageshow", handlePageShow);
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("pageshow", handlePageShow);
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
        }
      };
    }, [syncToScrollPosition]);

    // GSAP ScrollTrigger Setup & Timeline Logic
    useEffect(() => {
      if (!containerRef.current || !pinRef.current) return;

      const ctx = gsap.context(() => {
        const numericDistance = parseInt(scrollDistance, 10) || 2200;

        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          pin: pinRef.current,
          start: "top top",
          end: `+=${numericDistance}`,
          scrub: scrub,
          onUpdate: (self) => {
            const p = self.progress; // 0.0 to 1.0

            // Map progress to 1..frameCount
            const targetFrame = Math.min(
              frameCount,
              Math.max(1, Math.floor(p * (frameCount - 1)) + 1)
            );

            scheduleDraw(targetFrame);

            // TIMELINE CALCULATIONS:
            let currentMode: "logo" | "step" | null = null;
            let currentStepIdx: number | null = null;
            let computedOpacity = 0;
            let computedTranslateY = 30;

            if (p < 0.04) {
              currentMode = "logo";
              if (p <= 0.01) {
                computedOpacity = 1;
                computedTranslateY = 0;
              } else {
                const ratio = (p - 0.01) / 0.03;
                computedOpacity = Math.max(0, 1 - ratio);
                computedTranslateY = -20 * ratio;
              }
            } else if (p >= 0.04 && p < 0.34) {
              currentMode = "step";
              currentStepIdx = 0;
              if (p < 0.10) {
                const ratio = (p - 0.04) / 0.06;
                computedOpacity = Math.min(1, Math.max(0, ratio));
                computedTranslateY = 30 * (1 - computedOpacity);
              } else if (p < 0.24) {
                computedOpacity = 1;
                computedTranslateY = 0;
              } else {
                const ratio = (p - 0.24) / 0.10;
                computedOpacity = Math.max(0, 1 - ratio);
                computedTranslateY = -20 * ratio;
              }
            } else if (p >= 0.30 && p < 0.66) {
              currentMode = "step";
              currentStepIdx = 1;
              if (p < 0.40) {
                const ratio = (p - 0.30) / 0.10;
                computedOpacity = Math.min(1, Math.max(0, ratio));
                computedTranslateY = 30 * (1 - computedOpacity);
              } else if (p < 0.56) {
                computedOpacity = 1;
                computedTranslateY = 0;
              } else {
                const ratio = (p - 0.56) / 0.10;
                computedOpacity = Math.max(0, 1 - ratio);
                computedTranslateY = -20 * ratio;
              }
            } else if (p >= 0.64 && p <= 0.95) {
              currentMode = "step";
              currentStepIdx = 2;
              if (p < 0.72) {
                const ratio = (p - 0.64) / 0.08;
                computedOpacity = Math.min(1, Math.max(0, ratio));
                computedTranslateY = 30 * (1 - computedOpacity);
              } else if (p < 0.88) {
                computedOpacity = 1;
                computedTranslateY = 0;
              } else {
                const ratio = (p - 0.88) / 0.07;
                computedOpacity = Math.max(0, 1 - ratio);
                computedTranslateY = -20 * ratio;
              }
            } else {
              currentMode = null;
              currentStepIdx = null;
              computedOpacity = 0;
              computedTranslateY = 30;
            }

            setActiveMode(currentMode);
            setActiveStepIndex(currentStepIdx);
            setOverlayOpacity(computedOpacity);
            setOverlayTranslateY(computedTranslateY);
          },
        });

        scrollTriggerRef.current = st;
        console.log("[HeroStoryScroll] ScrollTrigger created");

        // Immediately sync to current scroll position upon creation
        ScrollTrigger.refresh();
        syncToScrollPosition();

        // Secondary sync ticks to handle browser / App Router scroll restoration delays
        const timer1 = setTimeout(() => {
          ScrollTrigger.refresh();
          syncToScrollPosition();
        }, 100);

        const timer2 = setTimeout(() => {
          ScrollTrigger.refresh();
          syncToScrollPosition();
        }, 300);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }, containerRef);

      return () => {
        scrollTriggerRef.current = null;
        ctx.revert();
      };
    }, [frameCount, scrollDistance, scrub, storySteps, syncToScrollPosition]);

    return (
      <div
        ref={containerRef}
        className={`relative w-full bg-neutral-950 text-white ${className}`}
        style={{ height: `calc(100vh + ${scrollDistance})` }}
      >
        {/* Pinned Viewport Container */}
        <div
          ref={pinRef}
          className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center select-none"
        >
          {/* HTML5 Canvas Background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 pointer-events-none"
          />

          {/* Subtle Dark Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 z-10 pointer-events-none" />

          {/* STANDALONE LOGO INTRO (At Starting: 0% – 16%) */}
          {activeMode === "logo" && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-[opacity,transform] duration-300 ease-out"
              style={{
                opacity: overlayOpacity,
                transform: `translateY(${overlayTranslateY}px)`,
              }}
            >
              <div className="relative w-56 sm:w-72 md:w-80 lg:w-96 h-auto">
                <Image
                  src="/icons/Logo_Stacked_White_SVG.svg"
                  alt="Hot Wheel Motors Logo"
                  width={340}
                  height={120}
                  className="w-full h-auto object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                  priority
                />
              </div>
            </div>
          )}

          {/* OVERLAY CONTENT: TEXT STEPS (Triggered after Logo Fades: 18% – 95%) */}
          {activeMode === "step" && activeStepIndex !== null && storySteps[activeStepIndex] && (
            <div
              className={`absolute inset-x-0 z-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto flex flex-col pointer-events-none transition-[opacity,transform] duration-300 ease-out ${
                storySteps[activeStepIndex].position === "top-left" || storySteps[activeStepIndex].align === "left" || storySteps[activeStepIndex].align === "left-top"
                  ? "top-20 sm:top-24 md:top-32 items-start text-left"
                  : storySteps[activeStepIndex].align === "right"
                  ? "items-end text-right"
                  : "items-center text-center"
              }`}
              style={{
                opacity: overlayOpacity,
                transform: `translateY(${overlayTranslateY}px)`,
              }}
            >
              {/* Tagline */}
              {storySteps[activeStepIndex].tagline && (
                <span className="text-xs sm:text-sm font-medium uppercase text-neutral-300 tracking-[0.35em] mb-4 drop-shadow-md">
                  {storySteps[activeStepIndex].tagline}
                </span>
              )}

              {/* Title - SEO Friendly Heading */}
              {activeStepIndex === 0 ? (
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white leading-tight drop-shadow-xl whitespace-pre-line max-w-3xl">
                  {storySteps[activeStepIndex].title}
                </h1>
              ) : (
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white leading-tight drop-shadow-xl whitespace-pre-line max-w-3xl">
                  {storySteps[activeStepIndex].title}
                </h2>
              )}

              {/* Subtitle */}
              {storySteps[activeStepIndex].subtitle && (
                <p className="mt-6 text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed max-w-[650px] drop-shadow-md">
                  {storySteps[activeStepIndex].subtitle}
                </p>
              )}

              {/* Button */}
              {storySteps[activeStepIndex].ctaText && (
                <div className="mt-10 pointer-events-auto">
                  <a
                    href={storySteps[activeStepIndex].ctaHref || "/cars"}
                    className="inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-white bg-black/40 border border-white/30 rounded-full hover:bg-white hover:text-black hover:border-white transition-[background-color,color,border-color,transform,box-shadow] duration-300 transform hover:scale-105 backdrop-blur-md shadow-2xl group"
                  >
                    <span>{storySteps[activeStepIndex].ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Minimal Scroll Prompt Indicator */}
          <div className="absolute bottom-8 z-20 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-[10px] tracking-[0.35em] font-mono uppercase text-neutral-400">
              Scroll To Experience
            </span>
            <div className="w-5 h-9 rounded-full border-2 border-neutral-500/80 flex justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-red-500 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

HeroStoryScroll.displayName = "HeroStoryScroll";

