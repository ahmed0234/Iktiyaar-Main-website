import MetaAdsHero from "@/components/metaAds/MetaAdsHero";
import MetaAdsProblem from "@/components/metaAds/MetaAdsProblem";
import MetaAdsGrowth from "@/components/metaAds/MetaAdsGrowth";
import MetaAdsManagement from "@/components/metaAds/MetaAdsManagement";
import MetaAdsDeliver from "@/components/metaAds/MetaAdsDeliver";
import MetaAdsApproach from "@/components/metaAds/MetaAdsApproach";
import WhyIkhtiyaarMetaAds from "@/components/metaAds/WhyIkhtiyaarMetaAds";
import MetaAdsFAQ from "@/components/metaAds/metaAdsFAQ";
import MetaAdsCTA from "@/components/metaAds/metaAdsCTA";

export const metadata = {
  title: "Meta Ads Services — Ikhtiyaar | Turn Attention Into Revenue",
  description:
    "Ikhtiyaar builds and manages high-performing Meta Ads campaigns that attract the right audience, generate demand, and turn clicks into real business growth.",
};

export default function MetaAdsPage() {
  return (
    <main className="font-sans">
      <MetaAdsHero />
      <MetaAdsProblem />
      <MetaAdsGrowth />
      <MetaAdsManagement />
      <MetaAdsDeliver />
      <MetaAdsApproach />
      <WhyIkhtiyaarMetaAds />
      <MetaAdsFAQ />
      <MetaAdsCTA />
    </main>
  );
}
