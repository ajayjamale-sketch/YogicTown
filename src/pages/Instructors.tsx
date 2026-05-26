import { useMemo, useState } from "react";
import {
  MapPin,
  Star,
  Video,
  Award,
  Search,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const specialties = [
  "All",
  "Vinyasa",
  "Hatha",
  "Yin",
  "Ashtanga",
  "Kundalini",
  "Meditation",
  "Prenatal",
  "Kids Yoga",
];

const priceRanges = [
  "Any Price",
  "Under $30/hr",
  "$30–$60/hr",
  "$60–$100/hr",
  "$100+/hr",
];

const instructors = [
  {
    id: 1,
    name: "Priya Kavitha",
    specialty: "Vinyasa",
    location: "Rishikesh, India",
    rating: 4.9,
    reviews: 384,
    price: 55,
    students: 1248,
    experience: "8 years",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    certifications: ["RYT-500", "Yin TTC", "Pranayama"],
    available: true,
    featured: true,
    bio: "RYT-500 certified with 8 years of global teaching.",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    specialty: "Ashtanga",
    location: "Mysore, India",
    rating: 4.9,
    reviews: 217,
    price: 75,
    students: 892,
    experience: "12 years",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    certifications: ["RYT-500", "Ashtanga Auth.", "YACEP"],
    available: true,
    featured: true,
    bio: "Authorized Ashtanga teacher trained directly in Mysore.",
  },
  {
    id: 3,
    name: "Sofia Andrade",
    specialty: "Yin",
    location: "Lisbon, Portugal",
    rating: 4.8,
    reviews: 156,
    price: 45,
    students: 647,
    experience: "6 years",
    img: "https://images.unsplash.com/photo-1488508872907-592763824245?w=400&h=400&fit=crop&crop=face",
    certifications: ["RYT-300", "Yin Advanced", "Mindfulness"],
    available: false,
    featured: false,
    bio: "Yin yoga specialist focusing on emotional healing.",
  },
];

export default function Instructors() {
  useIntersectionObserver();

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [search, setSearch] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [activePrice, setActivePrice] = useState("Any Price");
  const [sortBy, setSortBy] = useState("Popularity");

  const [selectedInstructor, setSelectedInstructor] =
    useState<(typeof instructors)[0] | null>(null);

  const filteredInstructors = useMemo(() => {
    const filtered = instructors.filter((instructor) => {
      const term = search.toLowerCase().trim();

      const matchSearch =
        instructor.name.toLowerCase().includes(term) ||
        instructor.specialty.toLowerCase().includes(term) ||
        instructor.location.toLowerCase().includes(term) ||
        instructor.bio.toLowerCase().includes(term);

      const matchSpecialty =
        activeSpecialty === "All" ||
        instructor.specialty === activeSpecialty;

      const matchPrice =
        activePrice === "Any Price"
          ? true
          : activePrice === "Under $30/hr"
          ? instructor.price < 30
          : activePrice === "$30–$60/hr"
          ? instructor.price >= 30 && instructor.price <= 60
          : activePrice === "$60–$100/hr"
          ? instructor.price >= 60 && instructor.price <= 100
          : instructor.price > 100;

      return matchSearch && matchSpecialty && matchPrice;
    });

    switch (sortBy) {
      case "Price: Low to High":
        return [...filtered].sort((a, b) => a.price - b.price);

      case "Price: High to Low":
        return [...filtered].sort((a, b) => b.price - a.price);

      case "Rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);

      case "Popularity":
      default:
        return [...filtered].sort((a, b) => b.students - a.students);
    }
  }, [search, activePrice, activeSpecialty, sortBy]);

  const handleBook = (instructor: (typeof instructors)[0]) => {
    if (!isAuthenticated) {
      toast.info("Sign in to book a session");
      navigate("/login");
      return;
    }

    toast.success(`Session request sent to ${instructor.name}`);

    setSelectedInstructor(null);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-5">
              <Award className="w-4 h-4" />
              Certified Instructor Marketplace
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Learn from Expert Yoga Teachers
            </h1>

            <p className="text-lg text-muted-foreground">
              Book 1-on-1 yoga sessions and guided wellness classes from
              certified instructors worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-20 bg-background border-b py-6">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search instructors, specialty, location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Price */}
            <select
              value={activePrice}
              onChange={(e) => setActivePrice(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-input bg-background text-sm"
            >
              {priceRanges.map((price) => (
                <option key={price}>{price}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-input bg-background text-sm"
            >
              <option>Popularity</option>
              <option>Rating</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Specialty Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setActiveSpecialty(specialty)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                  activeSpecialty === specialty
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          {filteredInstructors.length === 0 ? (
            <div className="text-center py-16 rounded-3xl border bg-card">
              <div className="text-4xl mb-4">🧘</div>

              <h3 className="text-xl font-bold mb-2">
                No Instructors Found
              </h3>

              <p className="text-muted-foreground mb-6">
                Try changing your search or filters.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setActivePrice("Any Price");
                  setActiveSpecialty("All");
                  setSortBy("Popularity");
                }}
                className="px-5 py-2.5 rounded-xl bg-primary text-white"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInstructors.map((instructor) => (
                <div
                  key={instructor.id}
                  className="bg-card border rounded-3xl p-6 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={instructor.img}
                        alt={instructor.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />

                      {instructor.available && (
                        <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-card" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">
                            {instructor.name}
                          </h3>

                          <p className="text-sm text-primary">
                            {instructor.specialty}
                          </p>
                        </div>

                        {instructor.featured && (
                          <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {instructor.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {instructor.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {instructor.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="text-xs px-2 py-1 rounded-lg bg-sage-light text-primary flex items-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        {cert}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-y py-4 mb-5">
                    <div className="text-center">
                      <div className="font-bold">
                        {instructor.students}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Students
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />

                        <span className="font-bold">
                          {instructor.rating}
                        </span>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {instructor.reviews} reviews
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="font-bold">
                        {instructor.experience}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Experience
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xl">
                        ${instructor.price}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        /hour
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setSelectedInstructor(instructor)
                        }
                        className="px-3 py-2.5 rounded-xl border text-sm flex items-center gap-1.5"
                      >
                        <Video className="w-4 h-4" />
                        Preview
                      </button>

                      <button
                        onClick={() => {
                          if (!instructor.available) {
                            toast.info(
                              "Instructor is currently unavailable"
                            );
                            return;
                          }

                          setSelectedInstructor(instructor);
                        }}
                        className={cn(
                          "px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5",
                          instructor.available
                            ? "bg-primary text-white"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                      >
                        {instructor.available ? "Book" : "Busy"}

                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedInstructor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card border rounded-3xl p-6 max-w-md w-full">
            <div className="flex items-center gap-4 mb-5">
              <img
                src={selectedInstructor.img}
                alt={selectedInstructor.name}
                className="w-14 h-14 rounded-2xl object-cover"
              />

              <div>
                <h3 className="font-semibold">
                  {selectedInstructor.name}
                </h3>

                <p className="text-sm text-primary">
                  {selectedInstructor.specialty}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Preferred Date
              </label>

              <input
                type="date"
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background"
              />
            </div>

            <div className="flex justify-between items-center mb-6 p-4 rounded-xl bg-sage-light">
              <span className="text-sm text-muted-foreground">
                Session Rate
              </span>

              <span className="font-bold">
                ${selectedInstructor.price}/hour
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedInstructor(null)}
                className="flex-1 py-3 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={() => handleBook(selectedInstructor)}
                className="flex-1 py-3 rounded-xl bg-primary text-white"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}