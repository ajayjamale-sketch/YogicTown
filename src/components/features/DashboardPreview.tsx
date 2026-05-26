import { BarChart2, Play, Target, TrendingUp, Clock, Flame } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { useTheme } from "@/contexts/ThemeContext";

const weeklyData = [
  { day: "Mon", minutes: 30 },
  { day: "Tue", minutes: 45 },
  { day: "Wed", minutes: 20 },
  { day: "Thu", minutes: 60 },
  { day: "Fri", minutes: 40 },
  { day: "Sat", minutes: 75 },
  { day: "Sun", minutes: 55 },
];

const progressData = [
  { week: "W1", score: 42 },
  { week: "W2", score: 58 },
  { week: "W3", score: 65 },
  { week: "W4", score: 72 },
  { week: "W5", score: 78 },
  { week: "W6", score: 88 },
];

const recentClasses = [
  { name: "Morning Vinyasa Flow", instructor: "Priya Kapoor", duration: "45 min", status: "completed" },
  { name: "Breathwork & Pranayama", instructor: "Arjun Mehta", duration: "30 min", status: "completed" },
  { name: "Yin Yoga Deep Stretch", instructor: "Sofia Alvarez", duration: "60 min", status: "scheduled" },
];

export default function DashboardPreview() {
  const { theme } = useTheme();
  const axisColor = theme === "dark" ? "#6b7280" : "#9ca3af";

  return (
    <section className="py-24 lg:py-32 bg-sage-light dark:bg-sage-light/5">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 section-fade">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-card border border-primary/20 text-primary text-sm font-medium mb-4">
            <BarChart2 className="w-3.5 h-3.5" />
            Dashboard Preview
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Track Every Step of Your{" "}
            <span className="text-gradient-sage italic">Wellness Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Beautiful, intuitive analytics that keep you motivated and informed about your holistic progress.
          </p>
        </div>

        {/* Dashboard Mock */}
        <div className="bg-card border border-border rounded-3xl shadow-2xl overflow-hidden section-fade">
          {/* Header Bar */}
          <div className="flex items-center gap-2 px-5 py-3.5 bg-muted/40 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 mx-4">
              <div className="w-48 h-5 rounded-md bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground">app.yogictown.com/dashboard</span>
              </div>
            </div>
          </div>

          <div className="p-5 lg:p-8">
            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Practice Streak", value: "14 days", icon: Flame, color: "text-warm bg-orange-50 dark:bg-orange-900/20" },
                { label: "Sessions This Week", value: "6 / 7", icon: Play, color: "text-primary bg-sage-light" },
                { label: "Wellness Score", value: "88 / 100", icon: Target, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20" },
                { label: "Total Minutes", value: "325 min", icon: Clock, color: "text-teal-600 bg-teal-50 dark:bg-teal-900/20" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="p-4 rounded-2xl bg-background border border-border">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="font-serif text-xl font-bold text-foreground">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-2xl bg-background border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm text-foreground">Weekly Practice (minutes)</h4>
                  <span className="text-xs text-primary bg-sage-light px-2 py-1 rounded-full">This Week</span>
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={weeklyData} barSize={22}>
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                      cursor={{ fill: "hsl(var(--muted))" }}
                    />
                    <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-5 rounded-2xl bg-background border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm text-foreground">Wellness Score Progress</h4>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    +46 pts
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <AreaChart data={progressData}>
                    <defs>
                      <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }}
                    />
                    <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#scoreGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Classes */}
            <div className="p-5 rounded-2xl bg-background border border-border">
              <h4 className="font-semibold text-sm text-foreground mb-4">Recent & Upcoming Classes</h4>
              <div className="space-y-3">
                {recentClasses.map((cls) => (
                  <div key={cls.name} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0">
                        <Play className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{cls.name}</div>
                        <div className="text-xs text-muted-foreground">{cls.instructor} · {cls.duration}</div>
                      </div>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      cls.status === "completed" ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" : "bg-beige-light text-amber-700 dark:text-amber-400"
                    }`}>
                      {cls.status === "completed" ? "Completed" : "Upcoming"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
