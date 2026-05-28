import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Is YogicTown suitable for complete beginners?",
    answer:
      "Absolutely! YogicTown is designed for everyone, from beginners to advanced practitioners. Our guided programmes help you learn step-by-step at your own pace with personalised recommendations from the AI Wellness Coach.",
  },
  {
    question: "How does the AI Wellness Coach work?",
    answer:
      "The AI Wellness Coach analyses your goals, wellness preferences, activity history, and progress to provide personalised yoga routines, meditation guidance, breathing exercises, nutrition suggestions, and wellness insights.",
  },
  {
    question: "Can I book one-on-one sessions with instructors?",
    answer:
      "Yes. Pro and Elite members can schedule private sessions with certified yoga instructors and wellness experts directly through the platform.",
  },
  {
    question: "What types of retreats are available?",
    answer:
      "YogicTown offers wellness retreats including yoga immersions, meditation camps, Ayurvedic healing experiences, detox programmes, and mindfulness retreats across multiple global destinations.",
  },
  {
    question: "How does the subscription system work?",
    answer:
      "You can subscribe monthly or annually. All plans include flexible upgrades, downgrades, and cancellation options. Paid plans also include a free trial period.",
  },
  {
    question: "Is my health and wellness data secure?",
    answer:
      "Yes. All user data is encrypted and securely stored. YogicTown follows strict privacy standards and never shares personal wellness information with third parties.",
  },
  {
    question: "Can I join YogicTown as an instructor?",
    answer:
      "Definitely. Certified instructors can apply through the instructor portal, verify their credentials, and start offering classes, workshops, and private sessions globally.",
  },
  {
    question: "Are live classes available for replay?",
    answer:
      "Yes. Live sessions are recorded and added to the learning library for later viewing. Access depends on your membership plan.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Frequently Asked{" "}
            <span className="text-gradient-sage italic">
              Questions
            </span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Everything you need to know about YogicTown,
            memberships, wellness programmes, and your healing journey.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border bg-card transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "border-primary/30 shadow-md"
                    : "border-border"
                )}
              >

                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <h3 className="text-base sm:text-lg font-medium text-foreground">
                    {faq.question}
                  </h3>

                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 flex-shrink-0",
                      isOpen
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-16 text-center max-w-xl mx-auto p-8 rounded-3xl bg-sage-light/50 border border-primary/10">
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <a
            href="mailto:support@yogictown.com"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}