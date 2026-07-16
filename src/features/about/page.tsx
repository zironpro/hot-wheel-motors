import { StorySection } from "./sections/story";
import { WhyChooseUsSection } from "./sections/why-choose-us";
import type { AboutPage as AboutPageType } from "@/payload-types";

interface AboutPageProps {
  data: AboutPageType;
}

export function AboutPage({ data }: AboutPageProps) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <StorySection hero={data.hero} features={data.features} story={data.story} />
      <WhyChooseUsSection data={data.whyChooseUs} />
    </div>
  );
}
