
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal, ClipboardList, Search } from "lucide-react";
import { toast } from "sonner";
import RoomOccupancyReport from "@/components/admin/RoomOccupancyReport";
import AddRoomDialog from "@/components/admin/AddRoomDialog";
import ViewRoomDialog from "@/components/admin/ViewRoomDialog";
import EditRoomDialog from "@/components/admin/EditRoomDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Room {
  id: number;
  type: string;
  status: string;
  price: number;
  occupants: number;
  checkIn: string;
  checkOut: string;
}

const AdminRoomsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isViewRoomOpen, setIsViewRoomOpen] = useState(false);
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Mock room data
  const [rooms, setRooms] = useState<Room[]>([
    { id: 101, type: "Standard", status: "occupied", price: 99, occupants: 2, checkIn: "2023-04-10", checkOut: "2023-04-15" },
    { id: 102, type: "Standard", status: "available", price: 99, occupants: 0, checkIn: "", checkOut: "" },
    { id: 103, type: "Standard", status: "maintenance", price: 99, occupants: 0, checkIn: "", checkOut: "" },
    { id: 201, type: "Deluxe", status: "occupied", price: 149, occupants: 1, checkIn: "2023-04-08", checkOut: "2023-04-16" },
    { id: 202, type: "Deluxe", status: "reserved", price: 149, occupants: 0, checkIn: "2023-04-17", checkOut: "2023-04-20" },
    { id: 203, type: "Deluxe", status: "available", price: 149, occupants: 0, checkIn: "", checkOut: "" },
    { id: 301, type: "Suite", status: "occupied", price: 299, occupants: 2, checkIn: "2023-04-05", checkOut: "2023-04-12" },
    { id: 302, type: "Suite", status: "available", price: 299, occupants: 0, checkIn: "", checkOut: "" },
    { id: 303, type: "Suite", status: "reserved", price: 299, occupants: 0, checkIn: "2023-04-18", checkOut: "2023-04-25" },
    { id: 401, type: "Presidential", status: "occupied", price: 599, occupants: 2, checkIn: "2023-04-01", checkOut: "2023-04-30" },
  ]);

  // Filter rooms based on search and tab
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.id.toString().includes(searchQuery) || 
                         room.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "available") return room.status === "available" && matchesSearch;
    if (activeTab === "occupied") return room.status === "occupied" && matchesSearch;
    if (activeTab === "reserved") return room.status === "reserved" && matchesSearch;
    if (activeTab === "maintenance") return room.status === "maintenance" && matchesSearch;
    
    return matchesSearch;
  });

  const statusColors: Record<string, string> = {
    available: "success",
    occupied: "info",
    reserved: "warning",
    maintenance: "error",
  };

  const statusText: Record<string, string> = {
    available: "Available",
    occupied: "Occupied",
    reserved: "Reserved",
    maintenance: "Maintenance",
  };

  const handleGenerateReport = () => {
    setIsReportOpen(true);
  };

  const handleAddRoom = () => {
    setIsAddRoomOpen(true);
  };

  const handleSaveNewRoom = (newRoom: Room) => {
    setRooms([...rooms, newRoom]);
    setIsAddRoomOpen(false);
  };

  const handleViewRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsViewRoomOpen(true);
  };

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsEditRoomOpen(true);
  };

  const handleDeleteRoom = (room: Room) => {
    setSelectedRoom(room);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteRoom = () => {
    if (selectedRoom) {
      setRooms(rooms.filter(room => room.id !== selectedRoom.id));
      toast.success(`Room ${selectedRoom.id} has been deleted`);
      setIsDeleteDialogOpen(false);
      setSelectedRoom(null);
    }
  };

  const handleSaveEditedRoom = (editedRoom: Room) => {
    setRooms(rooms.map(room => (room.id === editedRoom.id ? editedRoom : room)));
    setIsEditRoomOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole="admin" />
      
      <div className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Chambres</h1>
              <p className="text-muted-foreground">Gérer l'inventaire des chambres, leur disponibilité et maintenance</p>
            </div>
            <div className="flex space-x-2">
              <ButtonCustom variant="outline" onClick={handleGenerateReport}>
                <ClipboardList className="h-4 w-4 mr-2" />
                Rapport d'Occupation
              </ButtonCustom>
              <ButtonCustom onClick={handleAddRoom}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Ajouter Chambre
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
                placeholder="Rechercher chambres..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="available">Disponibles</TabsTrigger>
                <TabsTrigger value="occupied">Occupées</TabsTrigger>
                <TabsTrigger value="reserved">Réservées</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Chambre #</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Occupants</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead className="w-[70px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.id}</TableCell>
                    <TableCell>{room.type}</TableCell>
                    <TableCell>${room.price}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          room.status === 'available' ? 'default' :
                          room.status === 'occupied' ? 'secondary' :
                          room.status === 'reserved' ? 'outline' :
                          'destructive'
                        }
                        className={
                          room.status === 'available' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                          room.status === 'occupied' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                          room.status === 'reserved' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                          'bg-red-100 text-red-800 hover:bg-red-100'
                        }
                      >
                        {statusText[room.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{room.occupants > 0 ? room.occupants : "-"}</TableCell>
                    <TableCell>{room.checkIn || "-"}</TableCell>
                    <TableCell>{room.checkOut || "-"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <ButtonCustom variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </ButtonCustom>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewRoom(room)}>
                            Voir
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditRoom(room)}>
                            Éditer
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteRoom(room)} className="text-red-600 focus:text-red-600">
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredRooms.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Aucune chambre ne correspond à vos critères de recherche
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Affichage de <strong>{filteredRooms.length}</strong> sur <strong>{rooms.length}</strong> chambres
            </p>
          </div>
        </div>
      </div>

      {/* Room Occupancy Report Dialog */}
      <RoomOccupancyReport 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
      />

      {/* Add Room Dialog */}
      <AddRoomDialog
        isOpen={isAddRoomOpen}
        onClose={() => setIsAddRoomOpen(false)}
        onSave={handleSaveNewRoom}
      />

      {/* View Room Dialog */}
      <ViewRoomDialog
        isOpen={isViewRoomOpen}
        onClose={() => setIsViewRoomOpen(false)}
        room={selectedRoom}
      />

      {/* Edit Room Dialog */}
      <EditRoomDialog
        isOpen={isEditRoomOpen}
        onClose={() => setIsEditRoomOpen(false)}
        onSave={handleSaveEditedRoom}
        room={selectedRoom}
      />

      {/* Delete Room Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. La chambre {selectedRoom?.id} sera définitivement supprimée de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteRoom} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminRoomsPage;
