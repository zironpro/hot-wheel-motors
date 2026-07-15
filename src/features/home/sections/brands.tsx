"use client";

import React, { useRef } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarData, BrandData } from "@/lib/cars";

export function BrandsSection({ cars, brands }: { cars: CarData[], brands: BrandData[] }) {
  // Only include brands that have at least one car in inventory
  const activeBrands = brands.filter(brand => 
    cars.some(c => c.name.toLowerCase().includes(brand.name.toLowerCase()))
  );

  const plugin = useRef(
    AutoScroll({ speed: 1, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  return (
    <section className="w-full py-6 md:py-8 lg:py-10 bg-surface border-y border-primary/5">
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
            {activeBrands.map((brand, index) => (
              <CarouselItem 
                key={index} 
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex justify-center"
              >
                <Link href={`/cars?make=${brand.name.toLowerCase()}` as any} className="relative flex items-center justify-center h-16 w-32 md:h-20 md:w-40 cursor-pointer">
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
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
