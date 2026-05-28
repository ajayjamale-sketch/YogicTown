import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  healthFocus?: string[];
  onboardingCompleted?: boolean;
  specialization?: string;
  certifications?: string[];
  studentsCount?: number;
  classesCount?: number;
  rating?: number;
  revenue?: number;
}

export interface Program {
  id: number;
  title: string;
  instructor: string;
  level: string;
  style: string;
  duration: string;
  sessions: number;
  rating: number;
  students: number;
  img: string;
  tag: string;
  free: boolean;
  desc: string;
}

export interface MeditationSession {
  id: number;
  title: string;
  category: string;
  duration: string;
  guide: string;
  rating: number;
  plays: number;
  img: string;
  color: string;
  desc: string;
}

export interface Retreat {
  id: number;
  title: string;
  location: string;
  country: string;
  type: string;
  duration: string;
  dates: string;
  price: number;
  originalPrice: number;
  participants: number;
  maxParticipants: number;
  rating: number;
  reviews: number;
  img: string;
  organizer: string;
  featured: boolean;
  tag: string;
  highlights: string[];
  approved?: boolean;
}

export interface RetreatBooking {
  id: string;
  retreatId: number;
  retreatTitle: string;
  clientName: string;
  date: string;
  amount: number;
  status: "confirmed" | "pending";
}

export interface YogaClass {
  id: string;
  name: string;
  instructorId: string;
  time: string;
  students: number;
  type: "Live" | "Private" | "Group";
  status: "scheduled" | "live" | "completed";
  studentsList?: { name: string; date: string; pending: boolean }[];
}

export interface MealPlan {
  id: string;
  name: string;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
  };
  calories: number;
  assignedTo?: string;
}

export interface ClientProgress {
  name: string;
  plan: string;
  sessions: number;
  progress: number;
  img: string;
}

export interface Consultation {
  id: string;
  clientName: string;
  time: string;
  type: "video" | "chat" | "in-person";
}

export interface WellnessProgram {
  id: string;
  title: string;
  format: "workshop" | "course" | "challenge";
  duration: string;
  price: number;
  enrolledClients: number;
  status: "draft" | "published";
  description: string;
}

export interface PendingInstructor {
  name: string;
  specialty: string;
  img: string;
  date: string;
  verified?: boolean;
}

export type ManagedUserRole = "user" | "instructor" | "wellness_center" | "nutrition_expert" | "admin";
export type ManagedUserStatus = "active" | "banned" | "suspended";

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: ManagedUserRole;
  plan: "free" | "starter" | "pro" | "elite";
  joinedDate: string;
  status: ManagedUserStatus;
  location: string;
  note?: string;
}

export interface Comment {
  author: string;
  content: string;
  time: string;
}

export interface Post {
  id: number;
  author: string;
  avatar: string;
  group: string;
  time: string;
  content: string;
  likes: number;
  comments: Comment[];
  img: string | null;
}

export interface Group {
  id: number;
  name: string;
  category: string;
  members: number;
  posts: number;
  img: string;
  isPublic: boolean;
  desc: string;
  trending: boolean;
}

export interface Challenge {
  name: string;
  participants: number;
  daysLeft: number;
  icon: string;
}

