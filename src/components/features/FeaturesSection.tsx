import { Brain, Dumbbell, Heart, Users, Calendar, Sparkles, Wind, Salad } from "lucide-react";

const features = [
  {
    icon: Dumbbell,
    title: "Yoga Learning Platform",
    description: "From beginner to advanced — explore thousands of asanas, guided sessions, and structured programs with expert-led video content.",
    color: "bg-sage-light text-primary",
  },
  {
    icon: Brain,
    title: "Meditation & Mindfulness",
    description: "Guided meditation, breathwork, sleep sessions, and sound healing — cultivate mental clarity and inner calm every day.",
    color: "bg-beige-light text-amber-700 dark:text-amber-400",
  },
  {
    icon: Sparkles,
    title: "AI Wellness Coach",
    description: "Your personal AI advisor for yoga guidance, nutrition tips, habit tracking, and personalised spiritual growth plans.",
    color: "bg-orange-50 dark:bg-orange-900/20 text-warm",
  },
  {
    icon: Users,
    title: "Instructor Marketplace",
    description: "Connect with 350+ certified yoga instructors for one-on-one coaching, group sessions, and skill-specific workshops.",
    color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  },
  {
    icon: Calendar,
    title: "Live Classes & Studio",
    description: "Attend interactive live yoga sessions, virtual workshops, and real-time webinars from anywhere in the world.",
    color: "bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
  },
  {
    icon: Heart,
    title: "Wellness Retreats",
    description: "Discover and book transformative wellness retreats, yoga festivals, and spiritual events globally.",
    color: "bg-rose-50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-400",
  },
  {
    icon: Salad,
    title: "Nutrition & Ayurveda",
    description: "Personalised meal plans, Ayurvedic recommendations, and diet tracking to support your holistic health journey.",
    color: "bg-lime-50 dark:bg-lime-900/20 text-lime-600 dark:text-lime-400",
  },
  {
    icon: Wind,
    title: "Community & Circles",
    description: "Join spiritual circles, global wellness challenges, and connect with like-minded practitioners worldwide.",
    color: "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-light dark:bg-sage-light text-primary text-sm font-medium mb-4">
            Everything You Need
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            A Complete Wellness <span className="text-gradient-sage italic">Ecosystem</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every tool, class, community, and resource you need to transform your mind, body, and spirit — beautifully unified.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer section-fade"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-200`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-[15px]">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
