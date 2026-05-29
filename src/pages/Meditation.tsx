import { useMemo, useState } from "react";
import {
  Play,
  Pause,
  Moon,
  Wind,
  Volume2,
  Heart,
  Clock,
  Star,
  Headphones,
  Sun,
  Brain,
  Leaf,
} from "lucide-react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/store/useStore";
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
  {
    id: 1,
    title: "Deep Sleep Surrender",
    category: "sleep",
    duration: "30 min",
    guide: "Sofia Andrade",
    rating: 4.9,
    plays: 89200,
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    color: "from-indigo-500/30 to-purple-500/30",
    desc: "Guided body-scan meditation for deep sleep.",
  },
  {
    id: 2,
    title: "Anxious Mind Release",
    category: "stress",
    duration: "20 min",
    guide: "Meera Nair",
    rating: 4.8,
    plays: 62400,
    img: "https://images.unsplash.com/photo-1515894203077-9cd36032142e?w=600&h=400&fit=crop",
    color: "from-teal-500/30 to-cyan-500/30",
    desc: "Release anxiety through calming breathwork.",
  },
  {
    id: 3,
    title: "Morning Clarity Ritual",
    category: "morning",
    duration: "15 min",
    guide: "Arjun Mehta",
    rating: 4.7,
    plays: 44100,
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    color: "from-amber-500/30 to-orange-500/30",
    desc: "Morning meditation for energy and clarity.",
  },
];

export default function Meditation() {
  useIntersectionObserver();

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const store = useStore();

  const [activeCategory, setActiveCategory] = useState("all");
  const [playing, setPlaying] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("Popularity");

  const favorites = store.favorites;
  const streak = store.meditationStreak;

  const filteredSessions = useMemo(() => {
    const filtered = sessions.filter((session) => {
      return (
        activeCategory === "all" ||
        session.category === activeCategory
      );
    });

    switch (sortBy) {
      case "Rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);

      case "Duration: Shortest First":
        return [...filtered].sort(
          (a, b) =>
            parseInt(a.duration) - parseInt(b.duration)
        );

      case "Duration: Longest First":
        return [...filtered].sort(
          (a, b) =>
            parseInt(b.duration) - parseInt(a.duration)
        );

      case "Popularity":
      default:
        return [...filtered].sort((a, b) => b.plays - a.plays);
    }
  }, [activeCategory, sortBy]);

  const handlePlay = (id: number) => {
    if (!isAuthenticated) {
      toast.info("Sign in to start meditation");
      navigate("/login");
      return;
    }

    if (playing === id) {
      setPlaying(null);
      toast.info("Session paused");
      return;
    }

    setPlaying(id);

    const session = sessions.find((s) => s.id === id);

    const mins = session
      ? parseInt(session.duration)
      : 10;

    store.playMeditation(id, mins);

    toast.success("Meditation started 🧘");
  };

  const toggleFav = (id: number) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const alreadyFav = favorites.includes(id);

    store.toggleFavoriteMeditation(id);

    toast.success(
      alreadyFav
        ? "Removed from favorites"
        : "Added to favorites ❤️"
    );
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-indigo-50 via-purple-50/40 to-sage-light dark:from-indigo-900/10 dark:via-purple-900/5 dark:to-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-5">
            <Headphones className="w-4 h-4" />
            Meditation Center
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
            Still the Mind.
            <br />
            <span className="text-primary">
              Heal the Soul.
            </span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Guided meditations, sound healing, mindfulness,
            and breathwork sessions.
          </p>

          {isAuthenticated && (
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-card border border-border">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                🔥
              </div>

              <div className="text-left">
                <div className="font-semibold text-sm">
                  {streak}-Day Meditation Streak
                </div>

                <div className="text-xs text-muted-foreground">
                  Keep your mindfulness journey alive
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b bg-background sticky top-16 z-20">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide w-full">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.id}
                  onClick={() =>
                    setActiveCategory(category.id)
                  }
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                    activeCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />

                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-input bg-background text-sm md:w-auto w-full"
          >
            <option>Popularity</option>
            <option>Rating</option>
            <option>Duration: Shortest First</option>
            <option>Duration: Longest First</option>
          </select>
        </div>
      </section>

      {/* Sessions */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Featured */}
          {activeCategory === "all" && (
            <div className="mb-14">
              <h2 className="font-serif text-2xl font-bold mb-6">
                Featured Session
              </h2>

              <div
                onClick={() =>
                  handlePlay(sessions[0].id)
                }
                className="relative h-80 rounded-3xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={sessions[0].img}
                  alt={sessions[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute inset-0 flex items-center">
                  <div className="px-8 md:px-12 max-w-xl">
                    <span className="text-xs uppercase tracking-wider text-white/70 mb-2 block">
                      Most Played
                    </span>

                    <h3 className="font-serif text-4xl font-bold text-white mb-3">
                      {sessions[0].title}
                    </h3>

                    <p className="text-white/80 mb-5">
                      {sessions[0].desc}
                    </p>

                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 text-foreground font-semibold border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow transition-all duration-200">
  {playing === sessions[0].id ? (
    <>
      <Pause className="w-4 h-4" />
      Pause
    </>
  ) : (
    <>
      <Play className="w-4 h-4 fill-foreground" />
      Start Session
    </>
  )}
</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className="group rounded-2xl overflow-hidden bg-card border hover:shadow-lg transition-all"
              >
                <div
                  className={cn(
                    "relative h-44 overflow-hidden bg-gradient-to-br",
                    session.color
                  )}
                >
                  <img
                    src={session.img}
                    alt={session.title}
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() =>
                        handlePlay(session.id)
                      }
                      className="w-14 h-14 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center"
                    >
                      {playing === session.id ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6 fill-foreground ml-0.5" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      toggleFav(session.id)
                    }
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/40 flex items-center justify-center"
                  >
                    <Heart
                      className={cn(
                        "w-4 h-4",
                        favorites.includes(session.id)
                          ? "text-red-500 fill-red-500"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-2">
                    {session.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {session.desc}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.duration}
                    </span>

                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {session.rating}
                    </span>

                    <span>
                      {(session.plays / 1000).toFixed(0)}K
                    </span>
                  </div>

                  <div className="text-sm text-primary font-medium">
                    {session.guide}
                  </div>

                  {playing === session.id && (
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                        <div className="h-full w-1/3 bg-primary animate-pulse rounded-full" />
                      </div>

                      <span className="text-xs text-muted-foreground">
                        Playing
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty */}
          {filteredSessions.length === 0 && (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🎧</div>

              <h3 className="text-2xl font-bold mb-2">
                No Sessions Found
              </h3>

              <p className="text-muted-foreground mb-6">
                Try changing the category filter.
              </p>

              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSortBy("Popularity");
                }}
                className="px-5 py-3 rounded-xl bg-primary text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}