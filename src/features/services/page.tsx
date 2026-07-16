import { ServicesHeroSection } from "./sections/hero";
import { ServiceListSection } from "./sections/service-list";
import type { ServicesPage as ServicesPageType } from "@/payload-types";

interface ServicesPageProps {
  data: ServicesPageType;
}

export function ServicesPage({ data }: ServicesPageProps) {
  return (
    <div className="flex flex-col w-full">
      <ServicesHeroSection data={data.hero} />
      <ServiceListSection data={data.servicesList} />
    </div>
  );
}
