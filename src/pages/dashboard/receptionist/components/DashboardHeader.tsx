
import React from "react";

interface DashboardHeaderProps {
  title: string;
  description: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-2">{description}</p>
    </div>
  );
};
