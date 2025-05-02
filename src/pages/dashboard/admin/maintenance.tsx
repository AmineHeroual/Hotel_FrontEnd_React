import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal, ClipboardList, Search, FileText, Pencil, Users } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import MaintenanceRequest from "@/components/admin/MaintenanceRequest";
import MaintenanceReport from "@/components/admin/MaintenanceReport";
import EditMaintenanceDialog from "@/components/admin/EditMaintenanceDialog";
import AssignTechnicianDialog from "@/components/admin/AssignTechnicianDialog";

interface MaintenanceItem {
  id: number;
  title: string;
  description: string;
  location: string;
  priority: string;
  status: string;
  category: string;
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

const AdminMaintenancePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MaintenanceItem | null>(null);
  
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>([
    { 
      id: 1001, 
      title: "Leaky faucet in Room 102", 
      description: "Guest reported continuous dripping from bathroom sink faucet",
      location: "room-102", 
      category: "plumbing",
      priority: "medium", 
      status: "completed", 
      assignedTo: "tech-1",
      createdAt: "2023-04-02T10:30:00",
      updatedAt: "2023-04-03T14:15:00",
      completedAt: "2023-04-03T14:15:00"
    },
    { 
      id: 1002, 
      title: "AC not cooling in Room 305", 
      description: "Air conditioner running but not cooling the room properly. Current temperature 26°C",
      location: "room-305", 
      category: "hvac",
      priority: "high", 
      status: "in_progress", 
      assignedTo: "tech-3",
      createdAt: "2023-04-05T09:15:00",
      updatedAt: "2023-04-05T11:45:00",
      completedAt: null
    },
    { 
      id: 1003, 
      title: "Light fixture broken in hallway", 
      description: "Ceiling light fixture on 2nd floor hallway not working, possible electrical issue",
      location: "hallway", 
      category: "electrical",
      priority: "low", 
      status: "pending", 
      assignedTo: null,
      createdAt: "2023-04-08T16:20:00",
      updatedAt: "2023-04-08T16:20:00",
      completedAt: null
    },
    { 
      id: 1004, 
      title: "Shower drain clogged", 
      description: "Water draining very slowly in shower of Room 204",
      location: "room-204", 
      category: "plumbing",
      priority: "medium", 
      status: "completed", 
      assignedTo: "tech-2",
      createdAt: "2023-04-01T08:45:00",
      updatedAt: "2023-04-01T13:20:00",
      completedAt: "2023-04-01T13:20:00"
    },
    { 
      id: 1005, 
      title: "Broken chair leg", 
      description: "Chair in restaurant area has broken leg and needs repair or replacement",
      location: "restaurant", 
      category: "furniture",
      priority: "low", 
      status: "completed", 
      assignedTo: "tech-4",
      createdAt: "2023-03-28T11:30:00",
      updatedAt: "2023-03-30T09:45:00",
      completedAt: "2023-03-30T09:45:00"
    },
    { 
      id: 1006, 
      title: "TV not working", 
      description: "TV in Room 410 won't turn on. Guest has already checked all connections",
      location: "room-410", 
      category: "appliance",
      priority: "medium", 
      status: "in_progress", 
      assignedTo: "tech-1",
      createdAt: "2023-04-07T14:10:00",
      updatedAt: "2023-04-07T16:30:00",
      completedAt: null
    },
    { 
      id: 1007, 
      title: "Pool heater malfunction", 
      description: "Pool temperature too cold due to heater malfunction",
      location: "pool", 
      category: "hvac",
      priority: "high", 
      status: "pending", 
      assignedTo: null,
      createdAt: "2023-04-09T07:50:00",
      updatedAt: "2023-04-09T07:50:00",
      completedAt: null
    },
    { 
      id: 1008, 
      title: "Ceiling water leak", 
      description: "Water leaking from ceiling in Room 505, possible pipe issue from floor above",
      location: "room-505", 
      category: "structural",
      priority: "emergency", 
      status: "in_progress", 
      assignedTo: "tech-3",
      createdAt: "2023-04-06T22:15:00",
      updatedAt: "2023-04-07T08:30:00",
      completedAt: null
    },
  ]);

  const filteredItems = maintenanceItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending") return item.status === "pending" && matchesSearch;
    if (activeTab === "in_progress") return item.status === "in_progress" && matchesSearch;
    if (activeTab === "completed") return item.status === "completed" && matchesSearch;
    
