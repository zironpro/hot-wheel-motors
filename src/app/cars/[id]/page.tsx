import { CarSlugPage } from "@/features/inventory/slug";
import { getCarBySlug, getAllCars } from "@/lib/cars";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export default async function CarDetailsRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = getCarBySlug(id);

  if (!car) {
    notFound();
  }

  const allCars = getAllCars();
  const relatedCars = allCars.filter(c => c.slug !== id).slice(0, 3);

  const mdxContent = <MDXRemote source={car.mdxSource} />;

  return <CarSlugPage car={car as any} relatedCars={relatedCars as any} mdxContent={mdxContent} />;
}
