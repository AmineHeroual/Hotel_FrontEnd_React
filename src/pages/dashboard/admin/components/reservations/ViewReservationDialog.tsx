
import React from "react";
import { format } from "date-fns";
import { ButtonCustom } from "@/components/ui/button-custom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Reservation } from "../../types/reservation-types";

interface ViewReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation | null;
  onConfirmReservation: (id: string) => void;
  onPrepareCancelReservation: () => void;
}

export const ViewReservationDialog: React.FC<ViewReservationDialogProps> = ({
  open,
  onOpenChange,
  reservation,
  onConfirmReservation,
  onPrepareCancelReservation,
}) => {
  if (!reservation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Reservation Details - {reservation.id}</DialogTitle>
          <DialogDescription>
            Complete reservation information
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <h4 className="font-semibold mb-2">Guest Information</h4>
            <p><span className="text-muted-foreground">Name:</span> {reservation.guestName}</p>
            <p><span className="text-muted-foreground">Email:</span> {reservation.email}</p>
            <p><span className="text-muted-foreground">Phone:</span> {reservation.phone}</p>
            <p><span className="text-muted-foreground">Guests:</span> {reservation.guests}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Room Information</h4>
            <p><span className="text-muted-foreground">Room Number:</span> {reservation.roomNumber}</p>
            <p><span className="text-muted-foreground">Room Type:</span> {reservation.roomType}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Reservation Dates</h4>
            <p><span className="text-muted-foreground">Check-in:</span> {format(reservation.checkIn, "MMM dd, yyyy")}</p>
            <p><span className="text-muted-foreground">Check-out:</span> {format(reservation.checkOut, "MMM dd, yyyy")}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Payment Information</h4>
            <p><span className="text-muted-foreground">Total Amount:</span> ${reservation.totalAmount}</p>
            <p><span className="text-muted-foreground">Payment Status:</span> {reservation.paymentStatus}</p>
          </div>
        </div>
        <DialogFooter>
          {reservation.status === "pending" && (
            <ButtonCustom onClick={() => {
              onConfirmReservation(reservation.id);
              onOpenChange(false);
            }}>
              Confirm Reservation
            </ButtonCustom>
          )}
          {reservation.status !== "cancelled" && reservation.status !== "checked_out" && (
            <ButtonCustom variant="outline" className="text-red-500" onClick={() => {
              onOpenChange(false);
              onPrepareCancelReservation();
            }}>
              Cancel Reservation
            </ButtonCustom>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
