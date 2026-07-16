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

export function WhyChooseUsSection({ data }: WhyChooseUsSectionProps) {
  return (
    <section className="w-full py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white">
            {data.heading}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {data.cards?.map((feature, index) => (
            <div
              key={index}
              className="group relative h-[320px] overflow-hidden rounded-lg border border-white/5 bg-[#111111] shadow-2xl"
            >
              {/* Image */}
              <Image
                src={getMediaUrl(feature.image) || `/images/about-us-card${(index % 4) + 1}.png`}
                alt={feature.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority={index < 2}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl lg:text-2xl font-light text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}