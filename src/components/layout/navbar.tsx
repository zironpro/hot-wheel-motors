"use client";

import { Menu, ShoppingBag, User, Phone } from "lucide-react";
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
          <button
            type="button"
            className="lg:hidden text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href as any}
                className="text-sm font-medium text-muted hover:text-primary transition-colors whitespace-nowrap"
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
            <a href="tel:+971501234567" className="text-white font-medium hover:text-accent transition-colors whitespace-nowrap">
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
