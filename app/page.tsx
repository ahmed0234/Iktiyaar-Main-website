// import TrustedCompanies from "@/components/TrustedCompanies";
// import Services from "@/components/Services";
// import Testimonials from "@/components/Testimonials";
// import WhyIkhtiyaar from "@/components/WhyIkhtiyaar";
// import OurProcess from "@/components/OurProcess/OurProcess";
// import AccordionSection from "@/components/AccordionSection";
// import GrowthCTA from "@/components/GrowthCTA";
import NewHeroSection from "@/components/NewHeroSection";
import Partner from "@/components/Partner";
import VideoTestimonial from "@/components/video_testimonial/VideoTestimonial";
// import MyselfvideoSection from "@/components/MySelfVideo/MyselfvideoSection";
import SEOCaseStudy from "@/components/CaseyInsuranceCaseStudy/SEOCaseStudy";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Positioning from "@/components/NewPositioningSection/Positioning";
import RidgewellCaseStudy from "@/components/ridgewellCaseStudy/RidgewellCaseStudy";
import NewProblemSection from "@/components/NewProblemSection/NewProblemSection";
import Offer from "@/components/TheOffer/Offer";
import EconomicsSection from "@/components/Economics/EconomicsSection";
import NewProcessSection from "@/components/NewProcess/NewProcessSection";
// import ProblemSection from '@/public/Problem/ProblemSection';

const page = () => {
  return (
    <main className="font-sans">
      <NewHeroSection />
      <Partner />
      {/* <MyselfvideoSection /> */}
      <VideoTestimonial />
      <NewProblemSection />
      <Offer />
      <Positioning />
      <EconomicsSection />
      <NewProcessSection />
      <RidgewellCaseStudy />
      <SEOCaseStudy />
      <FAQ />
      <FinalCTA />
      <div></div>
      {/* <TrustedCompanies /> */}
      {/* <Services /> */}
      {/* <Testimonials /> */}
      {/* <WhyIkhtiyaar /> */}
      {/* <OurProcess /> */}
      {/* <AccordionSection /> */}
      {/* <GrowthCTA /> */}
    </main>
  );
};

export default page;
