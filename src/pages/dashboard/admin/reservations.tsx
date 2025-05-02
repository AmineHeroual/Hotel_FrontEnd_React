import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal, ClipboardList, Search, Calendar, Printer } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import RoomOccupancyReport from "@/components/admin/RoomOccupancyReport";
import AddReservationDialog from "@/components/admin/AddReservationDialog";
import EditReservationDialog from "@/components/admin/EditReservationDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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

const AdminReservationsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAddReservationOpen, setIsAddReservationOpen] = useState(false);
  const [isViewReservationOpen, setIsViewReservationOpen] = useState(false);
  const [isEditReservationOpen, setIsEditReservationOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const availableRooms = [
    { id: 102, type: "Standard" },
    { id: 203, type: "Deluxe" },
    { id: 302, type: "Suite" },
  ];

  const [reservations, setReservations] = useState<Reservation[]>([
    { 
      id: "RES-1001", 
      guestName: "John Smith", 
      roomNumber: 101, 
      roomType: "Standard", 
      checkIn: "2023-04-10", 
      checkOut: "2023-04-15", 
      status: "checked-in", 
      payment: "paid",
      totalAmount: 495
    },
    { 
      id: "RES-1002", 
      guestName: "Sarah Johnson", 
      roomNumber: 201, 
      roomType: "Deluxe", 
      checkIn: "2023-04-08", 
      checkOut: "2023-04-16", 
      status: "checked-in", 
      payment: "paid",
      totalAmount: 1192
    },
    { 
      id: "RES-1003", 
      guestName: "Michael Brown", 
      roomNumber: 202, 
      roomType: "Deluxe", 
      checkIn: "2023-04-17", 
      checkOut: "2023-04-20", 
      status: "confirmed", 
      payment: "partial",
      totalAmount: 447
    },
    { 
      id: "RES-1004", 
      guestName: "Emma Wilson", 
      roomNumber: 301, 
      roomType: "Suite", 
      checkIn: "2023-04-05", 
      checkOut: "2023-04-12", 
      status: "checked-in", 
      payment: "paid",
      totalAmount: 2093
    },
    { 
      id: "RES-1005", 
      guestName: "Robert Davis", 
      roomNumber: 303, 
      roomType: "Suite", 
      checkIn: "2023-04-18", 
      checkOut: "2023-04-25", 
      status: "confirmed", 
      payment: "unpaid",
      totalAmount: 2093
    },
    { 
      id: "RES-1006", 
      guestName: "Jennifer Lee", 
      roomNumber: 401, 
      roomType: "Presidential", 
      checkIn: "2023-04-01", 
      checkOut: "2023-04-30", 
      status: "checked-in", 
      payment: "paid",
      totalAmount: 17970
    },
    { 
      id: "RES-1007", 
      guestName: "Thomas Jackson", 
      roomNumber: 102, 
      roomType: "Standard", 
      checkIn: "2023-04-20", 
      checkOut: "2023-04-25", 
      status: "confirmed", 
      payment: "partial",
      totalAmount: 495
    },
    { 
      id: "RES-1008", 
      guestName: "Lisa Chen", 
      roomNumber: 302, 
      roomType: "Suite", 
      checkIn: "2023-04-22", 
      checkOut: "2023-04-28", 
      status: "confirmed", 
      payment: "unpaid",
      totalAmount: 1794
    },
  ]);

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         reservation.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reservation.roomNumber.toString().includes(searchQuery);
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "checked-in") return reservation.status === "checked-in" && matchesSearch;
    if (activeTab === "confirmed") return reservation.status === "confirmed" && matchesSearch;
    if (activeTab === "completed") return reservation.status === "completed" && matchesSearch;
    if (activeTab === "cancelled") return reservation.status === "cancelled" && matchesSearch;
    
    return matchesSearch;
  });

  const handleGenerateReport = () => {
    setIsReportOpen(true);
  };

  const handleAddReservation = () => {
    setIsAddReservationOpen(true);
  };

  const handleSaveNewReservation = (newReservation: Reservation) => {
    setReservations([...reservations, newReservation]);
    setIsAddReservationOpen(false);
    toast.success(`Réservation ${newReservation.id} créée avec succès`);
  };

  const handleViewReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsViewReservationOpen(true);
  };

  const handleEditReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsEditReservationOpen(true);
  };

  const handleUpdateReservation = (updatedReservation: Reservation) => {
    const updatedReservations = reservations.map(res => 
      res.id === updatedReservation.id ? updatedReservation : res
    );
    setReservations(updatedReservations);
    toast.success(`Réservation ${updatedReservation.id} mise à jour avec succès`);
  };

  const handleDeleteReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteReservation = () => {
    if (selectedReservation) {
      setReservations(reservations.filter(r => r.id !== selectedReservation.id));
      toast.success(`Réservation ${selectedReservation.id} supprimée avec succès`);
      setIsDeleteDialogOpen(false);
      setSelectedReservation(null);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "checked-in":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "completed":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getPaymentBadgeClass = (payment: string) => {
    switch (payment) {
      case "paid":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "partial":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "unpaid":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole="admin" />
      
      <div className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Réservations</h1>
              <p className="text-muted-foreground">Gérer les réservations, les check-ins et check-outs</p>
            </div>
            <div className="flex space-x-2">
              <ButtonCustom variant="outline" onClick={handleGenerateReport}>
                <ClipboardList className="h-4 w-4 mr-2" />
                Rapport d'Occupation
              </ButtonCustom>
              <ButtonCustom onClick={handleAddReservation}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Nouvelle Réservation
              </ButtonCustom>
            </div>
          </div>
        </header>
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher par ID, client ou chambre..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="checked-in">Check In</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmées</TabsTrigger>
                <TabsTrigger value="completed">Complétées</TabsTrigger>
                <TabsTrigger value="cancelled">Annulées</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Réservation</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Chambre</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.id}</TableCell>
                    <TableCell>{reservation.guestName}</TableCell>
                    <TableCell>{reservation.roomNumber} ({reservation.roomType})</TableCell>
                    <TableCell>{formatDate(reservation.checkIn)}</TableCell>
                    <TableCell>{formatDate(reservation.checkOut)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={getStatusBadgeClass(reservation.status)}
                      >
                        {reservation.status === "checked-in" ? "Check In" :
                         reservation.status === "confirmed" ? "Confirmée" :
                         reservation.status === "completed" ? "Complétée" :
                         "Annulée"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={getPaymentBadgeClass(reservation.payment)}
                      >
                        {reservation.payment === "paid" ? "Payé" :
                         reservation.payment === "partial" ? "Partiel" :
                         "Non Payé"}
                      </Badge>
                    </TableCell>
                    <TableCell>${reservation.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <ButtonCustom variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </ButtonCustom>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewReservation(reservation)}>
                            Voir
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditReservation(reservation)}>
                            Éditer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteReservation(reservation)} className="text-red-600 focus:text-red-600">
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReservations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      Aucune réservation ne correspond à vos critères de recherche
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Affichage de <strong>{filteredReservations.length}</strong> sur <strong>{reservations.length}</strong> réservations
            </p>
          </div>
        </div>
      </div>

      <RoomOccupancyReport 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
      />

      <AddReservationDialog
        isOpen={isAddReservationOpen}
        onClose={() => setIsAddReservationOpen(false)}
        onSave={handleSaveNewReservation}
        availableRooms={availableRooms}
      />

      <EditReservationDialog
        isOpen={isEditReservationOpen}
        onClose={() => setIsEditReservationOpen(false)}
        onSave={handleUpdateReservation}
        reservation={selectedReservation}
      />

      {selectedReservation && (
        <Dialog open={isViewReservationOpen} onOpenChange={setIsViewReservationOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Détails de la Réservation</DialogTitle>
              <DialogDescription>
                Réservation {selectedReservation.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Client</h4>
                  <p className="font-semibold">{selectedReservation.guestName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Chambre</h4>
                  <p className="font-semibold">
                    {selectedReservation.roomNumber} ({selectedReservation.roomType})
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Check In</h4>
                  <p className="font-semibold">{formatDate(selectedReservation.checkIn)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Check Out</h4>
                  <p className="font-semibold">{formatDate(selectedReservation.checkOut)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Statut</h4>
                  <Badge 
                    variant="outline"
                    className={getStatusBadgeClass(selectedReservation.status)}
                  >
                    {selectedReservation.status === "checked-in" ? "Check In" :
                     selectedReservation.status === "confirmed" ? "Confirmée" :
                     selectedReservation.status === "completed" ? "Complétée" :
                     "Annulée"}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Paiement</h4>
                  <Badge 
                    variant="outline"
                    className={getPaymentBadgeClass(selectedReservation.payment)}
                  >
                    {selectedReservation.payment === "paid" ? "Payé" :
                     selectedReservation.payment === "partial" ? "Partiel" :
                     "Non Payé"}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Montant Total</h4>
                <p className="font-semibold">${selectedReservation.totalAmount.toLocaleString()}</p>
              </div>
            </div>
            
            <DialogFooter>
              <ButtonCustom variant="outline" onClick={() => toast.info(`Impression de la réservation ${selectedReservation.id}`)}>
                <Printer className="h-4 w-4 mr-2" />
                Imprimer
              </ButtonCustom>
              <ButtonCustom onClick={() => setIsViewReservationOpen(false)}>
                Fermer
              </ButtonCustom>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. La réservation {selectedReservation?.id} sera définitivement supprimée de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteReservation} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminReservationsPage;
