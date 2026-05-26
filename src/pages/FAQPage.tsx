import { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import FAQSection from "@/components/features/FAQSection";
import CTABanner from "@/components/features/CTABanner";
import { HelpCircle } from "lucide-react";

export default function FAQPage() {

  // Smooth scroll reset on page load
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-6 shadow-sm">
              <HelpCircle className="w-4 h-4" />
              Support & FAQ
            </div>

            {/* Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
              How Can We{" "}
              <span className="text-gradient-sage italic">
                Help You?
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Find answers to the most common questions about YogicTown,
              platform features, wellness programs, and your healing journey.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="relative z-10">
        <FAQSection />
      </div>

      {/* CTA */}
      <CTABanner />
    </PageLayout>
  );
}