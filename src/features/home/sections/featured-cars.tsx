import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const featuredCars = [
  {
    id: 1,
    slug: "audi-rs6",
    name: "Audi RS6",
    subtitle: "2024 MODEL",
    specs: "Gray | 3.6 S | Automatic",
    description: "The Audi RS6 Avant perfectly combines extreme performance with everyday practicality and stunning design.",
    image: "/inventory/Audi-RS6-2024-Gray.png",
  },
  {
    id: 2,
    slug: "bmw-m4",
    name: "BMW M4",
    subtitle: "2022 MODEL",
    specs: "Blue | 3.4 S | Automatic",
    description: "The BMW M4 delivers pure motorsport technology into a production model for unparalleled track performance.",
    image: "/inventory/BMW-M4-2022-Blue.png",
  },
  {
    id: 3,
    slug: "cadillac-escalade-sport-platinum",
    name: "Cadillac Escalade",
    subtitle: "2026 SPORT PLATINUM",
    specs: "Red | 5.9 S | Automatic",
    description: "The Escalade Sport Platinum blends commanding presence with incredible luxury and state-of-the-art technology.",
    image: "/inventory/Cadillac-Escalade-Sport-Platinum-2026-Red.png",
  },
  {
    id: 4,
    slug: "lamborghini-urus-performante",
    name: "Lamborghini Urus",
    subtitle: "2024 PERFORMANTE",
    specs: "Gray | 3.3 S | Automatic",
    description: "The Urus Performante elevates the Super SUV to a new level of performance, combining extreme driving dynamics with bold design.",
    image: "/inventory/Lamborghini-Urus-Performante-2024-Gray.png",
  }
];

export function FeaturedCarsSection() {
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
              className="flex flex-col w-full rounded-[24px] overflow-hidden cursor-pointer border border-white/5 bg-[#111111] hover:bg-[#1a1a1a] transition-all group shadow-2xl"
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
                    <span key={i} className="bg-white/10 text-white/90 text-[10px] font-normal px-2.5 py-1 rounded-full flex items-center shadow-sm">
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
                <p className="text-[11px] text-muted-foreground/60 leading-relaxed mt-auto pt-4 border-t border-white/5">
                  {car.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
