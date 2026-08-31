// import TrustedCompanies from "@/components/TrustedCompanies";
import Services from "@/components/Services";
// import Testimonials from "@/components/Testimonials";
import WhyIkhtiyaar from "@/components/WhyIkhtiyaar";
import OurProcess from "@/components/OurProcess/OurProcess";
import AccordionSection from "@/components/AccordionSection";
import GrowthCTA from "@/components/GrowthCTA";
import NewHeroSection from "@/components/NewHeroSection";
import VideoTestimonial from "@/components/video_testimonial/VideoTestimonial";

const page = () => {
  return (
    <main className="font-sans">
      <NewHeroSection />
      <VideoTestimonial/>
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
