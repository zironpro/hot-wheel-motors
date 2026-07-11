import { InventoryPage } from "@/features/inventory/page";
import { getAllCars } from "@/lib/cars";

export default function Cars() {
  const cars = getAllCars();
  return <InventoryPage initialCars={cars} />;
}
