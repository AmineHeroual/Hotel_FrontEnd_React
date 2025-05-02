
import React from "react";
import { StatsCards } from "./StatsCards";
import { OccupancyChart } from "./OccupancyChart";
import { RecentBookings } from "./RecentBookings";
import { QuickActions } from "./QuickActions";
import { TaskList, Task } from "./TaskList";
import { DashboardHeader } from "./DashboardHeader";

interface Booking {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled";
}

interface DashboardContentProps {
  statsData: {
    totalGuests: number;
    guestsChange: number;
    availableRooms: number;
    occupancyRate: number;
    checkInsToday: number;
    checkInsChange: number;
    revenueToday: number;
    revenueChange: number;
  };
  occupancyData: {
    name: string;
    total: number;
  }[];
  recentBookings: Booking[];
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  statsData,
  occupancyData,
  recentBookings,
  tasks,
  onTaskToggle,
}) => {
  return (
    <>
      {/* Dashboard header */}
      <DashboardHeader 
        title="Receptionist Dashboard" 
        description="Manage bookings, check-ins, and guest services from one place."
      />
      
      {/* Stats cards */}
      <StatsCards {...statsData} />
      
      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Occupancy chart */}
        <OccupancyChart className="col-span-1" occupancyData={occupancyData} />
        
        {/* Recent bookings */}
        <RecentBookings className="col-span-1" bookings={recentBookings} />
      </div>
      
      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick actions */}
        <QuickActions />
        
        {/* Task list */}
        <TaskList tasks={tasks} onTaskToggle={onTaskToggle} />
      </div>
    </>
  );
};
