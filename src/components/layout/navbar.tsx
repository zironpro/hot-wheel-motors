"use client";

import { Menu, ShoppingBag, User, Phone } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/cars" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled ? "bg-background/90 backdrop-blur-md border-b border-white/5 shadow-lg py-0" : "bg-transparent border-b border-transparent py-2 md:py-4"}`}>
      <div className="container h-16 md:h-20 flex items-center justify-between">
        {/* Left - Mobile Menu & Desktop Links */}
        <div className="flex items-center gap-6 flex-1">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="bottom"
              className="h-auto max-h-[85vh] p-0 bg-background/95 backdrop-blur-3xl border-t border-white/10 flex flex-col rounded-t-3xl shadow-2xl"
            >
              <SheetHeader>
                <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              </SheetHeader>

              {/* Drag Handle Area */}
              <div className="w-full flex justify-center py-2.5 absolute top-0 left-0 z-10">
                <div className="h-1 w-8 rounded-full bg-white/20" />
              </div>

              <div className="flex-1 overflow-y-auto w-full pt-8 pb-5 px-5 flex flex-col h-full">
                {/* Logo Header */}
                <div className="flex justify-center pb-4 border-b border-white/10">
                  <Image
                    src="/icons/Logo_Stacked_White_SVG.svg"
                    alt="Hotwheel Motors"
                    width={80}
                    height={40}
                    className="opacity-90"
                  />
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col py-4 gap-2 flex-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href as any}
                      className="group flex items-center justify-between py-2 text-lg font-light tracking-wide text-white/70 hover:text-white transition-all duration-300"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent text-xs">
                        →
                      </span>
                    </Link>
                  ))}
                </nav>

                {/* Bottom Actions */}
                <div className="mt-auto space-y-3 pt-4 border-t border-white/10">
                  <Button className="w-full h-10 text-sm rounded-lg font-medium text-black bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    Enquire Now
                  </Button>

                  <div className="flex flex-col items-center justify-center gap-2 text-white/60 text-sm">
                    <a
                      href="tel:+971501234567"
                      className="flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <div className="bg-white/10 p-1.5 rounded-full">
                        <Phone className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-sm tracking-wider font-light">+971 50 123 4567</span>
                    </a>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href as any}
                className="text-sm font-normal text-muted hover:text-primary transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Center - Logo */}
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <Image
              src="/icons/Logo_Stacked_White_SVG.svg"
              alt="Logo"
              width={75}
              height={38}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center justify-end gap-6 flex-1">
          <div className="hidden xl:flex items-center gap-2 mr-2">
            <div className="bg-white/10 p-2 rounded-full shrink-0">
              <Phone className="w-4 h-4 text-accent" />
            </div>
            <a href="tel:+971501234567" className="text-white font-normal hover:text-accent transition-colors whitespace-nowrap">
              +971 50 123 4567
            </a>
          </div>
          <Button className="hidden sm:flex px-6 h-10 rounded-lg">
            Enquire Now
          </Button>
        </div>
      </div>
    </nav>
  );
}
