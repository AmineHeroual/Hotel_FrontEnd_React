
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";

interface SidebarToggleProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const SidebarToggle: React.FC<SidebarToggleProps> = ({ collapsed, onToggle }) => {
  return (
    <ButtonCustom
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
      onClick={onToggle}
      aria-label={collapsed ? "Développer la barre latérale" : "Réduire la barre latérale"}
    >
      {collapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </ButtonCustom>
  );
};
