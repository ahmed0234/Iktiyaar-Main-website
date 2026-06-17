import type { Metadata } from "next";
import DentishHero from "@/components/caseStudyDentish/DentishHero";
import MeetDentish from "@/components/caseStudyDentish/MeetDentish";
import TheChallengeSection from "@/components/caseStudyDentish/TheChallengeSection";
import TheGrowthEngine from "@/components/caseStudyDentish/TheGrowthEngine";
import DentishResults from "@/components/caseStudyDentish/DentishResults";
import DentishCTA from "@/components/caseStudyDentish/DentishCTA";

export const metadata: Metadata = {
  title:
    "Dentish Case Study How Ikhtiyaar Built a Predictable Patient Pipeline",
  description:
    "See how Ikhtiyaar helped Dentish grow qualified leads by 312%, reduce cost per acquisition by 42%, and achieve a 3.7x return on ad spend through Google Ads, Local SEO, and a conversion-optimised booking funnel.",
};

export default function DentishCaseStudyPage() {
  return (
    <main className="flex flex-col">
      <DentishHero />
      <MeetDentish />
      <TheChallengeSection />
      <TheGrowthEngine />
      <DentishResults />
      <DentishCTA />
    </main>
  );
}
