import { useState } from "react";
import { Play, Pause, Moon, Wind, Volume2, Heart, Clock, Star, Headphones, Sun, Brain, Leaf } from "lucide-react";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All Sessions", icon: Leaf },
  { id: "sleep", label: "Sleep", icon: Moon },
  { id: "stress", label: "Stress Relief", icon: Wind },
  { id: "focus", label: "Focus", icon: Brain },
  { id: "morning", label: "Morning", icon: Sun },
  { id: "sound", label: "Sound Healing", icon: Volume2 },
];

const sessions = [
  { id: 1, title: "Deep Sleep Surrender", category: "sleep", duration: "30 min", guide: "Sofia Andrade", rating: 4.9, plays: 89200, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop", color: "from-indigo-500/30 to-purple-500/30", desc: "Melt away the day and drift into deep, restorative sleep with this guided body-scan meditation." },
  { id: 2, title: "Anxious Mind Release", category: "stress", duration: "20 min", guide: "Meera Nair", rating: 4.8, plays: 62400, img: "https://images.unsplash.com/photo-1515894203077-9cd36032142e?w=600&h=400&fit=crop", color: "from-teal-500/30 to-cyan-500/30", desc: "Calm racing thoughts and release anxiety through breath awareness and gentle visualization." },
  { id: 3, title: "Morning Clarity Ritual", category: "morning", duration: "15 min", guide: "Arjun Mehta", rating: 4.7, plays: 44100, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop", color: "from-amber-500/30 to-orange-500/30", desc: "Set clear intentions, energise your mind, and step into your day with purpose and presence." },
  { id: 4, title: "432Hz Healing Frequencies", category: "sound", duration: "45 min", guide: "Guru Ananda", rating: 4.9, plays: 38700, img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&h=400&fit=crop", color: "from-rose-500/30 to-pink-500/30", desc: "Experience the deep healing vibrations of Tibetan singing bowls and 432Hz resonance frequencies." },
  { id: 5, title: "Deep Focus Flow State", category: "focus", duration: "25 min", guide: "Priya Kavitha", rating: 4.8, plays: 51300, img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=400&fit=crop", color: "from-blue-500/30 to-sky-500/30", desc: "Enter a state of effortless concentration with binaural beat-enhanced focus meditation." },
  { id: 6, title: "4-7-8 Breathwork for Sleep", category: "sleep", duration: "10 min", guide: "Dr. Meera Pillai", rating: 4.8, plays: 77600, img: "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=600&h=400&fit=crop", color: "from-violet-500/30 to-purple-500/30", desc: "The scientifically proven 4-7-8 breathing technique to calm your nervous system before sleep." },
  { id: 7, title: "Loving Kindness (Metta)", category: "stress", duration: "20 min", guide: "Guru Ananda", rating: 4.9, plays: 29800, img: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&h=400&fit=crop", color: "from-pink-500/30 to-rose-500/30", desc: "Cultivate unconditional love and compassion for yourself and all beings through ancient Metta practice." },
  { id: 8, title: "Chakra Balancing Journey", category: "sound", duration: "40 min", guide: "Lakshmi Das", rating: 4.7, plays: 21400, img: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=400&fit=crop", color: "from-green-500/30 to-teal-500/30", desc: "Harmonise all seven chakras through sacred sound tones, visualisations, and affirmations." },
];

export default function Meditation() {
  useIntersectionObserver();
  const [activeCategory, setActiveCategory] = useState("all");
  const [playing, setPlaying] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [streak] = useState(7);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const filtered = sessions.filter(s => activeCategory === "all" || s.category === activeCategory);

  const handlePlay = (id: number) => {
    if (!isAuthenticated) { toast.info("Sign in to start your meditation journey"); navigate("/login"); return; }
    if (playing === id) { setPlaying(null); toast.info("Session paused"); }
    else { setPlaying(id); toast.success("Meditation started — find a comfortable position 🧘"); }
  };

  const toggleFav = (id: number) => {
    if (!isAuthenticated) { navigate("/login"); return; }
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-indigo-50 via-purple-50/40 to-sage-light dark:from-indigo-900/10 dark:via-purple-900/5 dark:to-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6 text-center section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-5">
            <Headphones className="w-3.5 h-3.5" /> Meditation Center
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5">
            Still the Mind.<br /><span className="text-primary">Heal the Soul.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Guided meditations, breathwork sessions, sound healing, and mindfulness practices for every moment of your day.
          </p>
          {isAuthenticated && (
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-card border border-border shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <span className="text-xl">🔥</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground">{streak}-Day Meditation Streak</div>
                <div className="text-xs text-muted-foreground">Keep going — you're doing great!</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-6 border-b border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                    activeCategory === cat.id ? "bg-primary text-white shadow-sage" : "bg-muted text-muted-foreground hover:text-foreground")}>
                  <Icon className="w-3.5 h-3.5" /> {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sessions Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Featured */}
          {activeCategory === "all" && (
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Featured Session</h2>
              <div className="relative rounded-3xl overflow-hidden h-72 group cursor-pointer" onClick={() => handlePlay(sessions[0].id)}>
                <img src={sessions[0].img} alt={sessions[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
                <div className="absolute inset-0 flex items-center">
                  <div className="px-8 md:px-12 max-w-lg">
                    <span className="text-xs text-white/70 uppercase tracking-wider font-medium mb-2 block">Most Played</span>
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">{sessions[0].title}</h3>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2">{sessions[0].desc}</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-foreground font-semibold hover:opacity-90 transition-all text-sm">
                        {playing === sessions[0].id ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4 fill-foreground" /> Start Session</>}
                      </button>
                      <span className="text-white/70 text-sm flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {sessions[0].duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
            {activeCategory === "all" ? "All Sessions" : categories.find(c => c.id === activeCategory)?.label}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((session, i) => (
              <div key={session.id} className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg transition-all duration-300 section-fade" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className={cn("relative h-40 overflow-hidden bg-gradient-to-br", session.color)}>
                  <img src={session.img} alt={session.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button onClick={() => handlePlay(session.id)}
                      className="w-14 h-14 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      {playing === session.id ? <Pause className="w-6 h-6 text-foreground" /> : <Play className="w-6 h-6 text-foreground fill-foreground ml-0.5" />}
                    </button>
                  </div>
                  <button onClick={() => toggleFav(session.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/40 flex items-center justify-center">
                    <Heart className={cn("w-4 h-4", favorites.includes(session.id) ? "text-red-500 fill-red-500" : "text-muted-foreground")} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-foreground mb-1">{session.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{session.desc}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.duration}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {session.rating}</span>
                    <span>{(session.plays / 1000).toFixed(0)}K plays</span>
                  </div>
                  <div className="mt-2 text-xs text-primary font-medium">{session.guide}</div>
                  {playing === session.id && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-1">
                        <div className="bg-primary h-1 rounded-full animate-pulse" style={{ width: "35%" }} />
                      </div>
                      <span className="text-xs text-muted-foreground">Playing</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12 section-fade">Science-Backed Benefits</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "😴", title: "Better Sleep", stat: "67% improvement", desc: "Regular meditation improves sleep quality significantly" },
              { icon: "🧠", title: "Reduced Anxiety", stat: "58% reduction", desc: "Mindfulness practice measurably reduces anxiety symptoms" },
              { icon: "❤️", title: "Heart Health", stat: "Lower BP", desc: "Meditation reduces blood pressure and cardiovascular risk" },
              { icon: "✨", title: "Focus & Clarity", stat: "43% boost", desc: "Daily practice enhances concentration and cognitive clarity" },
            ].map((b, i) => (
              <div key={b.title} className="text-center p-6 rounded-2xl bg-white dark:bg-card border border-border section-fade hover:shadow-md transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="text-4xl mb-3">{b.icon}</div>
                <div className="font-semibold text-foreground mb-1">{b.title}</div>
                <div className="text-primary font-bold text-lg mb-1">{b.stat}</div>
                <div className="text-xs text-muted-foreground">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
