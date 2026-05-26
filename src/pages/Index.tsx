import PageLayout from "@/components/layout/PageLayout";
import Hero from "@/components/features/Hero";
import FeaturesSection from "@/components/features/FeaturesSection";
import Workflow from "@/components/features/Workflow";
import Benefits from "@/components/features/Benefits";
import DashboardPreview from "@/components/features/DashboardPreview";
import Testimonials from "@/components/features/Testimonials";
import PricingSection from "@/components/features/PricingSection";
import FAQSection from "@/components/features/FAQSection";
import CTABanner from "@/components/features/CTABanner";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const Index = () => {
  useIntersectionObserver();

  return (
    <PageLayout>
      <Hero />
      <FeaturesSection />
      <Workflow />
      <Benefits />
      <DashboardPreview />
      <Testimonials />
      <PricingSection />
      <FAQSection />
      <CTABanner />
    </PageLayout>
  );
};

export default Index;
