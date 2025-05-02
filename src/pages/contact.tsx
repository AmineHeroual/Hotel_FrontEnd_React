
import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent. We'll get back to you soon!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero section */}
      <div className="relative h-[40vh] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl">
            We're here to help and answer any questions you may have
          </p>
        </div>
      </div>
      
      {/* Contact section */}
      <div className="container mx-auto py-16 px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you have a question about our rooms, services, or anything else, our team is ready to answer all your questions
          </p>
          <Separator className="mt-8 max-w-md mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reservation">Reservation Inquiry</SelectItem>
                      <SelectItem value="services">Services Information</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="complaint">Complaint</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} required />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Our Location</h4>
                    <p className="text-muted-foreground">
                      123 Luxury Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-muted-foreground">
                      Reservations: +1 (555) 123-4567<br />
                      Front Desk: +1 (555) 123-4568<br />
                      Customer Service: +1 (555) 123-4569
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground">
                      Reservations: reservations@hotelmanagerium.com<br />
                      Info: info@hotelmanagerium.com<br />
                      Support: support@hotelmanagerium.com
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Hours</h4>
                    <p className="text-muted-foreground">
                      Front Desk: 24/7<br />
                      Reservations: 8:00 AM - 10:00 PM<br />
                      Customer Service: 8:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Google Map */}
            <div className="w-full h-80 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <div className="text-center">
                  <h3 className="font-medium mb-2">Interactive Map</h3>
                  <p className="text-sm text-muted-foreground">
                    Map will be displayed here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ section */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
            <p className="text-muted-foreground mt-2">
              Answers to commonly asked questions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>What are your check-in and check-out times?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out can be arranged for an additional fee, subject to availability.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Do you offer airport transfers?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Yes, we offer airport pickup and drop-off services for an additional fee. Please contact our front desk at least 24 hours in advance to arrange transportation.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Is breakfast included in the room rate?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Breakfast is included in some of our packages. Please check the details of your reservation or contact our reservations team to add a breakfast package to your stay.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Do you have parking facilities?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Yes, we offer both self-parking and valet parking options. Self-parking is available at $25 per day, while valet parking is $35 per day with in and out privileges.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
