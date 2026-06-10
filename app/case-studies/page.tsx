import CaseStudyHero from "@/components/caseStudy/CaseStudyHero";
import CaseStudyTransformation from "@/components/caseStudy/CaseStudyTransformation";
import RoofingCaseStudy from "@/components/caseStudy/Roofingcasestudy";

const CaseStudiesPage = () => {
  return (
    <main className="font-sans">
      <CaseStudyHero />
      <RoofingCaseStudy />
      <CaseStudyTransformation />
    </main>
  );
};

export default CaseStudiesPage;
