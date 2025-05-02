
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { ReservationList } from "./components/ReservationList";
import { reservationsData } from "./data/reservationData";
import { toast } from "@/hooks/use-toast";

const ClientReservations = () => {
  const [allReservations] = useState(reservationsData);
  
  // Filter reservations by status
  const upcomingReservations = allReservations.filter(r => r.status === "upcoming");
  const activeReservations = allReservations.filter(r => r.status === "active");
  const pastReservations = allReservations.filter(r => 
    r.status === "completed" || r.status === "cancelled"
  );

  const handleNewReservation = () => {
    toast({
      title: "New reservation",
      description: "This functionality will be implemented soon.",
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole="client" />
      
      <div className="flex-1">
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">My Reservations</h1>
            <ButtonCustom className="mt-4 md:mt-0" onClick={handleNewReservation}>
              <Plus className="h-4 w-4 mr-2" />
              New Reservation
            </ButtonCustom>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Reservations</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              <ReservationList reservations={allReservations} />
            </TabsContent>
            
            <TabsContent value="upcoming" className="space-y-6">
              <ReservationList 
                reservations={upcomingReservations} 
                emptyMessage="You have no upcoming reservations at the moment."
              />
            </TabsContent>
            
            <TabsContent value="active">
              <ReservationList 
                reservations={activeReservations} 
                emptyMessage="You have no active reservations at the moment."
              />
            </TabsContent>
            
            <TabsContent value="past" className="space-y-6">
              <ReservationList 
                reservations={pastReservations} 
                emptyMessage="You don't have any past reservations."
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientReservations;
