
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

interface AddPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const AddPaymentDialog: React.FC<AddPaymentDialogProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    guestName: "",
    roomNumber: "",
    amount: "",
    method: "Credit Card",
    type: "room",
    date: new Date(),
    reservationId: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.guestName) {
      toast.error("Guest name is required");
      return;
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error("Valid amount is required");
      return;
    }

    onSave({
      id: `PMT-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: formData.guestName,
      roomNumber: formData.roomNumber ? parseInt(formData.roomNumber) : null,
      date: format(formData.date, "yyyy-MM-dd"),
      amount: parseFloat(formData.amount),
      method: formData.method,
      status: "completed",
      type: formData.type,
      reservationId: formData.reservationId || null,
    });
    
    resetForm();
    toast.success("Payment added successfully");
  };

  const resetForm = () => {
    setFormData({
      guestName: "",
      roomNumber: "",
      amount: "",
      method: "Credit Card",
      type: "room",
      date: new Date(),
      reservationId: "",
      notes: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Payment</DialogTitle>
          <DialogDescription>
            Record a new payment transaction
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="guestName">Guest Name</Label>
                <Input
                  id="guestName"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  placeholder="Enter guest name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="roomNumber">Room Number (Optional)</Label>
                <Input
                  id="roomNumber"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  placeholder="e.g. 101"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="e.g. 99.99"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date">Payment Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <ButtonCustom
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                    </ButtonCustom>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="method">Payment Method</Label>
                <Select
                  value={formData.method}
                  onValueChange={(value) =>
                    handleSelectChange("method", value)
                  }
                >
                  <SelectTrigger id="method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Room Charge">Room Charge</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Payment Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    handleSelectChange("type", value)
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="spa">Spa</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reservationId">Reservation ID (Optional)</Label>
              <Input
                id="reservationId"
                name="reservationId"
                value={formData.reservationId}
                onChange={handleChange}
                placeholder="e.g. RES-1001"
              />
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
            <ButtonCustom type="submit">Create Payment</ButtonCustom>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPaymentDialog;
