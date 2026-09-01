// import TrustedCompanies from "@/components/TrustedCompanies";
import Services from "@/components/Services";
// import Testimonials from "@/components/Testimonials";
import WhyIkhtiyaar from "@/components/WhyIkhtiyaar";
import OurProcess from "@/components/OurProcess/OurProcess";
import AccordionSection from "@/components/AccordionSection";
import GrowthCTA from "@/components/GrowthCTA";
import NewHeroSection from "@/components/NewHeroSection";
import VideoTestimonial from "@/components/video_testimonial/VideoTestimonial";
import Partner from "@/components/Partner";
import MyselfvideoSection from "@/components/MySelfVideo/MyselfvideoSection";
import ProblemSection from "@/public/Problem/ProblemSection";

const page = () => {
  return (
    <main className="font-sans">
      <NewHeroSection />
      <Partner />
      <MyselfvideoSection />
      <VideoTestimonial />
      <ProblemSection />
      {/* <TrustedCompanies /> */}
      <Services />
      {/* <Testimonials /> */}
      <WhyIkhtiyaar />
      <OurProcess />
      <AccordionSection />
      <GrowthCTA />
    </main>
  );
};

export default page;
