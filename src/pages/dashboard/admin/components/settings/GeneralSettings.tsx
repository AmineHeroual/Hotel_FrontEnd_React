
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Save, Check } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

interface GeneralSettingsProps {
  onSave: () => void;
}

const formSchema = z.object({
  hotelName: z.string().min(2, "Hotel name must be at least 2 characters"),
  hotelDescription: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z.string().min(5, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a complete address"),
  checkInTime: z.string(),
  checkOutTime: z.string(),
  maintenanceMode: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const GeneralSettings = ({ onSave }: GeneralSettingsProps) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotelName: "Hotel Managerium",
      hotelDescription: "A luxury hotel management system",
      contactEmail: "info@hotelmanagerium.com",
      contactPhone: "+1 (555) 123-4567",
      address: "123 Luxury Avenue, Suite 456, New York, NY 10001",
      checkInTime: "14:00",
      checkOutTime: "11:00",
      maintenanceMode: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data);
      // You would typically save this to your backend
      setIsSaving(false);
      
      // Call the parent's onSave callback
      onSave();
      
      // Show success icon in button briefly
      form.reset(data);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-medium">General Settings</h3>
        <p className="text-muted-foreground">
          Configure general hotel information and settings
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="hotelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="luxury-input" />
                  </FormControl>
                  <FormDescription>The name of your hotel as displayed to customers</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="luxury-input" />
                  </FormControl>
                  <FormDescription>Primary contact email for notifications</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input {...field} className="luxury-input" />
                  </FormControl>
                  <FormDescription>Primary contact phone number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="checkInTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Check-in Time</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" className="luxury-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkOutTime"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Check-out Time</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" className="luxury-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} className="luxury-input" />
                </FormControl>
                <FormDescription>Full hotel address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hotelDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Description</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} className="luxury-input" />
                </FormControl>
                <FormDescription>Brief description of your hotel</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maintenanceMode"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                <div className="space-y-0.5">
                  <FormLabel>Maintenance Mode</FormLabel>
                  <FormDescription>
                    When enabled, the site will show a maintenance page to all non-admin users
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <ButtonCustom 
              type="submit" 
              className="flex items-center gap-2"
              variant="luxury"
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="animate-spin w-4 h-4 border-2 border-luxury-gold border-t-transparent rounded-full mr-2" />
              ) : (
                <Save size={16} />
              )}
              Save Settings
            </ButtonCustom>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GeneralSettings;
