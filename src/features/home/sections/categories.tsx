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

import { CarData } from "@/lib/cars";

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

export function CategoriesSection({ cars }: { cars: CarData[] }) {
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
    { id: "ferrari", label: "Ferrari", image: "/car-logo/ferrari.png" },
  ];

  const dynamicBrandTypes = makeList.map(make => {
    const carCount = cars.filter(c => c.name.toLowerCase().includes(make.id)).length;
    return {
      name: make.label,
      count: carCount,
      image: make.image, // Fallback handled in rendering
      href: `/cars?make=${make.id}`
    };
  }).filter(brand => brand.count > 0);

  const currentData = activeTab === "body" ? bodyTypes : dynamicBrandTypes;

  return (
    <section className="w-full pt-4 md:pt-6 lg:pt-8 pb-12 md:pb-16 lg:pb-20 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-primary/10 pb-4">
          <div className="flex items-center gap-6 md:gap-10">
            <button 
              onClick={() => setActiveTab("brand")}
              className={cn(
                "text-sm sm:text-base font-light tracking-widest uppercase transition-all relative",
                activeTab === "brand" ? "text-primary" : "text-muted hover:text-primary/80"
              )}
            >
              BRANDS
              {activeTab === "brand" && (
                <span className="absolute -bottom-[17px] left-0 w-full h-[1px] bg-accent" />
              )}
            </button>
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
                  className="flex flex-col bg-[#111111] hover:bg-[#1a1a1a] transition-all relative w-full rounded-lg overflow-hidden cursor-pointer group border border-white/5 shadow-lg"
                >
                  {/* Top Image Section */}
                  <div className="relative h-[220px] w-full bg-gradient-to-br from-[#1e1e1e] to-[#0a0a0a] p-6 flex items-center justify-center">
                    {/* The actual image or fallback */}
                    <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out z-0 flex items-center justify-center">
                      {type.image ? (
                        <Image
                          src={type.image}
                          alt={type.name}
                          fill
                          className="object-contain drop-shadow-2xl"
                        />
                      ) : (
                        <span className="font-heading text-2xl tracking-widest uppercase text-muted/50 select-none whitespace-nowrap">
                          {type.name}
                        </span>
                      )}
                    </div>
                    
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent z-10 pointer-events-none" />
                    
                    {/* Overlaid Text & Button */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                      <div className="flex flex-col">
                        <h3 className="text-white text-lg font-normal drop-shadow-md">{type.name}</h3>
                        <p className="text-white/70 text-xs mt-0.5 drop-shadow-md">{activeTab === "body" ? "Body Type" : "Premium Brand"}</p>
                      </div>
                      <div className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-normal px-4 py-2 rounded-lg transition-colors">
                        Explore
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info Section */}
                  <div className="flex flex-col flex-1 p-5 bg-[#111111]">
                    {/* Bottom Stats Row */}
                    <div className="grid grid-cols-3 gap-2 mt-auto pt-2">
                      <div className="flex flex-col">
                        <span className="text-white font-normal text-sm">{type.count}</span>
                        <span className="text-muted-foreground text-[9px] uppercase tracking-wider mt-0.5">Vehicles</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-normal text-sm">All</span>
                        <span className="text-muted-foreground text-[9px] uppercase tracking-wider mt-0.5">Models</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-normal text-sm">100%</span>
                        <span className="text-muted-foreground text-[9px] uppercase tracking-wider mt-0.5">Certified</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Pagination Controls */}
          {count > 1 && (
            <div className="flex items-center justify-end gap-4 mt-8">
              {/* <CarouselPrevious className="relative inset-0 translate-y-0 h-10 w-10 border-white/10 bg-transparent hover:bg-white/10 hover:text-white" /> */}
              <div className="flex items-center gap-2">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => api?.scrollTo(i)}
                    className={cn(
                      "transition-all duration-300 rounded-full",
                      current === i ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              {/* <CarouselNext className="relative inset-0 translate-y-0 h-10 w-10 border-white/10 bg-transparent hover:bg-white/10 hover:text-white" /> */}
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
}
