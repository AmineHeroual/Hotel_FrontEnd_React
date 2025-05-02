
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface MaintenanceItem {
  id: number;
  title: string;
  location: string;
  assignedTo: string | null;
}

interface Technician {
  id: string;
  name: string;
  avatar: string;
  speciality: string;
  availability: string;
  currentTasks: number;
}

interface AssignTechnicianDialogProps {
  isOpen: boolean;
  onClose: () => void;
  maintenanceItem?: MaintenanceItem | null;
  onAssign: (maintenanceId: number, technicianId: string) => void;
}

export const AssignTechnicianDialog: React.FC<AssignTechnicianDialogProps> = ({
  isOpen,
  onClose,
  maintenanceItem,
  onAssign,
}) => {
  const [selectedTechnician, setSelectedTechnician] = useState<string>("unassigned");  // Changed from empty string to "unassigned"
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Reset selection when dialog opens with new item
  useEffect(() => {
    if (isOpen && maintenanceItem) {
      setSelectedTechnician(maintenanceItem.assignedTo || "unassigned");  // Changed from empty string to "unassigned"
    }
  }, [isOpen, maintenanceItem]);

  // Mock technicians data
  const technicians: Technician[] = [
    {
      id: "tech-1",
      name: "John Smith",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      speciality: "Plumbing, Electrical",
      availability: "Available",
      currentTasks: 2,
    },
    {
      id: "tech-2",
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
      speciality: "HVAC, Appliance Repair",
      availability: "Available",
      currentTasks: 0,
    },
    {
      id: "tech-3",
      name: "Michael Brown",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      speciality: "Electrical, Structural",
      availability: "Busy",
      currentTasks: 5,
    },
    {
      id: "tech-4",
      name: "Lisa Chen",
      avatar: "https://randomuser.me/api/portraits/women/61.jpg",
      speciality: "Furniture, General Maintenance",
      availability: "Available",
      currentTasks: 1,
    },
  ];

  const filteredTechnicians = technicians.filter((tech) =>
    tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.speciality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    if (!maintenanceItem) return;
    
    if (!selectedTechnician) {
      toast.error("Please select a technician");
      return;
    }

    onAssign(maintenanceItem.id, selectedTechnician);
    onClose();
  };

  const handleUnassign = () => {
    if (!maintenanceItem) return;
    onAssign(maintenanceItem.id, "unassigned");  // Changed from empty string to "unassigned"
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assign Technician</DialogTitle>
          <DialogDescription>
            {maintenanceItem?.title} - {maintenanceItem?.location}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          <Input
            placeholder="Search technicians by name or specialty"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2"
          />

          <Label className="mb-2">Available Technicians</Label>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredTechnicians.length > 0 ? (
              filteredTechnicians.map((tech) => (
                <div
                  key={tech.id}
                  className={`flex items-center justify-between p-3 mb-2 rounded-md cursor-pointer border transition-colors ${
                    selectedTechnician === tech.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedTechnician(tech.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={tech.avatar} alt={tech.name} />
                      <AvatarFallback>
                        {tech.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{tech.name}</p>
                      <p className="text-xs text-muted-foreground">{tech.speciality}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-medium ${
                      tech.availability === "Available" ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                    }`}>
                      {tech.availability}
                    </p>
                    <p className="text-xs text-muted-foreground">{tech.currentTasks} active tasks</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">
                No technicians match your search
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {maintenanceItem?.assignedTo && (
              <ButtonCustom
                variant="outline"
                type="button"
                onClick={handleUnassign}
              >
                Unassign
              </ButtonCustom>
            )}
          </div>
          <div className="flex gap-2">
            <ButtonCustom
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </ButtonCustom>
            <ButtonCustom
              type="button"
              onClick={handleAssign}
            >
              Assign
            </ButtonCustom>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTechnicianDialog;
