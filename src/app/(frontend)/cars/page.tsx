import { Suspense } from "react";
import { InventoryPage } from "@/features/inventory/page";
import { getAllCars } from "@/lib/cars";

export default async function Cars() {
  const cars = await getAllCars();
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-32 pb-16 flex items-center justify-center text-white">Loading inventory...</div>}>
      <InventoryPage initialCars={cars} />
    </Suspense>
  );
}
