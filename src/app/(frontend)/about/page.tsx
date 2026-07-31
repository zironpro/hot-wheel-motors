import type { Metadata } from "next";
import { AboutPage } from "@/features/about/page";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { AboutPage as AboutPageType } from "@/payload-types";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Luxury Car Destination Dubai - About | Hot Wheel Motors",
  description: "Hot Wheel Motors is a Dubai-based luxury automotive boutique sourcing, selling & exporting world-class pre-owned vehicles globally.",
  keywords: [
    "luxury car dealership Dubai",
    "pre-owned car dealer Dubai",
    "luxury car showroom Dubai",
  ],
  openGraph: {
    title: "Luxury Car Destination Dubai - About | Hot Wheel Motors",
    description: "Hot Wheel Motors is a Dubai-based luxury automotive boutique sourcing, selling & exporting world-class pre-owned vehicles globally.",
    url: "https://hotwheelmotors.com/about",
    siteName: "Hot Wheel Motors",
  },
};

export default async function Page() {
  const payload = await getPayload({ config: configPromise });
  const aboutPageData = await payload.findGlobal({
    slug: "about-page",
  });

  return <AboutPage data={aboutPageData as unknown as AboutPageType} />;
}
