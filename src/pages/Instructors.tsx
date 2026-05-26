import { useState } from "react";
import { MapPin, Star, Clock, Video, Award, Filter, Search, ChevronRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const specialties = ["All", "Vinyasa", "Hatha", "Yin", "Ashtanga", "Kundalini", "Meditation", "Prenatal", "Kids Yoga"];
const priceRanges = ["Any Price", "Under $30/hr", "$30–$60/hr", "$60–$100/hr", "$100+/hr"];

const instructors = [
  { id: 1, name: "Priya Kavitha", specialty: "Vinyasa", location: "Rishikesh, India", rating: 4.9, reviews: 384, price: 55, students: 1248, experience: "8 years", classes: 342, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face", certifications: ["RYT-500", "Yin TTC", "Pranayama"], available: true, featured: true, bio: "RYT-500 certified with 8 years of global teaching. Specialises in dynamic Vinyasa flows and deep Yin practice." },
  { id: 2, name: "Arjun Mehta", specialty: "Ashtanga", location: "Mysore, India", rating: 4.9, reviews: 217, price: 75, students: 892, experience: "12 years", classes: 890, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face", certifications: ["RYT-500", "Ashtanga Auth.", "YACEP"], available: true, featured: true, bio: "Authorized Ashtanga teacher trained directly in Mysore. Offers traditional led and Mysore-style sessions." },
  { id: 3, name: "Sofia Andrade", specialty: "Yin", location: "Lisbon, Portugal", rating: 4.8, reviews: 156, price: 45, students: 647, experience: "6 years", classes: 241, img: "https://images.unsplash.com/photo-1488508872907-592763824245?w=400&h=400&fit=crop&crop=face", certifications: ["RYT-300", "Yin Advanced", "Mindfulness"], available: false, featured: false, bio: "Yin yoga specialist focusing on deep tissue release and emotional healing through long-held poses." },
  { id: 4, name: "Guru Ananda", specialty: "Kundalini", location: "Bali, Indonesia", rating: 4.9, reviews: 98, price: 90, students: 421, experience: "15 years", classes: 124, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face", certifications: ["KRI Certified", "3HO Teacher", "Breathwork"], available: true, featured: true, bio: "KRI-certified Kundalini teacher offering transformative kriyas, breathwork, and spiritual awakening sessions." },
  { id: 5, name: "Meera Nair", specialty: "Hatha", location: "Kerala, India", rating: 4.7, reviews: 203, price: 35, students: 1840, experience: "7 years", classes: 562, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face", certifications: ["RYT-500", "Hatha TTC", "Yoga Nidra"], available: true, featured: false, bio: "Kerala-based Hatha yoga specialist. Known for her gentle, therapeutic approach and deep relaxation practices." },
  { id: 6, name: "Raj Kumar", specialty: "Vinyasa", location: "Mumbai, India", rating: 4.8, reviews: 174, price: 50, students: 730, experience: "5 years", classes: 315, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face", certifications: ["RYT-200", "Power Yoga Cert.", "Sports Yoga"], available: true, featured: false, bio: "Dynamic power yoga instructor combining athletic movement with mindfulness for strength-focused practitioners." },
];

export default function Instructors() {
  useIntersectionObserver();
  const [search, setSearch] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [activePrice, setActivePrice] = useState("Any Price");
  const [selectedInstructor, setSelectedInstructor] = useState<typeof instructors[0] | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const filtered = instructors.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpec = activeSpecialty === "All" || i.specialty === activeSpecialty;
    return matchSearch && matchSpec;
  });

  const handleBook = (instructor: typeof instructors[0]) => {
    if (!isAuthenticated) { toast.info("Sign in to book a session"); navigate("/login"); return; }
    toast.success(`Session request sent to ${instructor.name}! They'll confirm within 2 hours.`);
    setSelectedInstructor(null);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6 section-fade">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-5">
              <Award className="w-3.5 h-3.5" /> Certified Instructor Marketplace
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Learn from the World's Best Yoga Teachers
            </h1>
            <p className="text-lg text-muted-foreground">
              Book 1-on-1 sessions, join group classes, or follow structured programmes from {instructors.length}+ certified instructors worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border bg-background sticky top-16 lg:top-20 z-20">
        <div className="container mx-auto px-4 sm:px-6 flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search instructors..."
              className="w-56 pl-9 pr-3 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {specialties.slice(0, 6).map(s => (
              <button key={s} onClick={() => setActiveSpecialty(s)}
                className={cn("px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all", activeSpecialty === s ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground")}>
                {s}
              </button>
            ))}
          </div>
          <select value={activePrice} onChange={e => setActivePrice(e.target.value)}
            className="px-3 py-2 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none ml-auto">
            {priceRanges.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((instructor, i) => (
              <div key={instructor.id} className="group bg-card border border-border rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 section-fade" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img src={instructor.img} alt={instructor.name} className="w-16 h-16 rounded-2xl object-cover" />
                    {instructor.available && <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-card" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{instructor.name}</h3>
                        <div className="text-sm text-primary font-medium">{instructor.specialty}</div>
                      </div>
                      {instructor.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 font-medium">Featured</span>}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{instructor.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{instructor.bio}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {instructor.certifications.map(cert => (
                    <span key={cert} className="text-xs px-2 py-1 rounded-lg bg-sage-light dark:bg-sage-light/30 text-primary flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5" /> {cert}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-border">
                  <div className="text-center">
                    <div className="font-bold text-foreground text-sm">{instructor.students.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-foreground text-sm">{instructor.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{instructor.reviews} reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-foreground text-sm">{instructor.experience}</div>
                    <div className="text-xs text-muted-foreground">Experience</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-serif text-xl font-bold text-foreground">${instructor.price}</span>
                    <span className="text-xs text-muted-foreground">/hour</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedInstructor(instructor)} className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-all">
                      <Video className="w-3.5 h-3.5" /> Preview
                    </button>
                    <button onClick={() => { if (!instructor.available) { toast.info("Instructor is currently unavailable"); return; } setSelectedInstructor(instructor); }}
                      className={cn("flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all", instructor.available ? "bg-sage-gradient text-white shadow-sage hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed")}>
                      {instructor.available ? "Book" : "Busy"} <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedInstructor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-xl animate-fade-in">
            <div className="flex items-center gap-4 mb-5">
              <img src={selectedInstructor.img} alt={selectedInstructor.name} className="w-14 h-14 rounded-2xl object-cover" />
              <div>
                <h3 className="font-semibold text-foreground">{selectedInstructor.name}</h3>
                <div className="text-sm text-primary">{selectedInstructor.specialty} · {selectedInstructor.experience} exp.</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-medium">{selectedInstructor.rating} ({selectedInstructor.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Select Session Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {["1-on-1 Session", "Group Class", "Programme Follow-up", "Consultation"].map(type => (
                    <button key={type} className="px-3 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-all text-left">{type}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Date</label>
                <input type="date" className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="flex items-center justify-between mb-5 p-3 rounded-xl bg-sage-light dark:bg-sage-light/20">
              <span className="text-sm text-muted-foreground">Session rate</span>
              <span className="font-bold text-foreground">${selectedInstructor.price}/hour</span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelectedInstructor(null)} className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted">Cancel</button>
              <button onClick={() => handleBook(selectedInstructor)} className="flex-1 py-3 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
