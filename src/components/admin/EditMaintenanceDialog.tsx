
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ButtonCustom } from "@/components/ui/button-custom";

interface MaintenanceItem {
  id: number;
  title: string;
  location: string;
  priority: string;
  category: string;
  assignedTo: string | null;
  status: string;
  description: string;
  createdAt: string;
  completedAt: string | null;
}

interface EditMaintenanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  maintenanceItem?: MaintenanceItem | null;
  onSave: (data: MaintenanceItem) => void;
}

export const EditMaintenanceDialog: React.FC<EditMaintenanceDialogProps> = ({
  isOpen,
  onClose,
  maintenanceItem,
  onSave,
}) => {
  const [formData, setFormData] = useState<MaintenanceItem>({
    id: 0,
    title: "",
    location: "",
    priority: "medium",
    category: "plumbing",
    assignedTo: null,
    status: "pending",
    description: "",
    createdAt: new Date().toISOString(),
    completedAt: null,
  });

  // Update form data when maintenanceItem changes
  useEffect(() => {
    if (maintenanceItem) {
      setFormData(maintenanceItem);
    }
  }, [maintenanceItem]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Maintenance Request</DialogTitle>
          <DialogDescription>
            Update the details of this maintenance request.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Brief issue description"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) =>
                    handleSelectChange("location", value)
                  }
                >
                  <SelectTrigger id="location" className="w-full">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room-101">Room 101</SelectItem>
                    <SelectItem value="room-102">Room 102</SelectItem>
                    <SelectItem value="room-201">Room 201</SelectItem>
                    <SelectItem value="room-202">Room 202</SelectItem>
                    <SelectItem value="lobby">Lobby</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="pool">Pool Area</SelectItem>
                    <SelectItem value="hallway">Hallway</SelectItem>
                    <SelectItem value="elevator">Elevator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    handleSelectChange("priority", value)
                  }
                >
                  <SelectTrigger id="priority" className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleSelectChange("category", value)
                  }
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="appliance">Appliance</SelectItem>
                    <SelectItem value="structural">Structural</SelectItem>
                    <SelectItem value="housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="assignedTo">Assign To</Label>
              <Select
                value={formData.assignedTo || "unassigned"}
                onValueChange={(value) =>
                  handleSelectChange("assignedTo", value === "unassigned" ? null : value)
                }
              >
                <SelectTrigger id="assignedTo" className="w-full">
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  <SelectItem value="tech-1">John Smith</SelectItem>
                  <SelectItem value="tech-2">Sarah Johnson</SelectItem>
                  <SelectItem value="tech-3">Michael Brown</SelectItem>
                  <SelectItem value="tech-4">Lisa Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed information about the issue..."
                className="h-24"
              />
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

export default EditMaintenanceDialog;
