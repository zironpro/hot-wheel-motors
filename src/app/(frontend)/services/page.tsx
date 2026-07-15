import { ServicesPage } from "@/features/services/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Hot Wheel Motors",
  description: "Explore our premium automotive services including vehicle sourcing, tailored financing, worldwide export, and extended warranty options.",
};

export default function Services() {
  return (
    <main className="flex flex-col flex-1">
      <ServicesPage />
    </main>
  );
}
