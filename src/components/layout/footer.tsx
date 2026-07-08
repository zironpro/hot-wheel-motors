import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-primary/10 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand & About */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <Image
                src="/icons/Logo_Stacked_White_SVG.svg"
                alt="Hotwheel Motors Logo"
                width={120}
                height={60}
                className="object-contain"
              />
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Dubai's premier boutique for luxury and exotic vehicles. We offer an exclusive collection with worldwide delivery and export assistance.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors">
                 <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-light uppercase tracking-widest text-sm mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href={"/cars" as any} className="text-muted hover:text-primary transition-colors text-sm">
                  Collections
                </Link>
              </li>
              <li>
                <Link href={"/about" as any} className="text-muted hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={"/services" as any} className="text-muted hover:text-primary transition-colors text-sm">
                  Export Services
                </Link>
              </li>
              <li>
                <Link href={"/sell" as any} className="text-muted hover:text-primary transition-colors text-sm">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link href={"/contact" as any} className="text-muted hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-primary font-light uppercase tracking-widest text-sm mb-6">Contact Us</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted text-sm leading-relaxed">
                  123 Luxury Car Showroom<br />
                  Sheikh Zayed Road<br />
                  Dubai, UAE
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+971501234567" className="text-muted hover:text-primary transition-colors text-sm">
                  +971 50 123 4567
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:sales@hotwheelmotors.com" className="text-muted hover:text-primary transition-colors text-sm">
                  sales@hotwheelmotors.com
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-primary font-light uppercase tracking-widest text-sm mb-6">Opening Hours</h4>
            <ul className="flex flex-col gap-4 text-sm text-muted">
              <li className="flex justify-between border-b border-primary/10 pb-2">
                <span>Monday - Saturday</span>
                <span className="text-primary">10:00 - 21:00</span>
              </li>
              <li className="flex justify-between border-b border-primary/10 pb-2">
                <span>Sunday</span>
                <span className="text-primary">12:00 - 18:00</span>
              </li>
              <li className="mt-4 text-xs italic">
                * Viewings can be arranged outside these hours by appointment.
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            &copy; {currentYear} Hotwheel Motors. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted">
            <Link href={"/privacy-policy" as any} className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href={"/terms" as any} className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
