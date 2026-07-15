import { CarSlugPage } from "@/features/inventory/slug";
import { getCarBySlug, getAllCars } from "@/lib/cars";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export default async function CarDetailsRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const allCars = await getAllCars();
  const relatedCars = allCars.filter(c => c.slug !== slug).slice(0, 3);

  const mdxContent = <MDXRemote source={car.mdxSource} />;

  return <CarSlugPage car={car as any} relatedCars={relatedCars as any} mdxContent={mdxContent} />;
}
