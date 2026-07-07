"use client";

import React, { useRef } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function BrandsSection() {
  const brands = [
    "Mercedes-Benz",
    "Porsche",
    "BMW",
    "Audi",
    "Ferrari",
    "Lamborghini",
    "Bentley",
    "Rolls-Royce",
    "Aston Martin"
  ];

  const plugin = useRef(
    AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-surface border-y border-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center">
        
        <Carousel
          opts={{
            loop: true,
            align: "start",
            dragFree: true,
          }}
          plugins={[plugin.current]}
          className="w-full opacity-80"
        >
          <CarouselContent className="flex items-center -ml-4">
            {brands.map((brand, index) => (
              <CarouselItem 
                key={index} 
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex justify-center"
              >
                <div className="font-heading text-lg md:text-xl tracking-widest uppercase text-muted hover:text-primary transition-colors cursor-pointer select-none whitespace-nowrap">
                  {brand}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
