
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, Mail, Phone, MoreHorizontal, UserRound, Shield, Users, Wrench, Edit, UserX } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserRole } from "@/types";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: "active" | "inactive";
  lastActive: string;
}

const UserCard = ({ user }: { user: User }) => {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  
  const roleBadges = {
    client: <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Client</Badge>,
    admin: <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">Admin</Badge>,
    technician: <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">Technician</Badge>,
    receptionist: <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Receptionist</Badge>,
  };
  
  const roleIcons = {
    client: <UserRound className="h-5 w-5 text-blue-500" />,
    admin: <Shield className="h-5 w-5 text-purple-500" />,
    technician: <Wrench className="h-5 w-5 text-amber-500" />,
    receptionist: <Users className="h-5 w-5 text-green-500" />,
  };
  
  const handleViewUser = () => {
    setIsViewDialogOpen(true);
  };
  
  const handleEditUser = () => {
    setIsEditDialogOpen(true);
  };
  
  const handleToggleUserStatus = () => {
    setIsDeactivateDialogOpen(true);
  };

  const confirmDeactivate = () => {
    toast({
      title: user.status === 'active' ? "Utilisateur désactivé" : "Utilisateur activé",
      description: `Le statut de ${user.name} a été modifié avec succès.`,
    });
    setIsDeactivateDialogOpen(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-muted p-2">
              {roleIcons[user.role]}
            </div>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Mail className="h-3 w-3" />
                <span>{user.email}</span>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{user.phone}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {roleBadges[user.role]}
            <div className="text-xs text-muted-foreground mt-2">
              Last active: {user.lastActive}
            </div>
            <div className="flex items-center mt-2">
              <ButtonCustom 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0 text-blue-600"
                onClick={handleViewUser}
              >
                <UserRound className="h-4 w-4" />
              </ButtonCustom>
              <ButtonCustom 
                variant="ghost" 
                size="sm"
                className="h-8 w-8 p-0 text-amber-600"
                onClick={handleEditUser}
              >
                <Edit className="h-4 w-4" />
              </ButtonCustom>
              <ButtonCustom 
                variant="ghost" 
                size="sm"
                className={`h-8 w-8 p-0 ${user.status === 'active' ? 'text-red-600' : 'text-green-600'}`}
                onClick={handleToggleUserStatus}
              >
                <UserX className="h-4 w-4" />
              </ButtonCustom>
            </div>
          </div>
        </div>
      </CardContent>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Détails de l'utilisateur</DialogTitle>
            <DialogDescription>
              Informations complètes sur le profil utilisateur
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <h3 className="font-medium mb-2">Informations personnelles</h3>
              <p><span className="text-muted-foreground">Nom:</span> {user.name}</p>
              <p><span className="text-muted-foreground">Email:</span> {user.email}</p>
              <p><span className="text-muted-foreground">Téléphone:</span> {user.phone}</p>
              <p><span className="text-muted-foreground">Rôle:</span> {user.role}</p>
              <p><span className="text-muted-foreground">Statut:</span> {user.status}</p>
              <p><span className="text-muted-foreground">Dernière activité:</span> {user.lastActive}</p>
            </div>
          </div>
          <DialogFooter>
            <ButtonCustom variant="outline" onClick={() => setIsViewDialogOpen(false)}>Fermer</ButtonCustom>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>
              Mettre à jour les informations de l'utilisateur
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Nom</label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">Rôle</label>
                <Select defaultValue={user.role}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="technician">Technicien</SelectItem>
                    <SelectItem value="receptionist">Réceptionniste</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" defaultValue={user.email} />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Téléphone</label>
                <Input id="phone" defaultValue={user.phone} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <ButtonCustom variant="outline" onClick={() => setIsEditDialogOpen(false)}>Annuler</ButtonCustom>
            <ButtonCustom onClick={() => {
              toast({
                title: "Utilisateur mis à jour",
                description: "Les informations ont été mises à jour avec succès"
              });
              setIsEditDialogOpen(false);
            }}>Enregistrer</ButtonCustom>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate User Dialog */}
      <Dialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>{user.status === 'active' ? 'Désactiver' : 'Activer'} l'utilisateur</DialogTitle>
            <DialogDescription>
              {user.status === 'active' 
                ? "Êtes-vous sûr de vouloir désactiver cet utilisateur?" 
                : "Êtes-vous sûr de vouloir activer cet utilisateur?"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center font-medium">{user.name} - {user.email}</p>
          </div>
          <DialogFooter>
            <ButtonCustom variant="outline" onClick={() => setIsDeactivateDialogOpen(false)}>Annuler</ButtonCustom>
            <ButtonCustom 
              variant={user.status === 'active' ? "destructive" : "default"}
              onClick={confirmDeactivate}
            >
              {user.status === 'active' ? 'Désactiver' : 'Activer'}
            </ButtonCustom>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

const AdminUsers = () => {
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const users: User[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      role: "client",
      status: "active",
      lastActive: "Today, 10:30 AM",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 234-5678",
      role: "client",
      status: "active",
      lastActive: "Yesterday, 3:15 PM",
    },
    {
      id: "3",
      name: "Michael Davis",
      email: "michael.davis@example.com",
      phone: "+1 (555) 345-6789",
      role: "admin",
      status: "active",
      lastActive: "Today, 9:45 AM",
    },
    {
      id: "4",
      name: "Emily Wilson",
      email: "emily.w@example.com",
      phone: "+1 (555) 456-7890",
      role: "client",
      status: "inactive",
      lastActive: "06/12/2023, 11:20 AM",
    },
    {
      id: "5",
      name: "Robert Johnson",
      email: "robert.j@example.com",
      phone: "+1 (555) 567-8901",
      role: "technician",
      status: "active",
      lastActive: "Today, 8:30 AM",
    },
    {
      id: "6",
      name: "Jennifer Lopez",
      email: "jennifer.l@example.com",
      phone: "+1 (555) 678-9012",
      role: "client",
      status: "active",
      lastActive: "Yesterday, 5:45 PM",
    },
  ];

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Utilisateur créé",
      description: "Le nouvel utilisateur a été ajouté avec succès"
    });
    setShowAddUserDialog(false);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole="admin" />
      
      <div className="flex-1">
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">User Management</h1>
            <ButtonCustom 
              className="mt-4 md:mt-0"
              onClick={() => setShowAddUserDialog(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add New User
            </ButtonCustom>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-8" placeholder="Search users..." />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select defaultValue="all-roles">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-roles">All Roles</SelectItem>
                  <SelectItem value="client">Clients</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                  <SelectItem value="technician">Technicians</SelectItem>
                  <SelectItem value="receptionist">Receptionists</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all-status">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="admins">Administrators</TabsTrigger>
              <TabsTrigger value="technicians">Technicians</TabsTrigger>
              <TabsTrigger value="receptionists">Receptionists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </TabsContent>
            
            <TabsContent value="clients" className="space-y-4">
              {users.filter(user => user.role === "client").map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </TabsContent>
            
            <TabsContent value="admins" className="space-y-4">
              {users.filter(user => user.role === "admin").map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </TabsContent>
            
            <TabsContent value="technicians" className="space-y-4">
              {users.filter(user => user.role === "technician").map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </TabsContent>
            
            <TabsContent value="receptionists" className="space-y-4">
              {users.filter(user => user.role === "receptionist").map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
            <DialogDescription>
              Créer un nouveau compte utilisateur dans le système
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddUser}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="new-name" className="text-sm font-medium">Nom</label>
                  <Input id="new-name" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-role" className="text-sm font-medium">Rôle</label>
                  <Select defaultValue="client">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="technician">Technicien</SelectItem>
                      <SelectItem value="receptionist">Réceptionniste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-email" className="text-sm font-medium">Email</label>
                  <Input id="new-email" type="email" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-phone" className="text-sm font-medium">Téléphone</label>
                  <Input id="new-phone" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-sm font-medium">Mot de passe</label>
                  <Input id="new-password" type="password" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="new-password-confirm" className="text-sm font-medium">Confirmer le mot de passe</label>
                  <Input id="new-password-confirm" type="password" required />
                </div>
              </div>
            </div>
            <DialogFooter>
              <ButtonCustom variant="outline" type="button" onClick={() => setShowAddUserDialog(false)}>Annuler</ButtonCustom>
              <ButtonCustom type="submit">Créer l'utilisateur</ButtonCustom>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
