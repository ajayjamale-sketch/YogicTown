import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

export default function CTABanner() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-sage-gradient p-10 lg:p-16 text-center section-fade">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-black/10 blur-3xl -translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Start Your 7-Day Free Trial
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Your Transformation Begins
              <br />
              <span className="italic">Today</span>
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join 50,000+ practitioners who have found balance, peace, and vitality through YogicTown. No commitment required — start for free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-sage-dark font-semibold hover:opacity-90 hover:-translate-y-1 transition-all duration-300 shadow-xl"
              >
                Begin Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/15 text-white border border-white/30 font-medium hover:bg-white/25 transition-all duration-200"
              >
                Explore Features
              </Link>
            </div>
            <p className="text-white/60 text-sm mt-6">
              No credit card required · Cancel anytime · 50,000+ members trust YogicTown
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
