import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const plans = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Start your wellness journey",
    color: "border-border",
    features: [
      "10 yoga sessions/month",
      "Basic meditation library",
      "Community access",
      "Wellness assessment",
      "Progress tracking",
    ],
    missing: ["AI coaching", "Live classes", "Instructor booking", "Retreat access"],
    cta: "Get Started Free",
    ctaStyle: "border border-border text-foreground hover:bg-muted",
    featured: false,
  },
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 12,
    yearlyPrice: 9,
    description: "For dedicated beginners",
    color: "border-border",
    features: [
      "Unlimited yoga sessions",
      "Full meditation library",
      "Community access",
      "AI daily tips",
      "Progress analytics",
      "2 live classes/month",
    ],
    missing: ["AI coaching", "Instructor booking", "Retreat discounts"],
    cta: "Start Starter",
    ctaStyle: "border border-primary text-primary hover:bg-sage-light",
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthlyPrice: 29,
    yearlyPrice: 22,
    description: "Most popular for serious practitioners",
    color: "border-primary ring-2 ring-primary/20",
    features: [
      "Everything in Starter",
      "AI Wellness Coach",
      "Unlimited live classes",
      "3 instructor sessions/month",
      "Retreat booking access",
      "Nutrition guidance",
      "Priority support",
    ],
    missing: [],
    cta: "Start Pro Trial",
    ctaStyle: "bg-sage-gradient text-white shadow-sage hover:opacity-90",
    featured: true,
  },
  {
    id: "elite",
    name: "Elite",
    monthlyPrice: 79,
    yearlyPrice: 59,
    description: "For wellness professionals",
    color: "border-border",
    features: [
      "Everything in Pro",
      "Unlimited instructor sessions",
      "Retreat membership discounts",
      "Instructor tools & analytics",
      "White-label options",
      "Dedicated wellness advisor",
      "API access",
    ],
    missing: [],
    cta: "Start Elite",
    ctaStyle: "bg-warm-gradient text-white shadow-warm hover:opacity-90",
    featured: false,
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-24 lg:py-32 bg-sage-light dark:bg-sage-light/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-4">
            <Zap className="w-3.5 h-3.5" />
            Simple Pricing
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Invest in Your{" "}
            <span className="text-gradient-sage italic">Wellbeing</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Flexible plans for every stage of your wellness journey. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-white dark:bg-card border border-border rounded-2xl p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={cn("px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200", !yearly ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={cn("px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2", yearly ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >
              Yearly
              <span className="text-xs bg-warm text-white px-2 py-0.5 rounded-full">Save 25%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-3xl bg-white dark:bg-card border-2 p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl section-fade",
                plan.color
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-white text-xs font-semibold shadow-sage">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="font-serif text-4xl font-bold text-foreground">
                    ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-sm text-muted-foreground mb-1.5">/mo</span>
                </div>
                {yearly && plan.monthlyPrice > 0 && (
                  <div className="text-xs text-green-600 mt-1">
                    Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                  </div>
                )}
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={isAuthenticated ? "/pricing" : "/register"}
                className={cn("w-full py-3 rounded-2xl text-sm font-semibold text-center transition-all duration-200 hover:opacity-90 block", plan.ctaStyle)}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All plans include a 7-day free trial. No credit card required for Free plan.
        </p>
      </div>
    </section>
  );
}
