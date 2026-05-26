import heroBg from "@/assets/hero-bg.jpg";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Star, Users, BookOpen, Flame } from "lucide-react";

const stats = [
  { value: "50K+", label: "Active Practitioners", icon: Users },
  { value: "1,200+", label: "Yoga Classes", icon: BookOpen },
  { value: "350+", label: "Certified Instructors", icon: Star },
  { value: "98%", label: "Satisfaction Rate", icon: Flame },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Peaceful yoga meditation in nature"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20 dark:from-background/98 dark:via-background/80 dark:to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-24 right-12 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float hidden lg:block" />
      <div className="absolute bottom-24 right-40 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-float hidden lg:block" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage-light dark:bg-sage-light border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-sage" />
            Holistic Wellness Platform — 50,000+ Practitioners
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Find Your{" "}
            <span className="text-gradient-sage italic">Inner Peace</span>
            <br />
            Transform Your Life
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Join the world's most mindful wellness community. Access 1,200+ yoga classes, guided meditations, AI coaching, and life-changing retreats — all in one serene space.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-sage-gradient text-white font-semibold shadow-sage hover:opacity-90 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              Begin Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-background/80 backdrop-blur-sm border border-border text-foreground font-medium hover:bg-muted transition-all duration-200">
              <div className="w-8 h-8 rounded-full bg-warm-gradient flex items-center justify-center shadow-warm">
                <Play className="w-3 h-3 text-white fill-white ml-0.5" />
              </div>
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="bg-glass rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-200">
                <div className="flex justify-center mb-2">
                  <div className="w-8 h-8 rounded-lg bg-sage-light flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="font-serif text-2xl font-bold text-foreground">{value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
