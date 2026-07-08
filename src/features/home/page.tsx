import { HeroSection } from "./sections/hero";
import { BrandsSection } from "./sections/brands";
import { CategoriesSection } from "./sections/categories";
import { FeaturedCarsSection } from "./sections/featured-cars";
import { ShippingSection } from "./sections/shipping";
import { WhyUsSection } from "./sections/why-us";
import { TestimonialsSection } from "./sections/testimonials";
import { NewsletterSection } from "./sections/newsletter";

export function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      {/* <BrandsSection /> */}
      <FeaturedCarsSection />
      <ShippingSection />
      <CategoriesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
