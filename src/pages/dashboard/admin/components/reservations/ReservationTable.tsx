
import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ButtonCustom } from "@/components/ui/button-custom";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Reservation, ReservationStatus } from "../../types/reservation-types";

interface ReservationTableProps {
  filteredReservations: Reservation[];
  onViewReservation: (reservation: Reservation) => void;
  onConfirmReservation: (id: string) => void;
  onCancelReservation: (reservation: Reservation) => void;
  onCheckInReservation: (id: string) => void;
  onCheckOutReservation: (id: string) => void;
  showCancelDialog: boolean;
}

export const ReservationTable: React.FC<ReservationTableProps> = ({
  filteredReservations,
  onViewReservation,
  onConfirmReservation,
  onCancelReservation,
  onCheckInReservation,
  onCheckOutReservation,
  showCancelDialog
}) => {
  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "checked_in":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "checked_out":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reservation ID</TableHead>
            <TableHead>Guest</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Room Type</TableHead>
            <TableHead>Check-in Date</TableHead>
            <TableHead>Check-out Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReservations.length > 0 ? (
            filteredReservations.map((reservation) => (
              <TableRow
                key={reservation.id}
                className="hover:bg-muted/50"
              >
                <TableCell className="font-medium">
                  {reservation.id}
                </TableCell>
                <TableCell>{reservation.guestName}</TableCell>
                <TableCell>{reservation.roomNumber}</TableCell>
                <TableCell>{reservation.roomType}</TableCell>
                <TableCell>
                  {format(reservation.checkIn, "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  {format(reservation.checkOut, "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(reservation.status)}>
                    {reservation.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <ButtonCustom
                      variant="outline"
                      size="sm"
                      onClick={() => onViewReservation(reservation)}
                    >
                      View
                    </ButtonCustom>
                    {reservation.status === "pending" && (
                      <ButtonCustom
                        variant="outline"
                        size="sm"
                        onClick={() => onConfirmReservation(reservation.id)}
                      >
                        Confirm
                      </ButtonCustom>
                    )}
                    {(reservation.status === "confirmed" && !showCancelDialog) && (
                      <ButtonCustom
                        variant="outline"
                        size="sm"
                        onClick={() => onCancelReservation(reservation)}
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        Cancel
                      </ButtonCustom>
                    )}
                    {reservation.status === "confirmed" && (
                      <ButtonCustom
                        variant="outline"
                        size="sm"
                        onClick={() => onCheckInReservation(reservation.id)}
                      >
                        Check In
                      </ButtonCustom>
                    )}
                    {reservation.status === "checked_in" && (
                      <ButtonCustom
                        variant="outline"
                        size="sm"
                        onClick={() => onCheckOutReservation(reservation.id)}
                      >
                        Check Out
                      </ButtonCustom>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-24 text-center"
              >
                No reservations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
