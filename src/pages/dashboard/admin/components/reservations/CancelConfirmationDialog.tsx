
import React from "react";
import { format } from "date-fns";
import { AlertCircle, XCircle } from "lucide-react";
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

interface CancelConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation | null;
  onCancelReservation: (id: string) => void;
}

export const CancelConfirmationDialog: React.FC<CancelConfirmationDialogProps> = ({
  open,
  onOpenChange,
  reservation,
  onCancelReservation,
}) => {
  if (!reservation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <AlertCircle className="h-6 w-6 text-red-500 mx-auto mb-2" />
          <DialogTitle className="text-center">Cancel Reservation</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to cancel this reservation? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center font-medium">{reservation.id} - {reservation.guestName}</p>
          <p className="text-center text-sm text-muted-foreground">
            {format(reservation.checkIn, "MMM dd")} - {" "}
            {format(reservation.checkOut, "MMM dd, yyyy")}
          </p>
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-center">
          <ButtonCustom variant="outline" onClick={() => onOpenChange(false)} className="mt-2 sm:mt-0 sm:mr-2">
            Keep Reservation
          </ButtonCustom>
          <ButtonCustom 
            variant="destructive" 
            onClick={() => onCancelReservation(reservation.id)}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel Reservation
          </ButtonCustom>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
