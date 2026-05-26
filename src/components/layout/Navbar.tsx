import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, Leaf, ChevronDown, User, LogOut, LayoutDashboard, Settings, ChevronRight } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Meditation", href: "/meditation" },
  { label: "Retreats", href: "/retreats" },
  { label: "Instructors", href: "/instructors" },
  { label: "Community", href: "/community" },
  { label: "Pricing", href: "/pricing" },
];

const moreLinks = [
  { label: "Features", href: "/features" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent")}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-sage-gradient flex items-center justify-center shadow-sage group-hover:scale-105 transition-transform duration-200">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-serif text-xl font-semibold text-foreground">
              Yogic<span className="text-sage-dark dark:text-sage">Town</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}
                className={cn("px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === link.href ? "text-primary bg-sage-light dark:bg-sage-light/30" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
                {link.label}
              </Link>
            ))}
            {/* More dropdown */}
            <div className="relative">
              <button onClick={() => setMoreOpen(!moreOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                More <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", moreOpen && "rotate-180")} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-card border border-border rounded-xl shadow-lg overflow-hidden animate-fade-in">
                  {moreLinks.map(link => (
                    <Link key={link.href} to={link.href} className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                      {link.label} <ChevronRight className="w-3 h-3 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            <button onClick={toggleTheme} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted hover:bg-sage-light dark:hover:bg-sage-light/30 transition-all">
                  <img src={user?.avatar} alt={user?.name} className="w-7 h-7 rounded-full object-cover" />
                  <span className="hidden md:block text-sm font-medium text-foreground">{user?.name?.split(" ")[0]}</span>
                  <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", userMenuOpen && "rotate-180")} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-xl shadow-lg overflow-hidden animate-fade-in">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <span className="text-xs text-primary font-medium capitalize">{user?.role?.replace("_", " ")}</span>
                    </div>
                    <div className="p-1">
                      <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"><LayoutDashboard className="w-4 h-4" /> Dashboard</Link>
                      <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"><User className="w-4 h-4" /> Profile</Link>
                      <Link to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"><Settings className="w-4 h-4" /> Settings</Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"><LogOut className="w-4 h-4" /> Sign Out</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">Sign In</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-semibold rounded-xl bg-sage-gradient text-white shadow-sage hover:opacity-90 transition-all hover:shadow-md hover:-translate-y-0.5">Start Free</Link>
              </div>
            )}

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-lg border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {[...navLinks, ...moreLinks].map((link) => (
              <Link key={link.href} to={link.href}
                className={cn("block px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  location.pathname === link.href ? "text-primary bg-sage-light dark:bg-sage-light/30" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="pt-2 flex flex-col gap-2">
                <Link to="/login" className="w-full px-4 py-3 text-center text-sm font-medium rounded-xl border border-border hover:bg-muted transition-colors">Sign In</Link>
                <Link to="/register" className="w-full px-4 py-3 text-center text-sm font-semibold rounded-xl bg-sage-gradient text-white shadow-sage">Start Free</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
