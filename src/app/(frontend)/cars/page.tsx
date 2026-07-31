import type { Metadata } from "next";
import { Suspense } from "react";
import { InventoryPage } from "@/features/inventory/page";
import { getAllCars } from "@/lib/cars";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Luxury Pre-Owned Cars for Sale in Dubai | Hot Wheel Motors",
  description: "Discover luxury pre-owned cars for sale in Dubai. Range Rover, Porsche, BMW, Mercedes, Lamborghini, Aston Martin. Verified history, finance & global export.",
  keywords: [
    "used luxury cars Dubai",
    "luxury cars for sale Dubai",
    "used cars Dubai",
    "pre-owned cars Dubai",
  ],
  openGraph: {
    title: "Luxury Pre-Owned Cars for Sale in Dubai | Hot Wheel Motors",
    description: "Discover luxury pre-owned cars for sale in Dubai. Range Rover, Porsche, BMW, Mercedes, Lamborghini, Aston Martin. Verified history, finance & global export.",
    url: "https://hotwheelmotors.com/cars",
    siteName: "Hot Wheel Motors",
  },
};

export default async function Cars() {
  const cars = await getAllCars();
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-32 pb-16 flex items-center justify-center text-white">Loading inventory...</div>}>
      <InventoryPage initialCars={cars} />
    </Suspense>
  );
}
