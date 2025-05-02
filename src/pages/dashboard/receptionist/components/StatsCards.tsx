
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, UsersIcon, BedIcon, ArrowRightLeftIcon, CreditCardIcon } from "lucide-react";

interface StatsCardsProps {
  totalGuests: number;
  guestsChange: number;
  availableRooms: number;
  occupancyRate: number;
  checkInsToday: number;
  checkInsChange: number;
  revenueToday: number;
  revenueChange: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalGuests,
  guestsChange,
  availableRooms,
  occupancyRate,
  checkInsToday,
  checkInsChange,
  revenueToday,
  revenueChange,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalGuests}</div>
          <p className="text-xs text-muted-foreground">
            {guestsChange > 0 ? (
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                {guestsChange}% from last week
              </span>
            ) : (
              <span className="text-red-500 inline-flex items-center">
                <ArrowDownIcon className="mr-1 h-3 w-3" />
                {Math.abs(guestsChange)}% from last week
              </span>
            )}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
          <BedIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{availableRooms}</div>
          <p className="text-xs text-muted-foreground">
            {occupancyRate}% occupancy rate
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Check-ins Today</CardTitle>
          <ArrowRightLeftIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{checkInsToday}</div>
          <p className="text-xs text-muted-foreground">
            {checkInsChange > 0 ? (
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                {checkInsChange}% from yesterday
              </span>
            ) : (
              <span className="text-red-500 inline-flex items-center">
                <ArrowDownIcon className="mr-1 h-3 w-3" />
                {Math.abs(checkInsChange)}% from yesterday
              </span>
            )}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
          <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${revenueToday.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {revenueChange > 0 ? (
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                {revenueChange}% from yesterday
              </span>
            ) : (
              <span className="text-red-500 inline-flex items-center">
                <ArrowDownIcon className="mr-1 h-3 w-3" />
                {Math.abs(revenueChange)}% from yesterday
              </span>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
