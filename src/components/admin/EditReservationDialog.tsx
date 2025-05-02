
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";

interface Reservation {
  id: string;
  guestName: string;
  roomNumber: number;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: string;
  payment: string;
  totalAmount: number;
}

interface EditReservationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedReservation: Reservation) => void;
  reservation: Reservation | null;
}

const EditReservationDialog = ({
  isOpen,
  onClose,
  onSave,
  reservation,
}: EditReservationDialogProps) => {
  const [formData, setFormData] = useState<Reservation | null>(reservation);

  // Update form data when reservation changes
  React.useEffect(() => {
    setFormData(reservation);
  }, [reservation]);

  if (!formData) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "roomNumber" || name === "totalAmount" ? Number(value) : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.guestName || !formData.checkIn || !formData.checkOut) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier la réservation</DialogTitle>
          <DialogDescription>
            Modification de la réservation {formData.id}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guestName">Nom du client</Label>
              <Input
                id="guestName"
                name="guestName"
                value={formData.guestName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Numéro de chambre</Label>
              <Input
                id="roomNumber"
                name="roomNumber"
                type="number"
                value={formData.roomNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="roomType">Type de chambre</Label>
              <Select
                value={formData.roomType}
                onValueChange={(value) => handleSelectChange("roomType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                  <SelectItem value="Presidential">Presidential</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalAmount">Montant total</Label>
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                value={formData.totalAmount}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn">Date d'arrivée</Label>
              <Input
                id="checkIn"
                name="checkIn"
                type="date"
                value={formData.checkIn}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOut">Date de départ</Label>
              <Input
                id="checkOut"
                name="checkOut"
                type="date"
                value={formData.checkOut}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmée</SelectItem>
                  <SelectItem value="checked-in">Check In</SelectItem>
                  <SelectItem value="completed">Complétée</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment">Statut de paiement</Label>
              <Select
                value={formData.payment}
                onValueChange={(value) => handleSelectChange("payment", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Payé</SelectItem>
                  <SelectItem value="partial">Partiel</SelectItem>
                  <SelectItem value="unpaid">Non Payé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <ButtonCustom variant="outline" type="button" onClick={onClose}>
              Annuler
            </ButtonCustom>
            <ButtonCustom type="submit">
              Enregistrer
            </ButtonCustom>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditReservationDialog;
