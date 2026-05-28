import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AICoach from "@/components/features/AICoach";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Programs from "./pages/Programs";
import Meditation from "./pages/Meditation";
import Retreats from "./pages/Retreats";
import Community from "./pages/Community";
import Instructors from "./pages/Instructors";
import WellnessAssessment from "./pages/WellnessAssessment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <DashboardRedirect />;
  }

  return <>{children}</>;
};

// Redirect /dashboard to role-based path
const DashboardRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const rolePathMap: Record<string, string> = {
    user: "user",
    instructor: "instructor",
    wellness_center: "retreat",
    nutrition_expert: "nutrition",
    admin: "admin",
  };

  const path = rolePathMap[user.role] || "user";
  return <Navigate to={`/dashboard/${path}`} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AICoach />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Dashboard Sub-routes */}
              <Route path="/dashboard" element={<DashboardRedirect />} />
              <Route path="/dashboard/user" element={<ProtectedRoute allowedRoles={["user"]}><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/instructor" element={<ProtectedRoute allowedRoles={["instructor"]}><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/retreat" element={<ProtectedRoute allowedRoles={["wellness_center"]}><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/nutrition" element={<ProtectedRoute allowedRoles={["nutrition_expert"]}><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Dashboard /></ProtectedRoute>} />
              <Route path="/onboarding/assessment" element={<ProtectedRoute allowedRoles={["user"]}><WellnessAssessment /></ProtectedRoute>} />
              
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/meditation" element={<Meditation />} />
              <Route path="/retreats" element={<Retreats />} />
              <Route path="/community" element={<Community />} />
              <Route path="/instructors" element={<Instructors />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
