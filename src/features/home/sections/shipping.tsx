import { Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ShippingSection() {
  return (
    <section className="w-full pt-4 md:pt-6 lg:pt-8 pb-4 md:pb-6 lg:pb-8 bg-background">
      <div className="container">
        <Link href={"/services" as any} className="relative overflow-hidden flex flex-col md:flex-row items-center rounded-2xl border border-primary/5 group hover:border-primary/20 transition-colors min-h-[140px] md:min-h-[180px]">
          
          {/* Full Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/banner-1.png"
              alt="Worldwide Shipping"
              fill
              className="object-cover object-center"
            />
            {/* Dark Overlay for Text Readability */}
            {/* <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors z-10" /> */}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 z-20 relative w-full h-full">
            <div className="flex items-center gap-6">
              <Globe className="w-10 h-10 md:w-12 md:h-12 text-primary/80 stroke-[1]" />
              <div className="flex flex-col">
                <h3 className="text-sm md:text-base font-light text-primary uppercase tracking-widest mb-1 drop-shadow-lg">
                  WORLDWIDE SHIPPING & EXPORT ASSISTANCE
                </h3>
                <p className="text-xs md:text-sm text-gray-200 drop-shadow-md">
                  Seamless international delivery from Dubai to your doorstep.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto justify-end mt-6 md:mt-0 lg:mr-8">
              <span className="text-xs font-light tracking-widest text-primary md:text-white uppercase transition-colors drop-shadow-md group-hover:text-primary">
                LEARN MORE
              </span>
              <div className="w-10 h-10 rounded-full border border-primary/20 md:border-white/30 flex items-center justify-center transition-colors text-primary md:text-white md:backdrop-blur-sm md:bg-black/20 group-hover:bg-primary group-hover:text-black group-hover:border-primary">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
