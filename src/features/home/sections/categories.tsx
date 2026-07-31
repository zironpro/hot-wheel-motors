"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { CarData, BrandData } from "@/lib/cars";

const bodyTypes = [
  { name: "Sedan", count: 162, image: "/catagory/sedan.webp", href: "/cars?type=sedan" },
  { name: "SUV", count: 215, image: "/catagory/suv.webp", href: "/cars?type=suv" },
  { name: "Hatchback", count: 108, image: "/catagory/hatchback.webp", href: "/cars?type=hatchback" },
  { name: "Coupe", count: 86, image: "/catagory/coupe.webp", href: "/cars?type=coupe" },
  { name: "Pickup", count: 64, image: "/catagory/pickup.webp", href: "/cars?type=pickup" },
  { name: "Luxury", count: 73, image: "/catagory/luxury.webp", href: "/cars?type=luxury" },
];

const CAROUSEL_OPTS = {
  align: "start" as const,
  slidesToScroll: 1,
  duration: 40,
  breakpoints: {
    "(min-width: 640px)": { slidesToScroll: 2 },
    "(min-width: 768px)": { slidesToScroll: 3 },
    "(min-width: 1024px)": { slidesToScroll: 4 },
    "(min-width: 1280px)": { slidesToScroll: 5 },
  }
};

export function CategoriesSection({ cars, brands }: { cars: CarData[], brands: BrandData[] }) {
  const [activeTab, setActiveTab] = useState<"body" | "brand">("brand");
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
  }, [api, activeTab]);

  const dynamicBrandTypes = brands.map(brand => {
    const carCount = cars.filter(c => c.name.toLowerCase().includes(brand.name.toLowerCase())).length;
    return {
      name: brand.name,
      count: carCount,
      image: brand.image,
      href: `/cars?make=${brand.name.toLowerCase()}`
    };
  }).filter(brand => brand.count > 0);

  const currentData = activeTab === "body" ? bodyTypes : dynamicBrandTypes;

  return (
    <section className="w-full pt-4 md:pt-6 lg:pt-8 pb-6 md:pb-8 lg:pb-10 bg-background">
      <div className="container">
        <ScrollReveal variant="fade-up">
          <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-primary/10 pb-4">
            <div className="flex items-center gap-6 md:gap-10">
              <h2 
                className={cn(
                  "text-sm sm:text-base font-light tracking-widest uppercase transition-colors relative cursor-pointer text-primary"
                )}
              >
                BRANDS
                <span className="absolute -bottom-[17px] left-0 w-full h-[1px] bg-accent" />
              </h2>
            </div>
            <Link href="/cars" className="text-sm sm:text-base font-light tracking-widest text-muted hover:text-primary transition-colors uppercase hidden sm:block">
              VIEW ALL
            </Link>
          </div>

          <Carousel
            setApi={setApi}
            opts={CAROUSEL_OPTS}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {currentData.map((type) => (
                <CarouselItem key={type.name} className="pl-4 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <Link
                    href={type.href as any}
                    className="flex flex-col bg-[#111111] hover:bg-[#161616] transition-all duration-300 relative w-full rounded-xl overflow-hidden cursor-pointer group border border-white/10 shadow-lg hover:border-white/20 hover:shadow-2xl"
                  >
                    {/* Centered Brand Logo Image Container */}
                    <div className="relative h-[150px] sm:h-[170px] w-full bg-gradient-to-b from-[#1c1c1c] to-[#111111] p-5 flex items-center justify-center">
                      <div className="relative w-full h-[90px] sm:h-[100px] transform group-hover:scale-105 transition-transform duration-500 ease-out flex items-center justify-center">
                        {type.image ? (
                          <Image
                            src={type.image}
                            alt={type.name}
                            fill
                            sizes="(max-width: 640px) 150px, 200px"
                            className="object-contain p-1 drop-shadow-md"
                          />
                        ) : (
                          <span className="font-heading text-xl sm:text-2xl tracking-widest uppercase text-white/60 select-none text-center">
                            {type.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Brand Name Footer */}
                    <div className="py-3.5 px-4 bg-[#111111] border-t border-white/5 flex items-center justify-center text-center">
                      <h3 className="text-white text-sm sm:text-base font-normal tracking-wide capitalize group-hover:text-accent transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                        {type.name}
                      </h3>
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
        </ScrollReveal>
      </div>
    </section>
  );
}
