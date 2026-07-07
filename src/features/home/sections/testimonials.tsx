import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ahmed Al Mansoori",
      role: "Purchased Porsche 911",
      content: "The easiest and most transparent car buying experience I've ever had. Their collection is absolutely top-tier and the after-sales support is phenomenal.",
    },
    {
      name: "Sarah Williams",
      role: "Sold Mercedes-Benz G 63",
      content: "Got a fantastic valuation for my G-Wagon in under an hour. The entire transaction was smooth, secure, and highly professional. Highly recommended.",
    },
    {
      name: "Tariq Bin Zayed",
      role: "Purchased Ferrari F8",
      content: "Finding a pristine F8 Tributo isn't easy, but they had exactly what I was looking for. The condition was immaculate, exactly as described.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-background">
      <div className="container">
        <div className="flex flex-col items-center justify-center mb-12 md:mb-16 text-center">
          <h2 className="text-sm sm:text-base font-light text-muted uppercase tracking-widest mb-4">
            CLIENT EXPERIENCES
          </h2>
          <p className="text-3xl md:text-5xl font-heading font-normal text-primary leading-tight max-w-2xl">
            Don't just take our word for it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col p-8 md:p-10 rounded-2xl bg-surface border border-primary/5 hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
