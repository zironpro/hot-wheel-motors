"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Calendar, Gauge, Fuel, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarCard } from "./components/car-card";
import { cn } from "@/lib/utils";

import { CarData } from "@/lib/cars";

interface CarSlugPageProps {
  car: CarData;
  relatedCars: CarData[];
  mdxContent: React.ReactNode;
}

export function CarSlugPage({ car, relatedCars, mdxContent }: CarSlugPageProps) {
  
  // Dummy gallery images (in a real app, these would come from the car object)
  const galleryImages = car.gallery || [
    car.image,
    "/inventory/suv.webp",
    "/inventory/sedan.webp",
    "/inventory/benz.webp",
  ];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Hero Image Section - Full Width */}
      <div className="relative w-full h-[50vh] md:h-[70vh] flex flex-col items-center justify-end pt-32">
        {/* Back Button */}
        {/* <div className="absolute top-28 md:top-36 left-4 md:left-8 xl:left-[10%] z-30">
          <Link href="/cars" className="inline-flex items-center text-white/80 hover:text-white transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collections
          </Link>
        </div> */}

        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={activeImage}
            alt={car.name}
            fill
            className="object-cover object-center opacity-90 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Thumbnails overlaid on bottom */}
        <div className="relative z-20 flex gap-3 md:gap-4 overflow-x-auto pb-6 md:pb-12 px-4 w-full justify-start md:justify-center items-end hide-scrollbar">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={cn(
                "relative rounded-lg overflow-hidden transition-all flex-shrink-0 cursor-pointer",
                activeImage === img 
                  ? "w-28 md:w-36 aspect-video border-[2px] border-accent shadow-[0_0_15px_rgba(212,175,55,0.3)] z-10" 
                  : "w-24 md:w-32 aspect-video border border-white/10 opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img}
                alt={`${car.name} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-30 -mt-2">
        {/* Main Info Card */}
        <div className="w-full bg-[#111111] border border-white/5 rounded-lg p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-2xl mb-8 md:mb-12">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-heading font-normal text-white tracking-wide">
              {car.name}
            </h1>
            
            {/* Specs Pills */}
            <div className="flex flex-wrap gap-2 mt-1">
              {car.specs.split(' | ').map((spec, i) => (
                <span key={i} className="bg-white/10 text-white/90 text-[11px] font-normal px-3 py-1 rounded-full flex items-center shadow-sm">
                  <span className="w-1 h-1 rounded-full bg-white/50 mr-1.5" />
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end mt-6 md:mt-0 w-full md:w-auto">
            <p className="text-3xl md:text-4xl font-heading font-normal text-gray-300 mb-4">
              {car.price}
            </p>
            <Button className="w-full md:w-auto px-8 rounded-lg h-12 text-sm uppercase tracking-widest">
              Enquire Now <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          
          {/* Left Column: Specs */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-[#111111] border border-white/5 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-heading font-normal text-white mb-6">Key Specifications</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <Fuel className="text-muted-foreground w-5 h-5 mt-0.5" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <p className="text-white font-normal text-sm">Engine</p>
                    <p className="text-sm text-muted-foreground mt-1">{car.specs.split(' | ')[2] || 'N/A'}</p>
                  </div>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex items-start gap-4">
                  <Gauge className="text-muted-foreground w-5 h-5 mt-0.5" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <p className="text-white font-normal text-sm">KM Driven</p>
                    <p className="text-sm text-muted-foreground mt-1">{car.specs.split(' | ')[1] || 'N/A'}</p>
                  </div>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="text-muted-foreground w-5 h-5 mt-0.5" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <p className="text-white font-normal text-sm">Color</p>
                    <p className="text-sm text-muted-foreground mt-1">{car.specs.split(' | ')[0] || 'N/A'}</p>
                  </div>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex items-start gap-4">
                  <Calendar className="text-muted-foreground w-5 h-5 mt-0.5" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <p className="text-white font-normal text-sm">Year</p>
                    <p className="text-sm text-muted-foreground mt-1">{car.subtitle ? car.subtitle.replace(' MODEL', '') : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Overview & Features */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-[#111111] border border-white/5 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-heading font-normal text-white mb-6">Vehicle Overview</h2>
              <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed text-sm md:text-base prose-p:mb-4">
                {mdxContent}
              </div>
            </div>

            <div className="bg-[#111111] border border-white/5 rounded-lg p-6 md:p-8">
              <h2 className="text-xl font-heading font-normal text-white mb-6">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(car.features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-start text-muted-foreground text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent mr-3 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Vehicles */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-heading font-normal text-white">Related Vehicles</h2>
            <Link href="/cars" className="text-accent hover:text-white transition-colors text-sm font-normal hidden md:block">
              View All Collections →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {relatedCars.map((relatedCar) => (
              <CarCard key={relatedCar.id} car={relatedCar as any} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
