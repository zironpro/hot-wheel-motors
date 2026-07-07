"use client";

import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-background">
      <div className="container">
        <div className="relative w-full rounded-2xl overflow-hidden bg-carbon flex flex-col lg:flex-row items-center justify-between py-10 px-6 md:px-12 border border-primary/10 shadow-2xl gap-8 lg:gap-12">
          
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
            <p className="text-2xl md:text-3xl font-heading font-normal text-white leading-tight mb-2">
              Get exclusive access to rare arrivals.
            </p>
            <p className="text-muted text-sm max-w-lg">
              Subscribe to our newsletter for curated updates and VIP offers.
            </p>
          </div>
          
          <form className="flex flex-col sm:flex-row items-center w-full lg:w-auto gap-3 shrink-0" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full sm:w-72 h-12 px-6 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              required
            />
            <Button 
              type="submit"
              className="w-full sm:w-auto h-12 px-8 uppercase rounded-lg"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
