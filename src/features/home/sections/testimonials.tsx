"use client";

import { Star } from "lucide-react";
import { ReviewData } from "@/lib/cars";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export function TestimonialsSection({ reviews }: { reviews?: ReviewData[] }) {
  const defaultTestimonials = [
    {
      name: "Ahmed Al Mansoori",
      role: "Purchased Porsche 911",
      content: "The easiest and most transparent car buying experience I've ever had. Their collection is absolutely top-tier and the after-sales support is phenomenal.",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      role: "Sold Mercedes-Benz G 63",
      content: "Got a fantastic valuation for my G-Wagon in under an hour. The entire transaction was smooth, secure, and highly professional. Highly recommended.",
      rating: 5,
    },
    {
      name: "Tariq Bin Zayed",
      role: "Purchased Ferrari F8",
      content: "Finding a pristine F8 Tributo isn't easy, but they had exactly what I was looking for. The condition was immaculate, exactly as described.",
      rating: 5,
    },
    {
      name: "Mohammed Al Habtoor",
      role: "Purchased Lamborghini Urus",
      content: "Incredible service from start to finish. The team at Hot Wheel Motors made sure everything was perfect before handing over the keys.",
      rating: 5,
    },
    {
      name: "Fatima Al Maktoum",
      role: "Sold Range Rover Sport",
      content: "A truly seamless selling process. They gave me a fair market valuation instantly and handled all the paperwork. Very satisfied.",
      rating: 5,
    }
  ];

  const displayReviews = reviews && reviews.length > 0 ? reviews : defaultTestimonials;

  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-background overflow-hidden">
      <div className="container relative">
        <div className="flex flex-col items-center justify-center mb-12 md:mb-16 text-center">
          <h2 className="text-sm sm:text-base font-light text-muted uppercase tracking-widest mb-4">
            CLIENT EXPERIENCES
          </h2>
          <p className="text-3xl md:text-5xl font-heading font-normal text-primary leading-tight max-w-2xl">
            Don't just take our word for it.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full max-w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {displayReviews.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                <div className="flex flex-col h-full p-8 md:p-10 rounded-lg bg-surface border border-primary/5 hover:border-accent/30 transition-colors group">
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: item.rating || 5 }).map((_, star) => (
                      <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-primary md:text-lg leading-relaxed mb-8 flex-1 italic">
                    "{item.content}"
                  </p>
                  <div className="flex flex-col">
                    <span className="font-heading font-light text-primary tracking-wide">{item.name}</span>
                    <span className="text-xs font-mono text-muted mt-1">{item.role}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex justify-center gap-4 mt-12">
            <CarouselPrevious className="static translate-y-0 translate-x-0 mx-2 hover:bg-accent hover:text-black border-white/10 rounded-lg" />
            <CarouselNext className="static translate-y-0 translate-x-0 mx-2 hover:bg-accent hover:text-black border-white/10 rounded-lg" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
