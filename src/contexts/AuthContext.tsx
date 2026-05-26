import React from "react";
import { useStore, User, UserRole } from "@/store/useStore";

export type { User, UserRole };

export const DEMO_USERS = {
  user: {
    id: "demo-user-1",
    name: "Aria Sharma",
    email: "aria@yogictown.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
    role: "user" as UserRole,
    plan: "pro" as const,
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
    role: "instructor" as UserRole,
    plan: "elite" as const,
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
    role: "wellness_center" as UserRole,
    plan: "elite" as const,
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
    role: "nutrition_expert" as UserRole,
    plan: "pro" as const,
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
    role: "admin" as UserRole,
    plan: "elite" as const,
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
  return <>{children}</>;
};

export const useAuth = () => {
  const store = useStore();
  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    login: store.login,
    loginAsDemo: store.loginAsDemo,
    register: store.register,
    logout: store.logout,
    updateProfile: store.updateProfile,
  };
};

