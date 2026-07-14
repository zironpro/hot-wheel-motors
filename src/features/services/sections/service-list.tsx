import { 
  CarFront, 
  Banknote, 
  Settings2, 
  Globe2, 
  ShieldCheck, 
  FileText 
} from "lucide-react";
import Image from "next/image";

export function ServiceListSection() {
  const services = [
    {
      icon: CarFront,
      title: "Vehicle Sourcing",
      description: "Tell us what you’re looking for, and we’ll source the right vehicle through our trusted network.",
      image: "/images/about-us-card1.png"
    },
    {
      icon: Banknote,
      title: "Tailored Financing",
      description: "Flexible financing options designed to make your luxury car purchase simple and convenient.",
      image: "/images/about-us-card2.png"
    },
    {
      icon: Globe2,
      title: "Worldwide Export",
      description: "We manage the paperwork, logistics and secure delivery of your vehicle worldwide.",
      image: "/images/about-us-card3.png"
    },
    {
      icon: ShieldCheck,
      title: "Extended Warranty",
      description: "Choose extended warranty coverage designed for added confidence and peace of mind.",
      image: "/images/about-us-card4.png"
    },
    {
      icon: Settings2,
      title: "Consignment & Trade-In",
      description: "Receive a fair valuation and enjoy a smooth, hassle-free selling or trade-in process.",
      image: "/images/about-us-card1.png"
    },
    {
      icon: FileText,
      title: "Registration & Insurance",
      description: "We assist with vehicle registration, documentation and suitable insurance options.",
      image: "/images/about-us-card2.png"
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-heading font-normal text-white mb-6">
            What We Offer
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl font-light">
            Thoughtfully designed services supporting every stage of your luxury car journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 w-full">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative flex flex-col items-start h-[340px] md:h-[380px] rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-surface cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover object-center transition-transform duration-[1500ms] ease-out group-hover:scale-110 opacity-60 group-hover:opacity-100"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-95" />

              {/* Content */}
              <div className="relative z-20 flex flex-col justify-end w-full h-full p-6 md:p-8 transition-transform duration-500 ease-out">
                <h3 className="text-xl md:text-2xl text-white font-normal mb-3 tracking-wide">
                  {service.title}
                </h3>
                
                <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed opacity-100 transition-opacity duration-500">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
