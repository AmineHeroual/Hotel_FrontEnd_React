
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarProps } from "./types";
import { useToast } from "@/hooks/use-toast";
import { SidebarItem } from "./sidebar-item";
import { SidebarUserProfile } from "./sidebar-user-profile";
import { SidebarToggle } from "./sidebar-toggle";
import { useSidebarNavigation } from "@/hooks/use-sidebar-navigation";

export function Sidebar({ userRole }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const navItems = useSidebarNavigation(userRole);

  const handleLogout = () => {
    // In a real application, this would handle authentication logout
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    });
    // Redirect to login page
    navigate("/auth/login");
  };

  return (
    <aside
      className={cn(
        "h-screen fixed top-0 left-0 z-40 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="font-serif text-xl tracking-tight text-sidebar-foreground">
            <span className="text-sidebar-primary">Hotel</span>Managerium
          </div>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={location.pathname === item.href}
              collapsed={collapsed}
            />
          ))}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-sidebar-border bg-sidebar-accent/30">
        <div className="flex items-center justify-between">
          <SidebarUserProfile 
            collapsed={collapsed} 
            userRole={userRole} 
            onLogout={handleLogout} 
          />
          <SidebarToggle 
            collapsed={collapsed} 
            onToggle={() => setCollapsed(!collapsed)} 
          />
        </div>
      </div>
    </aside>
  );
}
