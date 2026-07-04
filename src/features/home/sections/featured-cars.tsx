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
    <section className="w-full py-8 md:py-12 bg-[#09090b]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Featured Inventory
            </h2>

          </div>
          <Link href={"/cars" as any}>
            <Button variant="outline" className="hidden md:flex gap-2 group border-white/10 hover:bg-white/5 text-white">
              View All Cars
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredCars.map((car) => (
            <Link
              key={car.id}
              href={`/cars/${car.slug}` as any}
              className="flex flex-col group w-full rounded-lg overflow-hidden cursor-pointer border border-white/10 bg-[#18181b]"
            >
              {/* Full Width Image Block */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Details Container */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex flex-col gap-1 mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {car.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{car.specs}</p>
                </div>

                {/* Bottom Details */}
                <div className="mt-auto flex items-end justify-between">
                  <p className="text-xl font-bold text-white">{car.price}</p>
                  <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black transition-all duration-300 group-hover:bg-accent group-hover:text-white shadow-lg">
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 md:hidden flex justify-center">
          <Link href={"/cars" as any}>
            <Button variant="outline" className="gap-2 group border-white/10 hover:bg-white/5 text-white w-full max-w-sm">
              View All Cars
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
