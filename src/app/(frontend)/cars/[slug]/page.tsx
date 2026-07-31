import type { Metadata } from "next";
import { CarSlugPage } from "@/features/inventory/slug";
import { getCarBySlug, getAllCars } from "@/lib/cars";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

interface CarDetailsRouteProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CarDetailsRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    return {
      title: "Car Not Found | Hot Wheel Motors",
      description: "The requested luxury vehicle could not be found.",
    };
  }

  const year = car.year ? String(car.year).trim() : "";
  const color = car.color ? String(car.color).trim() : "";

  // Clean car name (strip year if already in car.name to prevent '2019 Range Rover 2019')
  let cleanName = (car.name || "").trim();
  if (year) {
    cleanName = cleanName.replace(new RegExp(`\\b${year}\\b`, "gi"), "").replace(/\s+/g, " ").trim();
  }

  // Formula 1: Title -> "Pre-owned 2019 Range Rover SVR in Dubai | Hot Wheel Motors"
  const title = `Pre-owned ${year ? `${year} ` : ""}${cleanName} in Dubai | Hot Wheel Motors`;

  // Formula 2: Description -> "Buy a 2019 Range Rover SVR in White from Hot Wheel Motors in Dubai. Verified history, pre-owned luxury car dealer. Verified condition, flexible finance & worldwide export."
  const description = `Buy a ${year ? `${year} ` : ""}${cleanName}${color ? ` in ${color}` : ""} from Hot Wheel Motors in Dubai. Verified history, pre-owned luxury car dealer. Verified condition, flexible finance & worldwide export.`;

  // Formula 3: Keywords
  const keywords = [
    `${cleanName} for sale Dubai`,
    `used ${cleanName} Dubai`,
    `pre-owned ${cleanName} Dubai`,
    `${cleanName} Dubai`,
    "used luxury cars Dubai",
    "pre-owned luxury cars Dubai",
  ];

  const imageUrl = car.image && !car.image.includes("placeholder.png") ? car.image : undefined;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://hotwheelmotors.com/cars/${slug}`,
      siteName: "Hot Wheel Motors",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: `${year} ${cleanName}`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function CarDetailsRoute({ params }: CarDetailsRouteProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  const allCars = await getAllCars();
  const relatedCars = allCars.filter(c => c.slug !== slug).slice(0, 3);

  const mdxContent = <MDXRemote source={car.mdxSource} />;

  return (
    <CarSlugPage
      car={car as any}
      relatedCars={relatedCars as any}
      mdxContent={mdxContent}
      phoneNumber="+971 55 578 1902"
    />
  );
}
