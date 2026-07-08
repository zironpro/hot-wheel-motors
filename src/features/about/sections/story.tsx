import Image from "next/image";
import { Car, ShieldCheck, Globe } from "lucide-react";

export function StorySection() {
  return (
    <section className="w-full pt-32 pb-12 md:pb-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col">
            <h2 className="text-xs sm:text-sm font-light text-muted uppercase tracking-widest mb-6">
              OUR STORY
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-normal text-white leading-tight mb-8">
              Driven by Passion.<br />Defined by Trust.
            </h3>
            
            <div className="flex flex-col gap-6 text-muted-foreground font-light leading-relaxed mb-12">
              <p>
                Hot Wheels Motors is a Dubai-based luxury car boutique specializing in the sourcing of exceptional pre-owned vehicles.
              </p>
              <p>
                We deliver an unparalleled ownership experience to clients worldwide.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col gap-3">
                <Car className="w-6 h-6 text-accent" strokeWidth={1.5} />
                <h4 className="text-sm font-normal text-white tracking-wide uppercase">DUBAI SOURCED</h4>
                <p className="text-xs text-muted-foreground">Handpicked cars from trusted networks.</p>
              </div>
              <div className="flex flex-col gap-3">
                <ShieldCheck className="w-6 h-6 text-accent" strokeWidth={1.5} />
                <h4 className="text-sm font-normal text-white tracking-wide uppercase">QUALITY ASSURED</h4>
                <p className="text-xs text-muted-foreground">Multi-point inspection & certified mileage.</p>
              </div>
              <div className="flex flex-col gap-3">
                <Globe className="w-6 h-6 text-accent" strokeWidth={1.5} />
                <h4 className="text-sm font-normal text-white tracking-wide uppercase">GLOBAL DELIVERY</h4>
                <p className="text-xs text-muted-foreground">Seamless shipping to 100+ countries.</p>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative w-full aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
            <Image 
              src="/images/banner.png" 
              alt="Hot Wheels Motors Showroom" 
              fill
              className="object-cover object-center hover:scale-105 transition-transform duration-700"
            />
            {/* Dark gradient overlay for mood */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
          
        </div>
      </div>
    </section>
  );
}
