import SeoHero from "@/components/seo/SeoHero";
import SeoMetrics from "@/components/seo/SeoMetrics";
import WhySeo from "@/components/seo/WhySeo";
import SeoProcess from "@/components/seo/SeoProcess";
import SeoServices from "@/components/seo/SeoServices";
import SeoResults from "@/components/seo/SeoResults";
import WhyIkhtiyaarSeo from "@/components/seo/WhyIkhtiyaarSeo";
import SeoFaq from "@/components/seo/SeoFaq";
import SeoCta from "@/components/seo/SeoCta";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services — Ikhtiyaar | Turn Search Traffic Into Revenue",
  description:
    "Ikhtiyaar builds SEO systems that rank your business where it matters — bringing in high-intent traffic that converts into leads, sales, and long-term growth.",
};

export default function SeoPage() {
  return (
    <main className="font-sans">
      <SeoHero />
      <SeoMetrics />
      <WhySeo />
      <SeoProcess />
      <SeoServices />
      <SeoResults />
      <WhyIkhtiyaarSeo />
      <SeoFaq />
      <SeoCta />
    </main>
  );
}