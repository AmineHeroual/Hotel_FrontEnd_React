import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, CheckCircle, Eye, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

// Types
interface MaintenanceRequest {
  id: string;
  roomNumber: string;
  issueType: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "critical";
  requestedBy: string;
  requestDate: string;
  assignedTo?: string;
  completedDate?: string;
}

// Sample data
const maintenanceData: MaintenanceRequest[] = [
  {
    id: "M001",
    roomNumber: "101",
    issueType: "Plumbing",
    description: "Bathroom sink is leaking.",
    status: "pending",
    priority: "medium",
    requestedBy: "Jean Dupont",
    requestDate: "2023-12-15",
    assignedTo: undefined,
    completedDate: undefined,
  },
  {
    id: "M002",
    roomNumber: "203",
    issueType: "Electrical",
    description: "Light fixture in living area not working.",
    status: "in_progress",
    priority: "low",
    requestedBy: "Marie Martin",
    requestDate: "2023-12-14",
    assignedTo: "Pierre Lemaitre",
    completedDate: undefined,
  },
  {
    id: "M003",
    roomNumber: "305",
    issueType: "HVAC",
    description: "Air conditioning not cooling the room enough.",
    status: "completed",
    priority: "high",
    requestedBy: "Sophie Bernard",
    requestDate: "2023-12-10",
    assignedTo: "Michel Dubois",
    completedDate: "2023-12-12",
  },
  {
    id: "M004",
    roomNumber: "102",
    issueType: "Furniture",
    description: "TV remote control is missing.",
    status: "pending",
    priority: "low",
    requestedBy: "Paul Petit",
    requestDate: "2023-12-16",
    assignedTo: undefined,
    completedDate: undefined,
  },
  {
    id: "M005",
    roomNumber: "401",
    issueType: "Plumbing",
    description: "Shower is not draining properly.",
    status: "in_progress",
    priority: "critical",
    requestedBy: "Caroline Blanc",
    requestDate: "2023-12-15",
    assignedTo: "Pierre Lemaitre",
    completedDate: undefined,
  },
];

const technicians = [
  "Pierre Lemaitre",
  "Michel Dubois",
  "Sophie Rousseau",
  "Julien Martin",
];

