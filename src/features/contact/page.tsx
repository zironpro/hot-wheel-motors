import { ContactFormSection } from "./sections/contact-form";
import { ContactMapSection } from "./sections/contact-map";

export function ContactPage({ settings }: { settings?: any }) {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)]">
      <ContactFormSection settings={settings} />
      <ContactMapSection />
    </div>
  );
}
