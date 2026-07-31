import { Metadata } from "next";
import { ContactPage } from "@/features/contact/page";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

export const metadata: Metadata = {
  title: "Contact Us | Hot Wheel Motors",
  description: "Get in touch with the concierge team at Hot Wheel Motors in Dubai. We are here to assist with luxury vehicle sourcing, financing, and worldwide export inquiries.",
  keywords: [
    "contact Hot Wheel Motors",
    "luxury car showroom contact Dubai",
    "buy luxury car Dubai contact",
  ],
  openGraph: {
    title: "Contact Us | Hot Wheel Motors",
    description: "Get in touch with the concierge team at Hot Wheel Motors in Dubai. We are here to assist with luxury vehicle sourcing, financing, and worldwide export inquiries.",
    url: "https://hotwheelmotors.com/contact",
    siteName: "Hot Wheel Motors",
  },
};

export const dynamic = 'force-dynamic';

export default async function Page() {
  const payload = await getPayload({ config: configPromise });
  const siteSettings = await payload.findGlobal({ slug: "site-settings" });

  return <ContactPage settings={siteSettings} />;
}
