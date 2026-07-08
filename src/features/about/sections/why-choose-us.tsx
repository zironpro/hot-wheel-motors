import Image from "next/image";

const features = [
  {
    title: "Immaculate Standards",
    description: "Every vehicle is showroom ready.",
    image: "/images/about-us-card1.png",
  },
  {
    title: "Transparent Pricing",
    description: "Clear pricing with no hidden fees.",
    image: "/images/about-us-card2.png",
  },
  {
    title: "Personal Service",
    description: "Tailored support from inquiry to delivery.",
    image: "/images/about-us-card3.png",
  },
  {
    title: "After-Sales Care",
    description: "Premium support beyond every purchase.",
    image: "/images/about-us-card4.png",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-background">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light text-white">
            Excellence in Every Detail.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative h-[320px] overflow-hidden rounded-lg border border-white/5 bg-[#111111] shadow-2xl"
            >
              {/* Image */}
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority={index < 2}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl lg:text-2xl font-light text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}