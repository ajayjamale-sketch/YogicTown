import { useState } from "react";
import { MessageCircle, ThumbsUp, Users, Hash, Plus, Search, Flame, Star, ChevronRight, Globe, Lock, Send } from "lucide-react";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAuth } from "@/contexts/AuthContext";
import { useStore, Post, Group, INITIAL_GROUPS, INITIAL_CHALLENGES } from "@/store/useStore";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Community() {
  const [activeTab, setActiveTab] = useState("feed");
  const [search, setSearch] = useState("");
  const [selectedFeedGroup, setSelectedFeedGroup] = useState("All");
  
  useIntersectionObserver(0.15, [activeTab, search, selectedFeedGroup]);
  const [newPost, setNewPost] = useState("");
  const [showPostBox, setShowPostBox] = useState(false);
  const [selectedGroupForNewPost, setSelectedGroupForNewPost] = useState("General Wellness");

  
  // Comment UI state
  const [commentTexts, setCommentTexts] = useState<Record<number, string>>({});
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});

  const { isAuthenticated, user } = useAuth();
  const store = useStore();
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearch("");
  };

  const posts = store.posts || [];
  const groups = store.groups && store.groups.length > 0 ? store.groups : INITIAL_GROUPS;
  const challenges = store.challenges && store.challenges.length > 0 ? store.challenges : INITIAL_CHALLENGES;
  const joinedGroups = store.joinedGroups || [];
  const likedPosts = store.likedPosts || [];
  const joinedChallenges = store.joinedChallenges || [];

  const joinedGroupsNames = joinedGroups.map(id => groups.find(g => g.id === id)?.name).filter(Boolean) as string[];
  const feedFilterOptions = ["All", "General Wellness", ...joinedGroupsNames];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.content.toLowerCase().includes(search.toLowerCase()) || 
      post.author.toLowerCase().includes(search.toLowerCase()) ||
      post.group.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = selectedFeedGroup === "All" || post.group === selectedFeedGroup;
    return matchesSearch && matchesGroup;
  });

  const handleJoin = (groupId: number, groupName: string) => {
    if (!isAuthenticated) { toast.info("Sign in to join communities"); navigate("/login"); return; }
    store.joinGroup(groupId);
    const isJoined = store.joinedGroups.includes(groupId);
    toast.success(!isJoined ? `Joined ${groupName}! ✨` : `Left ${groupName}`);
  };

  const handleLike = (postId: number) => {
    if (!isAuthenticated) { navigate("/login"); return; }
    store.likePost(postId);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    store.createPost(newPost, selectedGroupForNewPost, null);
    toast.success("Post shared with the community! 🌿");
    setNewPost("");
    setShowPostBox(false);
  };

  const handleChallengeToggle = (name: string) => {
    if (!isAuthenticated) { toast.info("Sign in to join challenges"); navigate("/login"); return; }
    store.toggleJoinChallenge(name);
    const hasJoined = joinedChallenges.includes(name);
    toast.success(!hasJoined ? `Joined "${name}" challenge! 🔥` : `Left "${name}" challenge`);
  };

  const handleCommentSubmit = (postId: number) => {
    const text = commentTexts[postId] || "";
    if (!text.trim()) return;
    if (!isAuthenticated) { navigate("/login"); return; }
    
    store.commentOnPost(postId, text);
    setCommentTexts(prev => ({ ...prev, [postId]: "" }));
    toast.success("Comment added! 💬");
  };

  const toggleCommentsVisibility = (postId: number) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
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
              <button key={tab} onClick={() => handleTabChange(tab)}
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
                      <form onSubmit={handlePostSubmit}>
                        <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Share your wellness journey, insights, or inspiration..." rows={3}
                          className="w-full px-3 py-2 rounded-xl border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
                        <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-muted-foreground font-medium">Post to:</label>
                            <select value={selectedGroupForNewPost} onChange={e => setSelectedGroupForNewPost(e.target.value)}
                              className="px-2.5 py-1.5 rounded-lg border border-input bg-background text-xs text-foreground focus:outline-none">
                              <option value="General Wellness">General Wellness</option>
                              {joinedGroupsNames.map(name => (
                                <option key={name} value={name}>{name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowPostBox(false)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Cancel</button>
                            <button type="submit" className="px-4 py-2 rounded-xl bg-sage-gradient text-white text-sm font-medium">Post</button>
                          </div>
                        </div>
                      </form>
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

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3 items-center bg-card border border-border rounded-2xl p-4">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search community posts..."
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
                    <label className="text-xs text-muted-foreground font-medium whitespace-nowrap">Filter Group:</label>
                    <select value={selectedFeedGroup} onChange={e => setSelectedFeedGroup(e.target.value)}
                      className="w-full sm:w-44 px-3 py-2 rounded-xl border border-input bg-background text-sm text-foreground focus:outline-none">
                      {feedFilterOptions.map(opt => (
                        <option key={opt} value={opt}>{opt === "All" ? "All Posts" : opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Posts */}
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12 bg-card border border-border rounded-2xl p-6">
                    <div className="text-3xl mb-3">💬</div>
                    <h4 className="font-semibold text-foreground mb-1">No Posts Found</h4>
                    <p className="text-xs text-muted-foreground mb-4">We couldn't find any posts matching your search criteria.</p>
                    <button 
                      onClick={() => { setSearch(""); setSelectedFeedGroup("All"); }}
                      className="px-4 py-2 rounded-xl bg-sage-gradient text-white text-xs font-semibold shadow-sage hover:opacity-90 transition-all"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  filteredPosts.map((post: Post, i: number) => (
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
                    <p className="text-sm text-foreground leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>
                    {post.img && (
                      <div className="rounded-xl overflow-hidden mb-4 h-48">
                        <img src={post.img} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex items-center gap-4 pt-3 border-t border-border">
                      <button onClick={() => handleLike(post.id)} className={cn("flex items-center gap-1.5 text-sm transition-colors", likedPosts.includes(post.id) ? "text-primary" : "text-muted-foreground hover:text-primary")}>
                        <ThumbsUp className={cn("w-4 h-4", likedPosts.includes(post.id) && "fill-primary")} />
                        {post.likes}
                      </button>
                      <button onClick={() => toggleCommentsVisibility(post.id)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                        <MessageCircle className="w-4 h-4" /> {post.comments.length} Comments
                      </button>
                    </div>

                    {/* Comments Drawer */}
                    {showComments[post.id] && (
                      <div className="mt-4 pt-4 border-t border-border space-y-4">
                        <div className="space-y-3">
                          {post.comments.map((comm: any, idx: number) => (
                            <div key={idx} className="flex gap-2.5 text-xs bg-muted/30 p-2.5 rounded-xl">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-semibold text-foreground">{comm.author}</span>
                                  <span className="text-[10px] text-muted-foreground">{comm.time}</span>
                                </div>
                                <p className="text-muted-foreground leading-normal">{comm.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {isAuthenticated && (
                          <div className="flex items-center gap-2">
                            <input type="text" placeholder="Write a comment..." value={commentTexts[post.id] || ""} onChange={e => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                              onKeyDown={e => { if (e.key === "Enter") handleCommentSubmit(post.id); }}
                              className="flex-1 px-3 py-2 border border-input rounded-xl bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary" />
                            <button onClick={() => handleCommentSubmit(post.id)} className="w-8 h-8 rounded-lg bg-sage-gradient text-white flex items-center justify-center shadow-sage hover:opacity-90">
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )))}
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
                      <button onClick={() => handleChallengeToggle(c.name)}
                        className={cn("text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-all", joinedChallenges.includes(c.name) ? "bg-muted text-muted-foreground" : "bg-sage-light text-primary hover:bg-primary hover:text-white")}>
                        {joinedChallenges.includes(c.name) ? "Joined" : "Join"}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="bg-card border border-border rounded-2xl p-5">
                  <h3 className="font-semibold text-foreground mb-4">Popular Groups</h3>
                  {groups.slice(0, 3).map((g: Group) => (
                    <div key={g.id} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                      <img src={g.img} alt={g.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-foreground truncate">{g.name}</div>
                        <div className="text-xs text-muted-foreground">{(g.members).toLocaleString()} members</div>
                      </div>
                      <button onClick={() => handleJoin(g.id, g.name)}
                        className={cn("text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-all", joinedGroups.includes(g.id) ? "bg-muted text-muted-foreground" : "bg-sage-light text-primary hover:bg-primary hover:text-white")}>
                        {joinedGroups.includes(g.id) ? "Joined" : "Join"}
                      </button>
                    </div>
                  ))}
                  <button onClick={() => handleTabChange("groups")} className="w-full mt-3 py-2 text-sm text-primary font-semibold hover:underline">View all groups</button>
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
              {groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-2xl p-8 max-w-md mx-auto">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">No Groups Found</h3>
                  <p className="text-muted-foreground text-sm mb-6">We couldn't find any community groups matching your search term.</p>
                  <button onClick={() => setSearch("")} className="px-5 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90">Clear Search</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase())).map((group: Group, i: number) => (
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
              )}
            </div>
          )}

          {/* Challenges Tab */}
          {activeTab === "challenges" && (
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search challenges..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Active Challenges</h2>
              {challenges.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-2xl p-8">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2">No Challenges Found</h3>
                  <p className="text-muted-foreground text-sm mb-6">We couldn't find any active challenges matching your search term.</p>
                  <button onClick={() => setSearch("")} className="px-5 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90">Clear Search</button>
                </div>
              ) : (
                challenges.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map((c, i) => (
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
                    <button onClick={() => handleChallengeToggle(c.name)}
                      className={cn("px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sage transition-all whitespace-nowrap",
                        joinedChallenges.includes(c.name) 
                          ? "bg-green-500/10 text-green-600 border border-green-200" 
                          : "bg-sage-gradient text-white hover:opacity-90")}>
                      {joinedChallenges.includes(c.name) ? "Joined ✓" : "Join Challenge"}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
