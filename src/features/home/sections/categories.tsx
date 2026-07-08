"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const bodyTypes = [
  { name: "Sedan", count: 162, image: "/catagory/sedan.webp", href: "/cars?type=sedan" },
  { name: "SUV", count: 215, image: "/catagory/suv.webp", href: "/cars?type=suv" },
  { name: "Hatchback", count: 108, image: "/catagory/hatchback.webp", href: "/cars?type=hatchback" },
  { name: "Coupe", count: 86, image: "/catagory/coupe.webp", href: "/cars?type=coupe" },
  { name: "Pickup", count: 64, image: "/catagory/pickup.webp", href: "/cars?type=pickup" },
  { name: "Luxury", count: 73, image: "/catagory/luxury.webp", href: "/cars?type=luxury" },
];

const brandTypes = [
  { name: "Mercedes-Benz", count: 45, image: "/car-logo/Mercedes-Benz_Symbol_1.png", href: "/cars?make=mercedes-benz" },
  { name: "Porsche", count: 28, image: "/car-logo/Porsche_Symbol_1.png", href: "/cars?make=porsche" },
  { name: "Ferrari", count: 12, image: "/car-logo/Ferrari_Logo_1.png", href: "/cars?make=ferrari" },
  { name: "Lamborghini", count: 15, image: "/car-logo/Lamborghini_Logo_1.png", href: "/cars?make=lamborghini" },
  { name: "Aston Martin", count: 8, image: "/car-logo/Aston_Martin_idZRHILK54_1.png", href: "/cars?make=aston-martin" },
];

export function CategoriesSection() {
  const [activeTab, setActiveTab] = useState<"body" | "brand">("body");
  const currentData = activeTab === "body" ? bodyTypes : brandTypes;

  return (
    <section className="w-full pt-4 md:pt-6 lg:pt-8 pb-12 md:pb-16 lg:pb-20 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-primary/10 pb-4">
          <div className="flex items-center gap-6 md:gap-10">
            <button 
              onClick={() => setActiveTab("body")}
              className={cn(
                "text-sm sm:text-base font-light tracking-widest uppercase transition-all relative",
                activeTab === "body" ? "text-primary" : "text-muted hover:text-primary/80"
              )}
            >
              BODY TYPE
              {activeTab === "body" && (
                <span className="absolute -bottom-[17px] left-0 w-full h-[1px] bg-accent" />
              )}
            </button>
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
          opts={{
            align: "start",
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {currentData.map((type) => (
              <CarouselItem key={type.name} className="pl-4 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <Link
                  href={type.href as any}
                  className="flex flex-col bg-[#111111] hover:bg-[#1a1a1a] transition-all relative w-full rounded-lg overflow-hidden cursor-pointer group border border-white/5 shadow-lg min-h-[380px]"
                >
                  {/* Top Image Section */}
                  <div className="relative h-[220px] w-full bg-gradient-to-br from-[#1e1e1e] to-[#0a0a0a] p-6">
                    {/* The actual image */}
                    <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out z-0">
                      <Image
                        src={type.image}
                        alt={type.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                    
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent z-10 pointer-events-none" />
                    
                    {/* Overlaid Text & Button */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                      <div className="flex flex-col">
                        <h3 className="text-white text-lg font-semibold drop-shadow-md">{type.name}</h3>
                        <p className="text-white/70 text-xs mt-0.5 drop-shadow-md">{activeTab === "body" ? "Body Type" : "Premium Brand"}</p>
                      </div>
                      <div className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors">
                        Explore
                      </div>
                    </div>
                  </div>

                  {/* Bottom Info Section */}
                  <div className="flex flex-col flex-1 p-5 bg-[#111111]">
                    {/* Top Info row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-col">
                        <h4 className="text-white/90 font-medium text-sm tracking-wide">Premium Selection</h4>
                        <p className="text-muted-foreground text-xs mt-1">Discover our top-tier collection</p>
                      </div>
                      <div className="w-10 h-10 bg-[#1a1a1a] rounded-lg flex items-center justify-center border border-white/5 shadow-inner">
                        <span className="text-accent text-sm font-semibold">{type.count}</span>
                      </div>
                    </div>
                    
                    {/* Divider */}
                    <div className="w-full h-px bg-white/5 my-2" />

                    {/* Bottom Stats Row */}
                    <div className="grid grid-cols-3 gap-2 mt-auto pt-2">
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-sm">{type.count}</span>
                        <span className="text-muted-foreground text-[9px] uppercase tracking-wider mt-0.5">Vehicles</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-sm">2024</span>
                        <span className="text-muted-foreground text-[9px] uppercase tracking-wider mt-0.5">Models</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-medium text-sm">AED</span>
                        <span className="text-muted-foreground text-[9px] uppercase tracking-wider mt-0.5">Starting</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
