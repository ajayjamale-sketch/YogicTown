import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useScrollTop } from "@/hooks/useScrollTop";
import Navbar from "@/components/layout/Navbar";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

const perks = ["7-day free trial", "No credit card needed", "Cancel anytime", "50K+ community"];

export default function Register() {
  useScrollTop();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error("Please fill in all fields"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Please enter a valid email"); return; }
    if (password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setLoading(true);
    const success = await register(name, email, password);
    if (success) {
      toast.success("Welcome to YogicTown! Your journey begins now 🌿");
      navigate("/dashboard");
    } else {
      toast.error("Registration failed. Please try again.");
    }
    setLoading(false);
  };

  const strength = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) ? "strong" :
    password.length >= 6 ? "medium" : password.length > 0 ? "weak" : "";

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
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Begin your journey</h1>
            <p className="text-muted-foreground">Join 50,000+ mindful practitioners</p>
          </div>

          {/* Perks */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {perks.map((p) => (
              <div key={p} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage-light text-primary text-xs font-medium">
                <Check className="w-3 h-3" /> {p}
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-12"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {strength && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {["weak", "medium", "strong"].map((s, i) => (
                        <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                          strength === "weak" && i === 0 ? "bg-red-400" :
                          strength === "medium" && i <= 1 ? "bg-amber-400" :
                          strength === "strong" ? "bg-green-500" : "bg-border"
                        }`} />
                      ))}
                    </div>
                    <span className={`text-xs capitalize ${strength === "strong" ? "text-green-600" : strength === "medium" ? "text-amber-600" : "text-red-500"}`}>
                      {strength}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-sage-gradient text-white font-semibold shadow-sage hover:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (<>Create Free Account <ArrowRight className="w-4 h-4" /></>)}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
