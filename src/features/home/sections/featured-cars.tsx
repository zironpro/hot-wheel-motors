import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarData } from "@/lib/cars";

export function FeaturedCarsSection({ cars }: { cars: CarData[] }) {
  // Take 4 random cars or just the first 4 for featured
  const featuredCars = cars.slice(0, 4).map(c => {
    // Extract a short description from the markdown body
    const firstParagraph = c.description ? c.description.split('\n').find(line => line.trim().length > 10) : "";
    return {
      ...c,
      shortDescription: firstParagraph || "Experience unparalleled luxury and performance in this pristine vehicle."
    }
  });

  return (
    <section className="w-full pt-12 md:pt-16 lg:pt-20 pb-4 md:pb-6 lg:pb-8 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-sm sm:text-base font-light text-muted uppercase tracking-widest">
            FEATURED COLLECTIONS
          </h2>
          <Link href={"/cars" as any} className="text-sm sm:text-base font-light tracking-widest text-muted hover:text-primary transition-colors uppercase">
            VIEW ALL
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredCars.map((car) => (
            <Link
              key={car.id}
              href={`/cars/${car.slug}` as any}
              className="flex flex-col w-full rounded-lg overflow-hidden cursor-pointer border border-white/5 bg-[#111111] hover:bg-[#1a1a1a] transition-all group shadow-2xl"
            >
              {/* Top Background & Image Container */}
              <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-white/5 to-[#111111] flex items-center justify-center">
                {/* Radial glow effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
                
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-110 z-10"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-col p-6 bg-[#111111] z-20 flex-1">
                {/* Specs Pills */}
                <div className="flex flex-wrap gap-2 mb-4 mt-2">
                  {car.specs.split(' | ').map((spec, i) => (
                    <span key={i} className="bg-white/10 text-white/90 text-[10px] font-normal px-2.5 py-1 rounded-lg flex items-center shadow-sm">
                      <span className="w-1 h-1 rounded-full bg-white/50 mr-1.5" />
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-2xl font-normal text-white leading-tight mb-1 tracking-tight">
                  {car.name}
                </h3>
                <p className="text-base font-normal text-muted-foreground uppercase tracking-wide mb-4">
                  {car.subtitle}
                </p>

                {/* Description Paragraph */}
                <p className="text-[11px] text-muted-foreground/60 leading-relaxed mt-auto pt-4 border-t border-white/5 line-clamp-3">
                  {car.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
