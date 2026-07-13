import { HeroSection } from "./sections/hero";
import { SearchSection } from "./sections/search-section";
import { BrandsSection } from "./sections/brands";
import { CategoriesSection } from "./sections/categories";
import { FeaturedCarsSection } from "./sections/featured-cars";
import { ShippingSection } from "./sections/shipping";
import { WhyUsSection } from "./sections/why-us";
import { TestimonialsSection } from "./sections/testimonials";
import { NewsletterSection } from "./sections/newsletter";

import { CarData } from "@/lib/cars";

export function HomePage({ initialCars }: { initialCars: CarData[] }) {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <SearchSection />
      {/* <BrandsSection cars={initialCars} /> */}
      <FeaturedCarsSection cars={initialCars} />
      <ShippingSection />
      <CategoriesSection cars={initialCars} />
      <WhyUsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
