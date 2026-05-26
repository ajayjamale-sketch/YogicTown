import PageLayout from "@/components/layout/PageLayout";
import FAQSection from "@/components/features/FAQSection";
import CTABanner from "@/components/features/CTABanner";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {
  useIntersectionObserver();
  return (
    <PageLayout>
      <section className="pt-28 pb-10 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6 text-center section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-5">
            <HelpCircle className="w-3.5 h-3.5" /> Support & FAQ
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            How Can We <span className="text-gradient-sage italic">Help You?</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Find answers to the most common questions about YogicTown, our features, and your wellness journey.
          </p>
        </div>
      </section>
      <FAQSection />
      <CTABanner />
    </PageLayout>
  );
}
