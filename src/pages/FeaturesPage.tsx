import { Brain, Dumbbell, Heart, Users, Calendar, Sparkles, Wind, Salad, ArrowRight, Check } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Link } from "react-router-dom";
import CTABanner from "@/components/features/CTABanner";
import { useAuth } from "@/contexts/AuthContext";

const featureDetails = [
  {
    icon: Dumbbell,
    title: "Yoga Learning Platform",
    subtitle: "From beginner to master",
    description: "A complete yoga ecosystem with beginner to advanced programs, an extensive asana library, guided sessions, challenge programmes, and daily practice plans. Earn certificates and badges as you progress.",
    highlights: ["1,200+ yoga sessions", "Asana library with 500+ poses", "Progress certification", "Beginner to advanced tracks"],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    accent: "text-primary bg-sage-light",
  },
  {
    icon: Brain,
    title: "Meditation & Mindfulness",
    subtitle: "Calm your mind, transform your life",
    description: "Guided meditation, pranayama breathing exercises, sleep meditations, stress relief sessions, mindfulness courses, and immersive sound healing journeys. Track your mindfulness streaks and mood improvements.",
    highlights: ["400+ guided meditations", "Sleep & stress programs", "Sound healing library", "Mood tracking analytics"],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    accent: "text-amber-700 dark:text-amber-400 bg-beige-light",
  },
  {
    icon: Sparkles,
    title: "AI Wellness Coach",
    subtitle: "Your 24/7 personal advisor",
    description: "Our sophisticated AI analyses your wellness profile, habits, and progress to deliver hyper-personalised yoga sequences, meditation practices, nutrition guidance, and spiritual growth recommendations.",
    highlights: ["Personalised daily plans", "Habit tracking AI", "Nutrition intelligence", "Spiritual growth mapping"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    accent: "text-warm bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: Users,
    title: "Instructor Marketplace",
    subtitle: "350+ certified professionals",
    description: "Browse instructor profiles, verify certifications, read authentic reviews, and book one-on-one coaching or group sessions. Build long-term relationships with instructors who understand your journey.",
    highlights: ["350+ certified instructors", "Verified credentials", "Direct booking system", "Group & private sessions"],
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop",
    accent: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: Calendar,
    title: "Live Classes & Virtual Studio",
    subtitle: "Experience studio quality, anywhere",
    description: "Attend interactive live yoga classes, participate in workshops, join virtual retreats, and access a growing library of recorded sessions. Real-time interaction with instructors makes every class feel personal.",
    highlights: ["Daily live classes", "Interactive workshops", "Session recordings", "Multi-timezone scheduling"],
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
    accent: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20",
  },
  {
    icon: Salad,
    title: "Nutrition & Ayurveda",
    subtitle: "Nourish body, balance mind",
    description: "Personalised meal plans based on your Ayurvedic dosha type, diet tracking, water intake monitoring, curated healthy recipes, and in-depth nutrition analytics to support your holistic wellness journey.",
    highlights: ["Dosha-based meal plans", "Ayurvedic recipes", "Diet & hydration tracking", "Nutrition analytics"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
    accent: "text-lime-600 dark:text-lime-400 bg-lime-50 dark:bg-lime-900/20",
  },
];

export default function FeaturesPage() {
  const { isAuthenticated } = useAuth();
  useIntersectionObserver();
  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-20 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6 text-center section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Complete Feature Set
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 max-w-3xl mx-auto leading-tight">
            Every Tool for Your <span className="text-gradient-sage italic">Wellness Journey</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From yoga and meditation to AI coaching, retreats, nutrition, and community — everything you need to transform mind, body, and spirit.
          </p>
        </div>
      </section>

      {/* Features */}
      {featureDetails.map((feature, i) => (
        <section key={feature.title} className={`py-20 ${i % 2 === 0 ? "bg-background" : "bg-sage-light dark:bg-sage-light/5"}`}>
          <div className="container mx-auto px-4 sm:px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:grid-flow-dense" : ""}`}>
              <div className={`section-fade ${i % 2 !== 0 ? "lg:col-start-2" : ""}`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${feature.accent} text-sm font-medium mb-5`}>
                  <feature.icon className="w-4 h-4" /> {feature.subtitle}
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">{feature.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                <ul className="space-y-2.5 mb-8">
                  {feature.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
                <Link to={isAuthenticated ? "/dashboard" : "/register"} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sage-gradient text-white font-semibold shadow-sage hover:opacity-90 hover:-translate-y-0.5 transition-all">
                  Try Free <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className={`section-fade ${i % 2 !== 0 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <img src={feature.image} alt={feature.title} className="rounded-3xl shadow-xl w-full h-80 object-cover" />
              </div>
            </div>
          </div>
        </section>
      ))}

      <CTABanner />
    </PageLayout>
  );
}
