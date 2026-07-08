import Image from "next/image";

export function WhyChooseUsSection() {
  return (
    <section className="w-full py-12 md:py-20 bg-[#111111]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col mb-12 md:mb-16">
          <h2 className="text-xs sm:text-sm font-light text-muted uppercase tracking-widest mb-6">
            WHY CHOOSE US
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium text-white leading-tight">
            Excellence in Every Detail.
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Grid Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium text-white tracking-wide">Transparent Pricing</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">No hidden fees. What you see is what you pay.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium text-white tracking-wide">Premium Condition</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Every car is carefully inspected and meticulously prepared.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium text-white tracking-wide">Personalised Service</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Dedicated support throughout your journey.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-medium text-white tracking-wide">After-Sales Support</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">We're here even after you drive away.</p>
            </div>
          </div>

          {/* Right Side Image (Car Profile) */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
            {/* The image is a car peeking from the side */}
            <Image 
              src="/images/car.png" 
              alt="Luxury Car Detail" 
              fill
              className="object-contain object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
