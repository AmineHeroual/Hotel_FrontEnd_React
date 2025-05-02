
import React from "react";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardContent } from "./components/DashboardContent";

const ReceptionistDashboard = () => {
  // Sample data with corrected types
  const statsData = {
    totalGuests: 128,
    guestsChange: 12,
    availableRooms: 24,
    occupancyRate: 76,
    checkInsToday: 42,
    checkInsChange: 8,
    revenueToday: 18650,
    revenueChange: 5.2
  };

  const occupancyData = [
    { name: "Mon", total: 65 },
    { name: "Tue", total: 72 },
    { name: "Wed", total: 80 },
    { name: "Thu", total: 78 },
    { name: "Fri", total: 85 },
    { name: "Sat", total: 92 },
    { name: "Sun", total: 88 },
  ];

  const recentBookings = [
    {
      id: "b1",
      guestName: "Emma Thompson",
      roomNumber: "301",
      checkIn: "Oct 15, 2023",
      checkOut: "Oct 20, 2023",
      status: "checked-in" as const
    },
    {
      id: "b2",
      guestName: "Michael Chen",
      roomNumber: "204",
      checkIn: "Oct 16, 2023",
      checkOut: "Oct 18, 2023",
      status: "confirmed" as const
    },
    {
      id: "b3",
      guestName: "Sarah Johnson",
      roomNumber: "512",
      checkIn: "Oct 14, 2023",
      checkOut: "Oct 21, 2023",
      status: "checked-in" as const
    },
    {
      id: "b4",
      guestName: "David Wilson",
      roomNumber: "118",
      checkIn: "Oct 12, 2023",
      checkOut: "Oct 14, 2023",
      status: "checked-out" as const
    }
  ];

  const tasks = [
    {
      id: "t1",
      title: "Check-in: VIP Guest - Suite 401",
      completed: false,
      priority: "high" as const,
      dueTime: "11:00 AM"
    },
    {
      id: "t2",
      title: "Process room service request for Room 302",
      completed: false,
      priority: "medium" as const,
      dueTime: "10:30 AM"
    },
    {
      id: "t3",
      title: "Prepare welcome package for Group Booking",
      completed: true,
      priority: "medium" as const,
      dueTime: "9:00 AM"
    },
    {
      id: "t4",
      title: "Update room status after cleaning",
      completed: false,
      priority: "low" as const,
      dueTime: "2:00 PM"
    }
  ];

  const handleTaskToggle = (taskId: string) => {
    console.log(`Task ${taskId} toggled`);
    // In a real app, you would update the task state here
  };

  return (
    <DashboardLayout userRole="receptionist">
      <DashboardContent
        statsData={statsData}
        occupancyData={occupancyData}
        recentBookings={recentBookings}
        tasks={tasks}
        onTaskToggle={handleTaskToggle}
      />
    </DashboardLayout>
  );
};

export default ReceptionistDashboard;
