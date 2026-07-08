import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type Car = {
  id: string | number;
  slug: string;
  name: string;
  subtitle?: string;
  description?: string;
  specs: string;
  price?: string;
  image: string;
};

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Link
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
          <h3 className="text-xl md:text-2xl font-normal text-white leading-tight">
            {car.name}
          </h3>
          <p className="text-muted-foreground text-sm">{car.specs}</p>
        </div>

        {/* Bottom Details */}
        <div className="mt-auto flex items-end justify-between">
          <p className="text-xl font-normal text-gray-300">{car.price}</p>
          <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black transition-all duration-300 group-hover:bg-accent group-hover:text-white shadow-lg">
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </Link>
  );
}
