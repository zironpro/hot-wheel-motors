import { ServicesPage } from "@/features/services/page";
import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { ServicesPage as ServicesPageType } from "@/payload-types";

export const metadata: Metadata = {
  title: "Luxury Car Services in Dubai: Financing, Export & Trade-In | Hot Wheel Motors",
  description: "Bespoke automotive services in Dubai: car financing, global export, consignment, trade-in, registration & extended warranty. White-glove luxury service.",
  keywords: [
    "car financing Dubai",
    "car export Dubai",
    "car trade in Dubai",
    "luxury car services Dubai",
  ],
  openGraph: {
    title: "Luxury Car Services in Dubai: Financing, Export & Trade-In | Hot Wheel Motors",
    description: "Bespoke automotive services in Dubai: car financing, global export, consignment, trade-in, registration & extended warranty. White-glove luxury service.",
    url: "https://hotwheelmotors.com/services",
    siteName: "Hot Wheel Motors",
  },
};

export const dynamic = 'force-dynamic';

export default async function Services() {
  const payload = await getPayload({ config: configPromise });
  const servicesPageData = await payload.findGlobal({
    slug: "services-page",
  });

  return (
    <main className="flex flex-col flex-1">
      <ServicesPage data={servicesPageData as unknown as ServicesPageType} />
    </main>
  );
}
