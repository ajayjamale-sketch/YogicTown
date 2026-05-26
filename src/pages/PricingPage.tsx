import { useState, useEffect } from "react";
import { Check, Zap, ArrowRight, X, CreditCard, Lock, Loader2 } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import FAQSection from "@/components/features/FAQSection";
import CTABanner from "@/components/features/CTABanner";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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
  const { isAuthenticated, user, updateProfile } = useAuth();
  const navigate = useNavigate();
  useIntersectionObserver();

  // Payment modal state
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync Cardholder Name with user name
  useEffect(() => {
    if (selectedPlan && user) {
      setCardName(user.name || "");
    }
  }, [selectedPlan, user]);

  const handleCtaClick = (plan: any) => {
    if (user?.plan === plan.id) {
      return; // Already subscribed
    }

    if (!isAuthenticated) {
      toast.info("Please create an account or sign in to subscribe to " + plan.name + "!");
      navigate("/register");
      return;
    }

    // If free plan, upgrade directly without payment modal
    if (plan.id === "free") {
      setIsProcessing(true);
      const loadingToast = toast.loading("Processing tier downgrade...");
      setTimeout(() => {
        updateProfile({ plan: "free" });
        toast.dismiss(loadingToast);
        toast.success("Welcome back to the Free tier!");
        setIsProcessing(false);
      }, 800);
      return;
    }

    setSelectedPlan(plan);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvc(value);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || cardNumber.replace(/\s/g, "").length !== 16) {
      toast.error("Please enter a valid 16-digit card number.");
      return;
    }
    if (!expiry || expiry.length !== 5) {
      toast.error("Please enter a valid expiry date (MM/YY).");
      return;
    }
    if (!cvc || cvc.length < 3) {
      toast.error("Please enter a valid 3-digit CVC/CVV.");
      return;
    }
    if (!cardName.trim()) {
      toast.error("Please enter the cardholder's name.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      updateProfile({ plan: selectedPlan.id });
      toast.success(`Success! You have upgraded to the ${selectedPlan.name} plan.`);
      setIsProcessing(false);
      setSelectedPlan(null);
      // Reset fields
      setCardNumber("");
      setExpiry("");
      setCvc("");
      setCardName("");
    }, 1500);
  };

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
                <button
                  onClick={() => handleCtaClick(plan)}
                  className={cn(
                    "w-full py-3 rounded-2xl text-sm font-semibold text-center transition-all hover:opacity-90 block cursor-pointer",
                    user?.plan === plan.id
                      ? "bg-muted text-muted-foreground border border-border cursor-default hover:opacity-100"
                      : plan.ctaStyle
                  )}
                  disabled={user?.plan === plan.id}
                >
                  {user?.plan === plan.id ? "Current Plan" : plan.cta}
                </button>
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

      {/* Checkout Payment Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative animate-scale-up">
            <button
              onClick={() => {
                if (!isProcessing) setSelectedPlan(null);
              }}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors"
              disabled={isProcessing}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">Secure Checkout</span>
                <h3 className="font-serif text-2xl font-bold text-foreground mt-3">Complete Your Upgrade</h3>
                <p className="text-sm text-muted-foreground mt-1">Upgrade your wellness practice today</p>
              </div>

              {/* Plan Summary */}
              <div className="p-4 rounded-2xl bg-muted/30 border border-border mb-6 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-foreground">{selectedPlan.name} Plan</h4>
                  <p className="text-xs text-muted-foreground">7-day free trial, then billed {yearly ? "annually" : "monthly"}</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-xl font-bold text-foreground">${yearly ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice}</span>
                  <span className="text-xs text-muted-foreground">/mo</span>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">CARDHOLDER NAME</label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    disabled={isProcessing}
                    placeholder="Aria Sharma"
                    className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1.5">CARD NUMBER</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      disabled={isProcessing}
                      placeholder="4111 2222 3333 4444"
                      className="w-full rounded-xl border border-input bg-background/50 pl-11 pr-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
                    />
                    <CreditCard className="w-5 h-5 text-muted-foreground/60 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">EXPIRATION DATE</label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={handleExpiryChange}
                      disabled={isProcessing}
                      placeholder="MM/YY"
                      className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">CVC / CVV</label>
                    <input
                      type="password"
                      required
                      value={cvc}
                      onChange={handleCvcChange}
                      disabled={isProcessing}
                      placeholder="•••"
                      className="w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1.5 pt-2">
                  <Lock className="w-3.5 h-3.5 text-primary" />
                  <span>Payments are secured with 256-bit SSL encryption.</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 rounded-2xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing secure payment...</span>
                    </>
                  ) : (
                    <span>Pay & Upgrade to {selectedPlan.name}</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
