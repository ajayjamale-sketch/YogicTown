import { useState } from "react";
import { MessageCircle, ThumbsUp, Users, Hash, Plus, Search, Flame, Star, ChevronRight, Globe, Lock } from "lucide-react";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const groups = [
  { id: 1, name: "Morning Yoga Warriors", category: "Yoga", members: 4820, posts: 342, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop", isPublic: true, joined: false, desc: "Join thousands of early risers who start their day with sun salutations and positive energy.", trending: true },
  { id: 2, name: "Meditation & Mindfulness Circle", category: "Meditation", members: 6140, posts: 891, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop", isPublic: true, joined: false, desc: "A sacred space to share your meditation journey, ask questions, and inspire each other.", trending: true },
  { id: 3, name: "Ayurveda & Nutrition Hub", category: "Nutrition", members: 2390, posts: 156, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop", isPublic: true, joined: false, desc: "Explore Ayurvedic wisdom, share recipes, and connect with nutrition enthusiasts worldwide.", trending: false },
  { id: 4, name: "Yoga Retreat Seekers", category: "Retreats", members: 3210, posts: 210, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&h=200&fit=crop", isPublic: true, joined: false, desc: "Find and share the best wellness retreat experiences from around the world.", trending: true },
  { id: 5, name: "Yin & Restorative Lovers", category: "Yoga", members: 1890, posts: 97, img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=300&h=200&fit=crop", isPublic: true, joined: false, desc: "Slow down, breathe deeply, and share your yin yoga and restorative practice journey.", trending: false },
  { id: 6, name: "Spiritual Growth & Philosophy", category: "Spiritual", members: 5460, posts: 728, img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=300&h=200&fit=crop", isPublic: false, joined: false, desc: "Deep discussions on yoga philosophy, spirituality, consciousness, and personal transformation.", trending: true },
];

const posts = [
  { id: 1, author: "Aria Sharma", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face", group: "Morning Yoga Warriors", time: "2h ago", content: "Just completed Day 14 of my 30-day morning flow challenge! The transformation in my body and mind is incredible. For anyone hesitating — just start. Even 10 minutes changes everything 🌿", likes: 247, comments: 38, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=300&fit=crop" },
  { id: 2, author: "Meera Pillai", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face", group: "Ayurveda & Nutrition Hub", time: "4h ago", content: "Golden milk recipe that changed my sleep quality forever: 1 cup warm oat milk + 1/2 tsp turmeric + pinch black pepper + 1 tsp raw honey + cardamom. Drink 30 min before bed. Thank me later 🌙✨", likes: 412, comments: 89, img: null },
  { id: 3, author: "Guru Ananda", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", group: "Spiritual Growth & Philosophy", time: "6h ago", content: "Bhagavad Gita 2.47: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.' This single verse has the power to completely transform how you approach every single day. What does it mean to you?", likes: 680, comments: 156, img: null },
  { id: 4, author: "Sofia Andrade", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", group: "Yin & Restorative Lovers", time: "8h ago", content: "Remember: Yin yoga is not 'easy yoga'. Holding deep stretches for 3-5 minutes while staying mentally present is one of the most challenging and rewarding practices. The discomfort teaches you to breathe, to observe, and to let go.", likes: 334, comments: 45, img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=300&fit=crop" },
];

const challenges = [
  { name: "21-Day Meditation Streak", participants: 8420, daysLeft: 14, icon: "🧘" },
  { name: "30-Day Morning Flow", participants: 12800, daysLeft: 16, icon: "🌅" },
  { name: "7-Day Digital Detox Yoga", participants: 3210, daysLeft: 3, icon: "📵" },
  { name: "Gratitude Journaling Challenge", participants: 5640, daysLeft: 21, icon: "📔" },
];

export default function Community() {
  useIntersectionObserver();
  const [activeTab, setActiveTab] = useState("feed");
  const [search, setSearch] = useState("");
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [newPost, setNewPost] = useState("");
  const [showPostBox, setShowPostBox] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleJoin = (groupId: number, groupName: string) => {
    if (!isAuthenticated) { toast.info("Sign in to join communities"); navigate("/login"); return; }
    if (joinedGroups.includes(groupId)) { setJoinedGroups(prev => prev.filter(g => g !== groupId)); toast.info("Left group"); }
    else { setJoinedGroups(prev => [...prev, groupId]); toast.success(`Joined ${groupName}!`); }
  };

  const handleLike = (postId: number) => {
    if (!isAuthenticated) { navigate("/login"); return; }
    setLikedPosts(prev => prev.includes(postId) ? prev.filter(p => p !== postId) : [...prev, postId]);
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    toast.success("Post shared with the community!");
    setNewPost("");
    setShowPostBox(false);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-br from-violet-50 via-sage-light/50 to-background dark:from-violet-900/10 dark:via-sage-light/5 dark:to-background">
        <div className="container mx-auto px-4 sm:px-6 text-center section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-violet-200 dark:border-violet-800 text-violet-600 dark:text-violet-400 text-sm font-medium mb-5">
            <Globe className="w-3.5 h-3.5" /> Global Wellness Community
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Connect. Share. Grow Together.
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Join thousands of wellness practitioners, yoga instructors, and spiritual seekers from 80+ countries.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="flex -space-x-2">
              {["photo-1544005313-94ddf0286df2", "photo-1438761681033-6461ffad8d80", "photo-1507003211169-0a1dd7228f2d", "photo-1487412720507-e7ab37603c6f"].map((p, i) => (
                <img key={i} src={`https://images.unsplash.com/${p}?w=60&h=60&fit=crop&crop=face`} className="w-9 h-9 rounded-full border-2 border-background object-cover" alt="" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">52,000+ members worldwide</span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border bg-background sticky top-16 lg:top-20 z-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-0">
            {["feed", "groups", "challenges"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={cn("px-5 py-4 text-sm font-medium capitalize border-b-2 transition-all", activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>
                {tab === "feed" ? "Community Feed" : tab === "groups" ? "Groups & Circles" : "Challenges"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Feed Tab */}
          {activeTab === "feed" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Post Creator */}
                {isAuthenticated && (
                  <div className="bg-card border border-border rounded-2xl p-4">
                    {showPostBox ? (
                      <div>
                        <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Share your wellness journey, insights, or inspiration..." rows={3}
                          className="w-full px-3 py-2 rounded-xl border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
                        <div className="flex justify-end gap-2 mt-2">
                          <button onClick={() => setShowPostBox(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
                          <button onClick={handlePost} className="px-4 py-2 rounded-xl bg-sage-gradient text-white text-sm font-medium">Post</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <img src={user?.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                        <button onClick={() => setShowPostBox(true)} className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-sm text-muted-foreground text-left hover:bg-muted/80 transition-colors">
                          Share your wellness journey...
                        </button>
                        <button onClick={() => setShowPostBox(true)} className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-primary text-white text-sm font-medium">
                          <Plus className="w-4 h-4" /> Post
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Posts */}
                {posts.map((post, i) => (
                  <div key={post.id} className="bg-card border border-border rounded-2xl p-5 section-fade hover:shadow-md transition-all" style={{ transitionDelay: `${i * 80}ms` }}>
                    <div className="flex items-start gap-3 mb-3">
                      <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-foreground">{post.author}</span>
                          <span className="text-xs text-muted-foreground">in</span>
                          <span className="text-xs text-primary font-medium">{post.group}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{post.time}</div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed mb-4">{post.content}</p>
                    {post.img && (
                      <div className="rounded-xl overflow-hidden mb-4 h-48">
                        <img src={post.img} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex items-center gap-4 pt-3 border-t border-border">
                      <button onClick={() => handleLike(post.id)} className={cn("flex items-center gap-1.5 text-sm transition-colors", likedPosts.includes(post.id) ? "text-primary" : "text-muted-foreground hover:text-primary")}>
                        <ThumbsUp className={cn("w-4 h-4", likedPosts.includes(post.id) && "fill-primary")} />
                        {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                        <MessageCircle className="w-4 h-4" /> {post.comments}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                <div className="bg-card border border-border rounded-2xl p-5">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Flame className="w-4 h-4 text-warm" /> Trending Challenges</h3>
                  {challenges.slice(0, 3).map(c => (
                    <div key={c.name} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                      <span className="text-2xl">{c.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.participants.toLocaleString()} participants</div>
                      </div>
                      <button onClick={() => { if (!isAuthenticated) navigate("/login"); else toast.success("Joined challenge!"); }}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-sage-light text-primary font-medium hover:bg-primary hover:text-white transition-all">Join</button>
                    </div>
                  ))}
                </div>
                <div className="bg-card border border-border rounded-2xl p-5">
                  <h3 className="font-semibold text-foreground mb-4">Popular Groups</h3>
                  {groups.slice(0, 3).map(g => (
                    <div key={g.id} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                      <img src={g.img} alt={g.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{g.name}</div>
                        <div className="text-xs text-muted-foreground">{g.members.toLocaleString()} members</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                  <button onClick={() => setActiveTab("groups")} className="w-full mt-3 py-2 text-sm text-primary hover:underline">View all groups</button>
                </div>
              </div>
            </div>
          )}

          {/* Groups Tab */}
          {activeTab === "groups" && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search groups..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase())).map((group, i) => (
                  <div key={group.id} className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg transition-all duration-300 section-fade" style={{ transitionDelay: `${i * 60}ms` }}>
                    <div className="relative h-36 overflow-hidden">
                      <img src={group.img} alt={group.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3">
                        {group.isPublic ? <Globe className="w-4 h-4 text-white/80" /> : <Lock className="w-4 h-4 text-white/80" />}
                      </div>
                      {group.trending && <span className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full bg-warm text-white font-medium">🔥 Trending</span>}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-sage-light text-primary font-medium">{group.category}</span>
                      </div>
                      <h3 className="font-semibold text-sm text-foreground mb-2">{group.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{group.desc}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {group.members.toLocaleString()}</span>
                          <span className="flex items-center gap-1"><Hash className="w-3 h-3" /> {group.posts}</span>
                        </div>
                        <button onClick={() => handleJoin(group.id, group.name)}
                          className={cn("text-sm px-3 py-1.5 rounded-xl font-medium transition-all", joinedGroups.includes(group.id) ? "bg-muted text-muted-foreground" : "bg-sage-gradient text-white shadow-sage hover:opacity-90")}>
                          {joinedGroups.includes(group.id) ? "Joined ✓" : "Join"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges Tab */}
          {activeTab === "challenges" && (
            <div className="max-w-2xl mx-auto space-y-5">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Active Challenges</h2>
              {challenges.map((c, i) => (
                <div key={c.name} className="bg-card border border-border rounded-2xl p-6 flex items-center gap-5 hover:shadow-md transition-all section-fade" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-14 h-14 rounded-2xl bg-sage-light flex items-center justify-center text-3xl flex-shrink-0">{c.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{c.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {c.participants.toLocaleString()} joined</span>
                      <span className="text-amber-500 font-medium">{c.daysLeft} days left</span>
                    </div>
                    <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${((30 - c.daysLeft) / 30) * 100}%` }} />
                    </div>
                  </div>
                  <button onClick={() => { if (!isAuthenticated) navigate("/login"); else toast.success(`Joined "${c.name}"!`); }}
                    className="px-4 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all whitespace-nowrap">
                    Join Challenge
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
