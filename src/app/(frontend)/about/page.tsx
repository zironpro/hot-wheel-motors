import { AboutPage } from "@/features/about/page";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import type { AboutPage as AboutPageType } from "@/payload-types";

export default async function Page() {
  const payload = await getPayload({ config: configPromise });
  const aboutPageData = await payload.findGlobal({
    slug: "about-page",
  });

  return <AboutPage data={aboutPageData as unknown as AboutPageType} />;
}
