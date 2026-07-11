import { Metadata } from "next";
import { ContactPage } from "@/features/contact/page";

export const metadata: Metadata = {
  title: "Contact Us | Hot Wheel Motors",
  description: "Get in touch with the concierge team at Hot Wheel Motors. We're here to assist you with finding your dream car or answering any inquiries.",
};

export default function Page() {
  return <ContactPage />;
}
