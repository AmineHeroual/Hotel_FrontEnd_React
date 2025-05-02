import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, PlusCircle, Eye, Trash2, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { EditRoomDialog } from "@/components/admin/EditRoomDialog";

// Types
interface Room {
  id: string;
  number: string;
  type: string;
  capacity: number;
  price: number;
  status: "available" | "occupied" | "maintenance" | "cleaning";
  features: string[];
}

// Sample data
const roomsData: Room[] = [
  {
    id: "R001",
    number: "101",
    type: "Standard",
    capacity: 2,
    price: 99,
    status: "available",
    features: ["Wi-Fi", "TV", "Air conditioning"],
  },
  {
    id: "R002",
    number: "102",
    type: "Standard",
    capacity: 2,
    price: 99,
    status: "occupied",
    features: ["Wi-Fi", "TV", "Air conditioning"],
  },
  {
    id: "R003",
    number: "201",
    type: "Deluxe",
    capacity: 3,
    price: 149,
    status: "cleaning",
    features: ["Wi-Fi", "TV", "Air conditioning", "Mini bar", "Safe"],
  },
  {
    id: "R004",
    number: "202",
    type: "Deluxe",
    capacity: 3,
    price: 149,
    status: "available",
    features: ["Wi-Fi", "TV", "Air conditioning", "Mini bar", "Safe"],
  },
  {
    id: "R005",
    number: "301",
    type: "Suite",
    capacity: 4,
    price: 299,
    status: "maintenance",
    features: ["Wi-Fi", "TV", "Air conditioning", "Mini bar", "Safe", "Jacuzzi", "Kitchenette"],
  },
];

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>(roomsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Filter rooms based on search term and filters
  const filteredRooms = rooms.filter((room) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filter
    const matchesStatus = statusFilter === "all" || room.status === statusFilter;

    // Type filter
    const matchesType = typeFilter === "all" || room.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Room status badge
  const getStatusBadge = (status: Room["status"]) => {
    const statusConfig: Record<Room["status"], { label: string; className: string }> = {
      available: {
        label: "Disponible",
        className: "bg-green-100 text-green-800",
      },
      occupied: {
        label: "Occupée",
        className: "bg-blue-100 text-blue-800",
      },
      maintenance: {
        label: "Maintenance",
        className: "bg-red-100 text-red-800",
      },
      cleaning: {
        label: "Nettoyage",
        className: "bg-yellow-100 text-yellow-800",
      },
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  // View room details
  const handleViewRoom = (room: Room) => {
    setSelectedRoom(room);
    setViewDialogOpen(true);
  };

  // Edit room
  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setEditDialogOpen(true);
  };

  // Handle save edit
  const handleSaveEdit = (updatedRoom: any) => {
    setRooms(rooms.map(room => 
      room.id === updatedRoom.id ? 
      {
        ...room,
        type: updatedRoom.type,
        status: updatedRoom.status,
        price: updatedRoom.price,
        capacity: updatedRoom.occupants
      } : room
    ));
    toast.success(`Chambre ${updatedRoom.id} modifiée avec succès`);
  };

  // Delete room
  const handleDeleteRoom = (room: Room) => {
    setSelectedRoom(room);
    setDeleteDialogOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (selectedRoom) {
      setRooms(rooms.filter((r) => r.id !== selectedRoom.id));
      toast.success(`Chambre ${selectedRoom.number} supprimée avec succès`);
      setDeleteDialogOpen(false);
      setSelectedRoom(null);
    }
  };

  // Create room
  const handleCreateRoom = () => {
    setCreateDialogOpen(true);
  };

  // Save new room
  const handleSaveRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const featuresString = formData.get('features') as string;
    const featuresArray = featuresString.split(',').map(feature => feature.trim()).filter(Boolean);
    
    const newRoom: Room = {
      id: `R${String(rooms.length + 1).padStart(3, '0')}`,
      number: formData.get('number') as string,
      type: formData.get('type') as string,
      capacity: Number(formData.get('capacity')),
      price: Number(formData.get('price')),
      status: formData.get('status') as Room["status"],
      features: featuresArray,
    };
    
    setRooms([...rooms, newRoom]);
    setCreateDialogOpen(false);
    toast.success(`Chambre ${newRoom.number} créée avec succès`);
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar userRole="receptionist" />

      <div className="flex-1 p-8 pt-6 ml-64">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">Chambres</h1>
            <p className="text-muted-foreground">Gestion des chambres de l'hôtel</p>
          </div>
          <ButtonCustom onClick={handleCreateRoom}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Ajouter une chambre
          </ButtonCustom>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total des chambres
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rooms.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {rooms.filter((room) => room.status === "available").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Occupées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {rooms.filter((room) => room.status === "occupied").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                En maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {rooms.filter((room) => room.status === "maintenance").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une chambre..."
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
                <SelectItem value="available">Disponible</SelectItem>
                <SelectItem value="occupied">Occupée</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="cleaning">Nettoyage</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Deluxe">Deluxe</SelectItem>
                <SelectItem value="Suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Rooms table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des chambres</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Capacité</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.number}</TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>{room.capacity} personne{room.capacity > 1 ? 's' : ''}</TableCell>
                    <TableCell>{room.price} € / nuit</TableCell>
                    <TableCell>{getStatusBadge(room.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <ButtonCustom
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewRoom(room)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Voir</span>
                        </ButtonCustom>
                        <ButtonCustom
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditRoom(room)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </ButtonCustom>
                        <ButtonCustom
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteRoom(room)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </ButtonCustom>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRooms.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Aucune chambre ne correspond à vos critères de recherche
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* View Room Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Détails de la chambre</DialogTitle>
              <DialogDescription>
                Chambre {selectedRoom?.number}
              </DialogDescription>
            </DialogHeader>
            {selectedRoom && (
              <div className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Numéro</p>
                    <p>{selectedRoom.number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Type</p>
                    <p>{selectedRoom.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Capacité</p>
                    <p>{selectedRoom.capacity} personne{selectedRoom.capacity > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Prix</p>
                    <p>{selectedRoom.price} € / nuit</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Statut</p>
                    <div>{getStatusBadge(selectedRoom.status)}</div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Caractéristiques</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedRoom.features.map((feature, index) => (
                      <Badge key={index} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Room Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Supprimer la chambre</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer la chambre {selectedRoom?.number} ?
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

        {/* Create Room Dialog */}
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter une chambre</DialogTitle>
              <DialogDescription>
                Créer une nouvelle chambre dans l'hôtel
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveRoom}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="number">Numéro de chambre</Label>
                    <Input id="number" name="number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type de chambre</Label>
                    <Select name="type" defaultValue="Standard">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Deluxe">Deluxe</SelectItem>
                        <SelectItem value="Suite">Suite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacité</Label>
                    <Input id="capacity" name="capacity" type="number" min="1" required defaultValue="2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix par nuit (€)</Label>
                    <Input id="price" name="price" type="number" min="0" step="0.01" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select name="status" defaultValue="available">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponible</SelectItem>
                      <SelectItem value="occupied">Occupée</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="cleaning">Nettoyage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="features">Caractéristiques (séparées par des virgules)</Label>
                  <Input id="features" name="features" defaultValue="Wi-Fi, TV, Air conditioning" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setCreateDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  Créer la chambre
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Room Dialog */}
        <EditRoomDialog
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSave={handleSaveEdit}
          room={selectedRoom ? {
            id: parseInt(selectedRoom.id.replace('R', '')),
            type: selectedRoom.type,
            status: selectedRoom.status,
            price: selectedRoom.price,
            occupants: selectedRoom.capacity,
            checkIn: '',
            checkOut: ''
          } : null}
        />
      </div>
    </div>
  );
};

export default RoomsPage;
