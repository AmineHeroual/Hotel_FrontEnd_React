
import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { UserRole } from "@/types";
import { Sun, Moon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({ children }) => {
  // Check if dark mode is enabled in localStorage or if user prefers dark mode
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return savedTheme === "dark" || (!savedTheme && prefersDark);
    }
    return false;
  });

  // Update the HTML class and localStorage when dark mode changes
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen bg-[#f8f5f0] dark:bg-[#1A1814] text-[#3C2A1A] dark:text-[#F5F1E9] relative">
      {/* Custom brown pattern background */}
      <div className="absolute inset-0 bg-opacity-5 dark:bg-opacity-10 pointer-events-none">
        <div className="absolute inset-0 diamond-pattern opacity-5 dark:opacity-10"></div>
      </div>
      
      {/* Sidebar component */}
      <Sidebar userRole="admin" />
      
      {/* Main content */}
      <div className="flex-1 p-8 ml-64 z-10">
        {/* Dark mode toggle */}
        <div className="flex justify-end mb-4">
          <Toggle 
            pressed={isDarkMode} 
            onPressedChange={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-luxury-cream/10 dark:bg-luxury-dark/30 border border-luxury-gold/20"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-luxury-gold" />
            ) : (
              <Moon className="h-5 w-5 text-luxury-brown" />
            )}
          </Toggle>
        </div>
        
        <div className="space-y-8 max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
