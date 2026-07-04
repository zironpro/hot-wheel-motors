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
    <div className="bg-surface/80 backdrop-blur-md rounded-lg p-6 flex flex-col items-center justify-center text-center border border-white/5 hover:border-accent/30 transition-colors shadow-xl">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold font-heading text-primary">{value}</h3>
      <p className="text-xs text-muted mt-1">{label}</p>
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
    <section ref={containerRef} className="relative w-full h-[200vh]">
      {/* Sticky container keeps the layout fixed while scrolling through the 200vh */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pt-24 pb-12">
        {/* Central Car Image with Parallax */}
        <motion.div
          style={{ y: carY }}
          className="absolute inset-0 flex justify-center items-center pointer-events-none z-0"
        >
          <Image
            src="/images/hero-car-image.webp"
            alt="Electric Car Top View"
            width={800}
            height={1600}
            className="object-contain h-[90vh] md:h-[110vh] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            priority
          />
        </motion.div>

        {/* Text and UI Elements (Static during sticky phase) */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row justify-between items-center w-full h-full gap-16 lg:gap-0">
          {/* Left Column */}
          <div className="flex flex-col items-start w-full lg:w-1/3 space-y-6">
            <span className="bg-surface px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-primary border border-white/10 shadow-sm">
              Premium Used Cars
            </span>
            <h1 className="text-6xl lg:text-7xl xl:text-[5.5rem] font-heading font-extrabold leading-[1.1] tracking-tight text-primary">
              FIND YOUR
              <br />
              DREAM CAR
            </h1>
            <p className="text-muted text-base lg:text-lg max-w-sm leading-relaxed">
              Explore our handpicked selection of certified pre-owned vehicles at unbeatable prices.
            </p>
            <div className="pt-4 pb-2">
              <p className="text-muted text-sm">
                Prices starting from*{" "}
                <span className="text-primary font-bold text-xl ml-2">
                  AED 35,000
                </span>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button className="bg-accent text-background font-heading font-bold px-8 h-14 rounded-lg hover:bg-accent/90 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                <Settings2 className="w-5 h-5" /> BROWSE INVENTORY
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-lg bg-surface border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-primary shadow-lg"
              >
                <Eye className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3 flex flex-col items-end space-y-4">
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {/* Stats Cards */}
              <StatCard
                icon={<Gauge className="w-8 h-8 text-blue-400" />}
                value="300+"
                label="Cars in Stock"
              />
              <StatCard
                icon={<Scale className="w-8 h-8 text-purple-400" />}
                value="Best"
                label="Market Prices"
              />
              <StatCard
                icon={<Battery className="w-8 h-8 text-green-400" />}
                value="100%"
                label="Certified Pre-Owned"
              />
              <StatCard
                icon={<Timer className="w-8 h-8 text-accent" />}
                value="1 Yr"
                label="Warranty Included"
              />
            </div>

            {/* Video Card */}
            <div 
              className="w-full max-w-sm h-48 bg-surface rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center group cursor-pointer shadow-xl mt-4"
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
              <div className="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10 duration-300">
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-background" />
                ) : (
                  <Play className="w-6 h-6 text-background ml-1" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
