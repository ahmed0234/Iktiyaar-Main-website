// import TrustedCompanies from "@/components/TrustedCompanies";
// import Services from "@/components/Services";
// import Testimonials from "@/components/Testimonials";
// import WhyIkhtiyaar from "@/components/WhyIkhtiyaar";
// import OurProcess from "@/components/OurProcess/OurProcess";
// import AccordionSection from "@/components/AccordionSection";
// import GrowthCTA from "@/components/GrowthCTA";
import dynamic from "next/dynamic";
import NewHeroSection from "@/components/NewHeroSection";
import Partner from "@/components/Partner";

// Dynamic imports for below-the-fold sections to minimize initial JavaScript bundle
const VideoTestimonial = dynamic(
  () => import("@/components/video_testimonial/VideoTestimonial")
);
const NewProblemSection = dynamic(
  () => import("@/components/NewProblemSection/NewProblemSection")
);
const Offer = dynamic(
  () => import("@/components/TheOffer/Offer")
);
const Positioning = dynamic(
  () => import("@/components/NewPositioningSection/Positioning")
);
const EconomicsSection = dynamic(
  () => import("@/components/Economics/EconomicsSection")
);
const NewProcessSection = dynamic(
  () => import("@/components/NewProcess/NewProcessSection")
);
const Authority = dynamic(
  () => import("@/components/Authority/Authority")
);
const RidgewellCaseStudy = dynamic(
  () => import("@/components/ridgewellCaseStudy/RidgewellCaseStudy")
);
const SEOCaseStudy = dynamic(
  () => import("@/components/CaseyInsuranceCaseStudy/SEOCaseStudy")
);
const FAQ = dynamic(
  () => import("@/components/FAQ")
);
const NewFinalCTA = dynamic(
  () => import("@/components/NewFinalCTA")
);

const page = () => {
  return (
    <main className="font-sans">
      <NewHeroSection />
      <Partner />
      <div className="content-visibility-auto">
        <VideoTestimonial />
      </div>
      <div className="content-visibility-auto">
        <NewProblemSection />
      </div>
      <div className="content-visibility-auto">
        <Offer />
      </div>
      <div className="content-visibility-auto">
        <Positioning />
      </div>
      <div className="content-visibility-auto">
        <EconomicsSection />
      </div>
      <div className="content-visibility-auto">
        <NewProcessSection />
      </div>
      <div className="content-visibility-auto">
        <Authority />
      </div>
      <div className="content-visibility-auto">
        <RidgewellCaseStudy />
      </div>
      <div className="content-visibility-auto">
        <SEOCaseStudy />
      </div>
      <div className="content-visibility-auto">
        <FAQ />
      </div>
      <div className="content-visibility-auto">
        <NewFinalCTA />
      </div>
    </main>
  );
};

export default page;
