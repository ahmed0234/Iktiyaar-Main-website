import { Metadata } from "next";
import CaseStudiesGallery from "@/components/caseStudies/CaseStudiesGallery";

export const metadata: Metadata = {
  title: "Client Transformations & Case Studies | Ikhtiyaar",
  description:
    "Explore the strategies, systems, and data behind our most successful partnerships. Real businesses. Real challenges. Real results.",
};

const CaseStudiesPage = () => {
  return <CaseStudiesGallery />;
};

export default CaseStudiesPage;
