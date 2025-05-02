import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal, ClipboardList, Search, Download, Receipt, FileText } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import FinancialReport from "@/components/admin/FinancialReport";
import AddPaymentDialog from "@/components/admin/AddPaymentDialog";
import EditPaymentDialog from "@/components/admin/EditPaymentDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

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

const AdminPaymentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [isViewPaymentOpen, setIsViewPaymentOpen] = useState(false);
  const [isEditPaymentOpen, setIsEditPaymentOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const [payments, setPayments] = useState<Payment[]>([
    { 
      id: "PMT-1001", 
      reservationId: "RES-1001",
      guestName: "John Smith", 
      roomNumber: 101, 
      date: "2023-04-08", 
      amount: 495,
      method: "Credit Card",
      status: "completed", 
      type: "room"
    },
    { 
      id: "PMT-1002", 
      reservationId: "RES-1002",
      guestName: "Sarah Johnson", 
      roomNumber: 201, 
      date: "2023-04-07", 
      amount: 1192,
      method: "Credit Card",
      status: "completed", 
      type: "room"
    },
    { 
      id: "PMT-1003", 
      reservationId: "RES-1003",
      guestName: "Michael Brown", 
      roomNumber: 202, 
      date: "2023-04-15", 
      amount: 200,
      method: "Credit Card",
      status: "completed", 
      type: "room"
    },
    { 
      id: "PMT-1004", 
      reservationId: "RES-1004",
      guestName: "Emma Wilson", 
      roomNumber: 301, 
      date: "2023-04-03", 
      amount: 2093,
      method: "Bank Transfer",
      status: "completed", 
      type: "room"
    },
    { 
      id: "PMT-1005", 
      reservationId: "RES-1006",
      guestName: "Jennifer Lee", 
      roomNumber: 401, 
      date: "2023-03-30", 
      amount: 17970,
      method: "Bank Transfer",
      status: "completed", 
      type: "room"
    },
    { 
      id: "PMT-1006", 
      reservationId: "RES-1007",
      guestName: "Thomas Jackson", 
      roomNumber: 102, 
      date: "2023-04-18", 
      amount: 200,
      method: "Credit Card",
      status: "pending", 
      type: "room"
    },
    { 
      id: "PMT-1007", 
      reservationId: "RES-1001",
      guestName: "John Smith", 
      roomNumber: 101, 
      date: "2023-04-12", 
      amount: 45,
      method: "Cash",
      status: "completed", 
      type: "restaurant"
    },
    { 
      id: "PMT-1008", 
      reservationId: "RES-1004",
      guestName: "Emma Wilson", 
      roomNumber: 301, 
      date: "2023-04-08", 
      amount: 120,
      method: "Room Charge",
      status: "completed", 
      type: "spa"
    },
    { 
      id: "PMT-1009", 
      reservationId: null,
      guestName: "David Miller", 
      roomNumber: null, 
      date: "2023-04-10", 
      amount: 85,
      method: "Credit Card",
      status: "refunded", 
      type: "restaurant"
    },
  ]);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         payment.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (payment.roomNumber?.toString() || "").includes(searchQuery);
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "completed") return payment.status === "completed" && matchesSearch;
    if (activeTab === "pending") return payment.status === "pending" && matchesSearch;
    if (activeTab === "refunded") return payment.status === "refunded" && matchesSearch;
    if (activeTab === "failed") return payment.status === "failed" && matchesSearch;
    
    return matchesSearch;
  });

  const getTypeColors = (type: string) => {
    switch (type) {
      case "room":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "restaurant":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "spa":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "other":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "refunded":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const handleGenerateReport = () => {
    setIsReportOpen(true);
  };

  const handleAddPayment = () => {
    setIsAddPaymentOpen(true);
  };

  const handleSaveNewPayment = (newPayment: Payment) => {
    setPayments([...payments, newPayment]);
    setIsAddPaymentOpen(false);
    toast.success(`Paiement ${newPayment.id} créé avec succès`);
  };

  const handleViewPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsViewPaymentOpen(true);
  };

  const handleEditPayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsEditPaymentOpen(true);
  };

  const handleUpdatePayment = (updatedPayment: Payment) => {
    const updatedPayments = payments.map(p => 
      p.id === updatedPayment.id ? updatedPayment : p
    );
    setPayments(updatedPayments);
    toast.success(`Paiement ${updatedPayment.id} mis à jour avec succès`);
  };

  const handleDeletePayment = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePayment = () => {
    if (selectedPayment) {
      setPayments(payments.filter(p => p.id !== selectedPayment.id));
      toast.success(`Paiement ${selectedPayment.id} supprimé avec succès`);
      setIsDeleteDialogOpen(false);
      setSelectedPayment(null);
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
              <h1 className="text-3xl font-bold tracking-tight">Paiements</h1>
              <p className="text-muted-foreground">Gérer les transactions et les registres financiers</p>
            </div>
            <div className="flex space-x-2">
              <ButtonCustom variant="outline" onClick={handleGenerateReport}>
                <FileText className="h-4 w-4 mr-2" />
                Rapport Financier
              </ButtonCustom>
              <ButtonCustom onClick={handleAddPayment}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Nouveau Paiement
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
                placeholder="Rechercher paiements..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="completed">Complétés</TabsTrigger>
                <TabsTrigger value="pending">En Attente</TabsTrigger>
                <TabsTrigger value="refunded">Remboursés</TabsTrigger>
                <TabsTrigger value="failed">Échoués</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Paiement</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Chambre</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.guestName}</TableCell>
                    <TableCell>{payment.roomNumber || "-"}</TableCell>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell>${payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={getTypeColors(payment.type)}
                      >
                        {payment.type === "room" ? "Chambre" :
                         payment.type === "restaurant" ? "Restaurant" :
                         payment.type === "spa" ? "Spa" :
                         "Autre"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={getStatusColors(payment.status)}
                      >
                        {payment.status === "completed" ? "Complété" :
                         payment.status === "pending" ? "En Attente" :
                         payment.status === "refunded" ? "Remboursé" :
                         "Échoué"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <ButtonCustom variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </ButtonCustom>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewPayment(payment)}>
                            Voir
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditPayment(payment)}>
                            Éditer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeletePayment(payment)} className="text-red-600 focus:text-red-600">
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredPayments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      Aucun paiement ne correspond à vos critères de recherche
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Affichage de <strong>{filteredPayments.length}</strong> sur <strong>{payments.length}</strong> paiements
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="font-medium">Valeur totale:</div>
              <div className="font-semibold">${filteredPayments.reduce((sum, payment) => 
                payment.status !== "refunded" ? sum + payment.amount : sum, 0).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <FinancialReport 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
      />

      <AddPaymentDialog
        isOpen={isAddPaymentOpen}
        onClose={() => setIsAddPaymentOpen(false)}
        onSave={handleSaveNewPayment}
      />

      <EditPaymentDialog
        isOpen={isEditPaymentOpen}
        onClose={() => setIsEditPaymentOpen(false)}
        onSave={handleUpdatePayment}
        payment={selectedPayment}
      />

      {selectedPayment && (
        <Dialog open={isViewPaymentOpen} onOpenChange={setIsViewPaymentOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Détails du Paiement</DialogTitle>
              <DialogDescription>
                Paiement {selectedPayment.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Client</h4>
                  <p className="font-semibold">{selectedPayment.guestName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Chambre</h4>
                  <p className="font-semibold">
                    {selectedPayment.roomNumber || "N/A"}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Date</h4>
                  <p className="font-semibold">{formatDate(selectedPayment.date)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Montant</h4>
                  <p className="font-semibold">${selectedPayment.amount.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Méthode</h4>
                  <p className="font-semibold">{selectedPayment.method}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Type</h4>
                  <Badge 
                    variant="outline"
                    className={getTypeColors(selectedPayment.type)}
                  >
                    {selectedPayment.type === "room" ? "Chambre" :
                     selectedPayment.type === "restaurant" ? "Restaurant" :
                     selectedPayment.type === "spa" ? "Spa" :
                     "Autre"}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Statut</h4>
                  <Badge 
                    variant="outline"
                    className={getStatusColors(selectedPayment.status)}
                  >
                    {selectedPayment.status === "completed" ? "Complété" :
                     selectedPayment.status === "pending" ? "En Attente" :
                     selectedPayment.status === "refunded" ? "Remboursé" :
                     "Échoué"}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">ID Réservation</h4>
                  <p className="font-semibold">{selectedPayment.reservationId || "N/A"}</p>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <ButtonCustom variant="outline" onClick={() => toast.info(`Impression du reçu pour ${selectedPayment.id}`)}>
                <Receipt className="h-4 w-4 mr-2" />
                Imprimer Reçu
              </ButtonCustom>
              <ButtonCustom onClick={() => setIsViewPaymentOpen(false)}>
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
              Cette action ne peut pas être annulée. Le paiement {selectedPayment?.id} sera définitivement supprimé de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletePayment} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPaymentsPage;
