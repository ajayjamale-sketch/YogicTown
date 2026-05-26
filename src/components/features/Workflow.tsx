import { UserPlus, ClipboardList, Play, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Wellness Profile",
    description: "Sign up and complete a personalised wellness assessment. Tell us your goals, experience level, and lifestyle preferences.",
    highlight: "Takes 2 minutes",
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "Get Your Custom Plan",
    description: "Our AI generates a tailored yoga + meditation programme based on your profile, available time, and wellness goals.",
    highlight: "AI-powered matching",
  },
  {
    step: "03",
    icon: Play,
    title: "Start Practicing Daily",
    description: "Follow guided sessions, attend live classes, connect with your instructor, and build consistent wellness habits.",
    highlight: "1,200+ classes",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Track & Transform",
    description: "Monitor your progress, celebrate milestones, join community challenges, and deepen your practice over time.",
    highlight: "Real-time insights",
  },
];

export default function Workflow() {
  return (
    <section className="py-24 lg:py-32 bg-sage-light dark:bg-sage-light/10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-4">
            How It Works
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your Wellness Journey,{" "}
            <span className="text-gradient-sage italic">Simplified</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Four simple steps to start your transformation and build a practice that lasts a lifetime.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="absolute top-16 left-8 right-8 h-0.5 bg-gradient-to-r from-primary/30 via-primary/60 to-primary/30 hidden lg:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div
                key={step.step}
                className="relative flex flex-col items-center text-center group section-fade"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-sage-gradient flex items-center justify-center shadow-sage mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-7 h-7 text-white" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-warm text-white text-xs font-bold flex items-center justify-center shadow-warm">
                    {i + 1}
                  </div>
                </div>
                <div className="px-2">
                  <span className="inline-block text-xs font-semibold text-primary bg-sage-light dark:bg-sage-light rounded-full px-3 py-1 mb-3">
                    {step.highlight}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14 section-fade">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-sage-gradient text-white font-semibold shadow-sage hover:opacity-90 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            Start Your Journey Today
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
