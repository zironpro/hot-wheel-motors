import Image from "next/image";
import type { ServicesPage } from "@/payload-types";

interface ServicesHeroSectionProps {
  data: ServicesPage["hero"];
}

const getMediaUrl = (media: any) => {
  if (!media) return "";
  if (typeof media === "string") return media;
  return media.url || "";
};

export function ServicesHeroSection({ data }: ServicesHeroSectionProps) {
  return (
    <section className="relative w-full min-h-[60svh] pt-32 pb-16 flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={getMediaUrl(data.backgroundImage) || "/images/service.png"}
          alt="Services Hero Background"
          fill
          className="object-cover object-center opacity-80"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* Content */}
      <div className="container relative z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal text-white drop-shadow-lg mb-6">
          {data.heading}
        </h1>
        <p className="text-gray-200 text-base md:text-lg max-w-2xl font-light leading-relaxed drop-shadow-md whitespace-pre-line">
          {data.subheading}
        </p>
      </div>
    </section>
  );
}
