import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Leaf, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-3xl bg-sage-gradient flex items-center justify-center shadow-sage mb-8 animate-float">
        <Leaf className="w-10 h-10 text-white" />
      </div>

      <div className="text-8xl font-serif font-bold text-gradient-sage mb-4">404</div>
      <h1 className="font-serif text-3xl font-bold text-foreground mb-3">Lost on the path?</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-sm">
        The page you're looking for has wandered off into the forest. Let's guide you back to your wellness journey.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-sage-gradient text-white font-semibold shadow-sage hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
        >
          <Home className="w-4 h-4" />
          Return Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-border text-foreground font-medium hover:bg-muted transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-4 max-w-sm">
        {[
          { label: "Home", href: "/" },
          { label: "Features", href: "/features" },
          { label: "Pricing", href: "/pricing" },
          { label: "Blog", href: "/blog" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ].map(({ label, href }) => (
          <Link key={href} to={href} className="text-sm text-muted-foreground hover:text-primary transition-colors text-center py-2">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotFound;
