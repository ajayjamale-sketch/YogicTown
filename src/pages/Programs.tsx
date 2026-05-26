import { useMemo, useState } from "react";
import {
  Play,
  Clock,
  Star,
  Search,
  BookOpen,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const styles = [
  "All Styles",
  "Vinyasa",
  "Hatha",
  "Yin",
  "Ashtanga",
  "Kundalini",
  "Restorative",
  "Power",
];

const programs = [
  {
    id: 1,
    title: "30-Day Morning Flow Challenge",
    instructor: "Priya Kavitha",
    level: "Beginner",
    style: "Vinyasa",
    duration: "20–40 min/day",
    sessions: 30,
    rating: 4.9,
    students: 12480,
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    tag: "Best Seller",
    free: true,
    desc: "Build a consistent morning yoga habit with this 30-day progressive programme.",
  },
  {
    id: 2,
    title: "Deep Yin Flexibility Journey",
    instructor: "Sofia Andrade",
    level: "Intermediate",
    style: "Yin",
    duration: "45–60 min",
    sessions: 21,
    rating: 4.8,
    students: 8320,
    img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop",
    tag: "Popular",
    free: false,
    desc: "Unlock deep tissue flexibility and emotional release.",
  },
  {
    id: 3,
    title: "Ashtanga Primary Series",
    instructor: "Arjun Mehta",
    level: "Advanced",
    style: "Ashtanga",
    duration: "60–90 min",
    sessions: 24,
    rating: 4.9,
    students: 5640,
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    tag: "Expert",
    free: false,
    desc: "Master the complete Ashtanga Primary Series.",
  },
  {
    id: 4,
    title: "Yoga for Stress Relief",
    instructor: "Meera Nair",
    level: "Beginner",
    style: "Restorative",
    duration: "30 min",
    sessions: 14,
    rating: 4.7,
    students: 19820,
    img: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=400&fit=crop",
    tag: "Trending",
    free: true,
    desc: "Release tension and calm your nervous system.",
  },
  {
    id: 5,
    title: "Power Vinyasa Strength Build",
    instructor: "Raj Kumar",
    level: "Intermediate",
    style: "Power",
    duration: "50 min",
    sessions: 18,
    rating: 4.8,
    students: 7210,
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop",
    tag: "New",
    free: false,
    desc: "Build strength and body confidence.",
  },
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
  const [sortBy, setSortBy] = useState("Popularity");

  const { isAuthenticated } = useAuth();
  const store = useStore();
  const navigate = useNavigate();

  const enrolledIds = store.enrolledPrograms;

  const filteredPrograms = useMemo(() => {
    const filtered = programs.filter((program) => {
      const term = search.toLowerCase().trim();

      const matchSearch =
        program.title.toLowerCase().includes(term) ||
        program.instructor.toLowerCase().includes(term) ||
        program.style.toLowerCase().includes(term);

      const matchLevel =
        activeLevel === "All" || program.level === activeLevel;

      const matchStyle =
        activeStyle === "All Styles" || program.style === activeStyle;

      return matchSearch && matchLevel && matchStyle;
    });

    switch (sortBy) {
      case "Rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);

      case "Sessions: Low to High":
        return [...filtered].sort((a, b) => a.sessions - b.sessions);

      case "Sessions: High to Low":
        return [...filtered].sort((a, b) => b.sessions - a.sessions);

      case "Popularity":
      default:
        return [...filtered].sort((a, b) => b.students - a.students);
    }
  }, [search, activeLevel, activeStyle, sortBy]);

  const handleEnroll = (program: (typeof programs)[0]) => {
    if (!isAuthenticated) {
      toast.info("Please sign in to enroll");
      navigate("/login");
      return;
    }

    if (!program.free) {
      toast.info("Upgrade to Pro to access this program");
      navigate("/pricing");
      return;
    }

    if (enrolledIds.includes(program.id)) {
      toast.info("Already enrolled!");
      return;
    }

    store.enrollInProgram(program.id);

    toast.success(`Enrolled in "${program.title}"`);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Find Your Perfect Practice
            </h1>

            <p className="text-muted-foreground text-lg">
              Explore curated yoga programs for every level.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-20 py-6 border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search programs, instructors, or styles..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Level Filters */}
            <div className="flex gap-2 flex-wrap">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    activeLevel === level
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* Style Filters */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setActiveStyle(style)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                    activeStyle === style
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {style}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-xl border border-input bg-background text-sm"
            >
              <option>Popularity</option>
              <option>Rating</option>
              <option>Sessions: Low to High</option>
              <option>Sessions: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-sm text-muted-foreground mb-6">
            {filteredPrograms.length} programs found
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="group rounded-2xl overflow-hidden border bg-card hover:shadow-lg transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.img}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full font-medium",
                        levelColors[program.level]
                      )}
                    >
                      {program.level}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {program.style}
                    </span>
                  </div>

                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {program.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {program.desc}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {program.duration}
                    </span>

                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {program.sessions}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />

                      <span className="text-sm font-medium">
                        {program.rating}
                      </span>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {program.instructor}
                    </span>
                  </div>

                  <button
                    onClick={() => handleEnroll(program)}
                    className={cn(
                      "w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2",
                      enrolledIds.includes(program.id)
                        ? "bg-green-100 text-green-700"
                        : program.free
                        ? "bg-primary text-white hover:opacity-90"
                        : "bg-muted hover:bg-primary hover:text-white"
                    )}
                  >
                    {enrolledIds.includes(program.id) ? (
                      "✓ Enrolled"
                    ) : program.free ? (
                      <>
                        <Play className="w-4 h-4" />
                        Start Free
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Unlock Pro
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}