import React from "react";
import { Switch } from "@/components/ui/switch";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Save, Bell, Mail, MessageSquare } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(true),
  newReservations: z.boolean().default(true),
  cancelledReservations: z.boolean().default(true),
  paymentConfirmations: z.boolean().default(true),
  staffAlerts: z.boolean().default(true),
  maintenanceRequests: z.boolean().default(true),
  dailyReports: z.boolean().default(false),
  emailFrom: z.string().email("Please enter a valid email").optional(),
  smsFromNumber: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const NotificationSettings = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      newReservations: true,
      cancelledReservations: true,
      paymentConfirmations: true,
      staffAlerts: true,
      maintenanceRequests: true,
      dailyReports: false,
      emailFrom: "notifications@hotelmanagerium.com",
      smsFromNumber: "+1 (555) 987-6543",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Notification settings updated:", data);
    toast({
      title: "Paramètres de notification mis à jour",
      description: "Les modifications ont été enregistrées avec succès"
    });
  };
  
  const handleSendTestNotification = (type: string) => {
    toast({
      title: `Test de notification ${type} envoyé`,
      description: `Un message de test a été envoyé via le canal ${type}`
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-medium">Notification Settings</h3>
        <p className="text-muted-foreground">
          Configure how and when you receive notifications
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="luxury-card bg-white dark:bg-luxury-dark/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell size={20} className="text-luxury-gold" />
                Notification Channels
              </CardTitle>
              <CardDescription>
                Configure how notifications are delivered
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Email Notifications</FormLabel>
                      <FormDescription>
                        Receive notifications via email
                      </FormDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <ButtonCustom
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendTestNotification('email')}
                        className="ml-auto"
                      >
                        Tester
                      </ButtonCustom>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              {form.watch("emailNotifications") && (
                <div className="ml-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="emailFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sender Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} className="luxury-input" />
                        </FormControl>
                        <FormDescription>
                          The email address that will appear in the "From" field
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end gap-2">
                    <ButtonCustom
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => console.log("Secondary action")}
                      className="border-luxury-gold text-luxury-gold"
                    >
                      Configure SMTP
                    </ButtonCustom>
                    <ButtonCustom
                      type="button"
                      variant="luxury"
                      size="sm"
                      onClick={() => handleSendTestNotification('email config')}
                      className="bg-luxury-gold text-white"
                    >
                      Verify Configuration
                    </ButtonCustom>
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="smsNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                    <div className="space-y-0.5">
                      <FormLabel>SMS Notifications</FormLabel>
                      <FormDescription>
                        Receive notifications via text message
                      </FormDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <ButtonCustom
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendTestNotification('SMS')}
                        className="ml-auto"
                      >
                        Tester
                      </ButtonCustom>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              {form.watch("smsNotifications") && (
                <div className="ml-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="smsFromNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sender Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} className="luxury-input" />
                        </FormControl>
                        <FormDescription>
                          The phone number that will appear as the sender
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end gap-2">
                    <ButtonCustom
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => console.log("Secondary action")}
                      className="border-luxury-gold text-luxury-gold"
                    >
                      Configure SMS Gateway
                    </ButtonCustom>
                    <ButtonCustom
                      type="button"
                      variant="luxury"
                      size="sm"
                      onClick={() => handleSendTestNotification('SMS config')}
                      className="bg-luxury-gold text-white"
                    >
                      Verify Configuration
                    </ButtonCustom>
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="pushNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Push Notifications</FormLabel>
                      <FormDescription>
                        Receive notifications in the dashboard
                      </FormDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <ButtonCustom
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendTestNotification('push')}
                        className="ml-auto"
                      >
                        Tester
                      </ButtonCustom>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="luxury-card bg-white dark:bg-luxury-dark/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare size={20} className="text-luxury-gold" />
                Notification Events
              </CardTitle>
              <CardDescription>
                Choose which events trigger notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="newReservations"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel>New Reservations</FormLabel>
                        <FormDescription>
                          When a new reservation is made
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cancelledReservations"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Cancelled Reservations</FormLabel>
                        <FormDescription>
                          When a reservation is cancelled
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentConfirmations"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Payment Confirmations</FormLabel>
                        <FormDescription>
                          When a payment is processed
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="staffAlerts"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Staff Alerts</FormLabel>
                        <FormDescription>
                          Important staff notifications
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maintenanceRequests"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Maintenance Requests</FormLabel>
                        <FormDescription>
                          When maintenance is requested
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dailyReports"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Daily Reports</FormLabel>
                        <FormDescription>
                          Daily summary of hotel activities
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <ButtonCustom 
              type="submit" 
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-colors"
              variant="luxury"
            >
              <Save size={16} />
              Save Notification Settings
            </ButtonCustom>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NotificationSettings;
