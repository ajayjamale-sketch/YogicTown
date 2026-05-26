import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Nair",
    role: "Software Engineer, Bangalore",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "YogicTown completely transformed my morning routine. The AI coaching is uncanny — it feels like having a personal wellness mentor available 24/7. My stress levels have dropped by half in just two months.",
    plan: "Pro Member",
  },
  {
    name: "Marcus Chen",
    role: "Entrepreneur, Singapore",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "The instructor marketplace is gold. Found a certified Ashtanga teacher from Mysore who guides me three times a week. The live class experience is seamless — better than any studio I've tried.",
    plan: "Elite Member",
  },
  {
    name: "Sofia Alvarez",
    role: "Yoga Instructor, Barcelona",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "As an instructor, YogicTown gave me a global platform I could only dream of. I now teach students across 18 countries. The tools for scheduling, payments, and community building are exceptional.",
    plan: "Instructor Pro",
  },
  {
    name: "Aiden Walsh",
    role: "Nurse Practitioner, Dublin",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "I booked my first wellness retreat through YogicTown and it was life-changing. The retreat recommendations were perfect for my needs, and the community I found there has stayed with me.",
    plan: "Starter Member",
  },
  {
    name: "Meera Krishnan",
    role: "Nutritionist, Chennai",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "The nutrition and Ayurveda module is far more sophisticated than I expected. The meal plans align perfectly with my dosha type, and the analytics help me track progress in meaningful ways.",
    plan: "Pro Member",
  },
  {
    name: "Tom Nguyen",
    role: "Creative Director, Sydney",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "Sleep quality improved dramatically after just two weeks of the guided sleep meditation program. The sound healing sessions are extraordinary. YogicTown is the best investment I've made in my wellbeing.",
    plan: "Pro Member",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-beige-light border border-beige/40 text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
            <Star className="w-3.5 h-3.5 fill-current" />
            50,000+ Happy Practitioners
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Voices From Our{" "}
            <span className="text-gradient-warm italic">Wellness Community</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real transformations from real people — discover how YogicTown is changing lives worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="group p-6 rounded-3xl bg-card border border-border hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 section-fade"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-sage-light" />
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
                <Quote className="w-6 h-6 text-primary/30 flex-shrink-0" />
              </div>
              <div className="flex items-center gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.text}</p>
              <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-sage-light text-primary">
                {t.plan}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
