import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import { useScrollTop } from "@/hooks/useScrollTop";

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export default function PageLayout({ children, showFooter = true }: PageLayoutProps) {
  useScrollTop();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
      <ScrollToTopButton />
    </div>
  );
}
