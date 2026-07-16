import Image from "next/image";
import * as LucideIcons from "lucide-react";
import type { AboutPage } from "@/payload-types";

interface StorySectionProps {
  hero: AboutPage["hero"];
  features: AboutPage["features"];
  story: AboutPage["story"];
}

const getMediaUrl = (media: any) => {
  if (!media) return "";
  if (typeof media === "string") return media;
  return media.url || "";
};

export function StorySection({ hero, features, story }: StorySectionProps) {
  return (
    <section className="w-full pt-32 pb-8 md:pb-12 bg-background">
      {/* Intro Header */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white leading-tight mb-8 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: hero.heading }}
          />

          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mb-10 whitespace-pre-line">
            {hero.subheading}
          </p>
        </div>

        {/* Constrained Hero Image */}
        <div className="relative w-full max-w-5xl mx-auto h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden rounded-lg shadow-2xl">
          <picture>
            <source media="(max-width: 767px)" srcSet={getMediaUrl(hero.backgroundImageMobile) || "/images/about-us-mobile.png"} />
            <Image
              src={getMediaUrl(hero.backgroundImageDesktop) || "/images/about-us.png"}
              alt="Luxury Showroom"
              fill
              priority
              className="object-cover object-center transition-transform duration-[2000ms] hover:scale-105"
            />
          </picture>
        </div>
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          {features?.map((feature, idx) => {
            const Icon = (LucideIcons as any)[feature.icon] || LucideIcons.Check;
            return (
              <div key={idx} className="flex flex-col items-center text-center p-6 bg-surface rounded-lg border border-white/5">
                <Icon className="w-12 h-12 mb-4 text-white/80" />
                <h4 className="text-sm font-light text-white tracking-wide mb-2">{feature.title}</h4>
                <p className="text-xs text-muted-foreground font-light">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Story Content: Text & Image Grid */}
        <div className="mt-16 md:mt-24 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* About Text */}
          <div className="text-left space-y-6">
            <h3 className="text-2xl md:text-3xl font-heading font-light text-white mb-4">
              {story.heading}
            </h3>
            <p className="text-zinc-300 md:text-lg leading-relaxed font-light">
              {story.paragraph1}
            </p>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
              {story.paragraph2}
            </p>
          </div>

          {/* About Image */}
          <div className="w-full rounded-lg overflow-hidden shadow-2xl border border-zinc-800/50">
            <Image 
              src={getMediaUrl(story.image) || "/images/about.png"} 
              alt={story.heading} 
              width={1920}
              height={1080}
              className="w-full h-[300px] lg:h-[400px] object-cover object-[center_40%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}