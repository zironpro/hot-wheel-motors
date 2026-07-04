import { HeroSection } from "./sections/hero";
import { CategoriesSection } from "./sections/categories";
import { FeaturedCarsSection } from "./sections/featured-cars";
import { WhyUsSection } from "./sections/why-us";

export function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <CategoriesSection />
      <FeaturedCarsSection />
      <WhyUsSection />
    </div>
  );
}
