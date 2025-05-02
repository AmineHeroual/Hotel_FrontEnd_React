
import React from "react";
import { ReservationCard, ReservationStatus } from "./ReservationCard";
import { EmptyState } from "./EmptyState";
import { BedDouble } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export interface Reservation {
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: ReservationStatus;
  price: number;
  guests: number;
}

interface ReservationListProps {
  reservations: Reservation[];
  emptyMessage?: string;
}

export const ReservationList: React.FC<ReservationListProps> = ({ 
  reservations, 
  emptyMessage = "You have no reservations at the moment."
}) => {
  const handleModify = () => {
    toast({
      title: "Modify reservation",
      description: "This functionality will be implemented soon.",
    });
  };

  const handleCancel = () => {
    toast({
      title: "Cancel reservation",
      description: "This functionality will be implemented soon.",
    });
  };

  const handleAddServices = () => {
    toast({
      title: "Add services",
      description: "This functionality will be implemented soon.",
    });
  };

  if (reservations.length === 0) {
    return <EmptyState icon={BedDouble} message={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reservations.map((reservation, index) => (
        <ReservationCard
          key={index}
          {...reservation}
          onModify={handleModify}
          onCancel={handleCancel}
          onAddServices={handleAddServices}
        />
      ))}
    </div>
  );
};
