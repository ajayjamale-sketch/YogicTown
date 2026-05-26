import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Is YogicTown suitable for complete beginners?",
    a: "Absolutely! YogicTown is designed for all levels, from complete beginners to advanced practitioners. Our beginner programmes start with foundational poses and breathing techniques, progressing at your own comfortable pace. The AI coach adapts recommendations based on your current level.",
  },
  {
    q: "How does the AI Wellness Coach work?",
    a: "Our AI Wellness Coach analyses your wellness profile, practice history, goals, and progress data to generate personalised recommendations for yoga sequences, meditation practices, nutrition guidance, and lifestyle improvements. It learns from your feedback and continuously refines its suggestions.",
  },
  {
    q: "Can I book one-on-one sessions with instructors?",
    a: "Yes! Pro and Elite members can book one-on-one coaching sessions with any of our 350+ certified instructors. You can browse instructor profiles, read reviews, check availability, and book sessions directly through the platform.",
  },
  {
    q: "What types of retreats are available?",
    a: "YogicTown hosts hundreds of retreats globally — from weekend yoga immersions to week-long Ayurvedic healing retreats in India, Bali, and Costa Rica. Filter by location, duration, style, and budget to find your perfect retreat experience.",
  },
  {
    q: "How does the subscription work?",
    a: "All paid plans are billed monthly or annually (with a 25% discount). You can upgrade, downgrade, or cancel at any time. Your access continues until the end of your current billing period. We offer a 7-day free trial for all paid plans.",
  },
  {
    q: "Is my health data kept private?",
    a: "Yes, your privacy and data security are our top priorities. All personal health data is encrypted and stored securely. We never sell your data to third parties. You have full control over your data and can request deletion at any time.",
  },
  {
    q: "Can I teach on YogicTown as an instructor?",
    a: "Definitely! Instructors apply through our marketplace, submit their certifications for verification, and once approved, can create class listings, set their own rates, schedule sessions, and build a global student community.",
  },
  {
    q: "Are the live classes recorded for later viewing?",
    a: "Yes! All live classes are recorded and available in your session library within a few hours. Pro and Elite members get unlimited access to the recording archive. Starter members can access the last 30 days of recordings.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 section-fade">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked{" "}
            <span className="text-gradient-sage italic">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know to start your wellness journey with confidence.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl border border-border bg-card overflow-hidden transition-all duration-200 section-fade",
                openIndex === i && "border-primary/30 shadow-sm"
              )}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-foreground pr-4">{faq.q}</span>
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200",
                  openIndex === i ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                )}>
                  {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed animate-accordion-down">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