    return matchesSearch;
  });

  const statusColors: Record<string, string> = {
    "pending": "warning",
    "in_progress": "info",
    "completed": "success",
  };

  const statusText: Record<string, string> = {
    "pending": "Pending",
    "in_progress": "In Progress",
    "completed": "Completed",
  };

  const priorityColors: Record<string, string> = {
    "low": "info",
    "medium": "warning",
    "high": "error",
    "emergency": "error",
  };

  const priorityText: Record<string, string> = {
    "low": "Low",
    "medium": "Medium",
    "high": "High",
    "emergency": "Emergency",
  };

  const getDisplayLocation = (location: string) => {
    if (location.startsWith('room-')) {
      return `Room ${location.replace('room-', '')}`;
    }
    return location.charAt(0).toUpperCase() + location.slice(1);
  };

  const getTechnicianName = (techId: string | null) => {
    if (!techId) return "Unassigned";
    
    const technicianMap: Record<string, string> = {
      "tech-1": "John Smith",
      "tech-2": "Sarah Johnson",
      "tech-3": "Michael Brown",
      "tech-4": "Lisa Chen",
    };
    
    return technicianMap[techId] || "Unknown Technician";
  };

  const handleAddRequest = (data: any) => {
    const newItem: MaintenanceItem = {
      ...data,
      id: Math.max(...maintenanceItems.map(item => item.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };
    
    setMaintenanceItems([...maintenanceItems, newItem]);
    setIsRequestDialogOpen(false);
    toast.success("Maintenance request created successfully");
  };

  const handleEditItem = (item: MaintenanceItem) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (updatedItem: MaintenanceItem) => {
    setMaintenanceItems(maintenanceItems.map(item => 
      item.id === updatedItem.id ? {
        ...updatedItem,
        updatedAt: new Date().toISOString(),
        completedAt: updatedItem.status === 'completed' ? new Date().toISOString() : updatedItem.completedAt
      } : item
    ));
    setIsEditDialogOpen(false);
    toast.success("Maintenance request updated successfully");
  };

  const handleAssignTechnician = (item: MaintenanceItem) => {
    setSelectedItem(item);
    setIsAssignDialogOpen(true);
  };

  const handleSaveAssignment = (maintenanceId: number, technicianId: string) => {
    setMaintenanceItems(maintenanceItems.map(item => 
      item.id === maintenanceId ? {
        ...item,
        assignedTo: technicianId || null,
        updatedAt: new Date().toISOString()
      } : item
    ));
    setIsAssignDialogOpen(false);
    toast.success(technicianId ? "Technician assigned successfully" : "Technician unassigned successfully");
  };

  const formatDateTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy HH:mm");
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
              <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
              <p className="text-muted-foreground">Manage maintenance requests and track repairs</p>
            </div>
            <div className="flex space-x-2">
              <ButtonCustom variant="outline" onClick={() => setIsReportOpen(true)}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </ButtonCustom>
              <ButtonCustom onClick={() => setIsRequestDialogOpen(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Request
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
                placeholder="Search maintenance requests..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{getDisplayLocation(item.location)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.priority === 'low' ? 'default' :
                          item.priority === 'medium' ? 'secondary' :
                          'destructive'
                        }
                        className={
                          item.priority === 'low' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                          item.priority === 'medium' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                          'bg-red-100 text-red-800 hover:bg-red-100'
                        }
                      >
                        {priorityText[item.priority]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === 'pending' ? 'outline' :
                          item.status === 'in_progress' ? 'secondary' :
                          'default'
                        }
                        className={
                          item.status === 'pending' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                          item.status === 'in_progress' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' :
                          'bg-green-100 text-green-800 hover:bg-green-100'
                        }
                      >
                        {statusText[item.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>{getTechnicianName(item.assignedTo)}</TableCell>
                    <TableCell>{formatDateTime(item.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <ButtonCustom 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditItem(item)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </ButtonCustom>
                        <ButtonCustom 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleAssignTechnician(item)}
                        >
                          <Users className="h-4 w-4" />
                          <span className="sr-only">Assign</span>
                        </ButtonCustom>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <ButtonCustom variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </ButtonCustom>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditItem(item)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAssignTechnician(item)}>
                              <Users className="h-4 w-4 mr-2" />
                              Assign
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              const newStatus = item.status === "pending" ? "in_progress" : 
                                             item.status === "in_progress" ? "completed" : "pending";
                              
                              const updatedItem = {
                                ...item,
                                status: newStatus,
                                updatedAt: new Date().toISOString(),
                                completedAt: newStatus === "completed" ? new Date().toISOString() : item.completedAt
                              };
                              
                              handleSaveEdit(updatedItem);
                            }}>
                              {item.status === "pending" ? "Start Work" : 
                               item.status === "in_progress" ? "Mark as Complete" : "Reopen"}
                            </DropdownMenuItem>
                            {item.status !== "completed" && (
                              <DropdownMenuItem onClick={() => {
                                const updatedItem = {
                                  ...item,
                                  status: "completed",
                                  updatedAt: new Date().toISOString(),
                                  completedAt: new Date().toISOString()
                                };
                                handleSaveEdit(updatedItem);
                              }}>
                                Mark as Complete
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No maintenance requests match your search criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Showing <strong>{filteredItems.length}</strong> of <strong>{maintenanceItems.length}</strong> maintenance requests
            </p>
          </div>
        </div>
      </div>

      <MaintenanceRequest 
        isOpen={isRequestDialogOpen} 
        onClose={() => setIsRequestDialogOpen(false)}
        onSave={handleAddRequest}
      />

      <MaintenanceReport 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)}
      />

      <EditMaintenanceDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        maintenanceItem={selectedItem}
        onSave={handleSaveEdit}
      />

      <AssignTechnicianDialog
        isOpen={isAssignDialogOpen}
        onClose={() => setIsAssignDialogOpen(false)}
        maintenanceItem={selectedItem}
        onAssign={handleSaveAssignment}
      />
    </div>
  );
};

export default AdminMaintenancePage;
