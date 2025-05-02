
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href,
  active = false,
  collapsed = false,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={cn(
              "flex items-center px-3 py-2.5 rounded-md transition-colors group mb-1",
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            )}
          >
            <Icon className="h-5 w-5 mr-2 shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
            {collapsed && (
              <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-popover text-popover-foreground text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all pointer-events-none z-50">
                {label}
              </span>
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" align="center" hidden={!collapsed}>
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
