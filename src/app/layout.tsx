import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const ansage = localFont({
  src: [
    { path: "../assets/fonts/Ansage-HairlineXP.otf", weight: "100", style: "normal" },
    { path: "../assets/fonts/Ansage-HairlineXPItalic.otf", weight: "100", style: "italic" },
    { path: "../assets/fonts/Ansage-ThinXP.otf", weight: "200", style: "normal" },
    { path: "../assets/fonts/Ansage-ThinXPItalic.otf", weight: "200", style: "italic" },
    { path: "../assets/fonts/Ansage-LightXP.otf", weight: "300", style: "normal" },
    { path: "../assets/fonts/Ansage-LightXPItalic.otf", weight: "300", style: "italic" },
    { path: "../assets/fonts/Ansage-RegularXP.otf", weight: "400", style: "normal" },
    { path: "../assets/fonts/Ansage-RegularXPItalic.otf", weight: "400", style: "italic" },
    { path: "../assets/fonts/Ansage-MediumXP.otf", weight: "500", style: "normal" },
    { path: "../assets/fonts/Ansage-MediumXPItalic.otf", weight: "500", style: "italic" },
    { path: "../assets/fonts/Ansage-SemiBoldXP.otf", weight: "600", style: "normal" },
    { path: "../assets/fonts/Ansage-SemiBoldXPItalic.otf", weight: "600", style: "italic" },
    { path: "../assets/fonts/Ansage-BoldXP.otf", weight: "700", style: "normal" },
    { path: "../assets/fonts/Ansage-BoldXPItalic.otf", weight: "700", style: "italic" },
    { path: "../assets/fonts/Ansage-XBoldXP.otf", weight: "800", style: "normal" },
    { path: "../assets/fonts/Ansage-XBoldXPItalic.otf", weight: "800", style: "italic" },
    { path: "../assets/fonts/Ansage-BlackXP.otf", weight: "900", style: "normal" },
    { path: "../assets/fonts/Ansage-BlackXPItalic.otf", weight: "900", style: "italic" },
  ],
  variable: "--font-ansage",
});

export const metadata: Metadata = {
  title: "Hotwheel Motors",
  description: "Hotwheel Motors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ansage.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
