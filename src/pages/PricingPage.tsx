import { useState } from "react";
import { Check, Zap, ArrowRight } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import FAQSection from "@/components/features/FAQSection";
import CTABanner from "@/components/features/CTABanner";

const plans = [
  {
    id: "free", name: "Free", monthlyPrice: 0, yearlyPrice: 0,
    description: "Start your wellness journey with no commitment",
    color: "border-border",
    features: ["10 yoga sessions/month", "Basic meditation library (50+ sessions)", "Community forum access", "Wellness assessment", "Basic progress tracking", "Mobile app access"],
    missing: ["AI coaching", "Live classes", "Instructor booking", "Retreat access", "Advanced analytics"],
    cta: "Get Started Free", ctaStyle: "border-2 border-border text-foreground hover:bg-muted", featured: false,
  },
  {
    id: "starter", name: "Starter", monthlyPrice: 12, yearlyPrice: 9,
    description: "Perfect for building a consistent practice",
    color: "border-border",
    features: ["Unlimited yoga sessions", "Full meditation library", "Community access", "AI daily wellness tips", "Progress analytics", "2 live classes/month", "Email support"],
    missing: ["Full AI coaching", "Unlimited live classes", "Instructor booking", "Retreat discounts"],
    cta: "Start Starter", ctaStyle: "border-2 border-primary text-primary hover:bg-sage-light", featured: false,
  },
  {
    id: "pro", name: "Pro", monthlyPrice: 29, yearlyPrice: 22,
    description: "The complete wellness transformation toolkit",
    color: "border-primary ring-2 ring-primary/25",
    features: ["Everything in Starter", "Full AI Wellness Coach", "Unlimited live classes", "3 instructor sessions/month", "Retreat booking access", "Personalised nutrition guidance", "Advanced analytics dashboard", "Priority support"],
    missing: [],
    cta: "Start Pro Trial", ctaStyle: "bg-sage-gradient text-white shadow-sage hover:opacity-90", featured: true,
  },
  {
    id: "elite", name: "Elite", monthlyPrice: 79, yearlyPrice: 59,
    description: "For wellness professionals and power users",
    color: "border-border",
    features: ["Everything in Pro", "Unlimited instructor sessions", "20% retreat booking discount", "Instructor toolkit & analytics", "Client management tools", "Dedicated wellness advisor", "API integration access", "White-label options"],
    missing: [],
    cta: "Start Elite", ctaStyle: "bg-warm-gradient text-white shadow-warm hover:opacity-90", featured: false,
  },
];

const comparison = [
  { feature: "Yoga Sessions", free: "10/month", starter: "Unlimited", pro: "Unlimited", elite: "Unlimited" },
  { feature: "Meditation Library", free: "50 sessions", starter: "Full library", pro: "Full library", elite: "Full library" },
  { feature: "Live Classes", free: "—", starter: "2/month", pro: "Unlimited", elite: "Unlimited" },
  { feature: "AI Wellness Coach", free: "—", starter: "Daily tips", pro: "Full access", elite: "Full access" },
  { feature: "Instructor Sessions", free: "—", starter: "—", pro: "3/month", elite: "Unlimited" },
  { feature: "Retreat Booking", free: "—", starter: "—", pro: "Standard", elite: "20% discount" },
  { feature: "Nutrition Guidance", free: "—", starter: "Basic", pro: "Personalised", elite: "Personalised" },
  { feature: "Analytics", free: "Basic", starter: "Standard", pro: "Advanced", elite: "Advanced + API" },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  useIntersectionObserver();

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6 text-center section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-5">
            <Zap className="w-3.5 h-3.5" /> Transparent Pricing
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5">
            Simple, Honest <span className="text-gradient-sage italic">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
            Every plan includes a 7-day free trial. No surprise charges. Cancel anytime.
          </p>
          <div className="inline-flex items-center gap-3 bg-white dark:bg-card border border-border rounded-2xl p-1.5">
            <button onClick={() => setYearly(false)} className={cn("px-6 py-2.5 rounded-xl text-sm font-medium transition-all", !yearly ? "bg-primary text-white shadow-sm" : "text-muted-foreground")}>Monthly</button>
            <button onClick={() => setYearly(true)} className={cn("px-6 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2", yearly ? "bg-primary text-white shadow-sm" : "text-muted-foreground")}>
              Yearly <span className="text-xs bg-warm text-white px-2 py-0.5 rounded-full">Save 25%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <div key={plan.id} className={cn("relative rounded-3xl bg-card border-2 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl section-fade", plan.color)} style={{ transitionDelay: `${i * 80}ms` }}>
                {plan.featured && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-white text-xs font-semibold shadow-sage">Most Popular</div>}
                <div className="mb-5">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="font-serif text-4xl font-bold text-foreground">${yearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                    <span className="text-sm text-muted-foreground mb-1.5">/mo</span>
                  </div>
                  {yearly && plan.monthlyPrice > 0 && <div className="text-xs text-green-600 mt-1">Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year</div>}
                </div>
                <ul className="space-y-2 flex-1 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={cn("w-full py-3 rounded-2xl text-sm font-semibold text-center transition-all hover:opacity-90 block", plan.ctaStyle)}>{plan.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl section-fade">
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-10">Compare Plans</h2>
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Feature</th>
                    {["Free", "Starter", "Pro", "Elite"].map((p) => (
                      <th key={p} className="px-6 py-4 text-center text-sm font-semibold text-foreground">{p}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                      <td className="px-6 py-3.5 text-sm text-foreground">{row.feature}</td>
                      {[row.free, row.starter, row.pro, row.elite].map((val, j) => (
                        <td key={j} className="px-6 py-3.5 text-center text-sm text-muted-foreground">
                          {val === "—" ? <span className="text-muted-foreground/40">—</span> : val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <CTABanner />
    </PageLayout>
  );
}
