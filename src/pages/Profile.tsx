import { useState } from "react";
import { Camera, MapPin, Award, Target, Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const levels = ["Beginner", "Intermediate", "Advanced", "Teacher"];
const goals = ["Flexibility", "Stress Relief", "Mindfulness", "Strength", "Weight Loss", "Better Sleep", "Spiritual Growth", "Community"];

export default function Profile() {
  useIntersectionObserver();
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [location, setLocation] = useState(user?.location || "");
  const [yogaLevel, setYogaLevel] = useState(user?.yogaLevel || "Beginner");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(user?.goals || []);
  const [saving, setSaving] = useState(false);

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) => prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    updateProfile({ name, bio, location, yogaLevel, goals: selectedGoals });
    toast.success("Profile updated successfully!");
    setSaving(false);
  };

  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Header */}
          <div className="section-fade mb-10">
            <div className="relative h-40 rounded-3xl overflow-hidden mb-0" style={{ background: "linear-gradient(135deg, hsl(128,18%,56%) 0%, hsl(140,25%,42%) 50%, hsl(28,87%,67%) 100%)" }}>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
            </div>
            <div className="px-6 pb-6 pt-0 bg-card border border-t-0 border-border rounded-b-3xl -mt-0.5">
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 pt-0 mb-4">
                <div className="relative w-24 h-24">
                  <img src={user?.avatar} alt={user?.name} className="w-24 h-24 rounded-2xl object-cover ring-4 ring-card shadow-lg" />
                  <button className="absolute bottom-1 right-1 w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="sm:mb-1">
                  <h1 className="font-serif text-2xl font-bold text-foreground">{user?.name}</h1>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" /> {user?.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-sage-light text-primary font-medium">
                      <Award className="w-3 h-3" /> {user?.plan} plan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-card border border-border rounded-2xl p-6 section-fade">
                <h2 className="font-semibold text-foreground mb-5">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input value={location} onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
                  </div>
                </div>
              </div>

              {/* Wellness Goals */}
              <div className="bg-card border border-border rounded-2xl p-6 section-fade">
                <div className="flex items-center gap-2 mb-5">
                  <Target className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Wellness Goals</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {goals.map((goal) => (
                    <button key={goal} onClick={() => toggleGoal(goal)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedGoals.includes(goal) ? "bg-primary text-white shadow-sage" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-sage-light"
                      }`}>
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Yoga Level */}
              <div className="bg-card border border-border rounded-2xl p-6 section-fade">
                <h2 className="font-semibold text-foreground mb-4">Yoga Level</h2>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <button key={level} onClick={() => setYogaLevel(level)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        yogaLevel === level ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-sage-light"
                      }`}>
                      {level}
                      {yogaLevel === level && <div className="w-2 h-2 rounded-full bg-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-card border border-border rounded-2xl p-6 section-fade">
                <h2 className="font-semibold text-foreground mb-4">Practice Stats</h2>
                <div className="space-y-4">
                  {[
                    { label: "Member Since", value: user?.joinedDate || "Jan 2024" },
                    { label: "Classes Completed", value: "87" },
                    { label: "Practice Hours", value: "124 hrs" },
                    { label: "Streak Record", value: "21 days" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{label}</span>
                      <span className="text-sm font-semibold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end section-fade">
            <button onClick={handleSave} disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-sage-gradient text-white font-semibold shadow-sage hover:opacity-90 transition-all duration-200 disabled:opacity-60">
              {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
