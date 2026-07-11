import Image from "next/image";
import { Car, ShieldCheck, Globe } from "lucide-react";

export function StorySection() {
  return (
    <section className="w-full pt-32 pb-8 md:pb-12 bg-background">
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

        {/* Story Content: Text & Image Grid */}
        <div className="mt-16 md:mt-24 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* About Text */}
          <div className="text-left space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-light text-white mb-4">
              Our Journey
            </h3>
            <p className="text-zinc-300 md:text-lg leading-relaxed font-light">
              Founded with a clear vision, Hot Wheel Used Motors Trading LLC has grown to become a premier destination for high-quality, pre-owned vehicles. We believe that buying a car should be a transparent, exciting, and premium experience. 
            </p>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
              Our curated showroom features only the finest models, each passing rigorous multi-point inspections to ensure unparalleled reliability and performance. From everyday luxury to rare performance vehicles, we connect passionate drivers with their perfect match.
            </p>
          </div>

          {/* About Image */}
          <div className="w-full rounded-lg overflow-hidden shadow-2xl border border-zinc-800/50">
            <Image 
              src="/images/about.png" 
              alt="Hot Wheel Used Motors Showroom" 
              width={1920}
              height={1080}
              className="w-full h-[300px] lg:h-[400px] object-cover object-[center_40%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}