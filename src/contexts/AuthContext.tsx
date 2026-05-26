import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "user" | "instructor" | "wellness_center" | "nutrition_expert" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  plan: "free" | "starter" | "pro" | "elite";
  joinedDate: string;
  bio: string;
  location: string;
  yogaLevel: string;
  goals: string[];
  specialization?: string;
  certifications?: string[];
  studentsCount?: number;
  classesCount?: number;
  rating?: number;
  revenue?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsDemo: (role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => false,
  loginAsDemo: async () => {},
  register: async () => false,
  logout: () => {},
  updateProfile: () => {},
});

export const DEMO_USERS: Record<UserRole, User> = {
  user: {
    id: "demo-user-1",
    name: "Aria Sharma",
    email: "aria@yogictown.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    role: "user",
    plan: "pro",
    joinedDate: "January 2024",
    bio: "Passionate about yoga and mindful living. On a journey to deepen my practice and connect with the global wellness community.",
    location: "Bali, Indonesia",
    yogaLevel: "Intermediate",
    goals: ["Flexibility", "Stress Relief", "Mindfulness", "Strength"],
  },
  instructor: {
    id: "demo-instructor-1",
    name: "Priya Kavitha",
    email: "priya@yogictown.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    role: "instructor",
    plan: "elite",
    joinedDate: "March 2023",
    bio: "RYT-500 certified yoga instructor specialising in Vinyasa and Yin yoga. 8 years of teaching experience across 12 countries.",
    location: "Rishikesh, India",
    yogaLevel: "Advanced",
    goals: ["Teach", "Inspire", "Community"],
    specialization: "Vinyasa Flow & Yin Yoga",
    certifications: ["RYT-500", "Yin Yoga TTC", "Pranayama Advanced"],
    studentsCount: 1248,
    classesCount: 342,
    rating: 4.9,
    revenue: 28500,
  },
  wellness_center: {
    id: "demo-center-1",
    name: "Serenity Wellness Hub",
    email: "hub@serenity.com",
    avatar: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&h=200&fit=crop",
    role: "wellness_center",
    plan: "elite",
    joinedDate: "June 2023",
    bio: "Premier wellness center offering world-class yoga retreats, holistic therapies, and transformative healing experiences in Ubud, Bali.",
    location: "Ubud, Bali",
    yogaLevel: "All Levels",
    goals: ["Retreats", "Events", "Community"],
    specialization: "Yoga Retreats & Wellness Events",
    studentsCount: 4520,
    classesCount: 156,
    rating: 4.8,
    revenue: 142000,
  },
  nutrition_expert: {
    id: "demo-nutrition-1",
    name: "Dr. Meera Pillai",
    email: "meera@yogictown.com",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
    role: "nutrition_expert",
    plan: "pro",
    joinedDate: "September 2023",
    bio: "Certified Ayurvedic nutritionist and wellness coach with 10 years of experience. Specialising in plant-based nutrition and holistic lifestyle transformation.",
    location: "Chennai, India",
    yogaLevel: "Beginner",
    goals: ["Nutrition", "Ayurveda", "Coaching"],
    specialization: "Ayurvedic Nutrition & Holistic Coaching",
    certifications: ["Ayurvedic Nutritionist", "Plant-Based Diet Cert.", "Wellness Coach Pro"],
    studentsCount: 387,
    classesCount: 89,
    rating: 4.7,
    revenue: 19200,
  },
  admin: {
    id: "demo-admin-1",
    name: "Rahul Verma",
    email: "admin@yogictown.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    role: "admin",
    plan: "elite",
    joinedDate: "January 2023",
    bio: "Platform administrator managing the YogicTown ecosystem, instructor verification, and community governance.",
    location: "Mumbai, India",
    yogaLevel: "Advanced",
    goals: ["Manage", "Grow", "Moderate"],
    specialization: "Platform Administration",
    studentsCount: 52480,
    revenue: 890000,
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("yogictown-user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem("yogictown-user"); }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const loggedUser = { ...DEMO_USERS.user, email };
    setUser(loggedUser);
    localStorage.setItem("yogictown-user", JSON.stringify(loggedUser));
    setIsLoading(false);
    return true;
  };

  const loginAsDemo = async (role: UserRole): Promise<void> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const demoUser = DEMO_USERS[role];
    setUser(demoUser);
    localStorage.setItem("yogictown-user", JSON.stringify(demoUser));
    setIsLoading(false);
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    const newUser: User = {
      ...DEMO_USERS.user,
      id: `user-${Date.now()}`,
      name, email, plan: "free",
      joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    };
    setUser(newUser);
    localStorage.setItem("yogictown-user", JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => { setUser(null); localStorage.removeItem("yogictown-user"); };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("yogictown-user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, loginAsDemo, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
