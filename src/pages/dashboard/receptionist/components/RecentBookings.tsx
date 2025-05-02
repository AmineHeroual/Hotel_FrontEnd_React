
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Booking = {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: "confirmed" | "checked-in" | "checked-out" | "cancelled";
};

interface RecentBookingsProps {
  bookings: Booking[];
  className?: string;
}

const getStatusBadge = (status: Booking['status']) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Confirmed</Badge>;
    case "checked-in":
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Checked In</Badge>;
    case "checked-out":
      return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Checked Out</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Cancelled</Badge>;
    default:
      return null;
  }
};

export const RecentBookings: React.FC<RecentBookingsProps> = ({ bookings, className }) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>Overview of the latest guest bookings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-9 w-9">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    {booking.guestName.charAt(0)}
                  </div>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{booking.guestName}</p>
                  <p className="text-sm text-muted-foreground">Room {booking.roomNumber}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-right">
                  <p className="font-medium leading-none">{booking.checkIn}</p>
                  <p className="text-muted-foreground">to {booking.checkOut}</p>
                </div>
                {getStatusBadge(booking.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
