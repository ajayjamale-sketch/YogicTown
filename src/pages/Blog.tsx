import { useState } from "react";
import { Search, Clock, User, Tag, ArrowRight, TrendingUp } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const categories = ["All", "Yoga", "Meditation", "Nutrition", "Wellness", "Retreats", "Breathwork"];

import { Link } from "react-router-dom";
import { posts } from "@/data/blogPosts";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  useIntersectionObserver(0.15, [activeCategory, search]);

  const filtered = posts.filter(p =>
    (activeCategory.toLowerCase() === "all" || p.category.toLowerCase() === activeCategory.toLowerCase()) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()))
  );
  const featured = filtered.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-sage-light dark:bg-sage-light/5">
        <div className="container mx-auto px-4 sm:px-6 section-fade">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-5">
              <TrendingUp className="w-3.5 h-3.5" /> Wellness Insights
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
              The YogicTown <span className="text-gradient-sage italic">Wellness Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground">Expert insights, practice guides, and wellness wisdom for your holistic journey.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 section-fade">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat ? "bg-primary text-white shadow-sage" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Featured */}
          {featured.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {featured.map((post, i) => (
                <Link to={`/blog/${post.id}`} key={post.id} className="group rounded-3xl bg-card border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer section-fade block" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="relative h-52 overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-primary text-white text-xs font-semibold">{post.category}</span>
                      <span className="px-2.5 py-1 rounded-full bg-white/90 text-foreground text-xs font-medium">Featured</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{post.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} read</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* All Posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="group rounded-3xl bg-card border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer section-fade block" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 dark:bg-card/90 text-xs font-semibold text-foreground">{post.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                        <Tag className="w-2.5 h-2.5" />{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 max-w-md mx-auto">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground text-sm mb-6">Try a different search term or category</p>
              <button 
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="px-5 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
