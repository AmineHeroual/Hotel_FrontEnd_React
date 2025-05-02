
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BedDouble, ClipboardCheck, Calendar as CalendarIcon } from "lucide-react";
import { Reservation } from "../../types/reservation-types";

interface ReservationStatsProps {
  reservations: Reservation[];
}

export const ReservationStats: React.FC<ReservationStatsProps> = ({ reservations }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-green-100 p-3 mb-2">
            <ClipboardCheck className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold">
            {reservations.filter(r => r.status === "confirmed" || r.status === "checked_in").length}
          </div>
          <p className="text-muted-foreground">Active Reservations</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-blue-100 p-3 mb-2">
            <BedDouble className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold">
            {reservations.filter(r => r.status === "checked_in").length}
          </div>
          <p className="text-muted-foreground">Current Guests</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-yellow-100 p-3 mb-2">
            <CalendarIcon className="h-6 w-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold">
            {reservations.filter(r => r.status === "pending").length}
          </div>
          <p className="text-muted-foreground">Pending Confirmations</p>
        </CardContent>
      </Card>
    </div>
  );
};
