import { CheckCircle2, Zap, Shield, Globe } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Faster Progress",
    points: [
      "AI-curated daily practice plans",
      "Progress tracking and milestones",
      "Adaptive difficulty adjustment",
      "Smart reminders and habit stacking",
    ],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    tag: "For Practitioners",
  },
  {
    icon: Globe,
    title: "Global Reach",
    points: [
      "Connect with instructors worldwide",
      "Multi-language content library",
      "Virtual retreats from Bali to Rishikesh",
      "Time-zone friendly live sessions",
    ],
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
    tag: "For Instructors",
  },
  {
    icon: Shield,
    title: "Holistic & Safe",
    points: [
      "Certified instructors only",
      "Evidence-based wellness guidance",
      "AI safety checks for pose correction",
      "Supportive community moderation",
    ],
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop",
    tag: "For Wellness",
  },
];

export default function Benefits() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-beige-light text-amber-700 dark:text-amber-400 text-sm font-medium mb-4 border border-beige/40">
            Why YogicTown?
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Benefits That Make a{" "}
            <span className="text-gradient-warm italic">Real Difference</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Designed for real people seeking real change — from beginners finding their breath to advanced practitioners deepening their mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className="group rounded-3xl bg-card border border-border overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-400 section-fade"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/90 dark:bg-card/90 text-xs font-semibold text-foreground">
                    {benefit.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{benefit.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {benefit.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
