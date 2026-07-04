"use client";

import {
  Battery,
  Eye,
  Gauge,
  Play,
  Pause,
  Scale,
  Settings2,
  Timer,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-surface/80 backdrop-blur-md rounded-lg p-3 sm:p-6 flex flex-col items-center justify-center text-center border border-white/5 hover:border-accent/30 transition-colors shadow-xl">
      <div className="mb-2 sm:mb-4">{icon}</div>
      <h3 className="text-base sm:text-xl font-bold font-heading text-primary">{value}</h3>
      <p className="text-[10px] sm:text-xs text-muted mt-1">{label}</p>
    </div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Track scroll progress within this 200vh section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Animate the car: Start pushed down (showing roughly half), then move up offscreen
  const carY = useTransform(scrollYProgress, [0, 1], ["40%", "-120%"]);

  return (
    <section ref={containerRef} className="relative w-full lg:h-[200vh]">
      {/* Sticky container keeps the layout fixed while scrolling through the 200vh */}
      <div className="lg:sticky lg:top-0 w-full min-h-screen lg:h-screen overflow-hidden flex items-center justify-center pt-20 pb-6 sm:pt-24 sm:pb-12">
        {/* Central Car Image with Parallax */}
        <motion.div
          style={{ y: carY }}
          className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 opacity-40 lg:opacity-100"
        >
          <Image
            src="/images/hero-car-image.webp"
            alt="Electric Car Top View"
            width={800}
            height={1600}
            className="object-contain h-[70vh] sm:h-[90vh] md:h-[110vh] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            priority
          />
        </motion.div>

        {/* Text and UI Elements (Static during sticky phase) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row justify-center lg:justify-between items-center w-full h-full gap-6 lg:gap-0 lg:overflow-visible">
          {/* Left Column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/3 space-y-4 lg:space-y-6 mt-8 lg:mt-0">
            <span className="bg-surface px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary border border-white/10 shadow-sm">
              Premium Used Cars
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-heading font-extrabold leading-[1.1] tracking-tight text-primary">
              FIND YOUR
              <br />
              DREAM CAR
            </h1>
            <p className="text-muted text-sm sm:text-base lg:text-lg max-w-sm leading-relaxed">
              Explore our handpicked selection of certified pre-owned vehicles at unbeatable prices.
            </p>
            <div className="pt-2 sm:pt-4 pb-1 sm:pb-2">
              <p className="text-muted text-xs sm:text-sm">
                Prices starting from*{" "}
                <span className="text-primary font-bold text-lg sm:text-xl ml-1 sm:ml-2">
                  AED 35,000
                </span>
              </p>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4">
              <Button className="bg-accent text-background font-heading font-bold px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base rounded-lg hover:bg-accent/90 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                <Settings2 className="w-4 h-4 sm:w-5 sm:h-5" /> BROWSE INVENTORY
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-surface border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-primary shadow-lg"
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-end space-y-4 pb-8 lg:pb-0">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm">
              {/* Stats Cards */}
              <StatCard
                icon={<Gauge className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />}
                value="300+"
                label="Cars in Stock"
              />
              <StatCard
                icon={<Scale className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />}
                value="Best"
                label="Market Prices"
              />
              <StatCard
                icon={<Battery className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />}
                value="100%"
                label="Certified Pre-Owned"
              />
              <StatCard
                icon={<Timer className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />}
                value="1 Yr"
                label="Warranty Included"
              />
            </div>

            {/* Video Card */}
            <div 
              className="w-full max-w-sm h-32 sm:h-48 bg-surface rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center group cursor-pointer shadow-xl mt-2 sm:mt-4"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src="/video/video-hero.webm"
                muted
                playsInline
                onEnded={() => setIsPlaying(false)}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10 duration-300">
                {isPlaying ? (
                  <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-background" />
                ) : (
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-background ml-1" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
