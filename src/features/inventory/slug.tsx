"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Gauge,
  Fuel,
  CheckCircle2,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Hash,
  Share2,
  Check,
  Phone,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarCard } from "./components/car-card";
import { cn } from "@/lib/utils";
import { CarData } from "@/lib/cars";
import { WhatsappIcon } from "@/components/layout/whatsapp-button";

interface CarSlugPageProps {
  car: CarData;
  relatedCars: CarData[];
  mdxContent: React.ReactNode;
  phoneNumber?: string;
}

export function CarSlugPage({ car, relatedCars, mdxContent, phoneNumber }: CarSlugPageProps) {
  const phone = phoneNumber || "+971 55 578 1902";
  const cleanPhone = phone.replace(/\D/g, "");
  const callTelUrl = `tel:${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi, I am interested in inquiring about the ${car.name} (${car.price}). Please share more details.`)}`;
  // Dynamic gallery images directly from the car data
  const galleryImages = car.gallery && car.gallery.length > 0 ? car.gallery : [car.image];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${car.name} | Hotwheel Motors`,
      text: `Check out the ${car.name} at Hotwheel Motors`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (typeof navigator !== "undefined" && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

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
    if (distance > 50) handleNext();
    if (distance < -50) handlePrev();
  };

  const specsList = car.specs ? car.specs.split(" | ") : [];

  const isZeroPrice = !car.price || car.price.includes(" 0") || car.price.endsWith(" 0") || car.price.trim() === "" || car.price.toLowerCase().includes("request");
  const displayPrice = isZeroPrice ? "Price On Request" : car.price;

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32 pb-16 text-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Title Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-white tracking-wide">
              {car.name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {specsList.map((spec, i) => (
                <span key={i} className="bg-white/5 border border-white/10 text-white/80 text-xs font-light px-2.5 py-1 rounded-md">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Hero Alignment Matching Reference Design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-12">
          
          {/* Left Column: Gallery Viewer & Thumbnails (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-4 w-full">
            {/* Main Viewer */}
            <div 
              className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] bg-[#080808] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center group"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEndHandler}
            >
              <Image
                src={activeImage}
                alt={car.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain object-center transition-opacity duration-300"
                priority
              />

              {/* Slider Controls */}
              {galleryImages.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-accent text-white hover:text-black rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-accent text-white hover:text-black rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 border border-white/10 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip directly underneath main viewer */}
            <div className="flex gap-2.5 overflow-x-auto pb-2 w-full justify-start items-center hide-scrollbar">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={cn(
                    "relative rounded-lg overflow-hidden transition-all flex-shrink-0 cursor-pointer h-16 sm:h-20 aspect-video bg-black/40",
                    activeImage === img 
                      ? "ring-2 ring-accent opacity-100 shadow-[0_0_15px_rgba(212,175,55,0.25)]" 
                      : "border border-white/10 opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${car.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Sidebar Panel matching reference design (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[#121212] border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl">
            
            {/* Price Header Row */}
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-white/50 font-mono">PRICE</span>
              <span className="text-xl sm:text-2xl font-bold font-heading text-accent">{displayPrice}</span>
            </div>

            {/* Dynamic Quick Spec Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center bg-white/[0.03] border border-white/5 rounded-xl p-3">
              <div>
                <p className="text-sm font-bold text-white">{car.year || "N/A"}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">YEAR</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white">{car.kmDriven || "N/A"}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">KILOMETER</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white">{car.engine ? car.engine.split(" ")[0] : "N/A"}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">ENGINE</p>
              </div>
              <div>
                <p className="text-sm font-bold text-white capitalize">{car.color || "N/A"}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mt-0.5">COLOR</p>
              </div>
            </div>

            {/* Key Vehicle Specifications Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-accent fill-accent" />
                <span>SPECIFICATIONS</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-left bg-white/[0.03] border border-white/5 rounded-xl p-3.5">
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">ENGINE SPEC</p>
                  <p className="text-xs font-semibold text-white mt-0.5 truncate">{car.engine || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">EXTERIOR COLOR</p>
                  <p className="text-xs font-semibold text-white mt-0.5 capitalize">{car.color || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">MODEL YEAR</p>
                  <p className="text-xs font-semibold text-white mt-0.5">{car.year || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">VIN NUMBER</p>
                  <p className="text-xs font-semibold text-white mt-0.5 truncate">{car.vin || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleShare}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all text-[11px] gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-white/70" />}
                <span>{copied ? "Copied" : "Share"}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all text-[11px] gap-1.5"
              >
                <WhatsappIcon className="w-4 h-4 text-white/70 fill-current" />
                <span>WhatsApp</span>
              </a>

              <Link
                href={`/contact?message=${encodeURIComponent(`Inquiry about ${car.name}`)}`}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all text-[11px] gap-1.5"
              >
                <ArrowUpRight className="w-4 h-4 text-white/70" />
                <span>Inquiry</span>
              </Link>
            </div>

            {/* Brand CTA Call Button */}
            <a
              href={callTelUrl}
              className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent/90 text-black font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Phone className="w-4 h-4 fill-black text-black" />
              <span>Call</span>
            </a>

          </div>
        </div>

        {/* Bottom Content Section: Overview & Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-heading font-normal text-white mb-6 border-b border-white/5 pb-4">
                Vehicle Overview
              </h2>
              <div className="prose prose-invert max-w-none text-white/70 font-light leading-relaxed text-sm md:text-base prose-p:mb-4 break-words">
                {mdxContent}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-surface border border-white/5 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-heading font-normal text-white mb-6 border-b border-white/5 pb-4">
                Key Features
              </h2>
              <ul className="flex flex-col gap-3">
                {(car.features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-start text-white/70 font-light text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent mr-2.5 mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span className="break-words min-w-0 flex-1">{feature}</span>
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
