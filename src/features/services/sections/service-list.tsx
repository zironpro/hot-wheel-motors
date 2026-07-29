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

export function ServiceListSection({ data }: ServiceListSectionProps) {
  const displayServices =
    data?.services && data.services.length > 0
      ? data.services.map((s, idx) => ({
          title: s.title,
          description: s.description,
          icon: s.icon,
          image: getMediaUrl(s.image) || DEFAULT_SERVICES[idx % DEFAULT_SERVICES.length].image,
        }))
      : DEFAULT_SERVICES.map((s) => ({
          title: s.title,
          description: s.description,
          icon: s.iconName,
          image: s.image,
        }));

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
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Dark Gradient Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10 pointer-events-none transition-opacity duration-700 ease-out group-hover:opacity-95" />

                {/* Heading & Text at Bottom of Card - Hardware Accelerated GPU Smooth Transition */}
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
