
export type UserRole = "client" | "admin" | "technician" | "receptionist";

export type Task = {
  id: number;
  title: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed";
  dueDate: string;
  category: string;
  room: string;
  description?: string;
};

export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "checked_in" | "checked_out";

