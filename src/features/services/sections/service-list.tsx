"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import type { ServicesPage } from "@/payload-types";
import { DEFAULT_SERVICES } from "../data/services-data";

interface ServiceListSectionProps {
  data?: ServicesPage["servicesList"] | null;
}

const getMediaUrl = (media: any) => {
  if (!media) return "";
  if (typeof media === "string") return media;
  return media.url || "";
};

const getServiceFallbackImage = (title?: string, index: number = 0) => {
  const t = (title || "").toLowerCase();
  if (t.includes("sourcing") || t.includes("vehicle")) return "/services-page-images/vehicle-sourcing.webp";
  if (t.includes("consignment") || t.includes("trade")) return "/services-page-images/consignment-trade-in.webp";
  if (t.includes("finance") || t.includes("planning") || t.includes("tailored") || t.includes("financing")) return "/services-page-images/finance-planning.webp";
  if (t.includes("warranty")) return "/services-page-images/extended-warranty.webp";
  if (t.includes("export") || t.includes("world")) return "/services-page-images/worldwide-export.webp";
  if (t.includes("registration") || t.includes("insurance")) return "/services-page-images/registration-insurance.webp";
  return DEFAULT_SERVICES[index % DEFAULT_SERVICES.length].image;
};

function ServiceCardImage({ src, fallbackSrc, alt }: { src: string; fallbackSrc: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover object-center"
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}

export function ServiceListSection({ data }: ServiceListSectionProps) {
  const displayServices =
    data?.services && data.services.length > 0
      ? data.services.map((s, idx) => {
          const fallback = getServiceFallbackImage(s.title, idx);
          const rawUrl = getMediaUrl(s.image);
          return {
            title: s.title,
            description: s.description,
            icon: s.icon,
            image: rawUrl || fallback,
            fallbackImage: fallback,
          };
        })
      : DEFAULT_SERVICES.map((s, idx) => {
          const fallback = getServiceFallbackImage(s.title, idx);
          return {
            title: s.title,
            description: s.description,
            icon: s.iconName,
            image: s.image,
            fallbackImage: fallback,
          };
        });

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
            {data?.heading || "What We Offer"}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl font-light whitespace-pre-line">
            {data?.subheading || "Thoughtfully designed services supporting every stage of your luxury car journey."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {displayServices.map((service, index) => {
            const Icon = (LucideIcons as any)[service.icon || ""] || LucideIcons.Check;

            return (
              <div 
                key={index}
                className="group relative flex flex-col justify-end h-[360px] md:h-[420px] rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-surface hover:border-white/35 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
              >
                {/* Full Width Card Image */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                  <ServiceCardImage
                    src={service.image}
                    fallbackSrc={service.fallbackImage}
                    alt={service.title}
                  />
                </div>

                {/* Dark Gradient Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10 pointer-events-none transition-opacity duration-700 ease-out group-hover:opacity-95" />

                {/* Heading & Text at Bottom of Card */}
                <div className="relative z-20 flex flex-col justify-end w-full p-6 md:p-8 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform">
                  <h3 className="text-xl md:text-2xl text-white font-bold mb-2 tracking-wide flex items-center gap-3 drop-shadow-md">
                    <Icon className="w-5 h-5 text-white/90 shrink-0" />
                    <span>{service.title}</span>
                  </h3>
                  
                  <p className="text-gray-200 text-sm md:text-base font-light leading-relaxed drop-shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 ease-out">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
