import Image from "next/image";
import type { AboutPage } from "@/payload-types";

interface WhyChooseUsSectionProps {
  data: AboutPage["whyChooseUs"];
}

const getMediaUrl = (media: any) => {
  if (!media) return "";
  if (typeof media === "string") return media;
  return media.url || "";
};

const DEFAULT_ABOUT_IMAGES = [
  "/about page images/immaculate standards.jpg",
  "/about page images/personal service.jpg",
  "/about page images/transparent pricing.jpg",
  "/about page images/AFTER SALES CARE.jpg",
];

export function WhyChooseUsSection({ data }: WhyChooseUsSectionProps) {
  return (
    <section className="w-full py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white">
            {data.heading}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {data.cards?.map((feature, index) => {
            const cardImage =
              getMediaUrl(feature.image) ||
              DEFAULT_ABOUT_IMAGES[index % DEFAULT_ABOUT_IMAGES.length];

            return (
              <div
                key={index}
                className="group relative flex flex-col justify-end h-[360px] md:h-[420px] rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-surface hover:border-white/35 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
              >
                {/* Full Width Card Image */}
                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                  <Image
                    src={cardImage}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center"
                    priority={index < 2}
                  />
                </div>

                {/* Dark Gradient Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10 pointer-events-none transition-opacity duration-700 ease-out group-hover:opacity-95" />

                {/* Heading & Text at Bottom of Card - Hardware Accelerated GPU Smooth Transition */}
                <div className="relative z-20 flex flex-col justify-end w-full p-6 md:p-8 transform translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform">
                  <h3 className="text-xl md:text-2xl text-white font-bold mb-2 tracking-wide drop-shadow-md">
                    {feature.title}
                  </h3>

                  <p className="text-gray-200 text-sm md:text-base font-light leading-relaxed drop-shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 ease-out">
                    {feature.description}
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