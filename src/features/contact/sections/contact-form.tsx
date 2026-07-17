"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Whatsapp = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
);

export function ContactFormSection({ settings }: { settings?: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get("message");
    if (msg) {
      setMessage(msg);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const email = settings?.email || "sales@hotwheelmotors.com";
  const phone = settings?.phoneNumber || "+971 55 578 1902";
  const phoneLink = phone.replace(/\s/g, '');

  return (
    <section className="py-24 md:py-32 bg-background min-h-[calc(100vh-80px)] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-6xl mx-auto items-start">
          {/* Left Side Content */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:pt-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-normal text-white uppercase tracking-tight leading-tight">
              Get in Touch
            </h1>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Whether you're looking for your dream car, need maintenance advice, or have a specific inquiry, our team of experts is here to assist you.
            </p>

            {/* Stay Connected & Contact Info */}
            <div className="mt-8 pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row gap-8 lg:gap-12">
              <div className="flex flex-col gap-4">
                <span className="text-zinc-500 text-sm">Stay Connected</span>
                <div className="flex items-center gap-3">
                  <a href="#" className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href={`https://wa.me/${phoneLink.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors">
                    <Whatsapp className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-zinc-500 text-xs tracking-widest uppercase mt-0.5 w-14">EMAIL.</span>
                  <a href={`mailto:${email}`} className="text-zinc-300 text-sm hover:text-white transition-colors">{email}</a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-zinc-500 text-xs tracking-widest uppercase mt-0.5 w-14">PHONE.</span>
                  <a href={`tel:${phoneLink}`} className="text-zinc-300 text-sm hover:text-white transition-colors">{phone}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="flex flex-col gap-6">
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-6 md:p-8 backdrop-blur-sm">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-2xl font-heading text-white mb-2 font-normal">Message Sent</h3>
                <p className="text-zinc-400 mb-8 font-normal text-sm md:text-base">
                  Thank you for reaching out. A member of our concierge team will be in touch with you shortly.
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="font-normal">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-heading text-white font-normal mb-2">Send us a message</h2>
                  <p className="text-zinc-400 text-sm font-normal">Tell us about your inquiry and we'll take it from there.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="font-normal text-zinc-300">First Name</Label>
                    <Input id="firstName" required placeholder="Your first name" className="bg-zinc-950/50 font-normal" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="font-normal text-zinc-300">Last Name</Label>
                    <Input id="lastName" required placeholder="Your last name" className="bg-zinc-950/50 font-normal" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-normal text-zinc-300">Email Address</Label>
                  <Input id="email" type="email" required placeholder="your@email.com" className="bg-zinc-950/50 font-normal" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-normal text-zinc-300">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-zinc-950/50 font-normal" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-normal text-zinc-300">Message</Label>
                  <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="How can we help you?" className="bg-zinc-950/50 font-normal min-h-[100px]" />
                </div>

                <Button type="submit" className="w-full font-normal" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}
                </Button>
              </form>
            )}
          </div>
          <p className="text-zinc-500 text-sm md:ml-2">
            Prefer to hop on a call? <a href="#" className="text-white hover:text-primary transition-colors underline underline-offset-4 decoration-zinc-700 hover:decoration-primary">Book a call</a> instead.
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}
