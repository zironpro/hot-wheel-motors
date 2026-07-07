import { Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ShippingSection() {
  return (
    <section className="w-full pb-8 md:pb-12 lg:pb-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <Link href={"/services" as any} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 rounded-2xl border border-primary/5 bg-surface group hover:border-primary/20 transition-colors gap-6 md:gap-0">
          <div className="flex items-center gap-6">
            <Globe className="w-10 h-10 md:w-12 md:h-12 text-muted stroke-[1]" />
            <div className="flex flex-col">
              <h3 className="text-sm md:text-base font-semibold text-primary uppercase tracking-widest mb-1">
                WORLDWIDE SHIPPING & EXPORT ASSISTANCE
              </h3>
              <p className="text-xs md:text-sm text-muted">
                Seamless international delivery from Dubai to your doorstep.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <span className="text-xs font-semibold tracking-widest text-muted uppercase group-hover:text-primary transition-colors">
              LEARN MORE
            </span>
            <div className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center group-hover:border-primary transition-colors text-muted group-hover:text-primary">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
