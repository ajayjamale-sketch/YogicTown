import { useState } from "react";
import { Bell, Shield, Moon, Globe, Smartphone, Save, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import PageLayout from "@/components/layout/PageLayout";
import { cn } from "@/lib/utils";

const settingSections = [
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Moon },
  { id: "language", label: "Language & Region", icon: Globe },
  { id: "devices", label: "Connected Devices", icon: Smartphone },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState("notifications");
  const [notifs, setNotifs] = useState({ email: true, push: true, classes: true, reminders: false, community: true, marketing: false });
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    toast.success("Settings saved successfully!");
    setSaving(false);
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={cn("relative w-11 h-6 rounded-full transition-colors duration-200", checked ? "bg-primary" : "bg-muted")}>
      <div className={cn("absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200", checked ? "translate-x-5" : "translate-x-0")} />
    </button>
  );

  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account preferences and wellness configuration</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-2xl p-2 space-y-0.5">
                {settingSections.map((s) => (
                  <button key={s.id} onClick={() => setActiveSection(s.id)}
                    className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                      activeSection === s.id ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted")}>
                    <s.icon className="w-4 h-4 flex-shrink-0" />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-5">
              {activeSection === "notifications" && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="font-semibold text-foreground mb-1">Notification Preferences</h2>
                  <p className="text-sm text-muted-foreground mb-6">Choose how and when you'd like to be notified</p>
                  <div className="space-y-5">
                    {[
                      { key: "email", label: "Email Notifications", desc: "Receive updates and alerts via email" },
                      { key: "push", label: "Push Notifications", desc: "Real-time alerts on your device" },
                      { key: "classes", label: "Class Reminders", desc: "Get notified before your scheduled classes" },
                      { key: "reminders", label: "Practice Reminders", desc: "Daily reminders to maintain your streak" },
                      { key: "community", label: "Community Activity", desc: "Updates from your circles and challenges" },
                      { key: "marketing", label: "Promotions & Offers", desc: "Special deals and new feature announcements" },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                        <div>
                          <div className="text-sm font-medium text-foreground">{label}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                        </div>
                        <ToggleSwitch checked={notifs[key as keyof typeof notifs]} onChange={() => setNotifs(p => ({ ...p, [key]: !p[key as keyof typeof notifs] }))} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "appearance" && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="font-semibold text-foreground mb-1">Appearance</h2>
                  <p className="text-sm text-muted-foreground mb-6">Customise how YogicTown looks for you</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Theme</label>
                      <div className="grid grid-cols-3 gap-3">
                        {(["light", "dark", "system"] as const).map((t) => (
                          <button key={t} onClick={() => t !== "system" && setTheme(t)}
                            className={cn("flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all capitalize text-sm font-medium",
                              theme === t || (t === "system" && !["light", "dark"].includes(theme)) ? "border-primary bg-sage-light text-primary" : "border-border text-muted-foreground hover:border-primary/40")}>
                            {t === "light" ? "☀️" : t === "dark" ? "🌙" : "💻"}
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "privacy" && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="font-semibold text-foreground mb-1">Privacy & Security</h2>
                  <p className="text-sm text-muted-foreground mb-6">Control your data and account security</p>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-muted/40 border border-border">
                      <div className="text-sm font-medium text-foreground mb-1">Password</div>
                      <div className="text-xs text-muted-foreground mb-3">Last changed 30 days ago</div>
                      <button className="text-sm text-primary hover:underline">Change Password</button>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/40 border border-border">
                      <div className="text-sm font-medium text-foreground mb-1">Two-Factor Authentication</div>
                      <div className="text-xs text-muted-foreground mb-3">Add an extra layer of security to your account</div>
                      <button className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition-opacity">Enable 2FA</button>
                    </div>
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                      <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-1 flex items-center gap-2">
                        <Trash2 className="w-4 h-4" /> Delete Account
                      </div>
                      <div className="text-xs text-red-500/80 mb-3">Permanently delete your account and all data. This cannot be undone.</div>
                      <button className="text-sm text-red-500 hover:underline">Request Account Deletion</button>
                    </div>
                  </div>
                </div>
              )}

              {(activeSection === "language" || activeSection === "devices") && (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <h2 className="font-semibold text-foreground mb-1">{settingSections.find(s => s.id === activeSection)?.label}</h2>
                  <p className="text-sm text-muted-foreground mb-6">This section is coming soon with full configuration options.</p>
                  <div className="flex items-center justify-center h-32 rounded-xl bg-muted/40 border border-dashed border-border">
                    <p className="text-sm text-muted-foreground">Coming Soon</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button onClick={handleSave} disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sage-gradient text-white font-semibold shadow-sage hover:opacity-90 transition-all disabled:opacity-60">
                  {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
