import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredCars = [
  {
    id: 1,
    slug: "mercedes-benz-gle",
    name: "Mercedes-Benz GLE",
    specs: "3.0L | Automatic | 15,000 km",
    price: "AED 139,900",
    image: "/inventory/benz.webp",
  },
  {
    id: 2,
    slug: "porsche-911-gt3-rs",
    name: "Porsche 911 GT3 RS",
    specs: "4.0L | Automatic | 5,000 km",
    price: "AED 223,800",
    image: "/inventory/porsche.webp",
  },
  {
    id: 3,
    slug: "bmw-i4-m50",
    name: "BMW i4 M50",
    specs: "Electric | Automatic | 12,000 km",
    price: "AED 211,000",
    image: "/inventory/bmw.webp",
  },
  {
    id: 4,
    slug: "audi-a7-sportback",
    name: "Audi A7 Sportback",
    specs: "3.0L | Automatic | 20,000 km",
    price: "AED 147,100",
    image: "/inventory/audi.webp",
  }
];

export function FeaturedCarsSection() {
  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-[10px] sm:text-xs font-semibold text-muted uppercase tracking-widest">
            FEATURED INVENTORY
          </h2>
          <Link href={"/cars" as any} className="text-[10px] sm:text-xs font-semibold tracking-widest text-muted hover:text-primary transition-colors uppercase">
            VIEW ALL
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredCars.map((car) => (
            <Link
              key={car.id}
              href={`/cars/${car.slug}` as any}
              className="flex flex-col group w-full rounded-2xl overflow-hidden cursor-pointer border border-primary/5 bg-surface hover:bg-surface/80 transition-colors"
            >
              {/* Full Width Image Block */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Details Container */}
              <div className="flex flex-col flex-1 p-6 md:p-8">
                <div className="flex flex-col gap-1 mb-6">
                  <h3 className="text-xl md:text-2xl font-heading font-normal text-primary leading-tight mb-1">
                    {car.name}
                  </h3>
                  <p className="text-xs font-mono text-muted">{car.specs}</p>
                </div>

                {/* Bottom Details */}
                <div className="mt-auto flex items-end justify-between">
                  <p className="text-lg font-bold text-accent">{car.price}</p>
                  <ArrowRight className="w-5 h-5 text-muted group-hover:text-primary transition-colors group-hover:translate-x-1" strokeWidth={1.5} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
