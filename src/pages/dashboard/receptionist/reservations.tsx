import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Search, Filter, Calendar, Bell, Eye, Edit, Trash2 } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Reservation {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: Date;
  checkOut: Date;
  status: "confirmed" | "pending" | "cancelled" | "checked_in" | "checked_out";
  email: string;
  phone: string;
  guests: number;
  totalAmount: number;
}

const reservationsData: Reservation[] = [
  {
    id: "RES-001",
    guestName: "Jean Dupont",
    roomNumber: "101",
    checkIn: new Date(2023, 11, 10),
    checkOut: new Date(2023, 11, 15),
    status: "confirmed",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    guests: 2,
    totalAmount: 750,
  },
  {
    id: "RES-002",
    guestName: "Marie Martin",
    roomNumber: "205",
    checkIn: new Date(2023, 11, 12),
    checkOut: new Date(2023, 11, 18),
    status: "pending",
    email: "marie.martin@example.com",
    phone: "+33 6 98 76 54 32",
    guests: 3,
    totalAmount: 1200,
  },
  {
    id: "RES-003",
    guestName: "Pierre Dubois",
    roomNumber: "304",
    checkIn: new Date(2023, 11, 15),
    checkOut: new Date(2023, 11, 20),
    status: "checked_in",
    email: "pierre.dubois@example.com",
    phone: "+33 7 12 34 56 78",
    guests: 1,
    totalAmount: 550,
  },
  {
    id: "RES-004",
    guestName: "Sophie Lefebvre",
    roomNumber: "402",
    checkIn: new Date(2023, 11, 8),
    checkOut: new Date(2023, 11, 12),
    status: "checked_out",
    email: "sophie.lefebvre@example.com",
    phone: "+33 6 12 34 56 78",
    guests: 2,
    totalAmount: 680,
  },
  {
    id: "RES-005",
    guestName: "Thomas Bernard",
    roomNumber: "103",
    checkIn: new Date(2023, 11, 20),
    checkOut: new Date(2023, 11, 25),
    status: "cancelled",
    email: "thomas.bernard@example.com",
    phone: "+33 7 98 76 54 32",
    guests: 4,
    totalAmount: 950,
  },
];

const ReceptionistReservationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [addReservationDialogOpen, setAddReservationDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>(reservationsData);

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      searchTerm === "" ||
      reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter;

    let matchesDate = true;
    if (dateRange?.from) {
      matchesDate = reservation.checkIn >= dateRange.from;
    }
    if (dateRange?.to && matchesDate) {
      matchesDate = reservation.checkOut <= dateRange.to;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleViewReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setViewDialogOpen(true);
  };
  
  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation({...reservation});
    setEditDialogOpen(true);
  };
  
  const handleDeleteReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setDeleteDialogOpen(true);
  };
  
  const handleNotificationsClick = () => {
    setNotificationDialogOpen(true);
  };
  
  const handleAddReservation = () => {
    setAddReservationDialogOpen(true);
  };

  const handleSaveNewReservation = (newReservation: Partial<Reservation>) => {
    const newId = `RES-${String(Math.floor(Math.random() * 900) + 100)}`;
    const reservation: Reservation = {
      id: newId,
      guestName: newReservation.guestName || "Guest",
      roomNumber: newReservation.roomNumber || "101",
      checkIn: newReservation.checkIn || new Date(),
      checkOut: newReservation.checkOut || new Date(),
      status: newReservation.status || "pending",
      email: newReservation.email || "guest@example.com",
      phone: newReservation.phone || "+33 6 00 00 00 00",
      guests: newReservation.guests || 1,
      totalAmount: newReservation.totalAmount || 100,
    };
    
    setReservations([...reservations, reservation]);
    setAddReservationDialogOpen(false);
    toast.success(`Réservation ${newId} créée avec succès`);
  };

  const handleSaveEditedReservation = (editedReservation: Reservation) => {
    setReservations(reservations.map(res => 
      res.id === editedReservation.id ? editedReservation : res
    ));
    setEditDialogOpen(false);
    toast.success(`Réservation ${editedReservation.id} modifiée avec succès`);
  };

  const handleConfirmDelete = () => {
    if (selectedReservation) {
      setReservations(reservations.filter(res => res.id !== selectedReservation.id));
      toast.success(`Réservation ${selectedReservation.id} supprimée avec succès`);
      setDeleteDialogOpen(false);
    }
  };

  const getStatusBadge = (status: Reservation["status"]) => {
    const statusConfig: Record<
      Reservation["status"],
      { label: string; className: string }
    > = {
      pending: {
        label: "En attente",
        className: "bg-yellow-100 text-yellow-800",
      },
      confirmed: {
        label: "Confirmée",
        className: "bg-green-100 text-green-800",
      },
      cancelled: {
        label: "Annulée",
        className: "bg-red-100 text-red-800",
      },
      checked_in: {
        label: "Enregistrée",
        className: "bg-blue-100 text-blue-800",
      },
      checked_out: {
        label: "Terminée",
        className: "bg-gray-100 text-gray-800",
      },
    };

    const config = statusConfig[status];

    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userRole="receptionist" />

      <div className="flex-1 p-8 pt-6 ml-64">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Réservations</h1>
            <p className="text-muted-foreground">Gestion des réservations</p>
          </div>
          <div className="flex gap-2">
            <ButtonCustom onClick={handleNotificationsClick} variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </ButtonCustom>
            <ButtonCustom onClick={handleAddReservation}>
              <Calendar className="h-4 w-4 mr-2" />
              Nouvelle Réservation
            </ButtonCustom>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une réservation..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="confirmed">Confirmée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
                <SelectItem value="checked_in">Enregistrée</SelectItem>
                <SelectItem value="checked_out">Terminée</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                        {format(dateRange.to, "dd/MM/yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "dd/MM/yyyy")
                    )
                  ) : (
                    <span>Sélectionner des dates</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={new Date()}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total des réservations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                En attente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  reservations.filter(
                    (reservation) => reservation.status === "pending"
                  ).length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Confirmées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  reservations.filter(
                    (reservation) => reservation.status === "confirmed"
                  ).length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Annulées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  reservations.filter(
                    (reservation) => reservation.status === "cancelled"
                  ).length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des réservations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Chambre</TableHead>
                  <TableHead>Arrivée</TableHead>
                  <TableHead>Départ</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.id}</TableCell>
                    <TableCell>{reservation.guestName}</TableCell>
                    <TableCell>{reservation.roomNumber}</TableCell>
                    <TableCell>
                      {format(reservation.checkIn, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      {format(reservation.checkOut, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <ButtonCustom
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewReservation(reservation)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Voir</span>
                        </ButtonCustom>
                        <ButtonCustom 
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditReservation(reservation)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </ButtonCustom>
                        <ButtonCustom 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteReservation(reservation)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </ButtonCustom>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReservations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Aucune réservation ne correspond à vos critères de recherche
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Détails de la réservation</DialogTitle>
              <DialogDescription>
                {selectedReservation?.id} - {selectedReservation?.guestName}
              </DialogDescription>
            </DialogHeader>
            {selectedReservation && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Client</p>
                    <p className="text-sm">{selectedReservation.guestName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Email</p>
                    <p className="text-sm">{selectedReservation.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Téléphone</p>
                    <p className="text-sm">{selectedReservation.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Nombre d'invités</p>
                    <p className="text-sm">{selectedReservation.guests}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Chambre</p>
                    <p className="text-sm">{selectedReservation.roomNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Statut</p>
                    <div>{getStatusBadge(selectedReservation.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Date d'arrivée</p>
                    <p className="text-sm">
                      {format(selectedReservation.checkIn, "dd/MM/yyyy")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Date de départ</p>
                    <p className="text-sm">
                      {format(selectedReservation.checkOut, "dd/MM/yyyy")}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Montant total</p>
                  <p className="text-lg font-bold">
                    {selectedReservation.totalAmount.toFixed(2)} €
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={addReservationDialogOpen} onOpenChange={setAddReservationDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Nouvelle réservation</DialogTitle>
              <DialogDescription>
                Créer une nouvelle réservation
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newReservation: Partial<Reservation> = {
                guestName: formData.get('guestName') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                roomNumber: formData.get('roomNumber') as string,
                checkIn: new Date(formData.get('checkIn') as string),
                checkOut: new Date(formData.get('checkOut') as string),
                guests: Number(formData.get('guests')),
                status: formData.get('status') as Reservation['status'],
                totalAmount: Number(formData.get('totalAmount')),
              };
              handleSaveNewReservation(newReservation);
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guestName">Nom du client</Label>
                    <Input id="guestName" name="guestName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" name="phone" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roomNumber">Numéro de chambre</Label>
                    <Input id="roomNumber" name="roomNumber" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Date d'arrivée</Label>
                    <Input id="checkIn" name="checkIn" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Date de départ</Label>
                    <Input id="checkOut" name="checkOut" type="date" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guests">Nombre d'invités</Label>
                    <Input id="guests" name="guests" type="number" min="1" required defaultValue="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select name="status" defaultValue="pending">
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="confirmed">Confirmée</SelectItem>
                        <SelectItem value="checked_in">Enregistrée</SelectItem>
                        <SelectItem value="checked_out">Terminée</SelectItem>
                        <SelectItem value="cancelled">Annulée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Montant total (€)</Label>
                  <Input id="totalAmount" name="totalAmount" type="number" min="0" required />
                </div>
              </div>
              <DialogFooter>
                <ButtonCustom variant="outline" type="button" onClick={() => setAddReservationDialogOpen(false)}>
                  Annuler
                </ButtonCustom>
                <ButtonCustom type="submit">
                  Créer la réservation
                </ButtonCustom>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Modifier la réservation</DialogTitle>
              <DialogDescription>
                {selectedReservation?.id} - {selectedReservation?.guestName}
              </DialogDescription>
            </DialogHeader>
            
            {selectedReservation && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updatedReservation: Reservation = {
                  ...selectedReservation,
                  guestName: formData.get('guestName') as string,
                  email: formData.get('email') as string,
                  phone: formData.get('phone') as string,
                  roomNumber: formData.get('roomNumber') as string,
                  checkIn: new Date(formData.get('checkIn') as string),
                  checkOut: new Date(formData.get('checkOut') as string),
                  guests: Number(formData.get('guests')),
                  status: formData.get('status') as Reservation['status'],
                  totalAmount: Number(formData.get('totalAmount')),
                };
                handleSaveEditedReservation(updatedReservation);
              }}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guestName">Nom du client</Label>
                      <Input id="guestName" name="guestName" defaultValue={selectedReservation.guestName} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" defaultValue={selectedReservation.email} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input id="phone" name="phone" defaultValue={selectedReservation.phone} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roomNumber">Numéro de chambre</Label>
                      <Input id="roomNumber" name="roomNumber" defaultValue={selectedReservation.roomNumber} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkIn">Date d'arrivée</Label>
                      <Input id="checkIn" name="checkIn" type="date" defaultValue={format(selectedReservation.checkIn, "yyyy-MM-dd")} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkOut">Date de départ</Label>
                      <Input id="checkOut" name="checkOut" type="date" defaultValue={format(selectedReservation.checkOut, "yyyy-MM-dd")} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guests">Nombre d'invités</Label>
                      <Input id="guests" name="guests" type="number" min="1" defaultValue={selectedReservation.guests} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Statut</Label>
                      <Select name="status" defaultValue={selectedReservation.status}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="confirmed">Confirmée</SelectItem>
                          <SelectItem value="checked_in">Enregistrée</SelectItem>
                          <SelectItem value="checked_out">Terminée</SelectItem>
                          <SelectItem value="cancelled">Annulée</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalAmount">Montant total (€)</Label>
                    <Input id="totalAmount" name="totalAmount" type="number" min="0" defaultValue={selectedReservation.totalAmount} required />
                  </div>
                </div>
                <DialogFooter>
                  <ButtonCustom variant="outline" type="button" onClick={() => setEditDialogOpen(false)}>
                    Annuler
                  </ButtonCustom>
                  <ButtonCustom type="submit">
                    Enregistrer les modifications
                  </ButtonCustom>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>
        
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Supprimer la réservation</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action ne peut pas être annulée.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <ButtonCustom variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Annuler
              </ButtonCustom>
              <ButtonCustom variant="destructive" onClick={handleConfirmDelete}>
                Supprimer
              </ButtonCustom>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={notificationDialogOpen} onOpenChange={setNotificationDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Notifications</DialogTitle>
              <DialogDescription>
                Liste des notifications récentes
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="p-3 border rounded-lg bg-muted/50">
                <p className="font-medium">Nouvelle réservation</p>
                <p className="text-sm text-muted-foreground">
                  Une nouvelle réservation (RES-006) a été créée.
                </p>
                <p className="text-xs text-muted-foreground mt-1">Il y a 5 minutes</p>
              </div>
              <div className="p-3 border rounded-lg bg-muted/50">
                <p className="font-medium">Chambre prête</p>
                <p className="text-sm text-muted-foreground">
                  La chambre 301 a été nettoyée et est prête.
                </p>
                <p className="text-xs text-muted-foreground mt-1">Il y a 2 heures</p>
              </div>
              <div className="p-3 border rounded-lg bg-muted/50">
                <p className="font-medium">Demande de maintenance</p>
                <p className="text-sm text-muted-foreground">
                  Une demande de maintenance a été créée pour la chambre 205.
                </p>
                <p className="text-xs text-muted-foreground mt-1">Hier à 15:30</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReceptionistReservationsPage;
