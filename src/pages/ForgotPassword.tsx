import { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, ArrowRight, ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";
import { useScrollTop } from "@/hooks/useScrollTop";
import Navbar from "@/components/layout/Navbar";
import ScrollToTopButton from "@/components/layout/ScrollToTopButton";

export default function ForgotPassword() {
  useScrollTop();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email address"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast.error("Please enter a valid email"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
    toast.success("Recovery email sent! Check your inbox.");
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
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
            {sent ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-5">
                  <Mail className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Check your email</h2>
                <p className="text-muted-foreground text-sm mb-6">
                  We've sent a recovery link to <span className="font-medium text-foreground">{email}</span>. Please check your inbox and follow the instructions.
                </p>
                <p className="text-sm text-muted-foreground mb-6">Didn't receive it? Check spam or <button onClick={() => setSent(false)} className="text-primary hover:underline">try again</button>.</p>
                <Link to="/login" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
                  <ArrowLeft className="w-4 h-4" /> Back to Sign In
                </Link>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Reset your password</h2>
                <p className="text-sm text-muted-foreground mb-6">Enter your email and we'll send you a recovery link.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
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
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-sage-gradient text-white font-semibold shadow-sage hover:opacity-90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (<>Send Recovery Link <ArrowRight className="w-4 h-4" /></>)}
                  </button>
                </form>
                <div className="mt-6 pt-6 border-t border-border text-center">
                  <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Sign In
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
