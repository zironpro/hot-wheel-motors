"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    tagline: "DUBAI'S PREMIER LUXURY CAR BOUTIQUE",
    title: "Luxury Cars.\nDubai Sourced.\nWorldwide Delivered.",
    description:
      "Curated collection of the world's finest pre-owned vehicles. Quality assured. Transparently priced. Seamless international delivery.",
    image: "/images/hero-car-image.webp",
  },
  {
    tagline: "EXCEPTIONAL PERFORMANCE",
    title: "Premium SUVs.\nUnmatched Comfort.\nReady for Adventure.",
    description:
      "Discover our range of luxury SUVs. Perfect for the family, off-road, and city driving.",
    image: "/images/suv.webp",
  },
  {
    tagline: "UNCOMPROMISING LUXURY",
    title: "Exotic Sports Cars.\nThrill Seekers.\nUnleash the Power.",
    description:
      "Experience the thrill of driving some of the most exclusive and powerful sports cars in the world.",
    image: "/images/hero-car-image.webp",
  },
  {
    tagline: "GLOBAL EXPORT",
    title: "Global Reach.\nSeamless Export.\nDelivered to You.",
    description:
      "We handle everything from sourcing to shipping, ensuring a smooth process to deliver your dream car anywhere in the world.",
    image: "/images/suv.webp",
  },
];

const AUTOPLAY_DELAY = 5000;

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Autoplay Progress Animation
  useEffect(() => {
    if (!api) return;

    let animationFrameId: number;
    let startTime = Date.now();
    let isPlaying = true;

    const updateProgress = () => {
      if (!isPlaying) return;
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    const resetAndStart = () => {
      startTime = Date.now();
      setProgress(0);
      isPlaying = true;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    const stopProgress = () => {
      isPlaying = false;
      cancelAnimationFrame(animationFrameId);
      setProgress(100); // Fill the bar when interacted/stopped
    };

    api.on("select", resetAndStart);
    
    const autoplayPlugin = api.plugins().autoplay;
    if (autoplayPlugin) {
      // @ts-ignore
      api.on("autoplay:stop", stopProgress);
      // @ts-ignore
      api.on("autoplay:play", resetAndStart);
    }

    resetAndStart();

    return () => {
      cancelAnimationFrame(animationFrameId);
      api.off("select", resetAndStart);
      if (autoplayPlugin) {
        // @ts-ignore
        api.off("autoplay:stop", stopProgress);
        // @ts-ignore
        api.off("autoplay:play", resetAndStart);
      }
    };
  }, [api]);

  return (
    <section className="relative w-full min-h-[100dvh] lg:h-[100dvh] pt-24 lg:pt-28 pb-8 flex flex-col justify-center bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex-1 flex flex-col justify-center h-full w-full">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            loop: true,
            duration: 60, // Increased for smoother, softer sliding
          }}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col lg:flex-row items-center w-full gap-6 md:gap-8 lg:gap-12">
                  {/* Text Column */}
                  <div className="flex flex-col items-start text-left w-full lg:w-1/2 space-y-4 md:space-y-6 lg:pr-8 py-4 pb-24 lg:pb-32">
                    <span className="text-muted text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
                      {slide.tagline}
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-heading font-normal leading-tight md:leading-[1.1] tracking-tight text-primary whitespace-pre-line">
                      {slide.title}
                    </h1>
                    <p className="text-muted text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  {/* Image Column */}
                  <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[40vh] xl:h-[50vh]">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={slide.image}
                        alt="Hero Car"
                        fill
                        className="object-contain object-center lg:object-right drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Static Bottom Elements (Buttons & Pagination) */}
        <div className="absolute bottom-4 lg:bottom-8 left-4 sm:left-6 lg:left-12 right-4 sm:right-6 lg:right-12 flex flex-col md:flex-row items-start md:items-end justify-between z-20 pointer-events-none gap-6 md:gap-0 lg:pr-12">
          
          {/* Static Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pointer-events-auto">
            <Button className="px-6 md:px-8 h-10 md:h-12 text-xs md:text-sm rounded-lg uppercase">
              EXPLORE INVENTORY
            </Button>
            <Button
              variant="ghost"
              className="text-primary hover:bg-transparent hover:text-primary/80 font-semibold px-0 h-10 md:h-12 text-xs md:text-sm flex items-center gap-2 md:gap-3 uppercase tracking-wider rounded-none"
            >
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-primary/30 flex items-center justify-center transition-colors hover:border-primary">
                <Play className="w-2.5 h-2.5 md:w-3 md:h-3 ml-0.5 fill-primary text-primary" />
              </div>
              VIEW SERVICES
            </Button>
          </div>

          {/* Pagination Line */}
          <div className="flex items-center justify-end gap-3 md:gap-4 text-xs md:text-sm font-mono text-muted w-full md:w-[200px] pointer-events-auto">
            <span>{String(current + 1).padStart(2, "0")}</span>
            <div className="flex-1 h-[2px] bg-primary/20 relative overflow-hidden rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>{String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
