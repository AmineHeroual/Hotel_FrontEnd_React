
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Save, CreditCard, AtSign, Hotel, MapPin, Phone, Globe, Building, User } from "lucide-react";
import { toast } from "sonner";

const AdminSettingsPage = () => {
  const [hotelInfo, setHotelInfo] = useState({
    name: "Luxury Hotel",
    tagline: "Exceptional Comfort and Elegance",
    address: "123 Luxury Avenue, Paradise City, 12345",
    phone: "+1 (555) 123-4567",
    email: "info@luxuryhotel.com",
    website: "www.luxuryhotel.com",
    description: "Experience the epitome of luxury and comfort at our 5-star hotel. Located in the heart of Paradise City, we offer exceptional accommodations, fine dining, and personalized service to make your stay unforgettable.",
  });

  const [taxInfo, setTaxInfo] = useState({
    taxId: "TAX-123456789",
    salesTaxRate: "8.5",
    cityTax: "2.0",
    serviceFee: "10.0",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleHotelInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHotelInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleTaxInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaxInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar userRole="admin" />
      
      <div className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">Manage hotel configuration and preferences</p>
            </div>
            <ButtonCustom onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </ButtonCustom>
          </div>
        </header>
        
        <div className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="billing">Billing & Taxes</TabsTrigger>
              <TabsTrigger value="users">Users & Roles</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Hotel Information</CardTitle>
                  <CardDescription>
                    Basic information about your hotel that appears on receipts, reports, and guest communications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Hotel Name</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted">
                          <Hotel className="h-4 w-4 text-muted-foreground" />
                        </span>
                        <Input
                          id="name"
                          name="name"
                          value={hotelInfo.name}
                          onChange={handleHotelInfoChange}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        name="tagline"
                        value={hotelInfo.tagline}
                        onChange={handleHotelInfoChange}
                        placeholder="A short slogan for your hotel"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      </span>
                      <Input
                        id="address"
                        name="address"
                        value={hotelInfo.address}
                        onChange={handleHotelInfoChange}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                        </span>
                        <Input
                          id="phone"
                          name="phone"
                          value={hotelInfo.phone}
                          onChange={handleHotelInfoChange}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted">
                          <AtSign className="h-4 w-4 text-muted-foreground" />
                        </span>
                        <Input
                          id="email"
                          name="email"
                          value={hotelInfo.email}
                          onChange={handleHotelInfoChange}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        </span>
                        <Input
                          id="website"
                          name="website"
                          value={hotelInfo.website}
                          onChange={handleHotelInfoChange}
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Hotel Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={hotelInfo.description}
                      onChange={handleHotelInfoChange}
                      rows={4}
                    />
                    <p className="text-sm text-muted-foreground">
                      Brief description of your hotel that may appear on booking confirmations and welcome materials.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                  <CardDescription>
                    Information about your property and facilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="property-type">Property Type</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted">
                          <Building className="h-4 w-4 text-muted-foreground" />
                        </span>
                        <select
                          id="property-type"
                          className="flex h-10 w-full rounded-l-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option>Luxury Hotel</option>
                          <option>Boutique Hotel</option>
                          <option>Resort</option>
                          <option>Motel</option>
                          <option>Bed & Breakfast</option>
                          <option>Hostel</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="star-rating">Star Rating</Label>
                      <select
                        id="star-rating"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option>5 Stars</option>
                        <option>4 Stars</option>
                        <option>3 Stars</option>
                        <option>2 Stars</option>
                        <option>1 Star</option>
                        <option>Not Rated</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="total-rooms">Total Rooms</Label>
                      <Input
                        id="total-rooms"
                        name="totalRooms"
                        type="number"
                        defaultValue="50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="px-3 py-1">
                        Restaurant
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        Pool
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        Spa
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        Fitness Center
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        Conference Room
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        Parking
                      </Badge>
                      <Badge variant="outline" className="px-3 py-1">
                        WiFi
                      </Badge>
                      <ButtonCustom variant="ghost" size="sm">+ Add More</ButtonCustom>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4 flex justify-between">
                  <p className="text-sm text-muted-foreground">Last updated: April 5, 2023</p>
                  <ButtonCustom>Update Details</ButtonCustom>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Tax Information</CardTitle>
                  <CardDescription>
                    Configure tax rates and billing details for hotel services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="tax-id">Tax ID / Registration Number</Label>
                      <Input
                        id="tax-id"
                        name="taxId"
                        value={taxInfo.taxId}
                        onChange={handleTaxInfoChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sales-tax">Sales Tax Rate (%)</Label>
                      <Input
                        id="sales-tax"
                        name="salesTaxRate"
                        value={taxInfo.salesTaxRate}
                        onChange={handleTaxInfoChange}
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city-tax">City/Local Tax (%)</Label>
                      <Input
                        id="city-tax"
                        name="cityTax"
                        value={taxInfo.cityTax}
                        onChange={handleTaxInfoChange}
                        type="number"
                        step="0.01"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="service-fee">Service Fee (%)</Label>
                      <Input
                        id="service-fee"
                        name="serviceFee"
                        value={taxInfo.serviceFee}
                        onChange={handleTaxInfoChange}
                        type="number"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Tax Application Settings</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="tax-rooms">Apply tax to room charges</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically calculate and add tax to room bookings
                        </p>
                      </div>
                      <Switch id="tax-rooms" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="tax-food">Apply tax to food & beverage</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically calculate and add tax to restaurant and bar charges
                        </p>
                      </div>
                      <Switch id="tax-food" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="tax-services">Apply tax to additional services</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically calculate and add tax to spa and other services
                        </p>
                      </div>
                      <Switch id="tax-services" defaultChecked />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4 flex justify-between">
                  <p className="text-sm text-muted-foreground">Tax rates last updated: March 15, 2023</p>
                  <ButtonCustom>Update Tax Settings</ButtonCustom>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>
                    Configure accepted payment methods and processing options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Credit Cards</p>
                          <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, Amex, Discover</p>
                        </div>
                      </div>
                      <Switch id="cc-enabled" defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                        <div>
                          <p className="font-medium">Debit Cards</p>
                          <p className="text-sm text-muted-foreground">Accept debit card payments</p>
                        </div>
                      </div>
                      <Switch id="debit-enabled" defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                          <rect width="16" height="16" x="4" y="4" rx="2" />
                          <path d="M12 8v8" />
                          <path d="M8 12h8" />
                        </svg>
                        <div>
                          <p className="font-medium">Digital Wallets</p>
                          <p className="text-sm text-muted-foreground">Accept Apple Pay, Google Pay, etc.</p>
                        </div>
                      </div>
                      <Switch id="digital-enabled" defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                          <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
                          <path d="M17 3H7a2 2 0 0 0-2 2v3" />
                          <path d="M10 17v-4" />
                          <path d="M14 17v-2" />
                          <path d="M21 15v-3a2 2 0 0 0-2-2h-6l3-3" />
                        </svg>
                        <div>
                          <p className="font-medium">Bank Transfers</p>
                          <p className="text-sm text-muted-foreground">Accept direct bank transfers</p>
                        </div>
                      </div>
                      <Switch id="bank-enabled" />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                          <rect width="14" height="11" x="5" y="6.5" rx="2" />
                          <circle cx="16" cy="10.5" r="1" />
                          <circle cx="8" cy="10.5" r="1" />
                          <path d="M12 15.5v-2" />
                          <path d="M8 15.5v-2" />
                          <path d="M16 15.5v-2" />
                        </svg>
                        <div>
                          <p className="font-medium">Cash</p>
                          <p className="text-sm text-muted-foreground">Accept cash payments on site</p>
                        </div>
                      </div>
                      <Switch id="cash-enabled" defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Staff Management</CardTitle>
                  <CardDescription>
                    Manage hotel staff accounts and permission levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg">
                    <div className="flex justify-between items-center p-4 border-b">
                      <h3 className="font-medium">Users</h3>
                      <ButtonCustom size="sm">
                        <User className="h-4 w-4 mr-2" />
                        Add New User
                      </ButtonCustom>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted">
                            <th className="text-left px-4 py-3 font-medium text-sm">Name</th>
                            <th className="text-left px-4 py-3 font-medium text-sm">Email</th>
                            <th className="text-left px-4 py-3 font-medium text-sm">Role</th>
                            <th className="text-left px-4 py-3 font-medium text-sm">Status</th>
                            <th className="text-right px-4 py-3 font-medium text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="px-4 py-3">Alexandra Reynolds</td>
                            <td className="px-4 py-3">alex@luxuryhotel.com</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline">Admin</Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</Badge>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <ButtonCustom variant="ghost" size="sm">Edit</ButtonCustom>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3">Marcus Chen</td>
                            <td className="px-4 py-3">marcus@luxuryhotel.com</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline">Receptionist</Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</Badge>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <ButtonCustom variant="ghost" size="sm">Edit</ButtonCustom>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3">Sophia Patel</td>
                            <td className="px-4 py-3">sophia@luxuryhotel.com</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline">Receptionist</Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">On Leave</Badge>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <ButtonCustom variant="ghost" size="sm">Edit</ButtonCustom>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3">James Wilson</td>
                            <td className="px-4 py-3">james@luxuryhotel.com</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline">Technician</Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</Badge>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <ButtonCustom variant="ghost" size="sm">Edit</ButtonCustom>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">Emma Johnson</td>
                            <td className="px-4 py-3">emma@luxuryhotel.com</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline">Technician</Badge>
                            </td>
                            <td className="px-4 py-3">
                              <Badge className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</Badge>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <ButtonCustom variant="ghost" size="sm">Edit</ButtonCustom>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Roles & Permissions</CardTitle>
                  <CardDescription>
                    Configure access levels and permissions for different user roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center p-4 border-b">
                      <h3 className="font-medium">Available Roles</h3>
                      <ButtonCustom size="sm">Add New Role</ButtonCustom>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted">
                            <th className="text-left px-4 py-3 font-medium text-sm">Role</th>
                            <th className="text-left px-4 py-3 font-medium text-sm">Description</th>
                            <th className="text-left px-4 py-3 font-medium text-sm">Access Level</th>
                            <th className="text-right px-4 py-3 font-medium text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="px-4 py-3">Administrator</td>
                            <td className="px-4 py-3">Full system access and management</td>
                            <td className="px-4 py-3">
                              <Badge>Full Access</Badge>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <ButtonCustom variant="ghost" size="sm">Edit Permissions</ButtonCustom>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3">Receptionist</td>
                            <td className="px-4 py-3">Front desk and reservation management</td>
                            <td className="px-4 py-3">
                              <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Medium</Badge>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <ButtonCustom variant="ghost" size="sm">Edit Permissions</ButtonCustom>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3">Technician</td>
                            <td className="px-4 py-3">Maintenance and repair management</td>
                            <td className="px-4 py-3">
                              <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Medium</Badge>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <ButtonCustom variant="ghost" size="sm">Edit Permissions</ButtonCustom>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3">Guest</td>
                            <td className="px-4 py-3">Limited access to booking and personal information</td>
                            <td className="px-4 py-3">
                              <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">Low</Badge>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <ButtonCustom variant="ghost" size="sm">Edit Permissions</ButtonCustom>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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

export default AdminSettingsPage;
