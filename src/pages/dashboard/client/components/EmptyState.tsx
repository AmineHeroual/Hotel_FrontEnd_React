
import React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, message }) => {
  return (
    <div className="text-center py-8 text-muted-foreground">
      <Icon className="h-12 w-12 mx-auto mb-4 opacity-20" />
      <p>{message}</p>
    </div>
  );
};
