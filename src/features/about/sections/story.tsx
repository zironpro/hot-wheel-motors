import Image from "next/image";
import { Car, ShieldCheck, Globe } from "lucide-react";

export function StorySection() {
  return (
    <section className="w-full pt-32 pb-16 md:pb-24 bg-background">
      {/* Intro Header */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white leading-tight mb-8">
            Driven by Passion.
            <br />
            Defined by Trust.
          </h2>

          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mb-10">
            Hot Wheels Motors is a luxury automotive boutique based in Dubai,
            specializing in sourcing and delivering exceptional pre-owned
            vehicles to clients worldwide.
          </p>
        </div>

        {/* Constrained Hero Image */}
        <div className="relative w-full max-w-5xl mx-auto h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden rounded-lg shadow-2xl">
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/about-us-mobile.png" />
            <Image
              src="/images/about-us.png"
              alt="Luxury Showroom"
              fill
              priority
              className="object-cover object-center transition-transform duration-[2000ms] hover:scale-105"
            />
          </picture>
        </div>
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 bg-surface rounded-lg border border-white/5">
            <Car className="w-12 h-12 mb-4 text-white/80" />
            <h4 className="text-sm font-light text-white tracking-wide mb-2">Dubai Sourced</h4>
            <p className="text-xs text-muted-foreground font-light">Handpicked inventory through trusted networks.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-surface rounded-lg border border-white/5">
            <ShieldCheck className="w-12 h-12 mb-4 text-white/80" />
            <h4 className="text-sm font-light text-white tracking-wide mb-2">Quality Assured</h4>
            <p className="text-xs text-muted-foreground font-light">Multi‑point inspection and certified mileage.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-surface rounded-lg border border-white/5">
            <Globe className="w-12 h-12 mb-4 text-white/80" />
            <h4 className="text-sm font-light text-white tracking-wide mb-2">Global Delivery</h4>
            <p className="text-xs text-muted-foreground font-light">Secure shipping worldwide.</p>
          </div>
        </div>
      </div>
    </section>
  );
}