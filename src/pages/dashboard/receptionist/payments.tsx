
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Search, Calendar, Filter, Eye, CreditCard, Download } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

// Types
interface Payment {
  id: string;
  reservationId: string;
  guestName: string;
  date: string;
  amount: number;
  method: "credit-card" | "cash" | "bank-transfer" | "paypal";
  status: "paid" | "pending" | "refunded" | "cancelled";
  roomNumber: string;
}

// Sample data
const paymentsData: Payment[] = [
  {
    id: "PAY-001",
    reservationId: "RES-001",
    guestName: "Jean Dupont",
    date: "2023-12-05",
    amount: 375,
    method: "credit-card",
    status: "paid",
    roomNumber: "101"
  },
  {
    id: "PAY-002",
    reservationId: "RES-002",
    guestName: "Marie Durand",
    date: "2023-12-10",
    amount: 450,
    method: "cash",
    status: "paid",
    roomNumber: "205"
  },
  {
    id: "PAY-003",
    reservationId: "RES-003",
    guestName: "Pierre Martin",
    date: "2023-12-12",
    amount: 450,
    method: "bank-transfer",
    status: "pending",
    roomNumber: "310"
  },
  {
    id: "PAY-004",
    reservationId: "RES-004",
    guestName: "Sophie Bernard",
    date: "2023-12-08",
    amount: 600,
    method: "credit-card",
    status: "refunded",
    roomNumber: "402"
  },
  {
    id: "PAY-005",
    reservationId: "RES-005",
    guestName: "Luc Petit",
    date: "2023-12-15",
    amount: 400,
    method: "paypal",
    status: "cancelled",
    roomNumber: "207"
  }
];

// Status color mapping
const statusColors = {
  paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  refunded: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

// Method icons
const getMethodIcon = (method: Payment["method"]) => {
  switch (method) {
    case "credit-card":
      return <CreditCard className="h-4 w-4" />;
    case "cash":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <circle cx="12" cy="12" r="2" />
          <path d="M6 12h.01M18 12h.01" />
        </svg>
      );
    case "bank-transfer":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="10" width="18" height="10" rx="2" />
          <path d="M12 4v6M7 7h10" />
        </svg>
      );
    case "paypal":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 10h-5a2 2 0 00-2 2v1a2 2 0 002 2h5a2 2 0 002-2v-1a2 2 0 00-2-2z" />
          <path d="M7 10v6M10 3v18M20 3v3M20 18v3" />
        </svg>
      );
  }
};

const ReceptionistPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Filter payments based on search term, status, method and date range
  const filteredPayments = paymentsData.filter((payment) => {
    const matchesSearch = payment.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.reservationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod = methodFilter === "all" || payment.method === methodFilter;
    
    let matchesDateRange = true;
    if (dateRange?.from && dateRange?.to) {
      const paymentDate = new Date(payment.date);
      const fromDate = dateRange.from;
      const toDate = dateRange.to;
      
      matchesDateRange = paymentDate >= fromDate && paymentDate <= toDate;
    }
    
    return matchesSearch && matchesStatus && matchesMethod && matchesDateRange;
  });

  // Open payment details
  const openPaymentDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setViewDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userRole="receptionist" />
      
      <div className="flex-1 p-8 pt-6 ml-64">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Paiements</h1>
            <p className="text-muted-foreground">Gérer et consulter les paiements</p>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, ID réservation ou ID paiement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="paid">Payé</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="refunded">Remboursé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={methodFilter}
              onValueChange={setMethodFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par méthode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les méthodes</SelectItem>
                <SelectItem value="credit-card">Carte de crédit</SelectItem>
                <SelectItem value="cash">Espèces</SelectItem>
                <SelectItem value="bank-transfer">Virement bancaire</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <PopoverTrigger asChild>
                <ButtonCustom variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date
                </ButtonCustom>
              </PopoverTrigger>
              <PopoverContent className="w-auto" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium mb-2">Filtrer par période</h4>
                  <div className="border rounded-md">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={new Date()}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      className="p-3 pointer-events-auto"
                    />
                  </div>
                  <div className="flex justify-between">
                    <ButtonCustom 
                      variant="ghost" 
                      onClick={() => setDateRange(undefined)}
                    >
                      Réinitialiser
                    </ButtonCustom>
                    <ButtonCustom 
                      onClick={() => setIsFiltersOpen(false)}
                    >
                      Appliquer
                    </ButtonCustom>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Date range display */}
        {dateRange?.from && dateRange?.to && (
          <div className="mb-4 flex items-center">
            <Badge variant="outline" className="font-normal">
              Période: {format(dateRange.from, "dd/MM/yyyy")} - {format(dateRange.to, "dd/MM/yyyy")}
              <ButtonCustom
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-2 p-0"
                onClick={() => setDateRange(undefined)}
              >
                <span className="sr-only">Supprimer le filtre</span>
                ×
              </ButtonCustom>
            </Badge>
          </div>
        )}
        
        {/* Payments table */}
        <div className="bg-background rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Réservation</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Chambre</TableHead>
                <TableHead>Méthode</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Montant</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center">
                    Aucun paiement trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.reservationId}</TableCell>
                    <TableCell>{payment.guestName}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>{payment.roomNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {getMethodIcon(payment.method)}
                        <span className="capitalize text-sm">
                          {payment.method === "credit-card" && "Carte"}
                          {payment.method === "cash" && "Espèces"}
                          {payment.method === "bank-transfer" && "Virement"}
                          {payment.method === "paypal" && "PayPal"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("font-normal", statusColors[payment.status])}>
                        {payment.status === "paid" && "Payé"}
                        {payment.status === "pending" && "En attente"}
                        {payment.status === "refunded" && "Remboursé"}
                        {payment.status === "cancelled" && "Annulé"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{payment.amount}€</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <ButtonCustom
                          variant="ghost"
                          size="icon"
                          onClick={() => openPaymentDetails(payment)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Voir</span>
                        </ButtonCustom>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Payment details dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Détails du paiement</DialogTitle>
              <DialogDescription>
                Informations complètes sur le paiement {selectedPayment?.id}
              </DialogDescription>
            </DialogHeader>
            
            {selectedPayment && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">Montant</h3>
                    <span className="font-bold">{selectedPayment.amount}€</span>
                  </div>
                  <Separator />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">ID Paiement</h4>
                    <p className="text-sm">{selectedPayment.id}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Statut</h4>
                    <Badge className={cn("font-normal", statusColors[selectedPayment.status])}>
                      {selectedPayment.status === "paid" && "Payé"}
                      {selectedPayment.status === "pending" && "En attente"}
                      {selectedPayment.status === "refunded" && "Remboursé"}
                      {selectedPayment.status === "cancelled" && "Annulé"}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">ID Réservation</h4>
                    <p className="text-sm">{selectedPayment.reservationId}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Chambre</h4>
                    <p className="text-sm">{selectedPayment.roomNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Client</h4>
                    <p className="text-sm">{selectedPayment.guestName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Date</h4>
                    <p className="text-sm">{selectedPayment.date}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Méthode de paiement</h4>
                  <div className="flex items-center gap-2 text-sm">
                    {getMethodIcon(selectedPayment.method)}
                    <span>
                      {selectedPayment.method === "credit-card" && "Carte de crédit"}
                      {selectedPayment.method === "cash" && "Espèces"}
                      {selectedPayment.method === "bank-transfer" && "Virement bancaire"}
                      {selectedPayment.method === "paypal" && "PayPal"}
                    </span>
                  </div>
                </div>
                
                {selectedPayment.method === "credit-card" && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Détails de la carte</h4>
                    <p className="text-sm">VISA **** **** **** 4242</p>
                    <p className="text-sm">Exp: 12/25</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Remarques</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedPayment.status === "refunded" && "Remboursement effectué suite à l'annulation de la réservation."}
                    {selectedPayment.status === "paid" && "Paiement validé avec succès."}
                    {selectedPayment.status === "pending" && "En attente de confirmation bancaire."}
                    {selectedPayment.status === "cancelled" && "Paiement annulé par le client."}
                  </p>
                </div>
                
                <DialogFooter className="flex justify-between">
                  <ButtonCustom 
                    variant="outline"
                    onClick={() => {
                      toast.success("Reçu téléchargé avec succès!");
                    }}
                    className="flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger le reçu
                  </ButtonCustom>
                  
                  {selectedPayment.status === "pending" && (
                    <ButtonCustom
                      onClick={() => {
                        toast.success("Paiement marqué comme payé!");
                        setViewDialogOpen(false);
                      }}
                    >
                      Marquer comme payé
                    </ButtonCustom>
                  )}
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReceptionistPayments;
