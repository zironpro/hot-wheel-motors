import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { WhatsappIcon } from "@/components/layout/whatsapp-button";

export function Footer({ settings }: { settings?: any }) {
  const currentYear = new Date().getFullYear();
  const phone = settings?.phoneNumber || "+971 55 578 1902";
  const cleanPhone = phone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  return (
    <footer className="bg-background border-t border-primary/10 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand & About */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <Image
                src={settings?.logo?.url || "/icons/Logo_Stacked_White_SVG.svg"}
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
              <a
                href="https://www.instagram.com/hotwheel.motors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg border border-primary/20 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61591836890658"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg border border-primary/20 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-lg border border-primary/20 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
              >
                <WhatsappIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-muted font-light text-sm mb-6">Quick Links</h3>
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
                <Link href={"/contact" as any} className="text-muted hover:text-primary transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-muted font-light text-sm mb-6">Contact Us</h3>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted text-sm leading-relaxed font-light whitespace-pre-line">
                  {settings?.address || `123 Luxury Car Showroom\nSheikh Zayed Road\nDubai, UAE`}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href={`tel:${(settings?.phoneNumber || "+971 55 578 1902").replace(/\s/g, '')}`} className="text-muted hover:text-primary transition-colors text-sm font-light">
                  {settings?.phoneNumber || "+971 55 578 1902"}
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary" />
                <a href={`mailto:${settings?.email || "sales@hotwheelmotors.com"}`} className="text-muted hover:text-primary transition-colors text-sm font-light">
                  {settings?.email || "sales@hotwheelmotors.com"}
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-muted font-light text-sm mb-6">Opening Hours</h3>
            <ul className="flex flex-col gap-4 text-sm text-muted">
              {settings?.openingHours ? (
                settings.openingHours.map((slot: any, idx: number) => (
                  <li key={idx} className="flex justify-between border-b border-primary/10 pb-2">
                    <span>{slot.days}</span>
                    <span className="text-primary">{slot.hours}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex justify-between border-b border-primary/10 pb-2">
                    <span>Monday - Friday</span>
                    <span className="text-primary">09:00 am - 05:00 pm</span>
                  </li>
                  <li className="flex justify-between border-b border-primary/10 pb-2">
                    <span>Saturday - Sunday</span>
                    <span className="text-primary">Closed</span>
                  </li>
                </>
              )}
              {settings?.openingHoursNote && (
                <li className="mt-4 text-xs italic">
                  {settings.openingHoursNote}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs text-center md:text-left">
            &copy; {currentYear} Hotwheel Motors. All rights reserved.
          </p>
          <div className="text-xs text-muted opacity-60 hover:opacity-100 transition-opacity">
            Designed & Developed by <a href="https://zironpro.ae" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ziron Pro</a>.
          </div>
        </div>
      </div>
    </footer>
  );
}
