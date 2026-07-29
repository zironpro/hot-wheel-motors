"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
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
      scrub = 0.15,
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
    const rafIdRef = useRef<number | null>(null);

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
      keyframeStep: 5,
    });

    // Track component mount / unmount lifecycle & reset state for clean App Router navigation
    useEffect(() => {
      console.log("[HeroStoryScroll] Component mounted");

      currentFrameRef.current = 1;
      lastDrawnFrameRef.current = -1;

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
     * RequestAnimationFrame draw scheduler.
     * Prevents redundant canvas context redraws unless frame index changes.
     */
    const scheduleDraw = (frameIndex: number) => {
      currentFrameRef.current = frameIndex;

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        if (currentFrameRef.current !== lastDrawnFrameRef.current) {
          drawCanvasFrame(currentFrameRef.current);
        }
        rafIdRef.current = null;
      });
    };

    // Initial canvas setup on mount & first frame ready
    useEffect(() => {
      if (firstFrame || isReady) {
        drawCanvasFrame(currentFrameRef.current);
      }
    }, [firstFrame, isReady]);

    // Refresh ScrollTrigger and redraw frame when initial image sequence is fully preloaded
    useEffect(() => {
      if (isReady) {
        console.log("[HeroStoryScroll] Initial preload complete");
        console.log("[HeroStoryScroll] ScrollTrigger refresh triggered");
        ScrollTrigger.refresh();
        drawCanvasFrame(currentFrameRef.current);
      }
    }, [isReady]);

    // Redraw active frame as in-between background frames arrive
    useEffect(() => {
      if (currentFrameRef.current) {
        drawCanvasFrame(currentFrameRef.current);
      }
    }, [loadedCount]);

    // Handle responsive window resize & bfcache pageshow restoration
    useEffect(() => {
      const handleResize = () => {
        drawCanvasFrame(currentFrameRef.current);
        console.log("[HeroStoryScroll] ScrollTrigger refresh triggered");
        ScrollTrigger.refresh();
      };

      const handlePageShow = (event: PageTransitionEvent) => {
        if (event.persisted) {
          console.log("[HeroStoryScroll] ScrollTrigger refresh triggered (bfcache pageshow)");
          drawCanvasFrame(currentFrameRef.current);
          ScrollTrigger.refresh();
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
    }, [firstFrame]);

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
            // p = 0.00 – 0.04: Brand Logo visible on initial site load, fades immediately on scroll down
            // p = 0.04 – 0.32: Step 1 Text
            // p = 0.34 – 0.65: Step 2 Text
            // p = 0.66 – 0.95: Step 3 Text + Button
            // p = 0.95 – 1.00: Fade content out for smooth transition into next section

            let currentMode: "logo" | "step" | null = null;
            let currentStepIdx: number | null = null;
            let computedOpacity = 0;
            let computedTranslateY = 30;

            if (p < 0.04) {
              // MODE: INITIAL SITE LOAD BRAND LOGO
              currentMode = "logo";
              if (p <= 0.01) {
                // Fully visible on initial site load at rest
                computedOpacity = 1;
                computedTranslateY = 0;
              } else {
                // Fades out immediately as user begins scrolling down (0.01 -> 0.04)
                const ratio = (p - 0.01) / 0.03;
                computedOpacity = Math.max(0, 1 - ratio);
                computedTranslateY = -20 * ratio;
              }
            } else if (p >= 0.04 && p < 0.34) {
              // MODE: STEP 1 TEXT
              currentMode = "step";
              currentStepIdx = 0;
              if (p < 0.10) {
                // Enter Fade In
                const ratio = (p - 0.04) / 0.06;
                computedOpacity = Math.min(1, Math.max(0, ratio));
                computedTranslateY = 30 * (1 - computedOpacity);
              } else if (p < 0.24) {
                // Hold
                computedOpacity = 1;
                computedTranslateY = 0;
              } else {
                // Crossfade Exit to Step 2
                const ratio = (p - 0.24) / 0.10;
                computedOpacity = Math.max(0, 1 - ratio);
                computedTranslateY = -20 * ratio;
              }
            } else if (p >= 0.30 && p < 0.66) {
              // MODE: STEP 2 TEXT
              currentMode = "step";
              currentStepIdx = 1;
              if (p < 0.40) {
                // Enter Fade In
                const ratio = (p - 0.30) / 0.10;
                computedOpacity = Math.min(1, Math.max(0, ratio));
                computedTranslateY = 30 * (1 - computedOpacity);
              } else if (p < 0.56) {
                // Hold
                computedOpacity = 1;
                computedTranslateY = 0;
              } else {
                // Crossfade Exit to Step 3
                const ratio = (p - 0.56) / 0.10;
                computedOpacity = Math.max(0, 1 - ratio);
                computedTranslateY = -20 * ratio;
              }
            } else if (p >= 0.64 && p <= 0.95) {
              // MODE: STEP 3 TEXT
              currentMode = "step";
              currentStepIdx = 2;
              if (p < 0.72) {
                // Enter Fade In
                const ratio = (p - 0.64) / 0.08;
                computedOpacity = Math.min(1, Math.max(0, ratio));
                computedTranslateY = 30 * (1 - computedOpacity);
              } else if (p < 0.88) {
                // Hold
                computedOpacity = 1;
                computedTranslateY = 0;
              } else {
                // Exit before section end
                const ratio = (p - 0.88) / 0.07;
                computedOpacity = Math.max(0, 1 - ratio);
                computedTranslateY = -20 * ratio;
              }
            } else {
              // 0.95 – 1.00: Faded out completely
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

        console.log("[HeroStoryScroll] ScrollTrigger created");

        // Immediately evaluate initial scroll position and redraw frame
        const initialProgress = st.progress || 0;
        const initialFrame = Math.min(
          frameCount,
          Math.max(1, Math.floor(initialProgress * (frameCount - 1)) + 1)
        );
        currentFrameRef.current = initialFrame;
        drawCanvasFrame(initialFrame);
      }, containerRef);

      return () => {
        ctx.revert();
      };
    }, [frameCount, scrollDistance, scrub, storySteps]);

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
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-300 ease-out"
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
              className={`absolute inset-x-0 z-20 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto flex flex-col pointer-events-none transition-all duration-300 ease-out ${
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

              {/* Title */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wider text-white leading-tight drop-shadow-xl whitespace-pre-line max-w-3xl">
                {storySteps[activeStepIndex].title}
              </h2>

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
                    className="inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-white bg-black/40 border border-white/30 rounded-full hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform hover:scale-105 backdrop-blur-md shadow-2xl group"
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

