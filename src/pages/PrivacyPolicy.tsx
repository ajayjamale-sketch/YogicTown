import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Shield } from "lucide-react";

const sections = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, complete your wellness profile, book classes, communicate with instructors, or contact our support team. This includes:

• Personal identifiers: name, email address, phone number
• Wellness profile data: health goals, fitness level, meditation preferences, dietary information
• Payment information: processed securely through our payment partners (we do not store full card details)
• Usage data: classes attended, progress metrics, practice duration, app interactions
• Device information: IP address, browser type, operating system, device identifiers`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to:

• Provide, maintain, and improve our wellness platform and services
• Create and manage your account and personalised wellness profile
• Process payments and subscriptions
• Send you important service updates, class reminders, and wellness recommendations
• Match you with appropriate yoga instructors, meditation programmes, and retreats
• Generate AI-powered wellness recommendations and personalised insights
• Monitor and analyse usage patterns to improve user experience
• Ensure the safety and integrity of our platform`,
  },
  {
    title: "Data Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with:

• Yoga instructors you book sessions with (limited to necessary booking details)
• Retreat and event organisers for confirmed bookings
• Payment processors for transaction completion
• Analytics providers who help us understand platform usage (anonymised data only)
• Legal authorities when required by applicable law

All third parties are bound by strict data protection agreements.`,
  },
  {
    title: "Data Security",
    content: `We implement industry-standard security measures to protect your personal information:

• All data is encrypted in transit using TLS/SSL protocols
• Health and wellness data is encrypted at rest using AES-256
• Regular security audits and penetration testing
• Access controls limiting employee access to personal data
• Secure data centres with SOC 2 Type II certification

However, no method of transmission over the internet is 100% secure. We strive to protect your information but cannot guarantee absolute security.`,
  },
  {
    title: "Your Rights",
    content: `You have the following rights regarding your personal data:

• Access: Request a copy of the personal data we hold about you
• Correction: Request correction of inaccurate or incomplete data
• Deletion: Request deletion of your personal data (subject to legal obligations)
• Portability: Receive your data in a structured, machine-readable format
• Objection: Object to processing of your data for certain purposes
• Withdrawal: Withdraw consent for data processing at any time

To exercise these rights, contact us at privacy@yogictown.com`,
  },
  {
    title: "Cookies & Tracking",
    content: `We use cookies and similar tracking technologies to enhance your experience:

• Essential cookies: Required for platform functionality and security
• Performance cookies: Help us understand how users interact with our platform
• Personalisation cookies: Remember your preferences and settings
• Analytics cookies: Aggregate data to improve our services

You can control cookie preferences through your browser settings or our Cookie Preference Centre. Note that disabling certain cookies may affect platform functionality.`,
  },
  {
    title: "Contact Us",
    content: `For any privacy-related questions, requests, or concerns, please contact us:

Email: privacy@yogictown.com
Data Protection Officer: dpo@yogictown.com
Address: YogicTown Privacy Team, Bali, Indonesia

We aim to respond to all privacy enquiries within 72 hours. For urgent matters related to data breaches or security concerns, please mark your email as URGENT.`,
  },
];

export default function PrivacyPolicy() {
  useIntersectionObserver();
  return (
    <PageLayout>
      <section className="pt-28 pb-16 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6 section-fade">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-5">
              <Shield className="w-3.5 h-3.5" /> Legal
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground mb-3">Your privacy is fundamental to everything we do at YogicTown.</p>
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