const ReceptionistMaintenancePage = () => {
  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>(maintenanceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [markCompleteDialogOpen, setMarkCompleteDialogOpen] = useState(false);

  // Filter maintenance requests based on search term and filters
  const filteredRequests = maintenanceRequests.filter((request) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      request.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.issueType.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;

    // Priority filter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Status badge
  const getStatusBadge = (status: MaintenanceRequest["status"]) => {
    const statusConfig: Record<
      MaintenanceRequest["status"],
      { label: string; className: string }
    > = {
      pending: {
        label: "En attente",
        className: "bg-yellow-100 text-yellow-800",
      },
      in_progress: {
        label: "En cours",
        className: "bg-blue-100 text-blue-800",
      },
      completed: {
        label: "Terminé",
        className: "bg-green-100 text-green-800",
      },
      cancelled: {
        label: "Annulé",
        className: "bg-red-100 text-red-800",
      },
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  // Priority badge
  const getPriorityBadge = (priority: MaintenanceRequest["priority"]) => {
    const priorityConfig: Record<
      MaintenanceRequest["priority"],
      { label: string; className: string }
    > = {
      low: {
        label: "Faible",
        className: "bg-gray-100 text-gray-800",
      },
      medium: {
        label: "Moyenne",
        className: "bg-yellow-100 text-yellow-800",
      },
      high: {
        label: "Élevée",
        className: "bg-orange-100 text-orange-800",
      },
      critical: {
        label: "Critique",
        className: "bg-red-100 text-red-800",
      },
    };

    const config = priorityConfig[priority];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  // View maintenance request
  const handleViewRequest = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setViewDialogOpen(true);
  };

  // Edit maintenance request
  const handleEditRequest = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setEditDialogOpen(true);
  };

  // Delete maintenance request
  const handleDeleteRequest = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setDeleteDialogOpen(true);
  };

  // Mark as complete
  const handleMarkComplete = (request: MaintenanceRequest) => {
    setSelectedRequest(request);
    setMarkCompleteDialogOpen(true);
  };

  // Confirm mark as complete
  const confirmMarkComplete = () => {
    if (selectedRequest) {
      const updatedRequests = maintenanceRequests.map(req =>
        req.id === selectedRequest.id
          ? { ...req, status: "completed" as const, completedDate: new Date().toISOString().split('T')[0] }
          : req
      );
      setMaintenanceRequests(updatedRequests);
      toast.success(`Demande ${selectedRequest.id} marquée comme terminée`);
      setMarkCompleteDialogOpen(false);
    }
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (selectedRequest) {
      setMaintenanceRequests(maintenanceRequests.filter(req => req.id !== selectedRequest.id));
      toast.success(`Demande ${selectedRequest.id} supprimée avec succès`);
      setDeleteDialogOpen(false);
    }
  };

  // Create maintenance request
  const handleCreateRequest = () => {
    setCreateDialogOpen(true);
  };

  // Save new request
  const handleSaveRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newRequest: MaintenanceRequest = {
      id: `M${String(maintenanceRequests.length + 1).padStart(3, '0')}`,
      roomNumber: formData.get('roomNumber') as string,
      issueType: formData.get('issueType') as string,
      description: formData.get('description') as string,
      status: "pending",
      priority: formData.get('priority') as MaintenanceRequest["priority"],
      requestedBy: formData.get('requestedBy') as string,
      requestDate: new Date().toISOString().split('T')[0],
      assignedTo: formData.get('assignedTo') as string || undefined,
    };
    
    setMaintenanceRequests([...maintenanceRequests, newRequest]);
    setCreateDialogOpen(false);
    toast.success(`Demande de maintenance créée avec succès`);
  };

  // Save edited request
  const handleSaveEditedRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedRequest) return;
    
    const formData = new FormData(e.currentTarget);
    
    const updatedRequest: MaintenanceRequest = {
      ...selectedRequest,
      roomNumber: formData.get('roomNumber') as string,
      issueType: formData.get('issueType') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as MaintenanceRequest["status"],
      priority: formData.get('priority') as MaintenanceRequest["priority"],
      assignedTo: formData.get('assignedTo') as string || undefined,
    };
    
    setMaintenanceRequests(maintenanceRequests.map(req => 
      req.id === updatedRequest.id ? updatedRequest : req
    ));
    
    setEditDialogOpen(false);
    toast.success(`Demande de maintenance ${updatedRequest.id} mise à jour avec succès`);
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userRole="receptionist" />

      <div className="flex-1 p-8 pt-6 ml-64">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Maintenance</h1>
            <p className="text-muted-foreground">Gestion des demandes de maintenance</p>
          </div>
          <ButtonCustom onClick={handleCreateRequest}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Nouvelle demande
          </ButtonCustom>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{maintenanceRequests.length}</div>
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
                {maintenanceRequests.filter((req) => req.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                En cours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {maintenanceRequests.filter((req) => req.status === "in_progress").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Terminées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {maintenanceRequests.filter((req) => req.status === "completed").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une demande..."
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
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les priorités</SelectItem>
                <SelectItem value="low">Faible</SelectItem>
                <SelectItem value="medium">Moyenne</SelectItem>
                <SelectItem value="high">Élevée</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Maintenance requests table */}
        <Card>
          <CardHeader>
            <CardTitle>Demandes de maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Chambre</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Assigné à</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.roomNumber}</TableCell>
                    <TableCell>{request.issueType}</TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>{request.assignedTo || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <ButtonCustom
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewRequest(request)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Voir</span>
                        </ButtonCustom>
                        <ButtonCustom
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditRequest(request)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </ButtonCustom>
                        {request.status !== "completed" && (
                          <ButtonCustom
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMarkComplete(request)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Terminer</span>
                          </ButtonCustom>
                        )}
                        <ButtonCustom
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteRequest(request)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </ButtonCustom>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRequests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Aucune demande ne correspond à vos critères de recherche
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Request Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Détails de la demande</DialogTitle>
              <DialogDescription>
                Demande {selectedRequest?.id}
              </DialogDescription>
            </DialogHeader>
            {selectedRequest && (
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Chambre</p>
                    <p>{selectedRequest.roomNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Type de problème</p>
                    <p>{selectedRequest.issueType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Priorité</p>
                    <div>{getPriorityBadge(selectedRequest.priority)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Statut</p>
                    <div>{getStatusBadge(selectedRequest.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Date de demande</p>
                    <p>{selectedRequest.requestDate}</p>
                  </div>
                  {selectedRequest.completedDate && (
                    <div>
                      <p className="text-sm font-medium mb-1">Date de complétion</p>
                      <p>{selectedRequest.completedDate}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium mb-1">Demandé par</p>
                    <p>{selectedRequest.requestedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Assigné à</p>
                    <p>{selectedRequest.assignedTo || "-"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Description</p>
                  <p className="text-sm">{selectedRequest.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Request Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Modifier la demande</DialogTitle>
              <DialogDescription>
                Modification de la demande {selectedRequest?.id}
              </DialogDescription>
            </DialogHeader>
            {selectedRequest && (
              <form onSubmit={handleSaveEditedRequest}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="roomNumber">Numéro de chambre</Label>
                      <Input id="roomNumber" name="roomNumber" defaultValue={selectedRequest.roomNumber} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="issueType">Type de problème</Label>
                      <Select name="issueType" defaultValue={selectedRequest.issueType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Plumbing">Plomberie</SelectItem>
                          <SelectItem value="Electrical">Électricité</SelectItem>
                          <SelectItem value="HVAC">Climatisation/Chauffage</SelectItem>
                          <SelectItem value="Furniture">Mobilier</SelectItem>
                          <SelectItem value="Other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priorité</Label>
                      <Select name="priority" defaultValue={selectedRequest.priority}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Faible</SelectItem>
                          <SelectItem value="medium">Moyenne</SelectItem>
                          <SelectItem value="high">Élevée</SelectItem>
                          <SelectItem value="critical">Critique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Statut</Label>
                      <Select name="status" defaultValue={selectedRequest.status}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="in_progress">En cours</SelectItem>
                          <SelectItem value="completed">Terminé</SelectItem>
                          <SelectItem value="cancelled">Annulé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assignedTo">Assigné à</Label>
                    <Select name="assignedTo" defaultValue={selectedRequest.assignedTo || "unassigned"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Non assigné" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Non assigné</SelectItem>
                        {technicians.map((tech) => (
                          <SelectItem key={tech} value={tech}>
                            {tech}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" defaultValue={selectedRequest.description} rows={4} required />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setEditDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    Enregistrer
                  </Button>
                </DialogFooter>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Request Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Supprimer la demande</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer cette demande de maintenance ?
                Cette action ne peut pas être annulée.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Mark Complete Dialog */}
        <Dialog open={markCompleteDialogOpen} onOpenChange={setMarkCompleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Marquer comme terminé</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir marquer cette demande comme terminée ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setMarkCompleteDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={confirmMarkComplete}>
                Confirmer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Request Dialog */}
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nouvelle demande de maintenance</DialogTitle>
              <DialogDescription>
                Créer une nouvelle demande de maintenance
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveRequest}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="roomNumber">Numéro de chambre</Label>
                    <Input id="roomNumber" name="roomNumber" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issueType">Type de problème</Label>
                    <Select name="issueType">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Plumbing">Plomberie</SelectItem>
                        <SelectItem value="Electrical">Électricité</SelectItem>
                        <SelectItem value="HVAC">Climatisation/Chauffage</SelectItem>
                        <SelectItem value="Furniture">Mobilier</SelectItem>
                        <SelectItem value="Other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priorité</Label>
                    <Select name="priority" defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Faible</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="high">Élevée</SelectItem>
                        <SelectItem value="critical">Critique</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requestedBy">Demandé par</Label>
                    <Input id="requestedBy" name="requestedBy" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigné à</Label>
                  <Select name="assignedTo" defaultValue="unassigned">
                    <SelectTrigger>
                      <SelectValue placeholder="Non assigné" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unassigned">Non assigné</SelectItem>
                      {technicians.map((tech) => (
                        <SelectItem key={tech} value={tech}>
                          {tech}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" rows={4} required />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  Créer la demande
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReceptionistMaintenancePage;
