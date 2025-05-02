
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AddReservationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  availableRooms: { id: number; type: string }[];
}

export const AddReservationDialog: React.FC<AddReservationDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  availableRooms,
}) => {
  const [guestName, setGuestName] = useState("");
  const [roomNumber, setRoomNumber] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [payment, setPayment] = useState("unpaid");

  const roomOptions = availableRooms.map(room => ({ 
    id: room.id.toString(), 
    type: room.type 
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!guestName) {
      toast.error("Guest name is required");
      return;
    }
    
    if (!roomNumber) {
      toast.error("Room number is required");
      return;
    }
    
    if (!checkInDate || !checkOutDate) {
      toast.error("Check-in and check-out dates are required");
      return;
    }
    
    if (checkOutDate <= checkInDate) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    const selectedRoom = roomOptions.find(room => room.id === roomNumber);

    const newReservation = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName,
      roomNumber: parseInt(roomNumber),
      roomType: selectedRoom?.type || "Standard",
      checkIn: format(checkInDate, "yyyy-MM-dd"),
      checkOut: format(checkOutDate, "yyyy-MM-dd"),
      status: "confirmed",
      payment,
      totalAmount: 0, // This would be calculated based on room price and stay duration in a real app
    };
    
    onSave(newReservation);
    resetForm();
    toast.success("Reservation created successfully");
  };

  const resetForm = () => {
    setGuestName("");
    setRoomNumber("");
    setCheckInDate(undefined);
    setCheckOutDate(undefined);
    setPayment("unpaid");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Reservation</DialogTitle>
          <DialogDescription>
            Create a new guest reservation
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="guestName">Guest Name</Label>
              <Input
                id="guestName"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Enter guest name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="roomNumber">Room</Label>
              <Select value={roomNumber} onValueChange={setRoomNumber}>
                <SelectTrigger id="roomNumber">
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {roomOptions.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      Room {room.id} ({room.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="checkIn">Check In Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <ButtonCustom
                      id="checkIn"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkInDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                    </ButtonCustom>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="checkOut">Check Out Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <ButtonCustom
                      id="checkOut"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkOutDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                    </ButtonCustom>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="payment">Payment Status</Label>
              <Select value={payment} onValueChange={setPayment}>
                <SelectTrigger id="payment">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <ButtonCustom
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Cancel
            </ButtonCustom>
            <ButtonCustom type="submit">Create Reservation</ButtonCustom>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReservationDialog;
