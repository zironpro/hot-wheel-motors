import Image from "next/image";
import { ShieldCheck, Ban, Landmark, RefreshCcw, Headset, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhyUsSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Cars",
      description: "All cars are\ninspected & verified",
      bg: "bg-[#09090b]",
    },
    {
      icon: Ban,
      title: "No Hidden Fees",
      description: "Transparent pricing\nyou can trust",
      bg: "bg-[#09090b]",
    },
    {
      icon: Landmark,
      title: "Flexible Finance",
      description: "Easy loan options\navailable",
      bg: "bg-[#09090b]",
    },
    {
      icon: RefreshCcw,
      title: "Trade-in Option",
      description: "Best value for\nyour car",
      bg: "bg-[#09090b]",
    },
    {
      icon: Headset,
      title: "After Sales Support",
      description: "We are here\nto help you",
      bg: "bg-[#09090b]",
    },
  ];

  return (
    <section className="w-full py-8 md:py-12 bg-[#09090b]">
      <div className="container mx-auto px-4 md:px-6 flex flex-col">
        {/* Top Features Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-5 w-full border border-white/5 rounded-t-xl overflow-hidden">
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`flex flex-col lg:flex-row items-center lg:items-start gap-4 p-6 lg:p-8 ${feature.bg} border-b lg:border-b-0 lg:border-r border-white/5 last:border-r-0 text-center lg:text-left`}
          >
            <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center shrink-0 lg:mt-1">
              <feature.icon className="w-6 h-6 text-white stroke-[1.5]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white text-sm md:text-base font-semibold">{feature.title}</span>
              <span className="text-muted-foreground text-xs md:text-sm whitespace-pre-line">{feature.description}</span>
            </div>
          </div>
        ))}
      </div>

        {/* Bottom Promo Hero */}
        <div className="relative w-full bg-[#1e1e1e] py-10 md:py-16 px-6 md:px-16 overflow-hidden flex flex-col lg:flex-row items-center justify-between rounded-b-xl border border-t-0 border-white/5">
        {/* Background gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-0 pointer-events-none" />

        {/* Left Content */}
        <div className="relative z-10 flex flex-col items-start max-w-xl mb-8 lg:mb-0 lg:w-1/2">
          <div className="flex items-center gap-6 mb-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Looking to sell your car?
            </h2>
          </div>
          <p className="text-muted-foreground text-base md:text-lg mb-8">
            Get the best price for your car in just few steps.
          </p>
          <Button 
            className="bg-accent hover:bg-accent/90 text-background rounded-lg px-8 py-6 text-base font-bold transition-all gap-2"
          >
            Sell Your Car Today
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Center/Right Car Image (Keeping UI intact as requested) */}
        <div className="relative z-10 w-full lg:w-1/2 h-[200px] md:h-[300px] lg:h-[350px] flex items-center justify-center lg:justify-end">
          <div className="relative w-full h-full max-w-[700px]">
            <Image
              src="/images/suv.webp" // Placeholder for the Tesla image
              alt="Promo Car"
              fill
              className="object-contain lg:object-right scale-110 md:scale-125 lg:translate-x-12"
            />
          </div>
        </div>


        </div>
      </div>
    </section>
  );
}
