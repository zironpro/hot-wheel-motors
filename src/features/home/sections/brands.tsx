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
import { CarData } from "@/lib/cars";

export function BrandsSection({ cars }: { cars: CarData[] }) {
  const makeList = [
    { id: "audi", label: "Audi", image: null },
    { id: "bmw", label: "BMW", image: null },
    { id: "mercedes", label: "Mercedes-Benz", image: "/car-logo/mercedes-benz.png" },
    { id: "porsche", label: "Porsche", image: "/car-logo/porsche.png" },
    { id: "range rover", label: "Range Rover", image: null },
    { id: "cadillac", label: "Cadillac", image: null },
    { id: "chevrolet", label: "Chevrolet", image: null },
    { id: "lamborghini", label: "Lamborghini", image: "/car-logo/lamborghini.png" },
    { id: "jeep", label: "Jeep", image: null },
    { id: "ford", label: "Ford", image: null },
    { id: "aston martin", label: "Aston Martin", image: "/car-logo/aston-martin.png" },
    { id: "dodge", label: "Dodge", image: null },
    { id: "honda", label: "Honda", image: null },
    { id: "maserati", label: "Maserati", image: null },
  ];

  // Only include brands that have at least one car in inventory
  const brands = makeList.filter(make => 
    cars.some(c => c.name.toLowerCase().includes(make.id))
  ).map(make => ({
    name: make.label,
    image: make.image
  }));

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
            {brands.map((brand, index) => (
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
