"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, Calendar, Gauge, Fuel, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarCard } from "./components/car-card";

// Mock data to match the grid
const INVENTORY = [
  {
    id: 1,
    name: "Mercedes-Benz GLE",
    specs: "3.0L | Automatic | 15,000 km",
    price: "AED 139,900",
    image: "/inventory/benz.webp",
  },
  {
    id: 2,
    name: "Porsche 911 GT3 RS",
    specs: "4.0L | Automatic | 5,000 km",
    price: "AED 223,800",
    image: "/inventory/porsche.webp",
  },
  {
    id: 3,
    name: "BMW i4 M50",
    specs: "Electric | Automatic | 12,000 km",
    price: "AED 211,000",
    image: "/inventory/bmw.webp",
  },
];

interface CarSlugPageProps {
  id: string;
}

export function CarSlugPage({ id }: CarSlugPageProps) {
  // In a real app, we'd fetch the car by ID. Here we mock it or just use the first item.
  const car = INVENTORY.find(c => c.id.toString() === id) || INVENTORY[0];
  
  // Dummy gallery images (in a real app, these would come from the car object)
  const galleryImages = [
    car.image,
    "/inventory/suv.webp",
    "/inventory/sedan.webp",
    "/inventory/benz.webp",
  ];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Back Button */}
        <Link href="/cars" className="inline-flex items-center text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Inventory
        </Link>

        {/* Top Section: Image & Basic Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Gallery Area */}
          <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
            {/* Thumbnails (Bottom on mobile, Left on desktop) */}
            <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-24 md:max-h-[600px] pb-2 md:pb-0 scrollbar-hide">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 md:w-full aspect-video md:aspect-square rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImage === img ? "border-accent opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
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

            {/* Main Image */}
            <div className="relative flex-1 aspect-video md:aspect-auto md:h-full min-h-[300px] md:min-h-[500px] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <Image
                src={activeImage}
                alt={car.name}
                fill
                className="object-cover transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Details & Actions */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-2">
              {car.name}
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-accent mb-8">
              {car.price}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/10">
                <Gauge className="w-6 h-6 text-accent mr-3" />
                <div>
                  <p className="text-xs text-muted-foreground">Mileage</p>
                  <p className="text-sm font-medium text-white">{car.specs.split(' | ')[2] || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/10">
                <Fuel className="w-6 h-6 text-accent mr-3" />
                <div>
                  <p className="text-xs text-muted-foreground">Engine</p>
                  <p className="text-sm font-medium text-white">{car.specs.split(' | ')[0] || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/10">
                <CheckCircle2 className="w-6 h-6 text-accent mr-3" />
                <div>
                  <p className="text-xs text-muted-foreground">Transmission</p>
                  <p className="text-sm font-medium text-white">{car.specs.split(' | ')[1] || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/10">
                <Calendar className="w-6 h-6 text-accent mr-3" />
                <div>
                  <p className="text-xs text-muted-foreground">Year</p>
                  <p className="text-sm font-medium text-white">2023</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-accent text-background font-heading font-bold h-12 rounded-lg hover:bg-accent/90 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] text-lg">
                Book Test Drive
              </Button>
              <Button variant="outline" className="flex-1 border-white/20 text-white font-heading font-bold h-12 rounded-lg hover:bg-white/10 transition-all text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        {/* Overview & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Vehicle Overview</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                Experience luxury and performance combined in this pristine {car.name}. This vehicle has been meticulously inspected and maintained to ensure the highest quality standards. Featuring advanced technology, premium comfort, and exceptional driving dynamics, it stands out as a prime choice for discerning drivers.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our certified pre-owned vehicles undergo a rigorous multi-point inspection process. We guarantee the authenticity of the mileage and provide a comprehensive vehicle history report for your peace of mind.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Key Features</h2>
            <ul className="space-y-4">
              {['Premium Leather Interior', 'Panoramic Sunroof', 'Advanced Driver Assistance', 'Premium Audio System', '360° Camera System', 'Apple CarPlay & Android Auto'].map((feature, idx) => (
                <li key={idx} className="flex items-center text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Vehicles */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-heading font-bold text-white">Related Vehicles</h2>
            <Link href="/cars" className="text-accent hover:text-white transition-colors font-medium hidden md:block">
              View All Inventory →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {INVENTORY.filter(c => c.id.toString() !== id).slice(0, 3).map((relatedCar) => (
              <CarCard key={relatedCar.id} car={relatedCar} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
