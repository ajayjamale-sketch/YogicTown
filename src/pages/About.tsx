import { Leaf, Target, Users, Globe, Heart, Star } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Link } from "react-router-dom";
import CTABanner from "@/components/features/CTABanner";

const team = [
  { name: "Anika Sharma", role: "Co-Founder & CEO", specialty: "Ashtanga Yoga", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { name: "Rohan Mehta", role: "Co-Founder & CTO", specialty: "Meditation Science", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Sofia Alvarez", role: "Head of Wellness", specialty: "Holistic Health", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" },
  { name: "James Okonkwo", role: "Lead Instructor", specialty: "Vinyasa & Yin", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
  { name: "Mei Lin", role: "Nutrition Lead", specialty: "Ayurvedic Nutrition", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { name: "Lars Eriksen", role: "Community Lead", specialty: "Mindfulness", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
];

const values = [
  { icon: Heart, title: "Authentic Wellness", desc: "We believe wellness should be genuine, accessible, and rooted in ancient wisdom combined with modern science." },
  { icon: Globe, title: "Global Community", desc: "Connecting practitioners across continents, cultures, and traditions through the universal language of wellness." },
  { icon: Target, title: "Personalised Growth", desc: "Every journey is unique. We tailor every experience to match your specific goals, pace, and lifestyle." },
  { icon: Star, title: "Quality First", desc: "Only certified, vetted instructors. Evidence-based programmes. Curated content that genuinely transforms." },
];

export default function About() {
  useIntersectionObserver();
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-28 pb-20 bg-sage-light dark:bg-sage-light/5 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl section-fade">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-5">
              <Leaf className="w-3.5 h-3.5" /> Our Story
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Born from a passion for{" "}
              <span className="text-gradient-sage italic">mindful living</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              YogicTown began in 2022 when co-founders Anika and Rohan noticed a gap in the wellness space — a platform that blended authentic yoga tradition with modern technology, community depth, and genuine personalisation.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we serve over 50,000 practitioners in 80+ countries, connecting them with 350+ certified instructors, thousands of classes, and a community that truly cares about transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="section-fade">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-beige-light text-amber-700 dark:text-amber-400 text-sm font-medium mb-5 border border-beige/40">
                Our Mission
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-5">
                Making holistic wellness <span className="text-gradient-warm italic">accessible to everyone</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                We believe everyone deserves access to expert wellness guidance, regardless of location, background, or budget. Our technology-first approach removes the barriers that have traditionally kept holistic health exclusive.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From a student in Mumbai to a professional in London, from a retiree in São Paulo to a teacher in Tokyo — YogicTown is their home for growth, community, and transformation.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[{ n: "50K+", l: "Practitioners" }, { n: "80+", l: "Countries" }, { n: "350+", l: "Instructors" }].map(({ n, l }) => (
                  <div key={l} className="text-center p-4 rounded-2xl bg-sage-light dark:bg-sage-light/10">
                    <div className="font-serif text-2xl font-bold text-foreground">{n}</div>
                    <div className="text-xs text-muted-foreground mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative section-fade">
              <img src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=500&fit=crop" alt="Yoga community" className="rounded-3xl w-full shadow-xl" />
              <div className="absolute -bottom-5 -left-5 w-36 h-36 rounded-2xl overflow-hidden border-4 border-card shadow-lg hidden lg:block">
                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&h=200&fit=crop" alt="Meditation" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 section-fade">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">What We Stand For</h2>
            <p className="text-muted-foreground">The principles that guide every decision we make and every feature we build.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div key={v.title} className="p-6 bg-white dark:bg-card border border-border rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 section-fade" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 section-fade">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">Meet the Team</h2>
            <p className="text-muted-foreground">Passionate wellness professionals dedicated to your transformation.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div key={member.name} className="group text-center p-6 rounded-3xl bg-card border border-border hover:shadow-lg hover:border-primary/20 transition-all duration-300 section-fade" style={{ transitionDelay: `${i * 80}ms` }}>
                <img src={member.img} alt={member.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 group-hover:scale-105 transition-transform duration-300" />
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary mt-0.5">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-1">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </PageLayout>
  );
}
