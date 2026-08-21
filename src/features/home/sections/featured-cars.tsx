"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarData } from "@/lib/cars";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const CAROUSEL_OPTS = {
  align: "start" as const,
  slidesToScroll: 1,
  duration: 40,
  breakpoints: {
    "(min-width: 640px)": { slidesToScroll: 2 },
    "(min-width: 1024px)": { slidesToScroll: 3 },
    "(min-width: 1280px)": { slidesToScroll: 4 },
  }
};

export function FeaturedCarsSection({ cars }: { cars: CarData[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    onSelect(); // initial setup

    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api]);

  // Map cars for featured section, extracting short description
  const featuredCars = cars.map(c => {
    // Extract a short description from the markdown body
    const firstParagraph = c.description ? c.description.split('\n').find(line => line.trim().length > 10) : "";
    return {
      ...c,
      shortDescription: firstParagraph || "Experience unparalleled luxury and performance in this pristine vehicle."
    }
  });

  return (
    <section className="w-full pt-12 md:pt-16 lg:pt-20 pb-4 md:pb-6 lg:pb-8 bg-background overflow-hidden">
      <div className="container">
        <ScrollReveal variant="fade-up" className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-sm sm:text-base font-light text-muted uppercase tracking-widest">
            FEATURED COLLECTIONS
          </h2>
          <Link href={"/cars?featured=true" as any} className="text-sm sm:text-base font-light tracking-widest text-muted hover:text-primary transition-colors uppercase">
            VIEW ALL
          </Link>
        </ScrollReveal>

        <Carousel
          setApi={setApi}
          opts={CAROUSEL_OPTS}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {featuredCars.map((car) => (
              <CarouselItem key={car.id} className="pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Link
                  href={`/cars/${car.slug}` as any}
                  className="flex flex-col h-full w-full rounded-lg overflow-hidden cursor-pointer border border-white/5 bg-[#111111] hover:bg-[#1a1a1a] transition-[background-color,border-color,box-shadow] duration-300 group shadow-2xl"
                >
                  {/* Top Background & Image Container */}
                  <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-white/5 to-[#111111] flex items-center justify-center">
                    {/* Radial glow effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
                    
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-110 z-10"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col p-6 bg-[#111111] z-20 flex-1">
                    {/* Specs Pills */}
                    <div className="flex flex-wrap gap-2 mb-4 mt-2">
                      {car.specs.split(' | ').map((spec, i) => (
                        <span key={i} className="bg-white/10 text-white/90 text-[10px] font-normal px-2.5 py-1 rounded-lg flex items-center shadow-sm">
                          <span className="w-1 h-1 rounded-full bg-white/50 mr-1.5" />
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Title and Subtitle */}
                    <h3 className="text-2xl font-normal text-white leading-tight mb-1 tracking-tight">
                      {car.name}
                    </h3>
                    <p className="text-base font-normal text-muted-foreground uppercase tracking-wide mb-4">
                      {car.subtitle}
                    </p>

                    {/* Description Paragraph */}
                    <p className="text-[11px] text-muted-foreground/60 leading-relaxed mt-auto pt-4 border-t border-white/5 line-clamp-3">
                      {car.shortDescription}
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Pagination Controls */}
          {count > 1 && (
            <div className="flex items-center justify-end gap-4 mt-8">
              <div className="flex items-center gap-2">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => api?.scrollTo(i)}
                    className={cn(
                      "transition-[width,background-color] duration-300 rounded-full",
                      current === i ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
}
