import { HomePage } from "@/features/home/page";
import { getAllCars } from "@/lib/cars";

export default function Home() {
  const cars = getAllCars();
  return (
    <main className="flex flex-col flex-1">
      <HomePage initialCars={cars} />
    </main>
  );
}
