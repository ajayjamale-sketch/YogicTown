import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Play, BookOpen, Users, Heart, Settings,
  TrendingUp, Flame, Clock, Target, Bell, Search, Menu, X,
  Leaf, LogOut, Calendar, Star, ChevronRight, DollarSign,
  Video, UserCheck, BarChart3, Package, ShieldCheck, Utensils,
  PlusCircle, CheckCircle, AlertCircle, Award, Building2,
  Trash2, Edit2, ShieldAlert, Send
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useStore, Program, Retreat, YogaClass, MealPlan, Consultation } from "@/store/useStore";
import { cn } from "@/lib/utils";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useScrollTop } from "@/hooks/useScrollTop";
import { toast } from "sonner";

export default function Dashboard() {
  useScrollTop();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Overview");
  const { user, logout, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Zustand Store
  const store = useStore();

  const role = (user?.role || "user") as "user" | "instructor" | "wellness_center" | "nutrition_expert" | "admin";
  const handleLogout = () => { logout(); navigate("/"); };

  // Role sidebar items
  const sidebarConfigs = {
    user: [
      { icon: LayoutDashboard, label: "Overview" },
      { icon: Play, label: "Joined Programs" },
      { icon: Heart, label: "Meditations" },
      { icon: Calendar, label: "Habit Tracker" },
      { icon: Star, label: "My Bookings" },
    ],
    instructor: [
      { icon: LayoutDashboard, label: "Overview" },
      { icon: Video, label: "Manage Classes" },
      { icon: Award, label: "Certifications" },
      { icon: Users, label: "Student List" },
    ],
    wellness_center: [
      { icon: LayoutDashboard, label: "Overview" },
      { icon: Package, label: "Retreats Catalog" },
      { icon: Calendar, label: "Guest Bookings" },
    ],
    nutrition_expert: [
      { icon: LayoutDashboard, label: "Overview" },
      { icon: Utensils, label: "Meal Plans" },
      { icon: Users, label: "Client Coaching" },
    ],
    admin: [
      { icon: LayoutDashboard, label: "Overview" },
      { icon: UserCheck, label: "Verification Queue" },
      { icon: ShieldCheck, label: "Moderation Console" },
    ],
  };

  const sidebarItems = sidebarConfigs[role] || sidebarConfigs.user;

  // Modals state hoisted at root to avoid z-index and opacity conflicts from nested stacking contexts
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Form states managed at root
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editLevel, setEditLevel] = useState("Intermediate");

  const [className, setClassName] = useState("");
  const [classTime, setClassTime] = useState("");
  const [classType, setClassType] = useState<"Live" | "Private" | "Group">("Live");

  const [certName, setCertName] = useState("");

  const [retreatTitle, setRetreatTitle] = useState("");
  const [retreatLoc, setRetreatLoc] = useState("");
  const [retreatCountry, setRetreatCountry] = useState("");
  const [retreatPrice, setRetreatPrice] = useState(1000);
  const [retreatDates, setRetreatDates] = useState("");

  const [planName, setPlanName] = useState("");
  const [planCal, setPlanCal] = useState(2000);
  const [bfast, setBfast] = useState("");
  const [lnch, setLnch] = useState("");
  const [dnnr, setDnnr] = useState("");
  const [snck, setSnck] = useState("");

  const [activeClientName, setActiveClientName] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [consultTime, setConsultTime] = useState("");
  const [consultType, setConsultType] = useState<"video" | "chat" | "in-person">("video");
  const [clientProgressVal, setClientProgressVal] = useState(50);

  const [suspendName, setSuspendName] = useState("");

  // Sync form states with editing objects
  useEffect(() => {
    if (activeModal === "profile" && user) {
      setEditName(user.name);
      setEditBio(user.bio || "");
      setEditLocation(user.location || "");
      setEditLevel(user.yogaLevel || "Intermediate");
    } else if (activeModal === "edit_class" && selectedItem) {
      setClassName(selectedItem.name);
      setClassTime(selectedItem.time);
      setClassType(selectedItem.type);
    } else if (activeModal === "edit_retreat" && selectedItem) {
      setRetreatTitle(selectedItem.title);
      setRetreatLoc(selectedItem.location);
      setRetreatCountry(selectedItem.country);
      setRetreatPrice(selectedItem.price);
      setRetreatDates(selectedItem.dates);
    } else if (activeModal === "progress" && selectedItem) {
      setActiveClientName(selectedItem.name);
      setClientProgressVal(selectedItem.progress);
    }
  }, [activeModal, selectedItem, user]);

  // Form Submissions
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setTimeout(() => {
      updateProfile({
        name: editName,
        bio: editBio,
        location: editLocation,
        yogaLevel: editLevel
      });
      setModalLoading(false);
      setActiveModal(null);
      toast.success("Wellness profile updated successfully!");
    }, 600);
  };

  const handleCreateOrEditClass = (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setTimeout(() => {
      if (activeModal === "edit_class" && selectedItem) {
        store.editClass(selectedItem.id, { name: className, time: classTime, type: classType });
        toast.success("Class updated successfully!");
      } else {
        store.createClass({ name: className, time: classTime, type: classType });
        toast.success("New yoga class created!");
      }
      setModalLoading(false);
      setActiveModal(null);
      setSelectedItem(null);
    }, 600);
  };

  const handleUploadCert = (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setTimeout(() => {
      store.uploadCertificate(certName);
      setModalLoading(false);
      setActiveModal(null);
      setCertName("");
      toast.success("Certificate uploaded and verified!");
    }, 600);
  };

  const handleCreateOrEditRetreat = (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setTimeout(() => {
      if (activeModal === "edit_retreat" && selectedItem) {
        store.editRetreat(selectedItem.id, { title: retreatTitle, location: retreatLoc, country: retreatCountry, price: Number(retreatPrice), dates: retreatDates });
        toast.success("Retreat updated successfully!");
      } else {
        store.createRetreat({ title: retreatTitle, location: retreatLoc, country: retreatCountry, price: Number(retreatPrice), dates: retreatDates, organizer: user?.name });
        toast.success("Retreat listing proposed for Admin verification!");
      }
      setModalLoading(false);
      setActiveModal(null);
      setSelectedItem(null);
    }, 600);
  };

  const handleCreateMealPlan = (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setTimeout(() => {
      store.createMealPlan({
        name: planName,
        calories: planCal,
        meals: { breakfast: bfast, lunch: lnch, dinner: dnnr, snack: snck }
      });
      setModalLoading(false);
      setActiveModal(null);
      setPlanName("");
      setBfast("");
      setLnch("");
      setDnnr("");
      setSnck("");
      toast.success("Meal plan created!");
    }, 600);
  };

  const handleAssignMealPlan = (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setTimeout(() => {
      store.assignMealPlan(activeClientName, selectedPlanId);
      setModalLoading(false);
      setActiveModal(null);
      toast.success("Meal plan assigned to client!");
    }, 600);
  };

  const handleScheduleConsult = (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setTimeout(() => {
      store.scheduleConsultation(activeClientName, consultTime, consultType);
      setModalLoading(false);
      setActiveModal(null);
      setConsultTime("");
      toast.success("Consultation session scheduled!");
    }, 600);
  };

  const handleSaveProgress = (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setTimeout(() => {
      store.updateClientProgress(activeClientName, clientProgressVal);
      setModalLoading(false);
      setActiveModal(null);
      setSelectedItem(null);
      toast.success("Client coaching progress updated!");
    }, 600);
  };

  const handleSuspendUser = (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setTimeout(() => {
      store.suspendUser(suspendName);
      setModalLoading(false);
      setActiveModal(null);
      setSuspendName("");
      toast.warning(`User ${suspendName} has been suspended immediately.`);
    }, 600);
  };

  const renderDashboard = () => {
    switch (role) {
      case "instructor":
        return <InstructorDashboard store={store} user={user} activeItem={activeItem} setActiveModal={setActiveModal} setSelectedItem={setSelectedItem} />;
      case "wellness_center":
        return <WellnessCenterDashboard store={store} user={user} activeItem={activeItem} setActiveModal={setActiveModal} setSelectedItem={setSelectedItem} />;
      case "nutrition_expert":
        return <NutritionDashboard store={store} user={user} activeItem={activeItem} setActiveModal={setActiveModal} setSelectedItem={setSelectedItem} />;
      case "admin":
        return <AdminDashboard store={store} user={user} activeItem={activeItem} setActiveModal={setActiveModal} setSelectedItem={setSelectedItem} />;
      default:
        return <UserDashboard store={store} user={user} activeItem={activeItem} setActiveModal={setActiveModal} navigate={navigate} />;
    }
  };

  const roleLabel: Record<string, string> = {
    user: "Wellness User",
    instructor: "Yoga Instructor",
    wellness_center: "Retreat Organizer",
    nutrition_expert: "Nutrition Expert",
    admin: "Admin",
  };

  const roleColors: Record<string, string> = {
    user: "bg-primary/10 text-primary border-primary/20",
    instructor: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    wellness_center: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 border-teal-200 dark:border-teal-800",
    nutrition_expert: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
    admin: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800",
  };

  return (
    <div className="min-h-screen bg-background flex relative">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-sage-gradient flex items-center justify-center shadow-sage">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-serif text-lg font-semibold text-sidebar-foreground">YogicTown</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-sidebar-border">
          <span className={cn("text-xs px-2.5 py-1 border rounded-full font-semibold", roleColors[role])}>
            {roleLabel[role]}
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button key={item.label} onClick={() => { setActiveItem(item.label); setSidebarOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                activeItem === item.label
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div onClick={() => setActiveModal("profile")} className="flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar-accent transition-colors cursor-pointer mb-1">
            <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-sidebar-border" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.plan} plan</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-5 py-4 bg-background/95 backdrop-blur-sm border-b border-border">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="Search platform features..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={toggleTheme} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all" onClick={() => toast.info("No new notifications")}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-warm" />
            </button>
            <div className="cursor-pointer" onClick={() => setActiveModal("profile")}>
              <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-border hover:ring-primary transition-all" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">
          {renderDashboard()}
        </main>
      </div>

      {/* ============================================================= */}
      {/* GLOBAL MODALS (Rendered at root layer to bypass stacking context bugs) */}
      {/* ============================================================= */}

      {/* Edit Profile Modal */}
      {activeModal === "profile" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleSaveProfile} className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl animate-fade-in space-y-4">
            <h3 className="font-serif text-xl font-bold text-foreground">Edit Wellness Profile</h3>
            
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name</label>
              <input type="text" required value={editName} onChange={e => setEditName(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Short Bio</label>
              <textarea value={editBio} onChange={e => setEditBio(e.target.value)} rows={2} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Location</label>
                <input type="text" value={editLocation} onChange={e => setEditLocation(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Yoga Level</label>
                <select value={editLevel} onChange={e => setEditLevel(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all">Cancel</button>
              <button type="submit" disabled={modalLoading} className="flex-1 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all flex items-center justify-center">
                {modalLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Create / Edit Class Modal */}
      {(activeModal === "create_class" || activeModal === "edit_class") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleCreateOrEditClass} className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl animate-fade-in space-y-4">
            <h3 className="font-serif text-xl font-bold text-foreground">
              {activeModal === "edit_class" ? "Edit Yoga Class" : "Create Yoga Class"}
            </h3>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Class Name</label>
              <input type="text" required placeholder="e.g. Vinyasa alignment masterclass" value={className} onChange={e => setClassName(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Time & Days</label>
              <input type="text" required placeholder="e.g. Wed at 3:00 PM" value={classTime} onChange={e => setClassTime(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Class Type</label>
              <select value={classType} onChange={e => setClassType(e.target.value as any)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Live">Live Stream Session</option>
                <option value="Group">Group Session</option>
                <option value="Private">Private 1-on-1 Session</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => { setActiveModal(null); setSelectedItem(null); }} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all">Cancel</button>
              <button type="submit" disabled={modalLoading} className="flex-1 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all flex items-center justify-center">
                {modalLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : activeModal === "edit_class" ? "Save Changes" : "Create Class"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Upload Certificate Modal */}
      {activeModal === "cert" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleUploadCert} className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl animate-fade-in space-y-4">
            <h3 className="font-serif text-xl font-bold text-foreground">Upload Professional Certificate</h3>
            
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Certificate Title</label>
              <input type="text" required placeholder="e.g. Ashtanga Yoga Specialist 100h" value={certName} onChange={e => setCertName(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Certificate File (Simulated)</label>
              <div className="border border-dashed border-border rounded-xl p-6 text-center text-xs text-muted-foreground bg-muted/40 cursor-pointer hover:bg-muted/80 transition-colors">
                Click or drag PDF certificate here to upload
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all">Cancel</button>
              <button type="submit" disabled={modalLoading} className="flex-1 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all flex items-center justify-center">
                {modalLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify Certificate"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Create / Edit Retreat Modal */}
      {(activeModal === "create_retreat" || activeModal === "edit_retreat") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleCreateOrEditRetreat} className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl animate-fade-in space-y-4">
            <h3 className="font-serif text-xl font-bold text-foreground">
              {activeModal === "edit_retreat" ? "Edit Retreat Details" : "Propose Retreat"}
            </h3>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Retreat Title</label>
              <input type="text" required placeholder="e.g. 7-Day Silent meditation Ubud" value={retreatTitle} onChange={e => setRetreatTitle(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">City/Region</label>
                <input type="text" required placeholder="e.g. Ubud, Bali" value={retreatLoc} onChange={e => setRetreatLoc(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Country</label>
                <input type="text" required placeholder="e.g. Indonesia" value={retreatCountry} onChange={e => setRetreatCountry(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Price per guest ($)</label>
                <input type="number" required value={retreatPrice} onChange={e => setRetreatPrice(Number(e.target.value))} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Dates Range</label>
                <input type="text" required placeholder="e.g. Jun 15 - 22, 2025" value={retreatDates} onChange={e => setRetreatDates(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => { setActiveModal(null); setSelectedItem(null); }} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all">Cancel</button>
              <button type="submit" disabled={modalLoading} className="flex-1 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all flex items-center justify-center">
                {modalLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : activeModal === "edit_retreat" ? "Save Details" : "Propose Retreat"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Create Meal Plan Modal */}
      {activeModal === "create_meal" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleCreateMealPlan} className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl animate-fade-in space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-foreground">Create Meal Plan</h3>
            
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Plan Name</label>
              <input type="text" required placeholder="e.g. Detox Pitta Diet" value={planName} onChange={e => setPlanName(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Target Calories</label>
              <input type="number" required value={planCal} onChange={e => setPlanCal(Number(e.target.value))} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-foreground border-b pb-1">Meals Breakdown</h4>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground mb-1">Breakfast Option</label>
                <input type="text" required placeholder="e.g. Avocado Toast & Papaya" value={bfast} onChange={e => setBfast(e.target.value)} className="w-full px-3 py-1.5 border border-input rounded-lg bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground mb-1">Lunch Option</label>
                <input type="text" required placeholder="e.g. Lentil soup and brown rice" value={lnch} onChange={e => setLnch(e.target.value)} className="w-full px-3 py-1.5 border border-input rounded-lg bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground mb-1">Dinner Option</label>
                <input type="text" placeholder="e.g. Roasted sweet potatoes & tofu" value={dnnr} onChange={e => setDnnr(e.target.value)} className="w-full px-3 py-1.5 border border-input rounded-lg bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-muted-foreground mb-1">Snack Option</label>
                <input type="text" placeholder="e.g. Chia seeds pudding" value={snck} onChange={e => setSnck(e.target.value)} className="w-full px-3 py-1.5 border border-input rounded-lg bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all">Cancel</button>
              <button type="submit" disabled={modalLoading} className="flex-1 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all flex items-center justify-center">
                {modalLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Save Plan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Assign Meal Plan Modal */}
      {activeModal === "assign_meal" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleAssignMealPlan} className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl animate-fade-in space-y-4">
            <h3 className="font-serif text-xl font-bold text-foreground">Assign Meal Plan to Client</h3>
            
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Select Client</label>
              <select required value={activeClientName} onChange={e => setActiveClientName(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">-- Choose Client --</option>
                {store.clients.map((c: any) => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Select Plan</label>
              <select required value={selectedPlanId} onChange={e => setSelectedPlanId(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">-- Choose Plan --</option>
                {store.mealPlans.map((p: MealPlan) => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all">Cancel</button>
              <button type="submit" disabled={modalLoading} className="flex-1 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all flex items-center justify-center">
                {modalLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Assign Plan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Schedule Consultation Modal */}
      {activeModal === "schedule_call" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleScheduleConsult} className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl animate-fade-in space-y-4">
            <h3 className="font-serif text-xl font-bold text-foreground">Schedule Consultation</h3>
            
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Select Client</label>
              <select required value={activeClientName} onChange={e => setActiveClientName(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">-- Choose Client --</option>
                {store.clients.map((c: any) => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Date & Time</label>
              <input type="text" required placeholder="e.g. Friday, 3:00 PM" value={consultTime} onChange={e => setConsultTime(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Consultation Type</label>
              <select value={consultType} onChange={e => setConsultType(e.target.value as any)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="video">Video Call (Simulated)</option>
                <option value="chat">Chat Consultation</option>
                <option value="in-person">In-Person Meet</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all">Cancel</button>
              <button type="submit" disabled={modalLoading} className="flex-1 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all flex items-center justify-center">
                {modalLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Schedule Call"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Update Client Progress Modal */}
      {activeModal === "progress" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleSaveProgress} className="bg-card border border-border rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-fade-in space-y-4">
            <h3 className="font-serif text-lg font-bold text-foreground">Update Coaching Progress</h3>
            <p className="text-xs text-muted-foreground">Adjust the goals completed progress for client: {activeClientName}</p>
            
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold text-foreground">
                <span>Progress level</span>
                <span>{clientProgressVal}%</span>
              </div>
              <input type="range" min="0" max="100" value={clientProgressVal} onChange={e => setClientProgressVal(Number(e.target.value))} className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary" />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => { setActiveModal(null); setSelectedItem(null); }} className="flex-1 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all">Cancel</button>
              <button type="submit" disabled={modalLoading} className="flex-1 py-2 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all flex items-center justify-center">
                {modalLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Update Progress"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Suspend Account Modal */}
      {activeModal === "suspend" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleSuspendUser} className="bg-card border border-border rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-fade-in space-y-4">
            <h3 className="font-serif text-lg font-bold text-red-500 flex items-center gap-1.5">
              <ShieldAlert className="w-5 h-5" /> Suspend Platform User
            </h3>
            <p className="text-xs text-muted-foreground">Enter full user name or email to suspend their session and lock them out of YogicTown services.</p>
            
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">User Identifier</label>
              <input type="text" required placeholder="e.g. John Doe or john@example.com" value={suspendName} onChange={e => setSuspendName(e.target.value)} className="w-full px-3 py-2 border border-input rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setActiveModal(null)} className="flex-1 py-2 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-all">Cancel</button>
              <button type="submit" disabled={modalLoading} className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all flex items-center justify-center">
                {modalLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Confirm Lockout"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reports Modal */}
      {activeModal === "reports" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl animate-fade-in space-y-4">
            <h3 className="font-serif text-xl font-bold text-foreground">Platform Activity Report</h3>
            
            <div className="space-y-3 text-xs text-muted-foreground">
              <div className="flex justify-between border-b pb-1">
                <span>Active Sessions (24h):</span>
                <span className="font-semibold text-foreground">14,248</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Completed Meditations (Weekly):</span>
                <span className="font-semibold text-foreground">89,120 mins</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>Retreat Bookings Confirmed:</span>
                <span className="font-semibold text-foreground">84</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>System Server Uptime:</span>
                <span className="font-semibold text-green-600">99.98% Healthy</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span>License Violations reported:</span>
                <span className="font-semibold text-foreground">0</span>
              </div>
            </div>

            <div className="flex pt-2">
              <button onClick={() => setActiveModal(null)} className="w-full py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage">
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================
// SUB-DASHBOARD: WELLNESS USER
// =============================================================
function UserDashboard({ store, user, activeItem, setActiveModal, navigate }: any) {
  const enrolled = store.programs.filter((p: Program) => store.enrolledPrograms.includes(p.id));
  const userBookings = store.bookings.filter((b: any) => b.clientName === user?.name);
  const favorites = store.meditations.filter((s: any) => store.favorites.includes(s.id));

  const handleWaterClick = () => {
    store.addWater(250);
    toast.success("Hydration logged! +250ml 💧");
  };

  const handleWaterReset = () => {
    store.addWater(-store.waterIntake);
    toast.info("Hydration log reset.");
  };

  const handleHabitToggle = (id: string, name: string) => {
    store.toggleHabit(id);
    const item = store.habits.find((h: any) => h.id === id);
    toast.success(`${name} ${!item?.completed ? "completed! 🌟" : "marked incomplete"}`);
  };

  const handleContinueSession = (program: Program) => {
    store.completeProgramSession(program.id);
    const progress = store.programProgress[program.id] || 0;
    toast.success(`Logged class for "${program.title}"! (${progress + 1}/${program.sessions} sessions)`);
  };

  // Section 1: Overview Dashboard
  if (activeItem === "Overview") {
    return (
      <div className="space-y-8 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">Good morning, {user?.name?.split(" ")[0]} 🌿</h1>
            <p className="text-muted-foreground mt-1">You're on a {store.wellnessStreak}-day streak. Keep your energy high!</p>
          </div>
          <button onClick={() => setActiveModal("profile")} className="px-4 py-2 text-sm font-semibold rounded-xl bg-sage-gradient text-white shadow-sage hover:opacity-90 transition-all self-start sm:self-auto">
            Edit Wellness Profile
          </button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Wellness Streak", value: `${store.wellnessStreak} days`, icon: Flame, color: "text-warm bg-orange-50 dark:bg-orange-900/20", change: "+1 today" },
            { label: "Joined Programs", value: `${store.enrolledPrograms.length} Active`, icon: Play, color: "text-primary bg-sage-light", change: `${enrolled.length} in progress` },
            { label: "Meditation Time", value: `${store.meditationMinutes} mins`, icon: Clock, color: "text-teal-600 bg-teal-50 dark:bg-teal-900/20", change: `Streak: ${store.meditationStreak} days` },
            { label: "Water Intake", value: `${store.waterIntake} ml`, icon: Target, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20", change: "Daily goal: 2000ml" },
          ].map(({ label, value, icon: Icon, color, change }) => (
            <div key={label} className="p-5 rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
              <div className="font-serif text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              <div className="text-xs text-green-600 mt-1 font-medium">{change}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Meditation Progress Graph */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground">Meditation Tracker</h3>
                <p className="text-sm text-muted-foreground">Minutes per day</p>
              </div>
              <span className="text-xs bg-sage-light text-primary px-3 py-1.5 rounded-full font-medium font-sans">Weekly meditation trend</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={store.meditationHistory}>
                <defs>
                  <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#dashGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Habit Tracker list */}
          <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Habit Checklist</h3>
              <div className="space-y-3.5">
                {store.habits.slice(0, 3).map((h: any) => (
                  <div key={h.id} className="flex items-center justify-between">
                    <span className={cn("text-sm transition-colors", h.completed ? "line-through text-muted-foreground" : "text-foreground font-medium")}>{h.name}</span>
                    <button onClick={() => handleHabitToggle(h.id, h.name)} className={cn("w-6 h-6 rounded-lg flex items-center justify-center border transition-all", h.completed ? "bg-primary border-primary text-white" : "border-input hover:border-primary")}>
                      {h.completed && <CheckCircle className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleWaterClick} className="w-full mt-6 py-2.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/10 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all flex items-center justify-center gap-1.5">
              Log Water Intake (250ml) 💧
            </button>
          </div>
        </div>

        {/* Quick Navigation Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Join Program", action: () => navigate("/programs") },
            { label: "Start Meditation", action: () => navigate("/meditation") },
            { label: "Join Community", action: () => navigate("/community") },
            { label: "Book Retreat", action: () => navigate("/retreats") },
          ].map(btn => (
            <button key={btn.label} onClick={btn.action} className="py-3 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all">{btn.label}</button>
          ))}
        </div>
      </div>
    );
  }

  // Section 2: Joined Programs Page
  if (activeItem === "Joined Programs") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Joined Yoga Programs</h2>
          <p className="text-sm text-muted-foreground mt-1">Practice consistently to build healthy body routines</p>
        </div>

        {enrolled.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-12 text-center bg-card">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4 animate-bounce" />
            <h3 className="text-lg font-semibold text-foreground mb-1">No Programs Started</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">Explore our curated wellness challenges and start your path today.</p>
            <button onClick={() => navigate("/programs")} className="px-5 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all">
              Browse Programs Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolled.map((course: Program) => {
              const current = store.programProgress[course.id] || 0;
              const percent = Math.min(100, Math.floor((current / course.sessions) * 100));
              return (
                <div key={course.id} className="group rounded-3xl bg-card border border-border overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between h-[360px]">
                  <div className="relative h-40 overflow-hidden flex-shrink-0">
                    <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium bg-white/90 text-foreground">{course.style}</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-base text-foreground mb-1 line-clamp-1">{course.title}</h4>
                      <p className="text-xs text-muted-foreground mb-4">Instructor: {course.instructor}</p>
                      <div className="text-xs text-muted-foreground mb-2 flex justify-between">
                        <span>Progress: {percent}%</span>
                        <span>{current}/{course.sessions} Sessions</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 mb-4">
                        <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                    <button onClick={() => handleContinueSession(course)} className="w-full py-2.5 rounded-xl bg-sage-gradient text-white text-xs font-semibold shadow-sage hover:opacity-90 transition-all">
                      Log Today's Practice Session
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Section 3: Meditations Tab
  if (activeItem === "Meditations") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Meditations Tracker</h2>
          <p className="text-sm text-muted-foreground mt-1">Calm your mind and reflect daily to reduce cortisol levels</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-warm bg-orange-50 dark:bg-orange-900/20"><Flame className="w-5 h-5" /></div>
            <div className="font-serif text-2xl font-bold text-foreground">{store.meditationStreak} Days</div>
            <div className="text-xs text-muted-foreground mt-0.5">Consecutive Practice Streak</div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-primary bg-sage-light"><Clock className="w-5 h-5" /></div>
            <div className="font-serif text-2xl font-bold text-foreground">{store.meditationMinutes} Mins</div>
            <div className="text-xs text-muted-foreground mt-0.5">Total Practice Minutes Logged</div>
          </div>
          <div className="p-5 rounded-2xl bg-card border border-border hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-red-500 bg-red-50 dark:bg-red-950/20"><Heart className="w-5 h-5" /></div>
            <div className="font-serif text-2xl font-bold text-foreground">{favorites.length} Sessions</div>
            <div className="text-xs text-muted-foreground mt-0.5">Favorited Soundscapes</div>
          </div>
        </div>

        {/* Meditation Graph */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Minutes Meditated (Past week)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={store.meditationHistory}>
              <XAxis dataKey="d" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="hsl(var(--primary)/0.1)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Favorite sessions */}
        <div>
          <h3 className="font-semibold text-foreground mb-4">My Favorited Meditations</h3>
          {favorites.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-8 text-center bg-card text-muted-foreground text-sm">
              No sessions favorited yet. Favorited tracks will appear here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites.map((session: any) => (
                <div key={session.id} className="p-4 rounded-2xl border border-border bg-card flex gap-4 items-center">
                  <img src={session.img} alt={session.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-foreground truncate">{session.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Guide: {session.guide} · Duration: {session.duration}</p>
                  </div>
                  <button onClick={() => { store.playMeditation(session.id, parseInt(session.duration) || 10); toast.success(`Playing soundscape "${session.title}" 🧘`); }} className="w-9 h-9 rounded-full bg-sage-gradient text-white flex items-center justify-center shadow-sage hover:opacity-90 flex-shrink-0">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Section 4: Habit Tracker Tab
  if (activeItem === "Habit Tracker") {
    const completedHabits = store.habits.filter((h: any) => h.completed).length;
    const progressPercent = Math.round((completedHabits / store.habits.length) * 100);

    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Habits & Hydration</h2>
          <p className="text-sm text-muted-foreground mt-1">Track daily actions to manifest positive spiritual development</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Habits checklist card */}
          <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Habits Checklist</h3>
                <span className="text-xs font-semibold text-primary">{progressPercent}% Completed</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 mb-5">
                <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="space-y-4">
                {store.habits.map((h: any) => (
                  <div key={h.id} className="flex items-center justify-between">
                    <span className={cn("text-sm transition-all", h.completed ? "line-through text-muted-foreground" : "text-foreground font-medium")}>{h.name}</span>
                    <button onClick={() => handleHabitToggle(h.id, h.name)} className={cn("w-6 h-6 rounded-lg flex items-center justify-center border transition-all", h.completed ? "bg-primary border-primary text-white" : "border-input hover:border-primary")}>
                      {h.completed && <CheckCircle className="w-4 h-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hydration Tracker Card */}
          <div className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between h-[300px]">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Daily Hydration Log</h3>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-bold text-foreground">{store.waterIntake} ml</span>
                <span className="text-xs text-muted-foreground">Daily Target: 2,000ml</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-4">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, Math.round((store.waterIntake / 2000) * 100))}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">Keep your hydration optimal during hot temperatures or intense flows. 💧</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleWaterReset} className="px-3 py-2.5 rounded-xl border border-border text-xs text-muted-foreground hover:bg-muted font-semibold flex-1">
                Reset
              </button>
              <button onClick={handleWaterClick} className="py-2.5 rounded-xl bg-blue-500 text-white text-xs font-semibold shadow-blue-200 hover:opacity-90 transition-all flex-2 text-center w-full">
                Log +250ml Water
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Section 5: Bookings Tab
  if (activeItem === "My Bookings") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">My Retreat Bookings</h2>
          <p className="text-sm text-muted-foreground mt-1">Review active, pending, and completed spiritual retreat plans</p>
        </div>

        {userBookings.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border p-12 text-center bg-card">
            <Star className="w-12 h-12 mx-auto text-muted-foreground mb-4 animate-pulse" />
            <h3 className="text-lg font-semibold text-foreground mb-1">No Booked Retreats</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">Immerse yourself in nature. Browse our retreats catalogue today.</p>
            <button onClick={() => navigate("/retreats")} className="px-5 py-2.5 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all">
              Browse Retreats
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userBookings.map((b: any) => (
              <div key={b.id} className="p-5 rounded-2xl bg-card border border-border flex items-center justify-between shadow-sm">
                <div>
                  <h4 className="font-semibold text-base text-foreground">{b.retreatTitle}</h4>
                  <div className="text-xs text-muted-foreground mt-1.5 flex flex-col gap-0.5">
                    <span>📅 Booked Date: {b.date}</span>
                    <span>💰 Total Price paid: ${b.amount.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={cn("text-xs px-3 py-1 rounded-full font-semibold capitalize", b.status === "confirmed" ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "bg-amber-100 text-amber-600 dark:bg-amber-900/30")}>
                    {b.status}
                  </span>
                  <button onClick={() => toast.info("Retreat details pack downloaded!")} className="text-[10px] text-primary font-semibold hover:underline">
                    Download PDF Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

// =============================================================
// SUB-DASHBOARD: YOGA INSTRUCTOR
// =============================================================
function InstructorDashboard({ store, user, activeItem, setActiveModal, setSelectedItem }: any) {
  const upcoming = store.classes.filter((c: YogaClass) => c.status !== "completed");
  const revenueData = [
    { m: "Jan", v: 1200 }, { m: "Feb", v: 1500 }, { m: "Mar", v: 1800 },
    { m: "Apr", v: 2200 }, { m: "May", v: 2400 }, { m: "Jun", v: (user?.revenue || 28500) % 5000 },
  ];

  const handleOpenEdit = (cls: YogaClass) => {
    setSelectedItem(cls);
    setActiveModal("edit_class");
  };

  const handleStartSession = (id: string, name: string) => {
    store.startClassSession(id);
    toast.success(`Class "${name}" is now live! Streaming started 🔴`);
  };

  const handleApproveStudent = (name: string) => {
    store.approveStudent(name);
    toast.success(`Approved registration for ${name}!`);
  };

  if (activeItem === "Overview") {
    return (
      <div className="space-y-8 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">Welcome back, {user?.name?.split(" ")[0]} 🧘</h1>
            <p className="text-muted-foreground mt-1">You have {upcoming.length} upcoming sessions scheduled</p>
          </div>
          <button onClick={() => setActiveModal("create_class")} className="px-4 py-2 text-sm font-semibold rounded-xl bg-sage-gradient text-white shadow-sage hover:opacity-90 transition-all flex items-center gap-1">
            <PlusCircle className="w-4 h-4" /> Create Yoga Class
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Students", value: (user?.studentsCount || 1248).toLocaleString(), icon: Users, color: "text-primary bg-sage-light", change: "Active learners" },
            { label: "Classes Created", value: store.classes.length, icon: Video, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20", change: "Live/Private/Group" },
            { label: "Instructor Rating", value: `${user?.rating || 4.9}★`, icon: Star, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20", change: "From student feedback" },
            { label: "Earnings Total", value: `$${(user?.revenue || 28500).toLocaleString()}`, icon: DollarSign, color: "text-green-600 bg-green-50 dark:bg-green-900/20", change: "+$340 this week" },
          ].map(({ label, value, icon: Icon, color, change }) => (
            <div key={label} className="p-5 rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
              <div className="font-serif text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              <div className="text-xs text-green-600 mt-1 font-medium">{change}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Instructor Revenue (6 Months)</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={revenueData}>
                <XAxis dataKey="m" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="v" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Classes Quick Schedule</h3>
            {store.classes.slice(0, 3).map((cls: any) => (
              <div key={cls.id} className="flex justify-between items-center py-2.5 border-b border-border last:border-0 text-sm">
                <div>
                  <div className="font-semibold text-foreground">{cls.name}</div>
                  <div className="text-xs text-muted-foreground">{cls.time} · {cls.type}</div>
                </div>
                {cls.status === "scheduled" ? (
                  <button onClick={() => handleStartSession(cls.id, cls.name)} className="text-xs px-2.5 py-1 rounded-lg bg-sage-gradient text-white">Start</button>
                ) : (
                  <span className="text-xs text-red-500 font-bold flex items-center gap-1 animate-pulse">🔴 Live</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeItem === "Manage Classes") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Manage Classes</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Control live-streaming sessions and modify scheduling details</p>
          </div>
          <button onClick={() => setActiveModal("create_class")} className="px-4 py-2 text-sm font-semibold rounded-xl bg-sage-gradient text-white shadow-sage flex items-center gap-1">
            <PlusCircle className="w-4 h-4" /> Create Class
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border">
          {store.classes.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No classes scheduled. Create one above!</div>
          ) : (
            <div className="space-y-4">
              {store.classes.map((cls: YogaClass) => (
                <div key={cls.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <div className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      {cls.name}
                      {cls.status === "live" && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{cls.time} · {cls.students} students · {cls.type}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenEdit(cls)} className="p-2 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => { store.deleteClass(cls.id); toast.success("Class removed"); }} className="p-2 rounded-lg border border-red-100 hover:bg-red-50 dark:hover:bg-red-950/10 text-red-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {cls.status !== "live" && (
                      <button onClick={() => handleStartSession(cls.id, cls.name)} className="text-xs px-3 py-1.5 rounded-lg bg-sage-gradient text-white font-semibold">
                        Start Live
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeItem === "Certifications") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Verified Certifications</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Submit qualifications to access elite yoga program listings</p>
          </div>
          <button onClick={() => setActiveModal("cert")} className="px-4 py-2 text-sm font-semibold rounded-xl bg-sage-gradient text-white shadow-sage">
            Upload Certificate
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {store.certifications.map((cert: string) => (
              <div key={cert} className="p-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/10 flex items-center justify-between">
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                  <Award className="w-5 h-5 flex-shrink-0" /> {cert}
                </span>
                <span className="text-[10px] text-green-600 font-bold bg-green-50 border border-green-200 px-2 py-0.5 rounded-full uppercase">Verified</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeItem === "Student List") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Active & Pending Student Registrations</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Approve registration requests for Vinyasa Live and 1-on-1 aligns</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="space-y-4">
            {[
              { name: "John Doe", class: "Morning Vinyasa", date: "Applied today" },
              { name: "Aria Sharma", class: "Restorative Yin Flow", date: "Applied yesterday" }
            ].map(stud => (
              <div key={stud.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <div className="text-sm font-semibold text-foreground">{stud.name}</div>
                  <div className="text-xs text-muted-foreground">Class: {stud.class} · {stud.date}</div>
                </div>
                <button onClick={() => handleApproveStudent(stud.name)} className="px-3 py-1 text-xs font-semibold rounded-lg bg-sage-light text-primary hover:bg-primary hover:text-white transition-all">
                  Approve Registration
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// =============================================================
// SUB-DASHBOARD: RETREAT ORGANIZER
// =============================================================
function WellnessCenterDashboard({ store, user, activeItem, setActiveModal, setSelectedItem }: any) {
  const activeRetreats = store.retreats.filter((r: Retreat) => r.organizer === user?.name);

  const handleOpenEdit = (r: Retreat) => {
    setSelectedItem(r);
    setActiveModal("edit_retreat");
  };

  const handlePublish = (id: number) => {
    store.publishRetreatEvent(id);
    toast.success("Retreat published & listed publicly!");
  };

  const handleBookingConfirm = (id: string, name: string) => {
    store.updateBookingStatus(id, "confirmed");
    toast.success(`Booking for ${name} confirmed!`);
  };

  if (activeItem === "Overview") {
    return (
      <div className="space-y-8 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">Welcome, {user?.name} 🏡</h1>
            <p className="text-muted-foreground mt-1">3 retreats active · Bookings pending</p>
          </div>
          <button onClick={() => setActiveModal("create_retreat")} className="px-4 py-2 text-sm font-semibold rounded-xl bg-sage-gradient text-white shadow-sage hover:opacity-90 transition-all flex items-center gap-1">
            <PlusCircle className="w-4 h-4" /> Add Retreat Listing
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings", value: store.bookings.length, icon: Calendar, color: "text-primary bg-sage-light", change: "+148 this month" },
            { label: "Managed Retreats", value: activeRetreats.length, icon: Package, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20", change: "Approved catalog" },
            { label: "Revenue Total", value: `$${(user?.revenue || 142000).toLocaleString()}`, icon: DollarSign, color: "text-green-600 bg-green-50 dark:bg-green-900/20", change: "Updated automatically" },
            { label: "Business Rating", value: `${user?.rating || 4.8}★`, icon: Star, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20", change: "From guest reviews" },
          ].map(({ label, value, icon: Icon, color, change }) => (
            <div key={label} className="p-5 rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
              <div className="font-serif text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              <div className="text-xs text-green-600 mt-1 font-medium">{change}</div>
            </div>
          ))}
        </div>

        {/* Recent Bookings Overview */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Recent Bookings</h3>
          <div className="space-y-4">
            {store.bookings.slice(0, 3).map((b: any) => (
              <div key={b.id} className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-0">
                <div>
                  <div className="font-semibold text-foreground">{b.retreatTitle}</div>
                  <div className="text-xs text-muted-foreground">Guest: {b.clientName} · Date: {b.date}</div>
                </div>
                <span className={cn("text-xs px-2.5 py-1 rounded-full font-semibold", b.status === "confirmed" ? "bg-green-50 text-green-600 dark:bg-green-950/20" : "bg-amber-50 text-amber-600 dark:bg-amber-950/20")}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeItem === "Retreats Catalog") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Retreats Catalog</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Edit proposed retreat listings or publish verified retreat details</p>
          </div>
          <button onClick={() => setActiveModal("create_retreat")} className="px-4 py-2 text-sm font-semibold rounded-xl bg-sage-gradient text-white shadow-sage flex items-center gap-1">
            <PlusCircle className="w-4 h-4" /> Add Retreat Listing
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeRetreats.map((r: Retreat) => (
            <div key={r.id} className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between h-[220px]">
              <div>
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-base text-foreground line-clamp-1">{r.title}</h4>
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-bold uppercase", r.approved ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "bg-red-100 text-red-500 dark:bg-red-950/20")}>
                    {r.approved ? "Verified" : "Pending Admin"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-2 flex flex-col gap-0.5">
                  <span>📍 Location: {r.location}, {r.country}</span>
                  <span>💰 Pricing: ${r.price} per head</span>
                  <span>📅 Dates: {r.dates} · Tag: {r.tag}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-border">
                <button onClick={() => handleOpenEdit(r)} className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => { store.deleteRetreat(r.id); toast.success("Retreat deleted"); }} className="px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-50 dark:hover:bg-red-950/10 text-xs flex items-center gap-1 text-red-500">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
                {r.tag !== "Published" && r.approved && (
                  <button onClick={() => handlePublish(r.id)} className="px-3 py-1.5 rounded-lg bg-sage-gradient text-white text-xs font-semibold shadow-sage ml-auto">
                    Publish Event
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeItem === "Guest Bookings") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Guest Bookings Management</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Confirm retreat bookings to unlock registration billing metrics</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border text-left">
                  <th className="pb-3 font-semibold">Retreat Name</th>
                  <th className="pb-3 font-semibold">Client</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {store.bookings.map((b: any) => (
                  <tr key={b.id} className="border-b border-border last:border-0 text-sm">
                    <td className="py-3.5 font-medium text-foreground">{b.retreatTitle}</td>
                    <td className="py-3.5 text-muted-foreground">{b.clientName}</td>
                    <td className="py-3.5 text-muted-foreground">{b.date}</td>
                    <td className="py-3.5 font-semibold text-foreground">${b.amount.toLocaleString()}</td>
                    <td className="py-3.5">
                      <span className={cn("text-xs px-2.5 py-1 rounded-full font-semibold capitalize", b.status === "confirmed" ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "bg-amber-100 text-amber-600 dark:bg-amber-900/30")}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      {b.status === "pending" && (
                        <button onClick={() => handleBookingConfirm(b.id, b.clientName)} className="text-xs px-3 py-1.5 rounded-lg bg-sage-gradient text-white font-semibold">
                          Confirm Booking
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// =============================================================
// SUB-DASHBOARD: NUTRITION EXPERT
// =============================================================
function NutritionDashboard({ store, user, activeItem, setActiveModal, setSelectedItem }: any) {
  const openProgressModal = (name: string, progress: number) => {
    setSelectedItem({ name, progress });
    setActiveModal("progress");
  };

  if (activeItem === "Overview") {
    return (
      <div className="space-y-8 animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">Welcome back, Dr. Meera 🥗</h1>
            <p className="text-muted-foreground mt-1">{store.clients.length} active client profiles</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setActiveModal("create_meal")} className="px-4 py-2 text-sm font-semibold rounded-xl bg-sage-gradient text-white shadow-sage hover:opacity-90 transition-all flex items-center gap-1">
              <PlusCircle className="w-4 h-4" /> Create Meal Plan
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Coached Clients", value: store.clients.length, icon: Users, color: "text-primary bg-sage-light", change: "Diet consulting active" },
            { label: "Diet Plans", value: store.mealPlans.length, icon: Utensils, color: "text-warm bg-orange-50 dark:bg-orange-900/20", change: "Custom recipes created" },
            { label: "Client Success", value: "74%", icon: TrendingUp, color: "text-green-600 bg-green-50 dark:bg-green-900/20", change: "+6% this week" },
            { label: "Ecosystem Rev", value: `$${(user?.revenue || 19200).toLocaleString()}`, icon: DollarSign, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20", change: "Consultation rates" },
          ].map(({ label, value, icon: Icon, color, change }) => (
            <div key={label} className="p-5 rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
              <div className="font-serif text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              <div className="text-xs text-green-600 mt-1 font-medium">{change}</div>
            </div>
          ))}
        </div>

        {/* Upcoming Consultations */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Consultations Scheduled</h3>
          <div className="space-y-4">
            {store.consultations.map((con: any) => (
              <div key={con.id} className="flex justify-between items-center text-sm border-b border-border pb-2 last:border-0">
                <div>
                  <div className="font-semibold text-foreground">{con.clientName}</div>
                  <div className="text-xs text-muted-foreground">{con.time} · {con.type} consultation</div>
                </div>
                <button onClick={() => toast.success(`Starting consult stream call with ${con.clientName}! 📹`)} className="text-xs px-3 py-1 rounded-lg bg-sage-gradient text-white">Start</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeItem === "Meal Plans") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Meal Plans Catalog</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Design or assign Ayurvedic nutrition programs for clients</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setActiveModal("assign_meal")} className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground">Assign Plan</button>
            <button onClick={() => setActiveModal("create_meal")} className="px-4 py-2 text-sm font-semibold rounded-xl bg-sage-gradient text-white shadow-sage">Create Plan</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {store.mealPlans.map((plan: MealPlan) => (
            <div key={plan.id} className="p-5 rounded-2xl border border-border bg-card flex flex-col justify-between h-[230px]">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-base text-foreground">{plan.name}</h4>
                  <span className="text-xs text-primary font-bold bg-sage-light px-2.5 py-1 rounded-full">{plan.calories} kcal</span>
                </div>
                <div className="text-xs text-muted-foreground mt-4 grid grid-cols-2 gap-2">
                  <div>🍳 Breakfast: {plan.meals.breakfast}</div>
                  <div>🥣 Lunch: {plan.meals.lunch}</div>
                  <div>🍲 Dinner: {plan.meals.dinner}</div>
                  <div>🍎 Snack: {plan.meals.snack}</div>
                </div>
              </div>
              {plan.assignedTo ? (
                <div className="text-xs text-orange-500 font-semibold border-t border-border pt-2">Assigned to client: {plan.assignedTo}</div>
              ) : (
                <div className="text-xs text-muted-foreground border-t border-border pt-2">Unassigned plan</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeItem === "Client Coaching") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">Coaching Hub</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Edit client progress values or schedule consultation sessions</p>
          </div>
          <button onClick={() => setActiveModal("schedule_call")} className="px-4 py-2 text-sm font-semibold rounded-xl bg-sage-gradient text-white shadow-sage">
            Schedule Call
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Clients Directory</h3>
            <div className="space-y-4">
              {store.clients.map((c: any) => (
                <div key={c.name} className="flex items-center gap-4 py-1">
                  <img src={c.img} alt={c.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-foreground">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.sessions} sessions</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1.5 truncate">Plan: {c.plan}</div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${c.progress}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-2 flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{c.progress}%</span>
                    <button onClick={() => openProgressModal(c.name, c.progress)} className="text-[10px] px-2 py-0.5 rounded border hover:bg-muted text-muted-foreground">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Consultations</h3>
            <div className="space-y-4">
              {store.consultations.map((con: Consultation) => (
                <div key={con.id} className="flex justify-between items-center py-2 border-b border-border last:border-0 text-sm">
                  <div>
                    <div className="font-semibold text-foreground">{con.clientName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{con.time} · {con.type} meet</div>
                  </div>
                  <button onClick={() => toast.success(`Connecting call to ${con.clientName}... 📽️`)} className="px-3 py-1.5 rounded-lg bg-sage-gradient text-white text-xs font-semibold">Call</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// =============================================================
// SUB-DASHBOARD: ADMIN
// =============================================================
function AdminDashboard({ store, user, activeItem, setActiveModal, setSelectedItem }: any) {
  const pending = store.pendingInstructors.filter((ins: any) => !ins.verified);
  const pendingRetreats = store.retreats.filter((r: any) => !r.approved);
  const activeInstructorsCount = 248 + store.pendingInstructors.filter((ins: any) => ins.verified).length;

  const handleVerify = (name: string) => {
    store.verifyInstructor(name);
    toast.success(`${name} verified as licensed YogicTown Instructor! 🛡️`);
  };

  const handleApproveRetreat = (id: number, title: string) => {
    store.approveRetreat(id);
    toast.success(`Retreat "${title}" approved & listed under Retreats marketplace! ✅`);
  };

  const adminStats = [
    { label: "Platform Users", value: "52,480", change: "+8.2% this month", icon: Users, color: "text-primary bg-sage-light" },
    { label: "Licensed Instructors", value: activeInstructorsCount, change: `Pending: ${pending.length}`, icon: Award, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20" },
    { label: "Platform Monthly Rev", value: `$${(user?.revenue || 890000).toLocaleString()}`, icon: DollarSign, color: "text-green-600 bg-green-50 dark:bg-green-900/20", change: "Updated dynamically" },
    { label: "Pending Reviews", value: pending.length + pendingRetreats.length, change: "Action needed", icon: AlertCircle, color: "text-warm bg-orange-50 dark:bg-orange-900/20" },
  ];

  const revenueData = [
    { m: "Jan", v: 3200 }, { m: "Feb", v: 4100 }, { m: "Mar", v: 3800 },
    { m: "Apr", v: 5200 }, { m: "May", v: 4700 }, { m: "Jun", v: 6100 },
  ];

  if (activeItem === "Overview") {
    return (
      <div className="space-y-8 animate-fade-in-up">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">Governance Platform Dashboard 🛡️</h1>
          <p className="text-muted-foreground mt-1">Ecosystem status healthy · Moderation console online</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {adminStats.map(({ label, value, change, icon: Icon, color }) => (
            <div key={label} className="p-5 rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
              <div className="font-serif text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
              <div className="text-xs text-green-600 mt-1 font-medium">{change}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Platform Revenue Analysis</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={revenueData.map(d => ({ ...d, v: d.v * 14 }))}>
                <XAxis dataKey="m" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="hsl(var(--primary)/0.1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 self-center">
            <button onClick={() => setActiveModal("suspend")} className="py-4 px-3 rounded-2xl bg-card border border-border hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              <span className="text-xs font-bold text-foreground">Suspend Account</span>
            </button>
            <button onClick={() => setActiveModal("reports")} className="py-4 px-3 rounded-2xl bg-card border border-border hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              <span className="text-xs font-bold text-foreground">Platform Reports</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (activeItem === "Verification Queue") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Ecosystem Verification Queue</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Verify applied instructors or retreats proposed by centers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Instructors */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Applied Instructors ({pending.length})</h3>
            {pending.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">All instructors verified.</div>
            ) : (
              <div className="space-y-4">
                {pending.map((ins: any) => (
                  <div key={ins.name} className="flex items-center gap-4 py-2 border-b border-border last:border-0 text-sm">
                    <img src={ins.img} alt={ins.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{ins.name}</div>
                      <div className="text-xs text-muted-foreground">{ins.specialty} · {ins.date}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { store.rejectInstructor(ins.name); toast.info(`Rejected verification request.`); }} className="px-2.5 py-1 rounded-lg border border-red-200 text-red-500 text-xs font-semibold">Reject</button>
                      <button onClick={() => handleVerify(ins.name)} className="px-2.5 py-1 rounded-lg bg-green-500 text-white text-xs font-semibold">Verify</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Retreats */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-4">Proposed Retreat Events ({pendingRetreats.length})</h3>
            {pendingRetreats.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">No retreats pending approval.</div>
            ) : (
              <div className="space-y-4">
                {pendingRetreats.map((r: Retreat) => (
                  <div key={r.id} className="flex justify-between items-center py-2 border-b border-border last:border-0 text-sm">
                    <div>
                      <h4 className="font-semibold text-foreground">{r.title}</h4>
                      <div className="text-xs text-muted-foreground mt-0.5">By {r.organizer} · Price: ${r.price}</div>
                    </div>
                    <button onClick={() => handleApproveRetreat(r.id, r.title)} className="px-3 py-1.5 rounded-lg bg-sage-gradient text-white text-xs font-semibold shadow-sage">
                      Approve retreat
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (activeItem === "Moderation Console") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="font-serif text-2xl font-bold text-foreground">Community Moderation Console</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Moderate community posts or inspect flagged feed items</p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="space-y-4">
            {store.posts.map((post: any) => (
              <div key={post.id} className="p-4 border rounded-xl bg-muted/20 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-foreground">By {post.author} ({post.group})</span>
                  <button onClick={() => { store.deleteContent(post.id); toast.success("Post removed by Admin moderation"); }} className="text-red-500 font-semibold hover:underline flex items-center gap-0.5">
                    <Trash2 className="w-3 h-3" /> Delete Post
                  </button>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
