import { Metadata } from "next";
import { ContactPage } from "@/features/contact/page";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

export const metadata: Metadata = {
  title: "Contact Us | Hot Wheel Motors",
  description: "Get in touch with the concierge team at Hot Wheel Motors. We're here to assist you with finding your dream car or answering any inquiries.",
};

export default async function Page() {
  const payload = await getPayload({ config: configPromise });
  const siteSettings = await payload.findGlobal({ slug: "site-settings" });

  return <ContactPage settings={siteSettings} />;
}
