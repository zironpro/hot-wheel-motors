import Image from "next/image";

export function ServicesHeroSection() {
  return (
    <section className="relative w-full min-h-[60svh] pt-32 pb-16 flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/service.png"
          alt="Services Hero Background"
          fill
          className="object-cover object-center opacity-80"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* Content */}
      <div className="container relative z-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-normal text-white drop-shadow-lg mb-6">
          Premium Services
        </h1>
        <p className="text-gray-200 text-base md:text-lg max-w-2xl font-light leading-relaxed drop-shadow-md">
          Experience automotive excellence. From worldwide shipping to bespoke financing, we provide a seamless journey for your luxury car acquisition.
        </p>
      </div>
    </section>
  );
}
