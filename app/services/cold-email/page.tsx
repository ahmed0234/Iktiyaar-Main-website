import ColdEmailHero from "@/components/coldEmail/ColdEmailHero";
import ColdEmailProblem from "@/components/coldEmail/ColdEmailProblem";
import ColdEmailsSolution from "@/components/coldEmail/ColdEmailsSolution";
import ColdEmailsInclude from "@/components/coldEmail/ColdEmailsInclude";
import ColdEmailFeatures from "@/components/coldEmail/ColdEmailFeatures";
import ColdEmailApproach from "@/components/coldEmail/ColdEmailApproach";
import WhyIkhtiyaarCold from "@/components/coldEmail/WhyIkhtiyaarCold";
import ColdEmailFAQ from "@/components/coldEmail/ColdEmailFAQ";
import ColdEmailCTA from "@/components/coldEmail/ColdEmailCTA";

const ColdEmailPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <ColdEmailHero />
      <ColdEmailProblem />
      <ColdEmailsSolution />
      <ColdEmailsInclude />
      <ColdEmailFeatures />
      <ColdEmailApproach />
      <WhyIkhtiyaarCold />
      <ColdEmailFAQ />
      <ColdEmailCTA />
    </main>
  );
};

export default ColdEmailPage;
