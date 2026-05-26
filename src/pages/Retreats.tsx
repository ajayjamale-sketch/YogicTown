import { useState } from "react";
import { MapPin, Calendar, Clock, Users, Star, Heart, Filter, Search, Compass, ArrowRight, Tag } from "lucide-react";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const types = ["All", "Yoga Immersion", "Meditation", "Ayurvedic", "Sound Healing", "Spiritual", "Adventure"];
const durations = ["Any Duration", "Weekend (2-3 days)", "Week (5-7 days)", "Extended (8-14 days)"];

const retreats = [
  { id: 1, title: "7-Day Bali Yoga & Spirit Retreat", location: "Ubud, Bali", country: "Indonesia", type: "Yoga Immersion", duration: "7 days", dates: "Jun 15 – 22, 2025", price: 1890, originalPrice: 2200, participants: 16, maxParticipants: 20, rating: 4.9, reviews: 182, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop", organizer: "Serenity Wellness Hub", featured: true, tag: "Best Seller", highlights: ["Daily Vinyasa & Yin", "Balinese Healing Ceremony", "Organic Cuisine", "Airport Transfers"] },
  { id: 2, title: "5-Day Silent Meditation in Rishikesh", location: "Rishikesh", country: "India", type: "Meditation", duration: "5 days", dates: "Jul 8 – 13, 2025", price: 620, originalPrice: 750, participants: 12, maxParticipants: 15, rating: 4.8, reviews: 94, img: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=800&h=500&fit=crop", organizer: "River Ganga Ashram", featured: true, tag: "Sacred", highlights: ["Noble Silence Practice", "Ganga Aarti Ceremony", "Sattvic Meals", "Yoga Nidra"] },
  { id: 3, title: "Weekend Coastal Yoga Escape", location: "Tulum", country: "Mexico", type: "Yoga Immersion", duration: "3 days", dates: "Jun 28 – 30, 2025", price: 480, originalPrice: 580, participants: 10, maxParticipants: 14, rating: 4.7, reviews: 67, img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=500&fit=crop", organizer: "Tulum Wellness Co.", featured: false, tag: "Weekend", highlights: ["Beach Yoga Sessions", "Cenote Ceremony", "Fresh Ceviche Dinners", "Sunset Meditation"] },
  { id: 4, title: "Panchakarma Ayurvedic Detox", location: "Kerala", country: "India", type: "Ayurvedic", duration: "14 days", dates: "Jul 20 – Aug 3, 2025", price: 2400, originalPrice: 2900, participants: 8, maxParticipants: 10, rating: 4.9, reviews: 48, img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=500&fit=crop", organizer: "Vaidyagrama", featured: true, tag: "Deep Cleanse", highlights: ["Full Panchakarma", "Ayurvedic Doctor Consultation", "Herbal Treatments", "Traditional Marma"] },
  { id: 5, title: "Sound Healing & Cacao Journey", location: "Cusco", country: "Peru", type: "Sound Healing", duration: "5 days", dates: "Aug 5 – 10, 2025", price: 780, originalPrice: 920, participants: 14, maxParticipants: 16, rating: 4.8, reviews: 71, img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&h=500&fit=crop", organizer: "Sacred Harmony", featured: false, tag: "Transformative", highlights: ["Crystal Bowl Ceremonies", "Andean Cacao Ritual", "Machu Picchu Sunrise", "Shamanic Healing"] },
  { id: 6, title: "10-Day Kundalini Awakening", location: "Ibiza", country: "Spain", type: "Spiritual", duration: "10 days", dates: "Sep 1 – 11, 2025", price: 3200, originalPrice: 3800, participants: 6, maxParticipants: 12, rating: 4.9, reviews: 39, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop", organizer: "White Isle Spiritual", featured: true, tag: "Premium", highlights: ["Kundalini Yoga Sets", "Breathwork Sessions", "Sacred Dance", "Sea Meditation"] },
];

export default function Retreats() {
  useIntersectionObserver();
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [activeDuration, setActiveDuration] = useState("Any Duration");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [modalRetreat, setModalRetreat] = useState<typeof retreats[0] | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const filtered = retreats.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.location.toLowerCase().includes(search.toLowerCase());
    const matchType = activeType === "All" || r.type === activeType;
    return matchSearch && matchType;
  });

  const handleBook = (retreat: typeof retreats[0]) => {
    if (!isAuthenticated) { toast.info("Please sign in to book a retreat"); navigate("/login"); return; }
    toast.success(`Booking request sent for "${retreat.title}"! Our team will contact you within 24h.`);
    setModalRetreat(null);
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);
    toast.success(wishlist.includes(id) ? "Removed from wishlist" : "Added to wishlist!");
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative pt-28 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-sage-dark to-indigo-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&fit=crop)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative container mx-auto px-4 sm:px-6 text-center section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-5">
            <Compass className="w-3.5 h-3.5" /> Wellness Retreats Worldwide
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5">
            Transform Your Life.<br />Find Your Sanctuary.
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
            Discover curated yoga and wellness retreats in 40+ destinations. Handpicked experiences from Bali to Rishikesh, Tulum to Kerala.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by location or retreat type..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white dark:bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-xl" />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border bg-background sticky top-16 lg:top-20 z-20">
        <div className="container mx-auto px-4 sm:px-6 flex flex-wrap gap-3">
          <div className="flex gap-2 overflow-x-auto">
            {types.map(t => (
              <button key={t} onClick={() => setActiveType(t)}
                className={cn("px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all", activeType === t ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground")}>
                {t}
              </button>
            ))}
          </div>
          <select value={activeDuration} onChange={e => setActiveDuration(e.target.value)}
            className="px-3 py-2 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary ml-auto">
            {durations.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      </section>

      {/* Retreats Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} retreats available</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((retreat, i) => (
              <div key={retreat.id} className="group rounded-3xl bg-card border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 section-fade" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="relative h-56 overflow-hidden">
                  <img src={retreat.img} alt={retreat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/90 text-foreground font-semibold">{retreat.tag}</span>
                    {retreat.featured && <span className="text-xs px-2.5 py-1 rounded-full bg-primary text-white font-medium">Featured</span>}
                  </div>
                  <button onClick={() => toggleWishlist(retreat.id)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-white/40">
                    <Heart className={cn("w-4 h-4", wishlist.includes(retreat.id) ? "text-red-400 fill-red-400" : "text-white")} />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-1 text-white/90 text-xs">
                      <MapPin className="w-3 h-3" /> {retreat.location}, {retreat.country}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif font-bold text-foreground leading-snug">{retreat.title}</h3>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-semibold text-foreground">{retreat.rating}</span>
                    <span className="text-xs text-muted-foreground">({retreat.reviews} reviews)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 flex-shrink-0" /> {retreat.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 flex-shrink-0" /> {retreat.dates.split(" – ")[0]}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Users className="w-3 h-3 flex-shrink-0" /> {retreat.maxParticipants - retreat.participants} spots
                    </div>
                  </div>
                  <div className="flex gap-1.5 mb-4 flex-wrap">
                    {retreat.highlights.slice(0, 2).map(h => (
                      <span key={h} className="text-xs px-2 py-1 rounded-lg bg-sage-light dark:bg-sage-light/30 text-primary font-medium">{h}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-serif text-2xl font-bold text-foreground">${retreat.price.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground line-through">${retreat.originalPrice.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">per person, all inclusive</div>
                    </div>
                    <button onClick={() => setModalRetreat(retreat)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all">
                      Book Now <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {modalRetreat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-xl animate-fade-in">
            <h3 className="font-serif text-xl font-bold text-foreground mb-1">{modalRetreat.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="w-3.5 h-3.5" /> {modalRetreat.location} · {modalRetreat.dates}
            </div>
            <div className="space-y-2 mb-5">
              <div className="text-sm font-medium text-foreground mb-2">What's included:</div>
              {modalRetreat.highlights.map(h => (
                <div key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> {h}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mb-5 p-4 rounded-xl bg-sage-light dark:bg-sage-light/20">
              <div>
                <div className="font-serif text-2xl font-bold text-foreground">${modalRetreat.price.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">per person · {modalRetreat.maxParticipants - modalRetreat.participants} spots left</div>
              </div>
              <Tag className="w-6 h-6 text-primary" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setModalRetreat(null)} className="flex-1 py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">Cancel</button>
              <button onClick={() => handleBook(modalRetreat)} className="flex-1 py-3 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
