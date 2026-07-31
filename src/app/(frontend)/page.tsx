import type { Metadata } from "next";
import { HomePage } from "@/features/home/page";
import { getAllCars, getAllBrands, getAllReviews } from "@/lib/cars";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Luxury Pre-Owned Car Showroom in Dubai | Hot Wheel Motors",
  description: "Explore Dubai's premier luxury pre-owned car showroom. Top brands including Range Rover, Porsche, BMW, Mercedes & more. Verified history, finance & global export.",
  keywords: [
    "luxury pre-owned cars Dubai",
    "luxury car showroom Dubai",
    "used luxury cars Dubai",
    "pre-owned cars Dubai",
  ],
  openGraph: {
    title: "Luxury Pre-Owned Car Showroom in Dubai | Hot Wheel Motors",
    description: "Explore Dubai's premier luxury pre-owned car showroom. Top brands including Range Rover, Porsche, BMW, Mercedes & more. Verified history, finance & global export.",
    url: "https://hotwheelmotors.com/",
    siteName: "Hot Wheel Motors",
  },
};

export default async function Home() {
  const cars = await getAllCars();
  const brands = await getAllBrands();
  const reviews = await getAllReviews();
  
  const payload = await getPayload({ config: configPromise });
  const homePageData = await payload.findGlobal({ slug: 'home-page' });

  return (
    <main className="flex flex-col flex-1">
      <HomePage initialCars={cars} initialBrands={brands} initialReviews={reviews} homeData={homePageData} />
    </main>
  );
}
