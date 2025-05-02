
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Coffee, Wifi, CreditCard, Users, Calendar, FileEdit, Trash2, Plus } from "lucide-react";

export type ReservationStatus = "upcoming" | "active" | "completed" | "cancelled";

export interface ReservationCardProps {
  roomType: string; 
  roomNumber: string; 
  checkIn: string; 
  checkOut: string; 
  status: ReservationStatus;
  price: number;
  guests: number;
  onModify?: () => void;
  onCancel?: () => void;
  onAddServices?: () => void;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({ 
  roomType, 
  roomNumber, 
  checkIn, 
  checkOut, 
  status, 
  price,
  guests,
  onModify,
  onCancel,
  onAddServices
}) => {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    completed: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };
  
  const statusLabels = {
    upcoming: "Upcoming",
    active: "Active",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{roomType}</CardTitle>
            <CardDescription>Room {roomNumber}</CardDescription>
          </div>
          <Badge className={statusColors[status]}>{statusLabels[status]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{checkIn} - {checkOut}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{guests} Guests</span>
        </div>
        
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
            <BedDouble className="h-3 w-3" />
            <span>King Size</span>
          </div>
          <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
            <Wifi className="h-3 w-3" />
            <span>Free WiFi</span>
          </div>
          <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
            <Coffee className="h-3 w-3" />
            <span>Breakfast</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="text-sm font-medium">
            <span className="text-muted-foreground">Total: </span>
            <span>${price}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4 inline mr-1" />
            <span>Paid</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        {status === "upcoming" && (
          <>
            <ButtonCustom variant="outline" size="sm" className="flex-1" onClick={onModify}>
              <FileEdit className="h-4 w-4 mr-1" />
              Modify
            </ButtonCustom>
            <ButtonCustom variant="outline" size="sm" className="flex-1" onClick={onCancel}>
              <Trash2 className="h-4 w-4 mr-1" />
              Cancel
            </ButtonCustom>
          </>
        )}
        {status === "active" && (
          <ButtonCustom variant="outline" size="sm" className="flex-1" onClick={onAddServices}>
            <Plus className="h-4 w-4 mr-1" />
            Add Services
          </ButtonCustom>
        )}
      </CardFooter>
    </Card>
  );
};
