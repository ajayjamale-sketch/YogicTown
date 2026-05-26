import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Eye, EyeOff, ArrowRight, Zap, User, BookOpen, Building2, Apple, ShieldCheck } from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useScrollTop } from "@/hooks/useScrollTop";
import Navbar from "@/components/layout/Navbar";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";
import { cn } from "@/lib/utils";

const demoRoles: { role: UserRole; label: string; desc: string; icon: React.ElementType; color: string }[] = [
  { role: "user", label: "Wellness User", desc: "Practice & track progress", icon: User, color: "text-primary bg-sage-light border-primary/20" },
  { role: "instructor", label: "Yoga Instructor", desc: "Teach & manage classes", icon: BookOpen, color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800" },
  { role: "wellness_center", label: "Wellness Center", desc: "Retreats & events", icon: Building2, color: "text-teal-600 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800" },
  { role: "nutrition_expert", label: "Nutrition Expert", desc: "Meal plans & coaching", icon: Apple, color: "text-warm bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800" },
  { role: "admin", label: "Admin", desc: "Platform management", icon: ShieldCheck, color: "text-rose-600 bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800" },
];

export default function Login() {
  useScrollTop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState<UserRole | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Please enter a valid email"); return; }
    setLoading(true);
    const success = await login(email, password);
    if (success) { toast.success("Welcome back to YogicTown!"); navigate("/dashboard"); }
    else toast.error("Invalid credentials. Try a demo login below.");
    setLoading(false);
  };

  const handleDemoLogin = async (role: UserRole) => {
    setDemoLoading(role);
    await loginAsDemo(role);
    toast.success(`Logged in as ${demoRoles.find(r => r.role === role)?.label}!`);
    navigate("/dashboard");
    setDemoLoading(null);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <ScrollToTopButton />
      <div className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sage-gradient flex items-center justify-center shadow-sage">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-2xl font-semibold text-foreground">YogicTown</span>
            </Link>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Continue your wellness journey</p>
          </div>

          {/* Demo Login Panel */}
          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-5">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="w-full flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400"
            >
              <Zap className="w-4 h-4" />
              Quick Demo Login — Try any role instantly
              <span className="ml-auto text-xs">{showDemo ? "▲" : "▼"}</span>
            </button>
            {showDemo && (
              <div className="mt-3 grid grid-cols-1 gap-2">
                {demoRoles.map(({ role, label, desc, icon: Icon, color }) => (
                  <button
                    key={role}
                    onClick={() => handleDemoLogin(role)}
                    disabled={demoLoading !== null}
                    className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all hover:opacity-90 hover:shadow-sm disabled:opacity-50", color)}
                  >
                    {demoLoading === role ? (
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-white/60 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-semibold">{label}</div>
                      <div className="text-xs opacity-70">{desc}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-60" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or sign in with email</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-foreground">Password</label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-sage-gradient text-white font-semibold shadow-sage hover:opacity-90 transition-all disabled:opacity-60">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ArrowRight className="w-4 h-4" /> Sign In</>}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary font-medium hover:underline">Create one free</Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
