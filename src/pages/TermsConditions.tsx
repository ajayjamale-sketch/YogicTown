import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { FileText } from "lucide-react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using YogicTown ("Platform", "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use our Platform.

These Terms apply to all users of YogicTown, including wellness practitioners, yoga instructors, retreat organisers, and visitors. We reserve the right to update these Terms at any time with notice to registered users.`,
  },
  {
    title: "2. User Accounts",
    content: `To access most features of YogicTown, you must create an account. You agree to:

• Provide accurate, current, and complete information during registration
• Maintain the security of your account password and restrict access to your account
• Notify us immediately of any unauthorised use of your account
• Take responsibility for all activities that occur under your account
• Not create accounts for the purpose of violating our terms or engaging in prohibited activities

You must be at least 18 years of age to create an account. Users under 18 require parental or guardian consent.`,
  },
  {
    title: "3. Wellness Content & Medical Disclaimer",
    content: `IMPORTANT HEALTH DISCLAIMER: YogicTown provides wellness, yoga, and meditation content for educational and informational purposes only. This content is NOT a substitute for professional medical advice, diagnosis, or treatment.

Always seek the advice of your physician or qualified health provider before beginning any new exercise programme, dietary change, or wellness practice. If you experience pain, discomfort, or adverse reactions during any practice, stop immediately and consult a healthcare professional.

YogicTown, its instructors, and AI systems do not provide medical advice or diagnoses. Users engage in all wellness activities at their own risk.`,
  },
  {
    title: "4. Subscription & Payment Terms",
    content: `Paid subscriptions are billed on a monthly or annual basis as selected at checkout. All prices are in USD unless stated otherwise.

• Subscriptions auto-renew unless cancelled before the renewal date
• Annual subscriptions are non-refundable after 30 days from purchase
• Monthly subscriptions can be cancelled at any time; access continues until period end
• 7-day free trials are available for new paid subscribers only
• We reserve the right to modify pricing with 30 days' advance notice

Refund requests are handled case-by-case. Contact billing@yogictown.com within 14 days of a charge for assistance.`,
  },
  {
    title: "5. Instructor Marketplace",
    content: `Instructors on YogicTown must:

• Hold valid, current certifications from recognised yoga or wellness institutions
• Maintain accurate and up-to-date profile information
• Fulfil all booked sessions or provide 24-hour cancellation notice
• Conduct sessions professionally and within platform guidelines
• Not solicit students to book outside of the YogicTown platform

YogicTown takes a 20% platform commission on instructor earnings. Payments are processed weekly. Instructors are responsible for their own tax obligations.`,
  },
  {
    title: "6. Intellectual Property",
    content: `All content on YogicTown, including text, graphics, logos, videos, and software, is the property of YogicTown or its content suppliers and is protected by intellectual property laws.

You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission. User-generated content remains your property; by posting, you grant us a worldwide, non-exclusive licence to use, display, and distribute your content on our platform.`,
  },
  {
    title: "7. Limitation of Liability",
    content: `To the maximum extent permitted by law, YogicTown shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform.

Our total liability to you for any claims arising from these Terms shall not exceed the amount paid by you to YogicTown in the 12 months preceding the claim. We make no warranties regarding the accuracy or completeness of wellness content provided by third-party instructors.`,
  },
  {
    title: "8. Contact & Governing Law",
    content: `These Terms are governed by the laws of the Republic of Indonesia and applicable international law.

For any legal enquiries: legal@yogictown.com
Registered address: YogicTown Wellness Pte. Ltd., Bali, Indonesia

Any disputes shall be resolved through good-faith negotiation. If unresolved, disputes shall be submitted to binding arbitration in Bali, Indonesia.`,
  },
];

export default function TermsConditions() {
  useIntersectionObserver();
  return (
    <PageLayout>
      <section className="pt-28 pb-16 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6 section-fade">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-5">
              <FileText className="w-3.5 h-3.5" /> Legal
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">Terms & Conditions</h1>
            <p className="text-lg text-muted-foreground mb-3">Please read these terms carefully before using YogicTown.</p>
            <p className="text-sm text-muted-foreground">Last updated: May 1, 2025 · Effective: May 1, 2025</p>
          </div>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="space-y-10">
            {sections.map((section, i) => (
              <div key={section.title} className="section-fade" style={{ transitionDelay: `${i * 60}ms` }}>
                <h2 className="font-serif text-xl font-bold text-foreground mb-4 pb-3 border-b border-border">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-[15px]">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
