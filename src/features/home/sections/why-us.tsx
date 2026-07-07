import Image from "next/image";
import { ShieldCheck, Ban, Landmark, RefreshCcw, Headset, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhyUsSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Cars",
      description: "All cars are\ninspected & verified",
    },
    {
      icon: Ban,
      title: "No Hidden Fees",
      description: "Transparent pricing\nyou can trust",
    },
    {
      icon: Landmark,
      title: "Flexible Finance",
      description: "Easy loan options\navailable",
    },
    {
      icon: RefreshCcw,
      title: "Trade-in Option",
      description: "Best value for\nyour car",
    },
    {
      icon: Headset,
      title: "Sales Support",
      description: "We are here\nto help you",
    },
  ];

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col">
        {/* Top Features Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-5 w-full border border-primary/5 rounded-t-2xl overflow-hidden bg-surface">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="flex flex-col lg:flex-row items-center lg:items-start gap-4 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-primary/5 last:border-r-0 text-center lg:text-left group hover:bg-surface/80 transition-colors"
          >
            <div className="w-12 h-12 rounded-full border border-accent/30 flex items-center justify-center shrink-0 lg:mt-1 group-hover:border-accent transition-colors">
              <feature.icon className="w-5 h-5 text-accent stroke-[1.5]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-primary text-sm md:text-base font-semibold">{feature.title}</span>
              <span className="text-muted text-xs md:text-sm whitespace-pre-line">{feature.description}</span>
            </div>
          </div>
        ))}
      </div>

        {/* Bottom Promo Hero */}
        <div className="relative w-full bg-carbon py-12 md:py-20 px-6 md:px-16 overflow-hidden flex flex-col lg:flex-row items-center justify-between rounded-b-2xl border border-t-0 border-primary/5">
        {/* Left Content */}
        <div className="relative z-10 flex flex-col items-start max-w-xl mb-8 lg:mb-0 lg:w-1/2">
          <div className="flex items-center gap-6 mb-4">
            <h2 className="text-3xl md:text-5xl font-heading font-normal text-white leading-tight">
              Looking to sell your car?
            </h2>
          </div>
          <p className="text-muted text-base md:text-lg mb-8 max-w-md">
            Get the best price for your car in just a few simple steps.
          </p>
          <Button 
            className="rounded-lg px-8 h-12 md:h-14 text-sm md:text-base uppercase group"
          >
            Sell Your Car Today
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Center/Right Car Image */}
        <div className="relative z-10 w-full lg:w-1/2 h-[200px] md:h-[300px] lg:h-[350px] flex items-center justify-center lg:justify-end">
          <div className="relative w-full h-full max-w-[700px]">
            <Image
              src="/images/suv.webp" 
              alt="Promo Car"
              fill
              className="object-contain lg:object-right scale-110 md:scale-125 lg:translate-x-12 drop-shadow-2xl"
            />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
