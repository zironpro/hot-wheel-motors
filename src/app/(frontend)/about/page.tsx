import { AboutPage } from "@/features/about/page";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export default async function Page() {
  const payload = await getPayload({ config: configPromise });
  const aboutPageData = await payload.findGlobal({
    slug: "about-page",
  });

  return <AboutPage data={aboutPageData} />;
}
