import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Play, BookOpen, Users, Heart, Settings,
  TrendingUp, Flame, Clock, Target, Bell, Search, Menu, X,
  Leaf, LogOut, Calendar, Star, ChevronRight, DollarSign,
  Video, UserCheck, BarChart3, Package, ShieldCheck, Utensils,
  PlusCircle, CheckCircle, AlertCircle, Award, Building2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useScrollTop } from "@/hooks/useScrollTop";
import { toast } from "sonner";

const weekData = [
  { d: "M", v: 30 }, { d: "T", v: 45 }, { d: "W", v: 20 },
  { d: "T", v: 60 }, { d: "F", v: 40 }, { d: "S", v: 75 }, { d: "S", v: 55 },
];

const revenueData = [
  { m: "Jan", v: 3200 }, { m: "Feb", v: 4100 }, { m: "Mar", v: 3800 },
  { m: "Apr", v: 5200 }, { m: "May", v: 4700 }, { m: "Jun", v: 6100 },
];

const upcomingClasses = [
  { name: "Morning Vinyasa", time: "Tomorrow, 7:00 AM", instructor: "Priya K.", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=60&h=60&fit=crop" },
  { name: "Breathwork Flow", time: "Wed, 6:30 PM", instructor: "Arjun M.", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=60&h=60&fit=crop" },
  { name: "Yin & Restore", time: "Thu, 8:00 AM", instructor: "Sofia A.", img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=60&h=60&fit=crop" },
];

const pendingInstructors = [
  { name: "Kavita Sharma", specialty: "Kundalini", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=face", date: "2 hours ago" },
  { name: "Rohan Verma", specialty: "Ashtanga", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face", date: "5 hours ago" },
  { name: "Anaya Das", specialty: "Prenatal Yoga", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face", date: "1 day ago" },
];

const retreatBookings = [
  { retreat: "7-Day Bali Retreat", client: "Emma T.", date: "Jun 15", amount: 1890, status: "confirmed" },
  { retreat: "Ayurvedic Detox", client: "Rahul M.", date: "Jul 8", amount: 2400, status: "pending" },
  { retreat: "Sound Healing Peru", client: "Sofia L.", date: "Aug 5", amount: 780, status: "confirmed" },
];

const clients = [
  { name: "Sara Chen", plan: "Weight Loss", sessions: 8, progress: 72, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face" },
  { name: "Michael B.", plan: "Ayurvedic Reset", sessions: 4, progress: 45, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" },
  { name: "Priya K.", plan: "Gut Health", sessions: 12, progress: 88, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" },
];

const adminStats = [
  { label: "Total Users", value: "52,480", change: "+8.2%", icon: Users, color: "text-primary bg-sage-light" },
  { label: "Active Instructors", value: "248", change: "+12", icon: Award, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20" },
  { label: "Monthly Revenue", value: "$89,420", change: "+18.5%", icon: DollarSign, color: "text-green-600 bg-green-50 dark:bg-green-900/20" },
  { label: "Pending Reviews", value: "14", change: "Action needed", icon: AlertCircle, color: "text-warm bg-orange-50 dark:bg-orange-900/20" },
];

const pieData = [
  { name: "Yoga", value: 45, color: "#84A98C" },
  { name: "Meditation", value: 28, color: "#E9D8A6" },
  { name: "Retreats", value: 15, color: "#F4A261" },
  { name: "Nutrition", value: 12, color: "#74B49B" },
];

// Role-based sidebar configs
const sidebarConfigs = {
  user: [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Play, label: "My Classes" },
    { icon: BookOpen, label: "Programs" },
    { icon: Heart, label: "Meditations" },
    { icon: Users, label: "Instructors" },
    { icon: Calendar, label: "Schedule" },
    { icon: TrendingUp, label: "Progress" },
    { icon: Star, label: "Retreats" },
  ],
  instructor: [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Video, label: "My Classes" },
    { icon: PlusCircle, label: "Create Class" },
    { icon: Users, label: "My Students" },
    { icon: Calendar, label: "Schedule" },
    { icon: DollarSign, label: "Earnings" },
    { icon: Star, label: "Reviews" },
    { icon: Award, label: "Certifications" },
  ],
  wellness_center: [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Package, label: "My Retreats" },
    { icon: PlusCircle, label: "Create Retreat" },
    { icon: Calendar, label: "Bookings" },
    { icon: Users, label: "Guests" },
    { icon: DollarSign, label: "Revenue" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Building2, label: "Business Profile" },
  ],
  nutrition_expert: [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Users, label: "My Clients" },
    { icon: Utensils, label: "Meal Plans" },
    { icon: PlusCircle, label: "New Plan" },
    { icon: Calendar, label: "Consultations" },
    { icon: BarChart3, label: "Analytics" },
    { icon: BookOpen, label: "Resources" },
    { icon: Star, label: "Reviews" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Overview" },
    { icon: Users, label: "All Users" },
    { icon: UserCheck, label: "Verify Instructors" },
    { icon: Package, label: "Retreats" },
    { icon: ShieldCheck, label: "Moderation" },
    { icon: DollarSign, label: "Revenue" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Settings, label: "Platform Settings" },
  ],
};

const roleTitles: Record<string, string> = {
  user: "My Wellness Dashboard",
  instructor: "Instructor Dashboard",
  wellness_center: "Center Dashboard",
  nutrition_expert: "Expert Dashboard",
  admin: "Admin Dashboard",
};

function UserDashboard({ user }: { user: any }) {
  const { toast: t } = { toast };
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">Good morning, {user?.name?.split(" ")[0]} 🌿</h1>
        <p className="text-muted-foreground mt-1">You're on a 14-day streak. Keep the momentum going!</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Practice Streak", value: "14 days", icon: Flame, color: "text-warm bg-orange-50 dark:bg-orange-900/20", change: "+2 days" },
          { label: "Sessions This Week", value: "6 / 7", icon: Play, color: "text-primary bg-sage-light", change: "85% complete" },
          { label: "Wellness Score", value: "88 pts", icon: Target, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20", change: "+12 this week" },
          { label: "Total Minutes", value: "325 min", icon: Clock, color: "text-teal-600 bg-teal-50 dark:bg-teal-900/20", change: "+45 today" },
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
        <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-6">
            <div><h3 className="font-semibold text-foreground">Weekly Practice</h3><p className="text-sm text-muted-foreground">Minutes per day</p></div>
            <span className="text-xs bg-sage-light text-primary px-3 py-1.5 rounded-full font-medium">325 min total</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weekData}>
              <defs><linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="d" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#dashGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Upcoming Classes</h3>
          <div className="space-y-4">
            {upcomingClasses.map((cls) => (
              <div key={cls.name} className="flex items-center gap-3">
                <img src={cls.img} alt={cls.name} className="w-11 h-11 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{cls.name}</div>
                  <div className="text-xs text-muted-foreground">{cls.time}</div>
                  <div className="text-xs text-primary">{cls.instructor}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => toast.success("Full schedule opened!")} className="w-full mt-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            View Full Schedule
          </button>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-foreground mb-4">Continue Your Practice</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Morning Flow Series", progress: 65, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop", sessions: "8 of 12 sessions", tag: "In Progress" },
            { title: "21-Day Meditation", progress: 38, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop", sessions: "8 of 21 days", tag: "In Progress" },
            { title: "Yin Yoga Mastery", progress: 0, img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=300&h=200&fit=crop", sessions: "Not started", tag: "New" },
          ].map((course) => (
            <div key={course.title} className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer" onClick={() => toast.success(`Opening "${course.title}"`)}>
              <div className="relative h-36 overflow-hidden">
                <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full font-medium ${course.tag === "New" ? "bg-warm text-white" : "bg-white/90 text-foreground"}`}>{course.tag}</span>
              </div>
              <div className="p-4">
                <h4 className="font-medium text-sm text-foreground mb-2">{course.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{course.sessions}</p>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Join Program", action: () => toast.success("Opening program catalogue!") },
          { label: "Start Meditation", action: () => toast.success("Launching meditation session!") },
          { label: "Track Water", action: () => toast.success("Water intake logged! 💧") },
          { label: "Book Retreat", action: () => toast.success("Opening retreats marketplace!") },
        ].map(btn => (
          <button key={btn.label} onClick={btn.action} className="py-3 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all">{btn.label}</button>
        ))}
      </div>
    </div>
  );
}

function InstructorDashboard({ user }: { user: any }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">Welcome back, {user?.name?.split(" ")[0]} 🧘</h1>
        <p className="text-muted-foreground mt-1">You have 3 sessions scheduled this week</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "1,248", icon: Users, color: "text-primary bg-sage-light", change: "+24 this month" },
          { label: "Classes Taught", value: "342", icon: Video, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20", change: "8 this week" },
          { label: "Avg Rating", value: "4.9★", icon: Star, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20", change: "From 384 reviews" },
          { label: "Monthly Revenue", value: "$2,840", icon: DollarSign, color: "text-green-600 bg-green-50 dark:bg-green-900/20", change: "+$340 vs last month" },
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
          <h3 className="font-semibold text-foreground mb-4">Revenue (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={revenueData}>
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="v" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Upcoming Sessions</h3>
          <div className="space-y-3">
            {[
              { title: "Morning Vinyasa Live", students: 24, time: "Tomorrow 7:00 AM", type: "Live" },
              { title: "1-on-1 with Aria S.", students: 1, time: "Wed 3:00 PM", type: "Private" },
              { title: "Group Breathwork", students: 18, time: "Thu 6:30 PM", type: "Group" },
            ].map(s => (
              <div key={s.title} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                <div>
                  <div className="text-sm font-medium text-foreground">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.time} · {s.students} student{s.students > 1 ? "s" : ""}</div>
                </div>
                <div className="flex gap-2">
                  <span className={cn("text-xs px-2 py-1 rounded-lg font-medium", s.type === "Live" ? "bg-green-100 text-green-600 dark:bg-green-900/30" : s.type === "Private" ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30" : "bg-sage-light text-primary")}>{s.type}</span>
                  <button onClick={() => toast.success(`Starting "${s.title}"!`)} className="text-xs px-2.5 py-1 rounded-lg bg-sage-gradient text-white font-medium">Start</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Create Class", action: () => toast.success("Class creation form opened!") },
          { label: "Start Live Session", action: () => toast.success("Live streaming started! 🔴") },
          { label: "Upload Certificate", action: () => toast.success("Certificate upload ready!") },
          { label: "View Revenue", action: () => toast.success("Revenue report loaded!") },
        ].map(btn => (
          <button key={btn.label} onClick={btn.action} className="py-3 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all">{btn.label}</button>
        ))}
      </div>
    </div>
  );
}

function WellnessCenterDashboard({ user }: { user: any }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">Welcome, {user?.name} 🏡</h1>
        <p className="text-muted-foreground mt-1">3 retreats active · 12 upcoming bookings this month</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Bookings", value: "4,520", icon: Calendar, color: "text-primary bg-sage-light", change: "+148 this month" },
          { label: "Active Retreats", value: "6", icon: Package, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20", change: "3 fully booked" },
          { label: "Total Revenue", value: "$142K", icon: DollarSign, color: "text-green-600 bg-green-50 dark:bg-green-900/20", change: "+22% YoY" },
          { label: "Avg Rating", value: "4.8★", icon: Star, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20", change: "From 892 reviews" },
        ].map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="p-5 rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
            <div className="font-serif text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            <div className="text-xs text-green-600 mt-1 font-medium">{change}</div>
          </div>
        ))}
      </div>
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="font-semibold text-foreground mb-4">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-xs text-muted-foreground border-b border-border">
              <th className="text-left pb-3 font-medium">Retreat</th>
              <th className="text-left pb-3 font-medium">Guest</th>
              <th className="text-left pb-3 font-medium">Date</th>
              <th className="text-left pb-3 font-medium">Amount</th>
              <th className="text-left pb-3 font-medium">Status</th>
            </tr></thead>
            <tbody>
              {retreatBookings.map(b => (
                <tr key={b.retreat} className="border-b border-border last:border-0">
                  <td className="py-3 text-sm font-medium text-foreground">{b.retreat}</td>
                  <td className="py-3 text-sm text-muted-foreground">{b.client}</td>
                  <td className="py-3 text-sm text-muted-foreground">{b.date}</td>
                  <td className="py-3 text-sm font-semibold text-foreground">${b.amount.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", b.status === "confirmed" ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "bg-amber-100 text-amber-600 dark:bg-amber-900/30")}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Create Retreat", action: () => toast.success("Retreat creation form opened!") },
          { label: "Publish Event", action: () => toast.success("Event published successfully! 🎉") },
          { label: "Manage Bookings", action: () => toast.success("Booking management opened!") },
          { label: "Generate Tickets", action: () => toast.success("Ticket generator ready!") },
        ].map(btn => (
          <button key={btn.label} onClick={btn.action} className="py-3 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all">{btn.label}</button>
        ))}
      </div>
    </div>
  );
}

function NutritionDashboard({ user }: { user: any }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">Welcome, Dr. {user?.name?.split(" ")[1]} 🥗</h1>
        <p className="text-muted-foreground mt-1">{clients.length} active clients · 4 consultations this week</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Clients", value: "387", icon: Users, color: "text-primary bg-sage-light", change: "+12 this month" },
          { label: "Meal Plans", value: "142", icon: Utensils, color: "text-warm bg-orange-50 dark:bg-orange-900/20", change: "28 this month" },
          { label: "Avg Progress", value: "74%", icon: TrendingUp, color: "text-green-600 bg-green-50 dark:bg-green-900/20", change: "+6% vs last month" },
          { label: "Revenue", value: "$19.2K", icon: DollarSign, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20", change: "+$2.1K this month" },
        ].map(({ label, value, icon: Icon, color, change }) => (
          <div key={label} className="p-5 rounded-2xl bg-card border border-border hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
            <div className="font-serif text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            <div className="text-xs text-green-600 mt-1 font-medium">{change}</div>
          </div>
        ))}
      </div>
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="font-semibold text-foreground mb-4">Active Clients</h3>
        <div className="space-y-4">
          {clients.map(c => (
            <div key={c.name} className="flex items-center gap-4">
              <img src={c.img} alt={c.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.sessions} sessions</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1.5">{c.plan}</div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: `${c.progress}%` }} />
                </div>
              </div>
              <div className="text-sm font-bold text-primary w-10 text-right">{c.progress}%</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Create Meal Plan", action: () => toast.success("Meal plan builder opened!") },
          { label: "Schedule Consultation", action: () => toast.success("Consultation scheduler ready!") },
          { label: "Send Recommendation", action: () => toast.success("Recommendation sent to client!") },
          { label: "View Client Progress", action: () => toast.success("Client progress report loaded!") },
        ].map(btn => (
          <button key={btn.label} onClick={btn.action} className="py-3 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all">{btn.label}</button>
        ))}
      </div>
    </div>
  );
}

function AdminDashboard({ user }: { user: any }) {
  const [approving, setApproving] = useState<string | null>(null);

  const handleVerify = (name: string) => {
    setApproving(name);
    setTimeout(() => { toast.success(`${name} verified as instructor!`); setApproving(null); }, 1000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">Platform Dashboard 🛡️</h1>
        <p className="text-muted-foreground mt-1">Managing YogicTown · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
      </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Platform Revenue (6 Months)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData.map(d => ({ ...d, v: d.v * 14 }))}>
              <defs><linearGradient id="adminGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} formatter={(v: any) => [`$${(v/1000).toFixed(0)}K`]} />
              <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#adminGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h3 className="font-semibold text-foreground mb-4">Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ background: d.color }} /><span className="text-muted-foreground">{d.name}</span></div>
                <span className="font-medium text-foreground">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Pending Instructor Verifications</h3>
          <span className="text-xs px-2.5 py-1 rounded-full bg-warm/10 text-warm font-medium">{pendingInstructors.length} pending</span>
        </div>
        <div className="space-y-4">
          {pendingInstructors.map(ins => (
            <div key={ins.name} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
              <img src={ins.img} alt={ins.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{ins.name}</div>
                <div className="text-xs text-muted-foreground">{ins.specialty} · Applied {ins.date}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.info(`Rejected ${ins.name}`)} className="px-3 py-1.5 rounded-lg border border-red-200 text-red-500 text-xs font-medium hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">Reject</button>
                <button onClick={() => handleVerify(ins.name)} disabled={approving === ins.name}
                  className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-medium hover:opacity-90 transition-all flex items-center gap-1 disabled:opacity-60">
                  {approving === ins.name ? <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle className="w-3 h-3" />} Verify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Verify Instructor", action: () => toast.success("Verification queue opened!") },
          { label: "Suspend User", action: () => toast.info("User management opened") },
          { label: "Approve Retreat", action: () => toast.success("Retreat approved! ✅") },
          { label: "View Reports", action: () => toast.success("Analytics report loaded!") },
        ].map(btn => (
          <button key={btn.label} onClick={btn.action} className="py-3 rounded-xl bg-sage-gradient text-white text-sm font-semibold shadow-sage hover:opacity-90 transition-all">{btn.label}</button>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  useScrollTop();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Overview");
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const role = (user?.role || "user") as keyof typeof sidebarConfigs;
  const sidebarItems = sidebarConfigs[role] || sidebarConfigs.user;
  const handleLogout = () => { logout(); navigate("/"); };

  const renderDashboard = () => {
    switch (role) {
      case "instructor": return <InstructorDashboard user={user} />;
      case "wellness_center": return <WellnessCenterDashboard user={user} />;
      case "nutrition_expert": return <NutritionDashboard user={user} />;
      case "admin": return <AdminDashboard user={user} />;
      default: return <UserDashboard user={user} />;
    }
  };

  const roleColors: Record<string, string> = {
    user: "bg-primary/10 text-primary",
    instructor: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    wellness_center: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
    nutrition_expert: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    admin: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  };

  const roleLabel: Record<string, string> = {
    user: "Wellness User",
    instructor: "Instructor",
    wellness_center: "Wellness Center",
    nutrition_expert: "Nutrition Expert",
    admin: "Admin",
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex items-center gap-2 px-5 py-5 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-sage-gradient flex items-center justify-center shadow-sage">
            <Leaf className="w-4 h-4 text-white" />
          </div>
          <span className="font-serif text-lg font-semibold text-sidebar-foreground">YogicTown</span>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Badge */}
        <div className="px-4 py-3 border-b border-sidebar-border">
          <span className={cn("text-xs px-2.5 py-1 rounded-full font-semibold", roleColors[role])}>
            {roleLabel[role]}
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button key={item.label} onClick={() => setActiveItem(item.label)}
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
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-sidebar-accent transition-colors cursor-pointer mb-1" onClick={() => navigate("/profile")}>
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

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-5 py-4 bg-background/95 backdrop-blur-sm border-b border-border">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="Search..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-input bg-muted text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={toggleTheme} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button className="relative w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all" onClick={() => toast.info("No new notifications")}>
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-warm" />
            </button>
            <Link to="/profile">
              <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-border hover:ring-primary transition-all" />
            </Link>
          </div>
        </header>
        <main className="flex-1 p-5 lg:p-8">
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
}
