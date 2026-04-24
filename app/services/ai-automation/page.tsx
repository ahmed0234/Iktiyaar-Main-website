import AIAutomationHero from "@/components/aiAutomation/AIAutomationHero";
import AiAutomationProblems from "@/components/aiAutomation/AiAutomationProblems";
import AiAutomationSolution from "@/components/aiAutomation/AiAutomationSolution";
import AiAutomationFeatures from "@/components/aiAutomation/AiAutomationFeatures";
import AiAutomationIncludes from "@/components/aiAutomation/AiAutomationIncludes";
import AiAutomationApproach from "@/components/aiAutomation/AiAutomationApproach";
import WhyIkhtiyaarAiAutomation from "@/components/aiAutomation/WhyIkhtiyaarAiAutomation";
import AiAutomationFAQ from "@/components/aiAutomation/AiAutomationFAQ";
import AiAutomationCTA from "@/components/aiAutomation/AiAutomationCTA";

export const metadata = {
  title: "AI Automation Services — Ikhtiyaar | Automate, Optimize, Scale",
  description:
    "Ikhtiyaar builds powerful AI automation systems that streamline your operations, eliminate manual work, and help your business run smarter — 24/7.",
};

export default function AIAutomationPage() {
  return (
    <main className="font-sans">
      <AIAutomationHero />
      <AiAutomationProblems />
      <AiAutomationSolution />
      <AiAutomationFeatures />
      <AiAutomationIncludes />
      <AiAutomationApproach />
      <WhyIkhtiyaarAiAutomation />
      <AiAutomationFAQ />
      <AiAutomationCTA />
    </main>
  );
}
