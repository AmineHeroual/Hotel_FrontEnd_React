
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { 
  UserPlus, 
  Calendar, 
  SquareCheckBig, 
  SquareArrowOutUpRight, 
  MessageCircle, 
  ClipboardList 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Schéma de validation pour le formulaire de réservation
const reservationSchema = z.object({
  guestName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  roomType: z.string().min(1, "Le type de chambre est requis"),
  roomNumber: z.string().min(1, "Le numéro de chambre est requis"),
  guests: z.number().min(1).max(10),
  totalAmount: z.number().min(0),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

export const QuickActions: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showNewGuestDialog, setShowNewGuestDialog] = useState(false);
  const [showNewReservationDialog, setShowNewReservationDialog] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guestName: "",
      email: "",
      phone: "",
      roomType: "",
      roomNumber: "",
      guests: 1,
      totalAmount: 0,
    },
  });

  const handleNewGuest = () => {
    setShowNewGuestDialog(true);
    toast({
      title: "Nouveau client",
      description: "Formulaire de création d'un nouveau client ouvert."
    });
  };

  const handleNewBooking = () => {
    setShowNewReservationDialog(true);
    toast({
      title: "Nouvelle réservation",
      description: "Création d'une nouvelle réservation."
    });
  };

  const handleCheckIn = () => {
    navigate("/dashboard/receptionist/reservations");
    toast({
      title: "Enregistrement d'arrivée",
      description: "Accès aux arrivées du jour."
    });
  };

  const handleCheckOut = () => {
    navigate("/dashboard/receptionist/reservations");
    toast({
      title: "Enregistrement de départ",
      description: "Accès aux départs du jour."
    });
  };

  const handleGuestMessage = () => {
    toast({
      title: "Message client",
      description: "Interface de messagerie client ouverte."
    });
    // Dans une application réelle, ouvrir l'interface de messagerie
  };

  const handleRoomStatus = () => {
    navigate("/dashboard/receptionist/rooms");
    toast({
      title: "État des chambres",
      description: "Accès à la gestion des chambres."
    });
  };

  const onSubmitReservation = (data: ReservationFormValues) => {
    if (!checkIn || !checkOut) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner les dates d'arrivée et de départ.",
        variant: "destructive",
      });
      return;
    }

    // Dans une application réelle, nous enverrions ces données à une API
    console.log("Nouvelle réservation:", { ...data, checkIn, checkOut });
    
    toast({
      title: "Réservation créée",
      description: `La réservation pour ${data.guestName} a été créée avec succès.`,
    });
    
    form.reset();
    setCheckIn(undefined);
    setCheckOut(undefined);
    setShowNewReservationDialog(false);
    
    // Rediriger vers la page des réservations
    navigate("/dashboard/receptionist/reservations");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for receptionists</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <ButtonCustom 
              variant="outline" 
              className="h-24 flex flex-col justify-center"
              onClick={handleNewGuest}
            >
              <UserPlus className="h-5 w-5 mb-1" />
              <span>New Guest</span>
            </ButtonCustom>
            <ButtonCustom 
              variant="outline" 
              className="h-24 flex flex-col justify-center"
              onClick={handleNewBooking}
            >
              <Calendar className="h-5 w-5 mb-1" />
              <span>New Booking</span>
            </ButtonCustom>
            <ButtonCustom 
              variant="outline" 
              className="h-24 flex flex-col justify-center"
              onClick={handleCheckIn}
            >
              <SquareCheckBig className="h-5 w-5 mb-1" />
              <span>Check In</span>
            </ButtonCustom>
            <ButtonCustom 
              variant="outline" 
              className="h-24 flex flex-col justify-center"
              onClick={handleCheckOut}
            >
              <SquareArrowOutUpRight className="h-5 w-5 mb-1" />
              <span>Check Out</span>
            </ButtonCustom>
            <ButtonCustom 
              variant="outline" 
              className="h-24 flex flex-col justify-center"
              onClick={handleGuestMessage}
            >
              <MessageCircle className="h-5 w-5 mb-1" />
              <span>Guest Message</span>
            </ButtonCustom>
            <ButtonCustom 
              variant="outline" 
              className="h-24 flex flex-col justify-center"
              onClick={handleRoomStatus}
            >
              <ClipboardList className="h-5 w-5 mb-1" />
              <span>Room Status</span>
            </ButtonCustom>
          </div>
        </CardContent>
      </Card>

      {/* Dialogue de création d'un nouveau client */}
      <Dialog open={showNewGuestDialog} onOpenChange={setShowNewGuestDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Créer un nouveau client</DialogTitle>
            <DialogDescription>
              Entrez les informations du nouveau client
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">Prénom</label>
                <Input id="firstName" placeholder="Jean" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Nom</label>
                <Input id="lastName" placeholder="Dupont" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" type="email" placeholder="jean.dupont@example.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                <Input id="phone" placeholder="+33 6 12 34 56 78" />
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Adresse</label>
                <Input id="address" placeholder="123 rue de Paris" />
              </div>
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium">Ville</label>
                <Input id="city" placeholder="Paris" />
              </div>
              <div className="space-y-2">
                <label htmlFor="postalCode" className="text-sm font-medium">Code postal</label>
                <Input id="postalCode" placeholder="75000" />
              </div>
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium">Pays</label>
                <Input id="country" placeholder="France" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <ButtonCustom type="submit" onClick={() => {
              toast({
                title: "Client créé",
                description: "Le client a été créé avec succès."
              });
              setShowNewGuestDialog(false);
            }}>
              Créer le client
            </ButtonCustom>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de création d'une nouvelle réservation */}
      <Dialog open={showNewReservationDialog} onOpenChange={setShowNewReservationDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle réservation</DialogTitle>
            <DialogDescription>
              Entrez les détails de la nouvelle réservation
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitReservation)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="guestName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du client</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jean.dupont@example.com" type="email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone</FormLabel>
                      <FormControl>
                        <Input placeholder="+33 6 12 34 56 78" type="tel" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de personnes</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="10" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roomType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de chambre</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type de chambre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Chambre Standard">Chambre Standard</SelectItem>
                          <SelectItem value="Suite Junior">Suite Junior</SelectItem>
                          <SelectItem value="Suite Executive">Suite Executive</SelectItem>
                          <SelectItem value="Suite Présidentielle">Suite Présidentielle</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roomNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de chambre</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une chambre" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="101">101</SelectItem>
                          <SelectItem value="102">102</SelectItem>
                          <SelectItem value="201">201</SelectItem>
                          <SelectItem value="202">202</SelectItem>
                          <SelectItem value="301">301</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <FormLabel>Date d'arrivée</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <ButtonCustom
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        type="button"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? (
                          format(checkIn, "dd/MM/yyyy")
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                      </ButtonCustom>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <FormLabel>Date de départ</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <ButtonCustom
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                        type="button"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? (
                          format(checkOut, "dd/MM/yyyy")
                        ) : (
                          <span>Sélectionner une date</span>
                        )}
                      </ButtonCustom>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Montant total (€)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} onChange={(e) => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <ButtonCustom type="submit">Créer la réservation</ButtonCustom>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

