"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// Default slides moved to component as fallback

const AUTOPLAY_DELAY = 5000;

export function HeroSection({ data }: { data?: any[] }) {
  const slides = data && data.length > 0 ? data : [
    {
      tagline: "DUBAI'S PREMIER BOUTIQUE",
      title: "Luxury Cars.\nDelivered Worldwide.",
      description: "Explore our curated collection of the finest pre-owned luxury vehicles.",
      image: { url: "/images/hero-aston.jpeg" },
      mobileImage: { url: "/images/hero-phone-aston.png" },
    }
  ];
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
    <section className="relative w-full h-[100svh] bg-background overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full h-full"
        opts={{
          loop: true,
          duration: 60,
        }}
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative w-full h-[100svh]">
              {/* Full Background Image */}
              <div className="absolute inset-0 w-full h-full z-0">
                <Image
                  src={slide.image?.url || "/images/hero-aston.jpeg"}
                  alt="Hero Background"
                  fill
                  className="hidden md:block object-cover object-center"
                  priority={index === 0}
                />
                <Image
                  src={slide.mobileImage?.url || slide.image?.url || "/images/hero-phone-aston.png"}
                  alt="Hero Background Mobile"
                  fill
                  className="block md:hidden object-cover object-center"
                  priority={index === 0}
                />
                {/* Gradient Overlay for Text Readability */}
                {/* <div className="absolute inset-0 bg-black/50 md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent z-10" /> */}
              </div>

              {/* Text Content inside Container */}
              <div className="container relative z-10 flex flex-col justify-start md:justify-center h-full w-full pt-32 md:pt-24 lg:pt-28 pb-12">
                <div className="flex flex-col items-start text-left w-full lg:w-1/2 space-y-4 md:space-y-6 lg:pr-8">
                  {/* <span className="text-white/80 text-sm sm:text-base font-light uppercase tracking-widest drop-shadow-md">
                    {slide.tagline}
                  </span> */}
                  <h1 className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-heading font-normal leading-tight md:leading-[1.1] tracking-tight text-white drop-shadow-lg whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="text-gray-300 text-sm sm:text-base max-w-md leading-relaxed drop-shadow-md whitespace-normal md:whitespace-pre-line">
                    {slide.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

        {/* Static Bottom Elements (Buttons & Pagination) */}
      {/* Static Bottom Elements (Buttons & Pagination) */}
      <div className="container mx-auto absolute inset-x-0 bottom-4 lg:bottom-8 flex flex-col md:flex-row items-start md:items-end justify-between z-20 pointer-events-none gap-6 md:gap-0">
        
          {/* Static Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pointer-events-auto">
            <Button asChild className="px-6 md:px-8 h-10 md:h-12 text-xs md:text-sm rounded-lg uppercase">
              <Link href="/cars">EXPLORE COLLECTIONS</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="text-primary hover:!bg-transparent hover:text-primary/80 font-light px-0 h-10 md:h-12 text-xs md:text-sm flex items-center gap-2 md:gap-3 uppercase tracking-wider rounded-none"
            >
              <Link href="/services">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-primary/30 flex items-center justify-center transition-colors hover:border-primary">
                  <Play className="w-2.5 h-2.5 md:w-3 md:h-3 ml-0.5 fill-primary text-primary" />
                </div>
                OUR SERVICES
              </Link>
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
    </section>
  );
}
