import { HomePage } from "@/features/home/page";
import { getAllCars, getAllBrands, getAllReviews } from "@/lib/cars";

export default async function Home() {
  const cars = await getAllCars();
  const brands = await getAllBrands();
  const reviews = await getAllReviews();
  return (
    <main className="flex flex-col flex-1">
      <HomePage initialCars={cars} initialBrands={brands} initialReviews={reviews} />
    </main>
  );
}
