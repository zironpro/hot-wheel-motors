import { ServicesHeroSection } from "./sections/hero";
import { ServiceListSection } from "./sections/service-list";

export function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      <ServicesHeroSection />
      <ServiceListSection />
    </div>
  );
}
