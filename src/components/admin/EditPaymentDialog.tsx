
import React, { useState, useEffect } from "react";
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

interface Payment {
  id: string;
  reservationId: string | null;
  guestName: string;
  roomNumber: number | null;
  date: string;
  amount: number;
  method: string;
  status: string;
  type: string;
}

interface EditPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPayment: Payment) => void;
  payment: Payment | null;
}

const EditPaymentDialog = ({
  isOpen,
  onClose,
  onSave,
  payment,
}: EditPaymentDialogProps) => {
  const [formData, setFormData] = useState<Payment | null>(payment);

  // Update form data when payment changes
  useEffect(() => {
    setFormData(payment);
  }, [payment]);

  if (!formData) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "roomNumber" || name === "amount" ? Number(value) : value,
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
    if (!formData.guestName || !formData.date || !formData.amount) {
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
          <DialogTitle>Modifier le paiement</DialogTitle>
          <DialogDescription>
            Modification du paiement {formData.id}
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
              <Label htmlFor="reservationId">ID de réservation</Label>
              <Input
                id="reservationId"
                name="reservationId"
                value={formData.reservationId || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="roomNumber">Numéro de chambre</Label>
              <Input
                id="roomNumber"
                name="roomNumber"
                type="number"
                value={formData.roomNumber || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Montant</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="method">Méthode de paiement</Label>
              <Select
                value={formData.method}
                onValueChange={(value) => handleSelectChange("method", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la méthode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Credit Card">Carte de crédit</SelectItem>
                  <SelectItem value="Cash">Espèces</SelectItem>
                  <SelectItem value="Bank Transfer">Virement bancaire</SelectItem>
                  <SelectItem value="Room Charge">Paiement à la chambre</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="completed">Complété</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="refunded">Remboursé</SelectItem>
                  <SelectItem value="failed">Échoué</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="room">Chambre</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="spa">Spa</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
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

export default EditPaymentDialog;
