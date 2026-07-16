import { ServicesPage } from "@/features/services/page";
import { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { ServicesPage as ServicesPageType } from "@/payload-types";

export const metadata: Metadata = {
  title: "Services | Hot Wheel Motors",
  description: "Explore our premium automotive services including vehicle sourcing, tailored financing, worldwide export, and extended warranty options.",
};

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
