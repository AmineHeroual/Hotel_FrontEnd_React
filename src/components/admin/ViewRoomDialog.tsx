
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Printer } from "lucide-react";
import { toast } from "sonner";

interface Room {
  id: number;
  type: string;
  status: string;
  price: number;
  occupants: number;
  checkIn: string;
  checkOut: string;
}

interface ViewRoomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
}

export const ViewRoomDialog: React.FC<ViewRoomDialogProps> = ({
  isOpen,
  onClose,
  room,
}) => {
  if (!room) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>;
      case "occupied":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Occupied</Badge>;
      case "reserved":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Reserved</Badge>;
      case "maintenance":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Maintenance</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handlePrint = () => {
    toast.info("Printing room details...");
    // In a real application, this would trigger the print functionality
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Room {room.id} Details</DialogTitle>
          <DialogDescription>
            View detailed information about this room
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Room Number</h4>
              <p className="font-semibold">{room.id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Room Type</h4>
              <p className="font-semibold">{room.type}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
              <div>{getStatusBadge(room.status)}</div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Price per Night</h4>
              <p className="font-semibold">${room.price}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Max Occupants</h4>
              <p className="font-semibold">{room.occupants}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Current Occupants</h4>
              <p className="font-semibold">{room.status === 'occupied' ? room.occupants : 0}</p>
            </div>
          </div>

          {room.status === 'occupied' || room.status === 'reserved' ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Check In</h4>
                <p className="font-semibold">{room.checkIn || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Check Out</h4>
                <p className="font-semibold">{room.checkOut || 'N/A'}</p>
              </div>
            </div>
          ) : null}
        </div>

        <DialogFooter>
          <ButtonCustom variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print Details
          </ButtonCustom>
          <ButtonCustom onClick={onClose}>Close</ButtonCustom>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewRoomDialog;
