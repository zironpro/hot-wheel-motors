import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Ban, Landmark, RefreshCcw, Headset, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ui/ScrollReveal";

const iconMap: Record<string, any> = {
  ShieldCheck,
  Ban,
  Landmark,
  Headset,
  RefreshCcw,
  Tag,
};

export function WhyUsSection({ data }: { data?: { features?: any[], promo?: any } }) {
  const features = data?.features && data.features.length > 0 ? data.features : [
    {
      icon: "ShieldCheck",
      title: "Verified Cars",
      description: "All cars are\ninspected & verified",
    },
    {
      icon: "Ban",
      title: "No Hidden Fees",
      description: "Transparent pricing\nyou can trust",
    },
    {
      icon: "Landmark",
      title: "Flexible Finance",
      description: "Easy loan options\navailable",
    },
    {
      icon: "Headset",
      title: "Dedicated Support",
      description: "We are here\nto help you",
    },
  ];

  return (
    <section className="w-full pt-4 md:pt-8 lg:pt-10 pb-12 md:pb-16 lg:pb-20 bg-background">
      <div className="container flex flex-col">
        {/* Top Features Strip */}
        <ScrollStagger className="grid grid-cols-2 lg:grid-cols-4 w-full border border-primary/5 rounded-t-lg overflow-hidden bg-surface">
          {features.map((feature, index) => (
            <ScrollStaggerItem key={index} variant="fade-up">
              <div 
                className="flex flex-col xl:flex-row items-center justify-center gap-3 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-primary/5 last:border-r-0 text-center group hover:bg-surface/80 transition-colors h-full"
              >
                <div className="w-12 h-12 rounded-lg border border-accent/30 flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
                  {(() => {
                    const IconComponent = iconMap[feature.icon] || ShieldCheck;
                    return <IconComponent className="w-5 h-5 text-accent stroke-[1.5]" />;
                  })()}
                </div>
                <span className="text-primary text-sm md:text-base font-light">{feature.title}</span>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>

        {/* Bottom Promo Hero */}
        <ScrollReveal variant="fade-up" delay={0.2} className="relative w-full bg-carbon rounded-b-lg border border-t-0 border-primary/5 min-h-[380px] lg:min-h-[420px] flex flex-col lg:flex-row items-center justify-between">
          {/* Card Background (clipped inside rounded card container) */}
          <div className="absolute inset-0 w-full h-full rounded-b-lg overflow-hidden z-0 bg-carbon">
            <Image
              src={data?.promo?.bgImage?.url || "/images/banner-bg.webp"} 
              alt="Promo Background"
              fill
              sizes="100vw"
              quality={90}
              className="hidden md:block object-cover object-center"
            />
            {/* Dark overlay for optimal text contrast on desktop */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30 lg:to-transparent z-1" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-start w-full lg:w-1/2 py-10 lg:py-16 px-6 md:px-12">
            <div className="flex items-center gap-6 mb-4">
              <h2 className="text-3xl md:text-5xl font-heading font-normal text-white leading-tight drop-shadow-lg whitespace-pre-line">
                {data?.promo?.heading || "Looking to sell your car?"}
              </h2>
            </div>
            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-md drop-shadow-md whitespace-pre-line">
              {data?.promo?.subheading || "Get the best price for your car in just a few simple steps."}
            </p>
            <Button 
              asChild
              className="rounded-lg px-8 h-12 md:h-14 text-sm md:text-base uppercase group shadow-lg"
            >
              <Link href={data?.promo?.buttonLink || "/sell"}>
                {data?.promo?.buttonText || "Sell Your Car Today"}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Car Image - Hidden on mobile, visible on desktop/tablet */}
          <div className="hidden md:block absolute right-0 lg:-right-10 xl:-right-14 -bottom-8 lg:-bottom-14 xl:-bottom-16 w-full lg:w-[580px] xl:w-[680px] h-[240px] sm:h-[300px] lg:h-[400px] z-20 pointer-events-none flex items-end justify-center lg:justify-end">
            <div className="relative w-full h-full">
              <Image
                src={data?.promo?.carImage?.url || data?.promo?.image?.url || "/images/banner-car.webp"}
                alt="Promo Car"
                fill
                sizes="(max-width: 1024px) 100vw, 680px"
                quality={95}
                priority
                className="object-contain object-bottom drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] -scale-x-100 scale-105 lg:scale-115 origin-bottom-right"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
