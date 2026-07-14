"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Gauge, Fuel, CheckCircle2, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const currentIndex = galleryImages.indexOf(activeImage);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setActiveImage(galleryImages[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setActiveImage(galleryImages[prevIndex]);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      handleNext();
    }
    if (distance < -50) {
      handlePrev();
    }
  };

  return (
    <div className="min-h-screen bg-background pt-28 md:pt-36 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Top Header: Title & Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-normal text-white tracking-wide">
              {car.name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-1">
              {car.specs.split(' | ').map((spec, i) => (
                <span key={i} className="bg-white/5 border border-white/10 text-white/90 text-xs font-light px-3 py-1.5 rounded-full flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                  {spec}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end w-full md:w-auto">
            <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-normal text-accent mb-4 md:mb-0">
              {car.price}
            </p>
          </div>
        </div>

        {/* Middle: Main Image Container */}
        <div 
          className="w-full bg-[#050505] rounded-2xl overflow-hidden border border-white/5 shadow-2xl mb-6 flex justify-center group relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEndHandler}
        >
          <div className="relative w-full h-[40vh] md:h-[55vh] max-h-[600px]">
            <Image
              src={activeImage}
              alt={car.name}
              fill
              className="object-contain object-center transition-opacity duration-500"
              priority
            />
          </div>

          {/* Slider Controls */}
          {galleryImages.length > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-accent text-white hover:text-black rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-accent text-white hover:text-black rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-8 w-full justify-start items-center hide-scrollbar">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={cn(
                "relative rounded-xl overflow-hidden transition-all flex-shrink-0 cursor-pointer h-20 md:h-24 aspect-video",
                activeImage === img 
                  ? "border-[2px] border-accent opacity-100 shadow-[0_0_15px_rgba(212,175,55,0.2)]" 
                  : "border border-white/10 opacity-50 hover:opacity-100"
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

        {/* Action Bar */}
        <div className="w-full bg-surface border border-white/5 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center mb-16 shadow-lg bg-carbon">
           <p className="text-white/80 font-light text-sm md:text-base mb-4 sm:mb-0">
             Interested in this beautiful vehicle? Reach out to our team today.
           </p>
           <Button asChild className="w-full sm:w-auto px-8 rounded-lg h-12 text-sm bg-accent hover:bg-accent/90 text-black font-normal uppercase tracking-widest transition-colors">
              <Link href={`/contact?message=${encodeURIComponent(`I am interested in inquiring about the ${car.name} ${car.subtitle ? car.subtitle.replace(' MODEL', '') : ''}. Please provide me with more information.`)}`}>
                Enquire Now <ArrowUpRight className="ml-2 w-4 h-4" />
              </Link>
           </Button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          
          {/* Left Column: Specs */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-heading font-normal text-white mb-8 border-b border-white/5 pb-4">Key Specifications</h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Fuel className="text-accent w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white/50 font-light text-xs uppercase tracking-wider mb-1">Engine</p>
                    <p className="text-base text-white font-normal">{car.specs.split(' | ')[2] || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Gauge className="text-accent w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white/50 font-light text-xs uppercase tracking-wider mb-1">KM Driven</p>
                    <p className="text-base text-white font-normal">{car.specs.split(' | ')[1] || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-accent w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white/50 font-light text-xs uppercase tracking-wider mb-1">Color</p>
                    <p className="text-base text-white font-normal">{car.specs.split(' | ')[0] || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Calendar className="text-accent w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-white/50 font-light text-xs uppercase tracking-wider mb-1">Year</p>
                    <p className="text-base text-white font-normal">{car.subtitle ? car.subtitle.replace(' MODEL', '') : 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Overview & Features */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-heading font-normal text-white mb-8 border-b border-white/5 pb-4">Vehicle Overview</h2>
              <div className="prose prose-invert max-w-none text-white/70 font-light leading-relaxed text-sm md:text-base prose-p:mb-4">
                {mdxContent}
              </div>
            </div>

            <div className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-heading font-normal text-white mb-8 border-b border-white/5 pb-4">Key Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {(car.features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-start text-white/70 font-light text-sm md:text-base">
                    <CheckCircle2 className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" strokeWidth={1.5} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Vehicles */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-heading font-normal text-white">Related Vehicles</h2>
            <Link href="/cars" className="text-accent hover:text-white transition-colors text-sm font-light hidden md:block">
              View All Collections →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {relatedCars.map((relatedCar) => (
              <CarCard key={relatedCar.id} car={relatedCar as any} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
