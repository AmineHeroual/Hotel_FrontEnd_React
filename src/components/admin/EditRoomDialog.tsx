
import React, { useState, useEffect } from "react";
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

interface EditRoomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Room) => void;
  room: Room | null;
}

export const EditRoomDialog: React.FC<EditRoomDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  room,
}) => {
  const [formData, setFormData] = useState<{
    type: string;
    status: string;
    price: string;
    occupants: string;
  }>({
    type: "",
    status: "",
    price: "",
    occupants: "",
  });

  useEffect(() => {
    if (room) {
      setFormData({
        type: room.type,
        status: room.status,
        price: room.price.toString(),
        occupants: room.occupants.toString(),
      });
    }
  }, [room]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!room) return;
    
    // Validate the form data
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Valid price is required");
      return;
    }

    onSave({
      ...room,
      type: formData.type,
      status: formData.status,
      price: parseFloat(formData.price),
      occupants: parseInt(formData.occupants),
    });
    
    toast.success(`Room ${room.id} updated successfully`);
    onClose();
  };

  if (!room) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Room {room.id}</DialogTitle>
          <DialogDescription>
            Update details for this room
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Room Type</Label>
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
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Deluxe">Deluxe</SelectItem>
                    <SelectItem value="Suite">Suite</SelectItem>
                    <SelectItem value="Presidential">Presidential</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    handleSelectChange("status", value)
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price per Night ($)</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 99"
                  type="number"
                  min="0"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="occupants">Max Occupants</Label>
                <Input
                  id="occupants"
                  name="occupants"
                  value={formData.occupants}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  type="number"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <ButtonCustom
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </ButtonCustom>
            <ButtonCustom type="submit">Save Changes</ButtonCustom>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRoomDialog;
