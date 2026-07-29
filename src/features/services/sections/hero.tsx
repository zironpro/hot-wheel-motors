import type { ServicesPage } from "@/payload-types";

interface ServicesHeroSectionProps {
  data: ServicesPage["hero"];
}

export function ServicesHeroSection({ data }: ServicesHeroSectionProps) {
  return (
    <section className="relative w-full min-h-[60svh] md:min-h-[70svh] pt-32 pb-20 flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-60 pointer-events-none"
        >
          <source src="/video/video.webm" type="video/webm" />
        </video>
        {/* Dark Vignette Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-background z-10 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="container relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal text-white drop-shadow-xl mb-6">
          {data.heading}
        </h1>
        <p className="text-gray-200 text-base md:text-lg max-w-2xl font-light leading-relaxed drop-shadow-md whitespace-pre-line">
          {data.subheading}
        </p>
      </div>
    </section>
  );
}
