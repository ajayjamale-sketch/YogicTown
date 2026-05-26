import { Link } from "react-router-dom";
import { Leaf, Mail, Instagram, Twitter, Youtube, Heart, Compass, Users, BookOpen, Video } from "lucide-react";

const footerLinks = {
  Practice: [
    { label: "Yoga Programs", href: "/programs" },
    { label: "Meditation Center", href: "/meditation" },
    { label: "Live Classes", href: "/programs" },
    { label: "Wellness Retreats", href: "/retreats" },
  ],
  Community: [
    { label: "Instructors", href: "/instructors" },
    { label: "Community", href: "/community" },
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/about" },
  ],
  Support: [
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Features", href: "/features" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-sage-gradient flex items-center justify-center shadow-sage">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif text-xl font-semibold text-foreground">
                Yogic<span className="text-sage-dark dark:text-sage">Town</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
              Your holistic wellness destination. Connect with certified yoga instructors, explore guided meditation, and discover transformative retreats worldwide.
            </p>
            <div className="flex items-center gap-2 mb-6">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "YouTube" },
                { icon: Mail, label: "Email", href: "mailto:hello@yogictown.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href || "#"} aria-label={label}
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-sage-light transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Users, value: "52K+", label: "Members" },
                { icon: BookOpen, value: "120+", label: "Programs" },
                { icon: Compass, value: "40+", label: "Retreats" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center p-2 rounded-xl bg-muted/50">
                  <Icon className="w-4 h-4 text-primary mx-auto mb-1" />
                  <div className="text-xs font-bold text-foreground">{value}</div>
                  <div className="text-[10px] text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} YogicTown. All rights reserved.</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-warm fill-warm" /> for mindful souls worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
