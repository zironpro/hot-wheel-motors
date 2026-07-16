import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Ban, Landmark, RefreshCcw, Headset, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="grid grid-cols-2 lg:grid-cols-4 w-full border border-primary/5 rounded-t-2xl overflow-hidden bg-surface">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="flex flex-col xl:flex-row items-center justify-center gap-3 p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-primary/5 last:border-r-0 text-center group hover:bg-surface/80 transition-colors"
          >
            <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center shrink-0 group-hover:border-accent transition-colors">
              {(() => {
                const IconComponent = iconMap[feature.icon] || ShieldCheck;
                return <IconComponent className="w-5 h-5 text-accent stroke-[1.5]" />;
              })()}
            </div>
            <span className="text-primary text-sm md:text-base font-light">{feature.title}</span>
          </div>
        ))}
      </div>

        {/* Bottom Promo Hero */}
        <div className="relative w-full bg-carbon overflow-hidden flex flex-col lg:flex-row rounded-b-2xl border border-t-0 border-primary/5 min-h-[350px] lg:min-h-[400px]">
          {/* Full Background Image */}
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src={data?.promo?.image?.url || "/images/hero-3.png"} 
              alt="Promo Car"
              fill
              className="hidden md:block object-cover object-center"
            />
            {/* Gradient Overlay for Text Readability */}
            {/* <div className="absolute inset-0 bg-black/70 md:bg-gradient-to-r md:from-black/90 md:via-black/60 md:to-transparent" /> */}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-start w-full lg:w-1/2 py-12 lg:py-16 px-6 md:px-12">
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
        </div>
      </div>
    </section>
  );
}
