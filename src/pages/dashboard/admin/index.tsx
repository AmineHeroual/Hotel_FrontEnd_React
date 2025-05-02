
import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonCustom } from "@/components/ui/button-custom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, BedDouble, Banknote, Calendar, ChevronUp, ChevronDown, ArrowUpRight, HelpCircle } from "lucide-react";

const data = [
  { name: "Jan", bookings: 65 },
  { name: "Feb", bookings: 59 },
  { name: "Mar", bookings: 80 },
  { name: "Apr", bookings: 81 },
  { name: "May", bookings: 56 },
  { name: "Jun", bookings: 55 },
  { name: "Jul", bookings: 72 },
];

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar userRole="admin" />
      
      <div className="flex-1">
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <ButtonCustom variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                June 2023
              </ButtonCustom>
              <ButtonCustom size="sm">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Export
              </ButtonCustom>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <div className="flex items-center text-xs text-green-500 font-medium mt-1">
                      <ChevronUp className="h-3 w-3 mr-1" />
                      <span>+20.1% from last month</span>
                    </div>
                  </div>
                  <Banknote className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Room Occupancy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">72%</div>
                    <div className="flex items-center text-xs text-green-500 font-medium mt-1">
                      <ChevronUp className="h-3 w-3 mr-1" />
                      <span>+5% from last month</span>
                    </div>
                  </div>
                  <BedDouble className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">New Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">142</div>
                    <div className="flex items-center text-xs text-red-500 font-medium mt-1">
                      <ChevronDown className="h-3 w-3 mr-1" />
                      <span>-3.2% from last month</span>
                    </div>
                  </div>
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">573</div>
                    <div className="flex items-center text-xs text-green-500 font-medium mt-1">
                      <ChevronUp className="h-3 w-3 mr-1" />
                      <span>+12% from last month</span>
                    </div>
                  </div>
                  <Users className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Booking Overview</CardTitle>
                <CardDescription>Booking trends for the past 7 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest bookings and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <BedDouble className="h-5 w-5 text-primary" />
                      </div>
                      <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900" />
                    </div>
                    <div>
                      <p className="font-medium">New Booking</p>
                      <p className="text-sm text-muted-foreground">John Smith booked Room 304 for 5 nights</p>
                      <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900" />
                    </div>
                    <div>
                      <p className="font-medium">New User</p>
                      <p className="text-sm text-muted-foreground">Emma Johnson created an account</p>
                      <p className="text-xs text-muted-foreground mt-1">25 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-orange-500 border-2 border-white dark:border-gray-900" />
                    </div>
                    <div>
                      <p className="font-medium">Booking Modified</p>
                      <p className="text-sm text-muted-foreground">Room 201 booking was modified</p>
                      <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Banknote className="h-5 w-5 text-primary" />
                      </div>
                      <div className="absolute top-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900" />
                    </div>
                    <div>
                      <p className="font-medium">Payment Received</p>
                      <p className="text-sm text-muted-foreground">$850.00 payment for Room 505</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