const INITIAL_MANAGED_USERS: ManagedUser[] = [
  { id: "mu-1", name: "Aria Sharma", email: "aria@yogictown.com", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face", role: "user", plan: "pro", joinedDate: "Jan 2024", status: "active", location: "Bali, Indonesia" },
  { id: "mu-2", name: "Priya Kavitha", email: "priya@yogictown.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", role: "instructor", plan: "elite", joinedDate: "Mar 2023", status: "active", location: "Rishikesh, India" },
  { id: "mu-3", name: "Serenity Wellness Hub", email: "hub@serenity.com", avatar: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=80&h=80&fit=crop", role: "wellness_center", plan: "elite", joinedDate: "Jun 2023", status: "active", location: "Ubud, Bali" },
  { id: "mu-4", name: "Dr. Meera Pillai", email: "meera@yogictown.com", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face", role: "nutrition_expert", plan: "pro", joinedDate: "Sep 2023", status: "active", location: "Chennai, India" },
  { id: "mu-5", name: "James Whitfield", email: "james.w@example.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", role: "user", plan: "starter", joinedDate: "Feb 2024", status: "active", location: "London, UK" },
  { id: "mu-6", name: "Sofia Andrade", email: "sofia.a@example.com", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face", role: "instructor", plan: "pro", joinedDate: "Nov 2023", status: "active", location: "Lisbon, Portugal" },
  { id: "mu-7", name: "Chen Wei", email: "chen.w@example.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", role: "user", plan: "free", joinedDate: "Apr 2024", status: "suspended", location: "Shanghai, China", note: "Multiple policy violations reported." },
  { id: "mu-8", name: "Kavita Sharma", email: "kavita.s@example.com", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face", role: "user", plan: "free", joinedDate: "May 2024", status: "banned", location: "Delhi, India", note: "Permanent ban: spam." },
  { id: "mu-9", name: "Arjun Mehta", email: "arjun.m@example.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face", role: "instructor", plan: "pro", joinedDate: "Dec 2022", status: "active", location: "Mumbai, India" },
  { id: "mu-10", name: "Luna Park", email: "luna.p@example.com", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face", role: "user", plan: "elite", joinedDate: "Jan 2023", status: "active", location: "Seoul, South Korea" },
];

// Initial Mock Data
const INITIAL_PROGRAMS: Program[] = [
  { id: 1, title: "30-Day Morning Flow Challenge", instructor: "Priya Kavitha", level: "Beginner", style: "Vinyasa", duration: "20–40 min/day", sessions: 30, rating: 4.9, students: 12480, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop", tag: "Best Seller", free: true, desc: "Build a consistent morning yoga habit with this 30-day progressive programme. Perfect for all levels." },
  { id: 2, title: "Deep Yin Flexibility Journey", instructor: "Sofia Andrade", level: "Intermediate", style: "Yin", duration: "45–60 min", sessions: 21, rating: 4.8, students: 8320, img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=400&fit=crop", tag: "Popular", free: false, desc: "Unlock deep tissue flexibility and emotional release through this transformative 21-session Yin journey." },
  { id: 3, title: "Ashtanga Primary Series", instructor: "Arjun Mehta", level: "Advanced", style: "Ashtanga", duration: "60–90 min", sessions: 24, rating: 4.9, students: 5640, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop", tag: "Expert", free: false, desc: "Master the complete Ashtanga Primary Series with detailed alignment cues and modifications." },
  { id: 4, title: "Yoga for Stress Relief", instructor: "Meera Nair", level: "Beginner", style: "Restorative", duration: "30 min", sessions: 14, rating: 4.7, students: 19820, img: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=600&h=400&fit=crop", tag: "Trending", free: true, desc: "Release tension, calm your nervous system, and find peace with this gentle restorative programme." },
];

const INITIAL_MEDITATIONS: MeditationSession[] = [
  { id: 1, title: "Deep Sleep Surrender", category: "sleep", duration: "30 min", guide: "Sofia Andrade", rating: 4.9, plays: 89200, img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop", color: "from-indigo-500/30 to-purple-500/30", desc: "Melt away the day and drift into deep, restorative sleep with this guided body-scan meditation." },
  { id: 2, title: "Anxious Mind Release", category: "stress", duration: "20 min", guide: "Meera Nair", rating: 4.8, plays: 62400, img: "https://images.unsplash.com/photo-1515894203077-9cd36032142e?w=600&h=400&fit=crop", color: "from-teal-500/30 to-cyan-500/30", desc: "Calm racing thoughts and release anxiety through breath awareness and gentle visualization." },
  { id: 3, title: "Morning Clarity Ritual", category: "morning", duration: "15 min", guide: "Arjun Mehta", rating: 4.7, plays: 44100, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop", color: "from-amber-500/30 to-orange-500/30", desc: "Set clear intentions, energise your mind, and step into your day with purpose and presence." },
  { id: 4, title: "432Hz Healing Frequencies", category: "sound", duration: "45 min", guide: "Guru Ananda", rating: 4.9, plays: 38700, img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&h=400&fit=crop", color: "from-rose-500/30 to-pink-500/30", desc: "Experience the deep healing vibrations of Tibetan singing bowls and 432Hz resonance frequencies." },
];

const INITIAL_RETREATS: Retreat[] = [
  { id: 1, title: "7-Day Bali Yoga & Spirit Retreat", location: "Ubud, Bali", country: "Indonesia", type: "Yoga Immersion", duration: "7 days", dates: "Jun 15 – 22, 2025", price: 1890, originalPrice: 2200, participants: 16, maxParticipants: 20, rating: 4.9, reviews: 182, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop", organizer: "Serenity Wellness Hub", featured: true, tag: "Best Seller", highlights: ["Daily Vinyasa & Yin", "Balinese Healing Ceremony", "Organic Cuisine", "Airport Transfers"], approved: true },
  { id: 2, title: "5-Day Silent Meditation in Rishikesh", location: "Rishikesh", country: "India", type: "Meditation", duration: "5 days", dates: "Jul 8 – 13, 2025", price: 620, originalPrice: 750, participants: 12, maxParticipants: 15, rating: 4.8, reviews: 94, img: "https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=800&h=500&fit=crop", organizer: "River Ganga Ashram", featured: true, tag: "Sacred", highlights: ["Noble Silence Practice", "Ganga Aarti Ceremony", "Sattvic Meals", "Yoga Nidra"], approved: true },
  { id: 3, title: "Weekend Coastal Yoga Escape", location: "Tulum", country: "Mexico", type: "Yoga Immersion", duration: "3 days", dates: "Jun 28 – 30, 2025", price: 480, originalPrice: 580, participants: 10, maxParticipants: 14, rating: 4.7, reviews: 67, img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&h=500&fit=crop", organizer: "Tulum Wellness Co.", featured: false, tag: "Weekend", highlights: ["Beach Yoga Sessions", "Cenote Ceremony", "Fresh Ceviche Dinners", "Sunset Meditation"], approved: true },
  { id: 4, title: "Panchakarma Ayurvedic Detox", location: "Kerala", country: "India", type: "Ayurvedic", duration: "14 days", dates: "Jul 20 – Aug 3, 2025", price: 2400, originalPrice: 2900, participants: 8, maxParticipants: 10, rating: 4.9, reviews: 48, img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=500&fit=crop", organizer: "Vaidyagrama", featured: true, tag: "Deep Cleanse", highlights: ["Full Panchakarma", "Ayurvedic Doctor Consultation", "Herbal Treatments", "Traditional Marma"], approved: true },
];

export const INITIAL_GROUPS: Group[] = [
  { id: 1, name: "Morning Yoga Warriors", category: "Yoga", members: 4820, posts: 342, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop", isPublic: true, desc: "Join thousands of early risers who start their day with sun salutations and positive energy.", trending: true },
  { id: 2, name: "Meditation & Mindfulness Circle", category: "Meditation", members: 6140, posts: 891, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop", isPublic: true, desc: "A sacred space to share your meditation journey, ask questions, and inspire each other.", trending: true },
  { id: 3, name: "Ayurveda & Nutrition Hub", category: "Nutrition", members: 2390, posts: 156, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop", isPublic: true, desc: "Explore Ayurvedic wisdom, share recipes, and connect with nutrition enthusiasts worldwide.", trending: false },
  { id: 4, name: "Yoga Retreat Seekers", category: "Retreats", members: 3210, posts: 210, img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&h=200&fit=crop", isPublic: true, desc: "Find and share the best wellness retreat experiences from around the world.", trending: true },
  { id: 5, name: "Yin & Restorative Lovers", category: "Yoga", members: 1890, posts: 97, img: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=300&h=200&fit=crop", isPublic: true, desc: "Slow down, breathe deeply, and share your yin yoga and restorative practice journey.", trending: false },
  { id: 6, name: "Spiritual Growth & Philosophy", category: "Spiritual", members: 5460, posts: 728, img: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=300&h=200&fit=crop", isPublic: false, desc: "Deep discussions on yoga philosophy, spirituality, consciousness, and personal transformation.", trending: true },
];

export const INITIAL_CHALLENGES: Challenge[] = [
  { name: "21-Day Meditation Streak", participants: 8420, daysLeft: 14, icon: "🧘" },
  { name: "30-Day Morning Flow", participants: 12800, daysLeft: 16, icon: "🌅" },
  { name: "7-Day Digital Detox Yoga", participants: 3210, daysLeft: 3, icon: "📵" },
  { name: "Gratitude Journaling Challenge", participants: 5640, daysLeft: 21, icon: "📔" },
];

const DEMO_USERS: Record<UserRole, User> = {
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
    classesCount: 0,
    rating: 5.0,
    revenue: 890000,
  },
};

interface AppState {
  // Auth Store
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsDemo: (role: UserRole) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;

  // Programs & Meditations
  programs: Program[];
  meditations: MeditationSession[];
  enrolledPrograms: number[];
  programProgress: Record<number, number>; // programId -> completed sessions
  meditationMinutes: number;
  meditationHistory: { d: string; v: number }[];
  meditationStreak: number;
  favorites: number[]; // meditation IDs
  wishlist: number[]; // retreat IDs

  // Tracker State
  waterIntake: number; // in ml
  habits: { id: string; name: string; completed: boolean }[];
  wellnessStreak: number;

  // Retreats & Bookings
  retreats: Retreat[];
  bookings: RetreatBooking[];

  // Classes (Instructor Dashboard)
  classes: YogaClass[];
  certifications: string[];

  // Nutrition (Nutrition Dashboard)
  mealPlans: MealPlan[];
  clients: ClientProgress[];
  consultations: Consultation[];
  wellnessPrograms: WellnessProgram[];

  // Admin Dashboard
  pendingInstructors: PendingInstructor[];
  suspendedUsers: string[];
  managedUsers: ManagedUser[];

  // Community Feed
  posts: Post[];
  joinedGroups: number[];
  likedPosts: number[];
  groups: Group[];
  challenges: Challenge[];
  joinedChallenges: string[];

  // Actions
  enrollInProgram: (id: number) => void;
  completeProgramSession: (id: number) => void;
  playMeditation: (id: number, minutes: number) => void;
  toggleFavoriteMeditation: (id: number) => void;
  toggleWishlistRetreat: (id: number) => void;
  addWater: (amount: number) => void;
  toggleHabit: (id: string) => void;
  addHabit: (name: string) => void;

  // Bookings / Retreat Organizer Actions
  bookRetreat: (retreatId: number, userDetails: { name: string; email: string }) => void;
  createRetreat: (retreat: Partial<Retreat>) => void;
  editRetreat: (id: number, retreat: Partial<Retreat>) => void;
  deleteRetreat: (id: number) => void;
  publishRetreatEvent: (id: number) => void;
  updateBookingStatus: (bookingId: string, status: "confirmed" | "pending") => void;

  // Instructor Actions
  createClass: (cls: Partial<YogaClass>) => void;
  editClass: (id: string, cls: Partial<YogaClass>) => void;
  deleteClass: (id: string) => void;
  startClassSession: (id: string) => void;
  approveStudent: (classId: string, studentName: string) => void;
  uploadCertificate: (certName: string) => void;

  // Nutrition Actions
  createMealPlan: (plan: Partial<MealPlan>) => void;
  createWellnessProgram: (program: Omit<WellnessProgram, "id" | "enrolledClients" | "status">) => void;
  deleteWellnessProgram: (id: string) => void;
  assignMealPlan: (clientId: string, planName: string) => void;
  scheduleConsultation: (clientName: string, dateTime: string, type: "video" | "chat" | "in-person") => void;
  updateClientProgress: (clientName: string, progress: number) => void;

  // Admin Actions
  verifyInstructor: (name: string) => void;
  rejectInstructor: (name: string) => void;
  suspendUser: (name: string) => void;
  deleteContent: (postId: number) => void;
  approveRetreat: (retreatId: number) => void;
  // User Management Actions
  banManagedUser: (id: string) => void;
  unbanManagedUser: (id: string) => void;
  suspendManagedUser: (id: string) => void;
  deleteManagedUser: (id: string) => void;
  changeManagedUserRole: (id: string, role: ManagedUserRole) => void;
  changeManagedUserPlan: (id: string, plan: "free" | "starter" | "pro" | "elite") => void;
  updateManagedUserNote: (id: string, note: string) => void;
  addManagedUser: (user: Omit<ManagedUser, "id">) => void;

  // Community Actions
  createPost: (content: string, groupName: string | null, img: string | null) => void;
  likePost: (postId: number) => void;
  commentOnPost: (postId: number, comment: string) => void;
  joinGroup: (groupId: number) => void;
  toggleJoinChallenge: (challengeName: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth States
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Initial Data
      programs: INITIAL_PROGRAMS,
      meditations: INITIAL_MEDITATIONS,
      enrolledPrograms: [],
      programProgress: {},
      meditationMinutes: 0,
      meditationHistory: [
        { d: "M", v: 10 }, { d: "T", v: 20 }, { d: "W", v: 0 },
        { d: "T", v: 15 }, { d: "F", v: 25 }, { d: "S", v: 30 }, { d: "S", v: 10 }
      ],
      meditationStreak: 3,
      favorites: [],
      wishlist: [],

      // Trackers
      waterIntake: 750,
      habits: [
        { id: "h-1", name: "Morning Pranayama", completed: true },
        { id: "h-2", name: "15 Min Meditation", completed: false },
        { id: "h-3", name: "Daily Journaling", completed: true },
        { id: "h-4", name: "Read Spiritual Texts", completed: false }
      ],
      wellnessStreak: 14,

      // Retreats & Bookings
      retreats: INITIAL_RETREATS,
      bookings: [
        { id: "b-1", retreatId: 1, retreatTitle: "7-Day Bali Yoga & Spirit Retreat", clientName: "Aria Sharma", date: "Jun 15", amount: 1890, status: "confirmed" },
        { id: "b-2", retreatId: 4, retreatTitle: "Panchakarma Ayurvedic Detox", clientName: "Michael B.", date: "Jul 20", amount: 2400, status: "pending" }
      ],

      // Instructor Classes
      classes: [
        { id: "c-1", name: "Morning Vinyasa Live", instructorId: "demo-instructor-1", time: "Tomorrow 7:00 AM", students: 4, type: "Live", status: "scheduled", studentsList: [{name: "Aria Sharma", date: "Pending approval", pending: true}, {name: "John Doe", date: "Registered yesterday", pending: false}, {name: "Sara Chen", date: "Registered yesterday", pending: false}, {name: "Priya K.", date: "Registered yesterday", pending: false}] },
        { id: "c-2", name: "1-on-1 Alignment Clinic", instructorId: "demo-instructor-1", time: "Wed 3:00 PM", students: 1, type: "Private", status: "scheduled", studentsList: [{name: "Michael B.", date: "Pending approval", pending: true}] },
        { id: "c-3", name: "Restorative Yin Flow", instructorId: "demo-instructor-1", time: "Thu 6:30 PM", students: 2, type: "Group", status: "scheduled", studentsList: [{name: "David Lee", date: "Registered today", pending: false}, {name: "Alex M.", date: "Registered recently", pending: false}] }
      ],
      certifications: ["RYT-500", "Yin Yoga TTC"],

      // Nutrition Expert
      mealPlans: [
        { id: "m-1", name: "High-Protein Ayurvedic Diet", meals: { breakfast: "Spiced Oatmeal with Almonds", lunch: "Kitchari with Steamed Greens", dinner: "Lentil Soup with Roasted Veggies", snack: "Soaked Figs & Walnuts" }, calories: 1800, assignedTo: "Sara Chen" },
        { id: "m-2", name: "Gut Healing Reset Plan", meals: { breakfast: "Papaya & Chia Pudding", lunch: "Warm Quinoa Salad with Ginger Dress", dinner: "Mung Dal and Stewed Squash", snack: "Herbal Fennel Tea & Rice Cakes" }, calories: 1500, assignedTo: "Priya K." }
      ],
      clients: [
        { name: "Sara Chen", plan: "High-Protein Ayurvedic Diet", sessions: 8, progress: 72, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face" },
        { name: "Michael B.", plan: "Ayurvedic Reset", sessions: 4, progress: 45, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" },
        { name: "Priya K.", plan: "Gut Health", sessions: 12, progress: 88, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" }
      ],
      consultations: [
        { id: "con-1", clientName: "Sara Chen", time: "Today, 4:00 PM", type: "video" },
        { id: "con-2", clientName: "David Lee", time: "Tomorrow, 10:30 AM", type: "chat" }
      ],
      wellnessPrograms: [
        { id: "wp-1", title: "Ayurvedic Reset Workshop", format: "workshop", duration: "2 weeks", price: 149, enrolledClients: 18, status: "published", description: "A guided reset for digestion, sleep, and daily food rituals." },
        { id: "wp-2", title: "Mindful Meal Prep Course", format: "course", duration: "4 weeks", price: 249, enrolledClients: 11, status: "published", description: "Weekly coaching modules for sustainable plant-forward planning." }
      ],

      // Admin Dashboard
      pendingInstructors: [
        { name: "Kavita Sharma", specialty: "Kundalini", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=face", date: "2 hours ago" },
        { name: "Rohan Verma", specialty: "Ashtanga", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face", date: "5 hours ago" },
        { name: "Anaya Das", specialty: "Prenatal Yoga", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face", date: "1 day ago" }
      ],
      suspendedUsers: [],
      managedUsers: INITIAL_MANAGED_USERS,

      // Community Feed
      posts: [
        { id: 1, author: "Aria Sharma", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face", group: "Morning Yoga Warriors", time: "2h ago", content: "Just completed Day 14 of my 30-day morning flow challenge! The transformation in my body and mind is incredible. For anyone hesitating — just start. Even 10 minutes changes everything 🌿", likes: 247, comments: [{ author: "Priya K.", content: "So proud of you Aria! Keep it up!", time: "1h ago" }], img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=300&fit=crop" },
        { id: 2, author: "Dr. Meera Pillai", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face", group: "Ayurveda & Nutrition Hub", time: "4h ago", content: "Golden milk recipe that changed my sleep quality forever: 1 cup warm oat milk + 1/2 tsp turmeric + pinch black pepper + 1 tsp raw honey + cardamom. Drink 30 min before bed. Thank me later 🌙✨", likes: 412, comments: [], img: null },
        { id: 3, author: "Guru Ananda", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", group: "Spiritual Growth & Philosophy", time: "6h ago", content: "Bhagavad Gita 2.47: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.' This single verse has the power to completely transform how you approach every single day. What does it mean to you?", likes: 680, comments: [], img: null }
      ],
      joinedGroups: [],
      likedPosts: [],
      joinedChallenges: [],
      groups: INITIAL_GROUPS,
      challenges: INITIAL_CHALLENGES,

      // Auth Actions
      login: async (email, _password) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 1000));
        let matchedUser = { ...DEMO_USERS.user, email };
        
        // Match demo accounts if applicable
        const foundDemo = Object.values(DEMO_USERS).find((u) => u.email === email);
        if (foundDemo) {
          matchedUser = foundDemo;
        }

        set({ user: matchedUser, isAuthenticated: true, isLoading: false });
        return true;
      },

      loginAsDemo: async (role) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const demoUser = DEMO_USERS[role];
        set({ user: demoUser, isAuthenticated: true, isLoading: false });
      },

      register: async (name, email, _password) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 1200));
        const newUser: User = {
          ...DEMO_USERS.user,
          id: `user-${Date.now()}`,
          name,
          email,
          plan: "free",
          joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        };
        set({ user: newUser, isAuthenticated: true, isLoading: false });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        const { user } = get();
        if (!user) return;
        const updated = { ...user, ...data };
        set({ user: updated });
      },

      // Wellness Actions
      enrollInProgram: (id) => {
        const { enrolledPrograms } = get();
        if (enrolledPrograms.includes(id)) return;
        set({ enrolledPrograms: [...enrolledPrograms, id] });
      },

      completeProgramSession: (id) => {
        const { programProgress, programs } = get();
        const current = programProgress[id] || 0;
        const program = programs.find((p) => p.id === id);
        const max = program ? program.sessions : 30;

        if (current >= max) return;

        const nextVal = current + 1;
        set({
          programProgress: { ...programProgress, [id]: nextVal },
          wellnessStreak: get().wellnessStreak + (nextVal === 1 ? 1 : 0)
        });
      },

      playMeditation: (id, minutes) => {
        const { meditationMinutes, meditationHistory } = get();
        // Increment history value for today (last element of array for simplicity)
        const updatedHistory = [...meditationHistory];
        if (updatedHistory.length > 0) {
          updatedHistory[updatedHistory.length - 1].v += minutes;
        }
        
        set({
          meditationMinutes: meditationMinutes + minutes,
          meditationHistory: updatedHistory,
          meditationStreak: get().meditationStreak + 1
        });
      },

      toggleFavoriteMeditation: (id) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((f) => f !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },

      toggleWishlistRetreat: (id) => {
        const { wishlist } = get();
        if (wishlist.includes(id)) {
          set({ wishlist: wishlist.filter((w) => w !== id) });
        } else {
          set({ wishlist: [...wishlist, id] });
        }
      },

      addWater: (amount) => {
        set({ waterIntake: get().waterIntake + amount });
      },

      toggleHabit: (id) => {
        const { habits } = get();
        const updated = habits.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h));
        set({ habits: updated });
      },

      addHabit: (name) => {
        const { habits } = get();
        set({ habits: [...habits, { id: `h-${Date.now()}`, name, completed: false }] });
      },

      // Booking / Retreat actions
      bookRetreat: (retreatId, userDetails) => {
        const { retreats, bookings } = get();
        const retreat = retreats.find((r) => r.id === retreatId);
        if (!retreat) return;

        const newBooking: RetreatBooking = {
          id: `b-${Date.now()}`,
          retreatId,
          retreatTitle: retreat.title,
          clientName: userDetails.name,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          amount: retreat.price,
          status: "pending",
        };

        // Increment participants in retreat
        const updatedRetreats = retreats.map((r) =>
          r.id === retreatId ? { ...r, participants: Math.min(r.participants + 1, r.maxParticipants) } : r
        );

        set({
          bookings: [newBooking, ...bookings],
          retreats: updatedRetreats,
        });
      },

      createRetreat: (retreatData) => {
        const { retreats } = get();
        const newRetreat: Retreat = {
          id: retreats.length + 1,
          title: retreatData.title || "New Retreat",
          location: retreatData.location || "Bali",
          country: retreatData.country || "Indonesia",
          type: retreatData.type || "Yoga Immersion",
          duration: retreatData.duration || "7 days",
          dates: retreatData.dates || "TBD",
          price: retreatData.price || 1000,
          originalPrice: retreatData.originalPrice || 1200,
          participants: 0,
          maxParticipants: retreatData.maxParticipants || 15,
          rating: 5.0,
          reviews: 0,
          img: retreatData.img || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop",
          organizer: retreatData.organizer || "Serenity Wellness Hub",
          featured: false,
          tag: "New",
          highlights: retreatData.highlights || ["Daily Yoga", "Holistic Foods"],
          approved: false, // requires admin approval
        };

        set({ retreats: [...retreats, newRetreat] });
      },

      editRetreat: (id, updatedData) => {
        const { retreats } = get();
        const updated = retreats.map((r) => (r.id === id ? { ...r, ...updatedData } : r));
        set({ retreats: updated });
      },

      deleteRetreat: (id) => {
        const { retreats } = get();
        set({ retreats: retreats.filter((r) => r.id !== id) });
      },

      publishRetreatEvent: (id) => {
        const { retreats } = get();
        const updated = retreats.map((r) => (r.id === id ? { ...r, tag: "Published" } : r));
        set({ retreats: updated });
      },

      updateBookingStatus: (bookingId, status) => {
        const { bookings, user } = get();
        const updatedBookings = bookings.map((b) => (b.id === bookingId ? { ...b, status } : b));
        
        // If confirmed, update organizer's revenue count
        let additionalRevenue = 0;
        if (status === "confirmed") {
          const b = bookings.find((bk) => bk.id === bookingId);
          if (b) additionalRevenue = b.amount;
        }

        set({ bookings: updatedBookings });

        if (user && user.role === "wellness_center" && additionalRevenue > 0) {
          const currentRev = user.revenue || 0;
          set({
            user: { ...user, revenue: currentRev + additionalRevenue }
          });
        }
      },

      // Instructor Actions
      createClass: (cls) => {
        const { classes, user } = get();
        const newClass: YogaClass = {
          id: `c-${Date.now()}`,
          name: cls.name || "Vinyasa flow class",
          instructorId: user?.id || "demo-instructor-1",
          time: cls.time || "TBD",
          students: 0,
          type: cls.type || "Live",
          status: "scheduled",
        };
        set({ classes: [...classes, newClass] });
        if (user) {
          set({ user: { ...user, classesCount: (user.classesCount || 0) + 1 } });
        }
      },

      editClass: (id, updatedClass) => {
        const { classes } = get();
        const updated = classes.map((c) => (c.id === id ? { ...c, ...updatedClass } : c));
        set({ classes: updated });
      },

      deleteClass: (id) => {
        const { classes, user } = get();
        set({ classes: classes.filter((c) => c.id !== id) });
        if (user) {
          set({ user: { ...user, classesCount: Math.max(0, (user.classesCount || 1) - 1) } });
        }
      },

      startClassSession: (id) => {
        const { classes } = get();
        const updated = classes.map((c) => (c.id === id ? { ...c, status: "live" as const } : c));
        set({ classes: updated });
      },

      approveStudent: (classId, studentName) => {
        const { classes, user } = get();
        const updatedClasses = classes.map(c => {
          if (c.id === classId && c.studentsList) {
            return {
              ...c,
              studentsList: c.studentsList.map(s => s.name === studentName ? { ...s, pending: false, date: "Approved" } : s)
            };
          }
          return c;
        });
        set({ classes: updatedClasses });
        
        if (user) {
          set({ user: { ...user, studentsCount: (user.studentsCount || 0) + 1 } });
        }
      },

      uploadCertificate: (certName) => {
        const { certifications } = get();
        if (certifications.includes(certName)) return;
        set({ certifications: [...certifications, certName] });
      },

      // Nutrition Actions
      createMealPlan: (plan) => {
        const { mealPlans } = get();
        const newPlan: MealPlan = {
          id: `m-${Date.now()}`,
          name: plan.name || "Custom Diet Plan",
          meals: plan.meals || { breakfast: "Smoothie", lunch: "Salad", dinner: "Tofu Stir-fry", snack: "Nuts" },
          calories: plan.calories || 1600,
          assignedTo: plan.assignedTo
        };
        set({ mealPlans: [...mealPlans, newPlan] });
      },

      createWellnessProgram: (program) => {
        const { wellnessPrograms } = get();
        const newProgram: WellnessProgram = {
          ...program,
          id: `wp-${Date.now()}`,
          enrolledClients: 0,
          status: "published",
        };
        set({ wellnessPrograms: [newProgram, ...wellnessPrograms] });
      },

      deleteWellnessProgram: (id) => {
        const { wellnessPrograms } = get();
        set({ wellnessPrograms: wellnessPrograms.filter((program) => program.id !== id) });
      },

      assignMealPlan: (clientId, planName) => {
        const { clients, mealPlans } = get();
        const updatedClients = clients.map((c) => (c.name === clientId ? { ...c, plan: planName } : c));
        const updatedPlans = mealPlans.map((p) => (p.id === planName || p.name === planName ? { ...p, assignedTo: clientId } : p));
        set({ clients: updatedClients, mealPlans: updatedPlans });
      },

      scheduleConsultation: (clientName, dateTime, type) => {
        const { consultations } = get();
        const newConsultation: Consultation = {
          id: `con-${Date.now()}`,
          clientName,
          time: dateTime,
          type
        };
        set({ consultations: [...consultations, newConsultation] });
      },

      updateClientProgress: (clientName, progress) => {
        const { clients } = get();
        const updated = clients.map((c) => (c.name === clientName ? { ...c, progress } : c));
        set({ clients: updated });
      },

      // Admin Actions
      verifyInstructor: (name) => {
        const { pendingInstructors, user } = get();
        const updatedPending = pendingInstructors.map((ins) =>
          ins.name === name ? { ...ins, verified: true } : ins
        );
        // Add to active instructor metrics (admin user stats)
        set({ pendingInstructors: updatedPending });
        if (user && user.role === "admin") {
          set({
            user: { ...user, studentsCount: (user.studentsCount || 0) + 1 } // Using studentsCount or rating just as placeholder platform stats
          });
        }
      },

      rejectInstructor: (name) => {
        const { pendingInstructors } = get();
        set({ pendingInstructors: pendingInstructors.filter((ins) => ins.name !== name) });
      },

      suspendUser: (name) => {
        const { suspendedUsers } = get();
        if (suspendedUsers.includes(name)) return;
        set({ suspendedUsers: [...suspendedUsers, name] });
      },

      deleteContent: (postId) => {
        const { posts } = get();
        set({ posts: posts.filter((p) => p.id !== postId) });
      },

      approveRetreat: (retreatId) => {
        const { retreats } = get();
        const updated = retreats.map((r) => (r.id === retreatId ? { ...r, approved: true } : r));
        set({ retreats: updated });
      },

      // User Management Actions
      banManagedUser: (id) => {
        const { managedUsers } = get();
        set({ managedUsers: managedUsers.map((u) => u.id === id ? { ...u, status: "banned" as ManagedUserStatus } : u) });
      },
      unbanManagedUser: (id) => {
        const { managedUsers } = get();
        set({ managedUsers: managedUsers.map((u) => u.id === id ? { ...u, status: "active" as ManagedUserStatus } : u) });
      },
      suspendManagedUser: (id) => {
        const { managedUsers } = get();
        set({ managedUsers: managedUsers.map((u) => u.id === id ? { ...u, status: "suspended" as ManagedUserStatus } : u) });
      },
      deleteManagedUser: (id) => {
        const { managedUsers } = get();
        set({ managedUsers: managedUsers.filter((u) => u.id !== id) });
      },
      changeManagedUserRole: (id, role) => {
        const { managedUsers } = get();
        set({ managedUsers: managedUsers.map((u) => u.id === id ? { ...u, role } : u) });
      },
      changeManagedUserPlan: (id, plan) => {
        const { managedUsers } = get();
        set({ managedUsers: managedUsers.map((u) => u.id === id ? { ...u, plan } : u) });
      },
      updateManagedUserNote: (id, note) => {
        const { managedUsers } = get();
        set({ managedUsers: managedUsers.map((u) => u.id === id ? { ...u, note } : u) });
      },
      addManagedUser: (userData) => {
        const { managedUsers } = get();
        const newUser: ManagedUser = { ...userData, id: `mu-${Date.now()}` };
        set({ managedUsers: [newUser, ...managedUsers] });
      },

      // Community Actions
      createPost: (content, groupName, img) => {
        const { posts, user } = get();
        if (!user) return;
        const newPost: Post = {
          id: Date.now(),
          author: user.name,
          avatar: user.avatar,
          group: groupName || "General Wellness",
          time: "Just now",
          content,
          likes: 0,
          comments: [],
          img,
        };
        set({ posts: [newPost, ...posts] });
      },

      likePost: (postId) => {
        const { likedPosts, posts } = get();
        if (likedPosts.includes(postId)) {
          // Unlike
          set({
            likedPosts: likedPosts.filter((id) => id !== postId),
            posts: posts.map((p) => (p.id === postId ? { ...p, likes: Math.max(0, p.likes - 1) } : p)),
          });
        } else {
          // Like
          set({
            likedPosts: [...likedPosts, postId],
            posts: posts.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)),
          });
        }
      },

      commentOnPost: (postId, commentText) => {
        const { posts, user } = get();
        if (!user) return;
        const commentObj: Comment = {
          author: user.name,
          content: commentText,
          time: "Just now"
        };
        const updated = posts.map((p) =>
          p.id === postId ? { ...p, comments: [...p.comments, commentObj] } : p
        );
        set({ posts: updated });
      },

      joinGroup: (groupId) => {
        const { joinedGroups, groups } = get();
        if (joinedGroups.includes(groupId)) {
          // Leave
          set({
            joinedGroups: joinedGroups.filter((id) => id !== groupId),
            groups: groups.map((g) => (g.id === groupId ? { ...g, members: Math.max(0, g.members - 1) } : g)),
          });
        } else {
          // Join
          set({
            joinedGroups: [...joinedGroups, groupId],
            groups: groups.map((g) => (g.id === groupId ? { ...g, members: g.members + 1 } : g)),
          });
        }
      },
      toggleJoinChallenge: (challengeName) => {
        const joinedChallenges = get().joinedChallenges || [];
        const challenges = get().challenges || [];
        if (joinedChallenges.includes(challengeName)) {
          // Leave challenge
          set({
            joinedChallenges: joinedChallenges.filter((c) => c !== challengeName),
            challenges: challenges.map((c) =>
              c.name === challengeName ? { ...c, participants: Math.max(0, c.participants - 1) } : c
            ),
          });
        } else {
          // Join challenge
          set({
            joinedChallenges: [...joinedChallenges, challengeName],
            challenges: challenges.map((c) =>
              c.name === challengeName ? { ...c, participants: c.participants + 1 } : c
            ),
          });
        }
      },
    }),
    {
      name: "yogictown-state-v2",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        enrolledPrograms: state.enrolledPrograms,
        programProgress: state.programProgress,
        meditationMinutes: state.meditationMinutes,
        meditationStreak: state.meditationStreak,
        meditationHistory: state.meditationHistory,
        favorites: state.favorites,
        wishlist: state.wishlist,
        waterIntake: state.waterIntake,
        habits: state.habits,
        wellnessStreak: state.wellnessStreak,
        retreats: state.retreats,
        bookings: state.bookings,
        classes: state.classes,
        certifications: state.certifications,
        mealPlans: state.mealPlans,
        clients: state.clients,
        consultations: state.consultations,
        wellnessPrograms: state.wellnessPrograms,
        pendingInstructors: state.pendingInstructors,
        suspendedUsers: state.suspendedUsers,
        managedUsers: state.managedUsers,
        posts: state.posts,
        joinedGroups: state.joinedGroups,
        likedPosts: state.likedPosts,
        joinedChallenges: state.joinedChallenges,
      }),
      merge: (persistedState: any, currentState: any) => {
        if (persistedState?.classes) {
          persistedState.classes = persistedState.classes.map((c: any) => {
            if (!c.studentsList) {
              const defaultClass = currentState.classes.find((dc: any) => dc.id === c.id);
              return { ...c, studentsList: defaultClass ? defaultClass.studentsList : [] };
            }
            return c;
          });
        }
        return { ...currentState, ...persistedState };
      },
    }
  )
);
