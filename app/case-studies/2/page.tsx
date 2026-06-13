import BeforeTheGrowthEngine from "@/components/caseStudyLandscaping/Beforethegrowthengine";
import BuildingTheGrowthEngine from "@/components/caseStudyLandscaping/BuildingTheGrowthEngine";
import CaseStudyResults from "@/components/caseStudyLandscaping/CaseStudyResults";
import CompanyIntro from "@/components/caseStudyLandscaping/Companyintro";
import LandscapingCaseStudyHero from "@/components/caseStudyLandscaping/Hero";

const page = () => {
  return (
    <main className="font-sans">
      <LandscapingCaseStudyHero />
      <CompanyIntro />
      <BeforeTheGrowthEngine />
      <BuildingTheGrowthEngine />
      <CaseStudyResults />
    </main>
  );
};

export default page;
