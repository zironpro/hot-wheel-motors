"use client";

import React, { useRef } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function BrandsSection() {
  const brands = [
    { name: "Mercedes-Benz", image: "/car-logo/Mercedes-Benz_Symbol_1.png" },
    { name: "Porsche", image: "/car-logo/Porsche_Symbol_1.png" },
    { name: "Ferrari", image: "/car-logo/Ferrari_Logo_1.png" },
    { name: "Lamborghini", image: "/car-logo/Lamborghini_Logo_1.png" },
    { name: "Car Logo", image: "/car-logo/idqpH-6Nid_1783428227071.png" },
  ];

  const plugin = useRef(
    AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-surface border-y border-primary/5">
      <div className="container flex flex-col items-center">
        
        <Carousel
          opts={{
            loop: true,
            align: "start",
            dragFree: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent className="flex items-center -ml-4">
            {brands.map((brand, index) => (
              <CarouselItem 
                key={index} 
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex justify-center"
              >
                <div className="relative flex items-center justify-center h-16 w-32 md:h-20 md:w-40 cursor-pointer">
                  {brand.image ? (
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <span className="font-heading text-lg md:text-xl tracking-widest uppercase text-muted hover:text-primary transition-colors select-none whitespace-nowrap">
                      {brand.name}
                    </span>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
