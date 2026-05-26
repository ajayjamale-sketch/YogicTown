import { useState } from "react";
import { Play, Clock, Star, Users, Filter, Search, BookOpen, ChevronRight, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const styles = ["All Styles", "Vinyasa", "Hatha", "Yin", "Ashtanga", "Kundalini", "Restorative", "Power"];

const programs = [
  { id: 1, title: "30-Day Morning Flow Challenge", instructor: "Priya Kavitha", level: "Beginner", style: "Vinyasa", duration: "20–40 min/day", sessions: 30, rating: 4.9, students: 12480, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop", tag: "Best Seller", free: true, desc: "Build a consistent morning yoga habit with this 30-day progressive programme. Perfect for all levels." },
  { id: 2, title: "Deep Yin Flexibility Journey", instructor: "Sofia Andrade", level: "Intermediate", style: "Yin", duration: "45–60 min", sessions: 21, rating: 4.8, students: 8320, img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop", tag: "Popular", free: false, desc: "Unlock deep tissue flexibility and emotional release through this transformative 21-session Yin journey." },
  { id: 3, title: "Ashtanga Primary Series", instructor: "Arjun Mehta", level: "Advanced", style: "Ashtanga", duration: "60–90 min", sessions: 24, rating: 4.9, students: 5640, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop", tag: "Expert", free: false, desc: "Master the complete Ashtanga Primary Series with detailed alignment cues and modifications." },
  { id: 4, title: "Yoga for Stress Relief", instructor: "Meera Nair", level: "Beginner", style: "Restorative", duration: "30 min", sessions: 14, rating: 4.7, students: 19820, img: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=400&fit=crop", tag: "Trending", free: true, desc: "Release tension, calm your nervous system, and find peace with this gentle restorative programme." },
  { id: 5, title: "Power Vinyasa Strength Build", instructor: "Raj Kumar", level: "Intermediate", style: "Power", duration: "50 min", sessions: 18, rating: 4.8, students: 7210, img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop", tag: "New", free: false, desc: "Build functional strength, core stability, and body confidence through dynamic power sequences." },
  { id: 6, title: "Kundalini Awakening Series", instructor: "Guru Ananda", level: "Advanced", style: "Kundalini", duration: "60 min", sessions: 28, rating: 4.9, students: 3840, img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=400&fit=crop", tag: "Spiritual", free: false, desc: "Journey through sacred Kundalini kriyas, breathwork, and mantra for deep spiritual awakening." },
  { id: 7, title: "Beginner Hatha Foundation", instructor: "Lakshmi Das", level: "Beginner", style: "Hatha", duration: "30–45 min", sessions: 20, rating: 4.6, students: 24500, img: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=600&h=400&fit=crop", tag: "Free", free: true, desc: "Learn fundamental yoga postures, breathing techniques, and alignment principles in this foundational series." },
  { id: 8, title: "Advanced Arm Balances & Inversions", instructor: "Priya Kavitha", level: "Advanced", style: "Vinyasa", duration: "60 min", sessions: 16, rating: 4.9, students: 4120, img: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&h=400&fit=crop", tag: "Challenge", free: false, desc: "Master handstands, forearm stands, crow pose, and other advanced arm balances safely." },
];

const levelColors: Record<string, string> = {
  Beginner: "text-green-600 bg-green-50 dark:bg-green-900/20",
  Intermediate: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
  Advanced: "text-red-600 bg-red-50 dark:bg-red-900/20",
};

export default function Programs() {
  useIntersectionObserver();
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState("All");
  const [activeStyle, setActiveStyle] = useState("All Styles");
  const [enrolledIds, setEnrolledIds] = useState<number[]>([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const filtered = programs.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.instructor.toLowerCase().includes(search.toLowerCase());
    const matchLevel = activeLevel === "All" || p.level === activeLevel;
    const matchStyle = activeStyle === "All Styles" || p.style === activeStyle;
    return matchSearch && matchLevel && matchStyle;
  });

  const handleEnroll = (program: typeof programs[0]) => {
    if (!isAuthenticated) { toast.info("Please sign in to enroll"); navigate("/login"); return; }
    if (!program.free) { toast.info("Upgrade to Pro to access this program"); navigate("/pricing"); return; }
    if (enrolledIds.includes(program.id)) { toast.info("Already enrolled!"); return; }
    setEnrolledIds(prev => [...prev, program.id]);
    toast.success(`Enrolled in "${program.title}"!`);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6 section-fade">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-5">
              <BookOpen className="w-3.5 h-3.5" /> Yoga Programs Library
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Find Your Perfect Practice
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore {programs.length}+ curated yoga programmes designed by world-class instructors for every level and goal.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-background sticky top-16 lg:top-20 z-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search programs or instructors..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {levels.map(l => (
                <button key={l} onClick={() => setActiveLevel(l)}
                  className={cn("px-3 py-2 rounded-xl text-sm font-medium transition-all", activeLevel === l ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground")}>
                  {l}
                </button>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {styles.slice(0, 5).map(s => (
                <button key={s} onClick={() => setActiveStyle(s)}
                  className={cn("px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all", activeStyle === s ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground")}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} programmes found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((program, i) => (
              <div key={program.id} className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 section-fade" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={program.img} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={cn("text-xs px-2 py-1 rounded-full font-semibold", program.free ? "bg-primary text-white" : "bg-black/50 text-white")}>
                      {program.free ? "Free" : "Pro"}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/90 text-foreground font-medium">{program.tag}</span>
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/60">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", levelColors[program.level])}>{program.level}</span>
                    <span className="text-xs text-muted-foreground">{program.style}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-foreground mb-1 line-clamp-2 leading-snug">{program.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{program.desc}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{program.duration}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{program.sessions} sessions</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-medium text-foreground">{program.rating}</span>
                      <span className="text-xs text-muted-foreground">({program.students.toLocaleString()})</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{program.instructor}</span>
                  </div>
                  <button onClick={() => handleEnroll(program)}
                    className={cn("w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5",
                      enrolledIds.includes(program.id)
                        ? "bg-green-500/10 text-green-600 border border-green-200"
                        : program.free
                        ? "bg-sage-gradient text-white shadow-sage hover:opacity-90"
                        : "bg-muted text-muted-foreground hover:bg-primary hover:text-white")}>
                    {enrolledIds.includes(program.id) ? "✓ Enrolled" : program.free ? <><Play className="w-3.5 h-3.5" /> Start Free</> : <><Lock className="w-3.5 h-3.5" /> Unlock Pro</>}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "120+", label: "Yoga Programs" },
              { value: "48", label: "Expert Instructors" },
              { value: "150K+", label: "Active Students" },
              { value: "4.8★", label: "Average Rating" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-serif text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
