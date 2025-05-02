
import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, Mail, Phone, MapPin, Shield, Bell } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

const ClientProfile = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar userRole="client" />
      
      <div className="flex-1">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
          
          <Tabs defaultValue="personal">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Main Street" />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="New York" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" defaultValue="NY" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="zip">Zip code</Label>
                      <Input id="zip" defaultValue="10001" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="us">
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end">
                    <ButtonCustom>Save Changes</ButtonCustom>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Room Preferences</CardTitle>
                  <CardDescription>Customize your stay preferences for future bookings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="roomType">Preferred Room Type</Label>
                    <Select defaultValue="deluxe">
                      <SelectTrigger id="roomType">
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Room</SelectItem>
                        <SelectItem value="deluxe">Deluxe Room</SelectItem>
                        <SelectItem value="executive">Executive Suite</SelectItem>
                        <SelectItem value="presidential">Presidential Suite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bedType">Preferred Bed Type</Label>
                    <Select defaultValue="king">
                      <SelectTrigger id="bedType">
                        <SelectValue placeholder="Select bed type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twin">Twin Beds</SelectItem>
                        <SelectItem value="queen">Queen Size</SelectItem>
                        <SelectItem value="king">King Size</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="floorPreference">Floor Preference</Label>
                    <Select defaultValue="high">
                      <SelectTrigger id="floorPreference">
                        <SelectValue placeholder="Select floor preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Lower Floor</SelectItem>
                        <SelectItem value="middle">Middle Floor</SelectItem>
                        <SelectItem value="high">Higher Floor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end">
                    <ButtonCustom>Save Preferences</ButtonCustom>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <ButtonCustom>Update Password</ButtonCustom>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage your notification settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive booking confirmations and updates</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive text messages for important updates</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Marketing Communications</Label>
                        <p className="text-sm text-muted-foreground">Receive promotions and special offers</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <ButtonCustom>Save Preferences</ButtonCustom>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
