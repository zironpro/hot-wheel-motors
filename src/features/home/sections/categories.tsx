import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const bodyTypes = [
  { name: "Sedan", count: 162, image: "/catagory/sedan.webp", href: "/cars?type=sedan" },
  { name: "SUV", count: 215, image: "/catagory/suv.webp", href: "/cars?type=suv" },
  { name: "Hatchback", count: 108, image: "/catagory/hatchback.webp", href: "/cars?type=hatchback" },
  { name: "Coupe", count: 86, image: "/catagory/coupe.webp", href: "/cars?type=coupe" },
  { name: "Pickup", count: 64, image: "/catagory/pickup.webp", href: "/cars?type=pickup" },
  { name: "Luxury", count: 73, image: "/catagory/luxury.webp", href: "/cars?type=luxury" },
];

export function CategoriesSection() {
  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-[10px] sm:text-xs font-semibold text-muted tracking-widest">
            Catagories
          </h2>
          <Link href="/cars" className="text-[10px] sm:text-xs font-semibold tracking-widest text-muted hover:text-primary transition-colors uppercase">
            VIEW ALL
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {bodyTypes.map((type) => (
              <CarouselItem key={type.name} className="pl-4 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <Link
                  href={type.href as any}
                  className="flex flex-col bg-surface hover:bg-surface/80 transition-colors relative h-[300px] md:h-[350px] w-full rounded-2xl cursor-pointer group border border-primary/5"
                >
                  {/* Floating Image */}
                  <div className="relative h-28 md:h-36 w-full mt-8 md:mt-12 flex-1 flex items-center justify-center px-4">
                    <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out">
                      <Image
                        src={type.image}
                        alt={type.name}
                        fill
                        className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.4)]"
                      />
                    </div>
                  </div>
                  
                  {/* Bottom Text */}
                  <div className="flex flex-col items-start justify-end mt-auto p-6 md:p-8">
                    <h3 className="text-xl md:text-2xl font-heading font-normal text-primary leading-tight mb-1">{type.name}</h3>
                    <p className="text-xs font-mono text-muted">{type.count} Vehicles Available</p>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
