import { StorySection } from "./sections/story";
import { WhyChooseUsSection } from "./sections/why-choose-us";

export function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <StorySection />
      <WhyChooseUsSection />
    </div>
  );
}
