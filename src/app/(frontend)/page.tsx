import { HomePage } from "@/features/home/page";
import { getAllCars, getAllBrands, getAllReviews } from "@/lib/cars";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

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
