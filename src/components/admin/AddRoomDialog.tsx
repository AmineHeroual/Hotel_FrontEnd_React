
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
import { toast } from "sonner";

interface AddRoomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const AddRoomDialog: React.FC<AddRoomDialogProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    type: "Standard",
    status: "available",
    price: "",
    occupants: "0",
  });

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
    
    // Validate the form data
    if (!formData.id) {
      toast.error("Room number is required");
      return;
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Valid price is required");
      return;
    }

    onSave({
      id: parseInt(formData.id),
      type: formData.type,
      status: formData.status,
      price: parseFloat(formData.price),
      occupants: parseInt(formData.occupants),
      checkIn: "",
      checkOut: "",
    });
    
    resetForm();
    toast.success(`Room ${formData.id} added successfully`);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      type: "Standard",
      status: "available",
      price: "",
      occupants: "0",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Room</DialogTitle>
          <DialogDescription>
            Enter details to add a new room to the hotel inventory
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="id">Room Number</Label>
              <Input
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="e.g. 101"
                required
              />
            </div>

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
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Cancel
            </ButtonCustom>
            <ButtonCustom type="submit">Add Room</ButtonCustom>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRoomDialog;
