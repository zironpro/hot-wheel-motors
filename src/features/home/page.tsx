import { HeroSection } from "./sections/hero";
import { SearchSection } from "./sections/search-section";
import { BrandsSection } from "./sections/brands";
import { CategoriesSection } from "./sections/categories";
import { FeaturedCarsSection } from "./sections/featured-cars";
import { ShippingSection } from "./sections/shipping";
import { WhyUsSection } from "./sections/why-us";
import { TestimonialsSection } from "./sections/testimonials";
import { NewsletterSection } from "./sections/newsletter";

import { CarData, BrandData, ReviewData } from "@/lib/cars";

export function HomePage({ initialCars, initialBrands, initialReviews, homeData }: { initialCars: CarData[], initialBrands: BrandData[], initialReviews: ReviewData[], homeData?: any }) {
  return (
    <div className="flex flex-col w-full">
      <HeroSection data={homeData?.heroSlides} />
      <SearchSection />
      {/* <BrandsSection cars={initialCars} brands={initialBrands} /> */}
      <FeaturedCarsSection cars={initialCars} />
      <ShippingSection data={homeData?.shippingSection} />
      <CategoriesSection cars={initialCars} brands={initialBrands} />
      <WhyUsSection data={{ features: homeData?.whyUsFeatures, promo: homeData?.promoBanner }} />
      <TestimonialsSection reviews={initialReviews} />
      <NewsletterSection />
    </div>
  );
}
