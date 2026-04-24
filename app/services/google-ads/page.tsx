import GoogleAdsHero from "@/components/googleAdsPage/GoogleAdsHero";
import GoogleAdsProblem from "@/components/googleAdsPage/GoogleAdsProblem";
import GoogleAdsGrowth from "@/components/googleAdsPage/GoogleAdsGrowth";
import GoogleAdsApproach from "@/components/googleAdsPage/GoogleAdsApproach";
import GoogleAdsDeliver from "@/components/googleAdsPage/GoogleAdsDeliver";
import GoogleAdsManagement from "@/components/googleAdsPage/GoogleAdsManagement";
import GoogleAdsPerformance from "@/components/googleAdsPage/GoogleAdsPerformance";
import WhyIkhtiyaarGoogleAds from "@/components/googleAdsPage/WhyIkhtiyaarGoogleAds";
import GoogleAdsFAQ from "@/components/googleAdsPage/GoogleAdsFAQ";
import GoogleAdsCTA from "@/components/googleAdsPage/GoogleAdsCTA";

export const metadata = {
  title: "Google Ads Services — Ikhtiyaar | Turn Ad Spend Into Revenue",
  description:
    "Ikhtiyaar builds and manages Google Ads systems that don't just generate clicks — they drive qualified leads, sales, and measurable business growth.",
};

export default function GoogleAdsPage() {
  return (
    <main className="font-sans">
      <GoogleAdsHero />
      <GoogleAdsProblem />
      <GoogleAdsGrowth />
      <GoogleAdsApproach />
      <GoogleAdsDeliver />
      <GoogleAdsManagement />
      <GoogleAdsPerformance />
      <WhyIkhtiyaarGoogleAds />
      <GoogleAdsFAQ />
      <GoogleAdsCTA />
    </main>
  );
}
