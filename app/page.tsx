import Hero from "@/components/Hero";
import TrustedCompanies from "@/components/TrustedCompanies";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import WhyIkhtiyaar from "@/components/WhyIkhtiyaar";
import OurProcess from "@/components/OurProcess/OurProcess";
import AccordionSection from "@/components/AccordionSection";
import GrowthCTA from "@/components/GrowthCTA";

const page = () => {
  return (
    <main className="font-sans">
      <Hero />
      <TrustedCompanies />
      <Services />
      <Testimonials />
      <WhyIkhtiyaar />
      <OurProcess />
      <AccordionSection />
      <GrowthCTA />
    </main>
  );
};

export default page;
