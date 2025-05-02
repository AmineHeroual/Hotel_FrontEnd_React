
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Save, ShieldCheck, Key, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  twoFactorAuth: z.boolean().default(false),
  passwordExpiry: z.boolean().default(false),
  passwordHistory: z.boolean().default(false),
  apiLogging: z.boolean().default(true),
  failedLoginAttempts: z.coerce.number().min(1).max(10).default(5),
  sessionTimeout: z.coerce.number().min(5).max(120).default(30),
});

type FormValues = z.infer<typeof formSchema>;

const SecuritySettings = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      twoFactorAuth: false,
      passwordExpiry: true,
      passwordHistory: true,
      apiLogging: true,
      failedLoginAttempts: 5,
      sessionTimeout: 30,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Security settings updated:", data);
    toast({
      title: "Paramètres de sécurité mis à jour",
      description: "Les modifications ont été enregistrées avec succès"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-medium">Security Settings</h3>
        <p className="text-muted-foreground">
          Configure security options for your hotel management system
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="luxury-card bg-white dark:bg-luxury-dark/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-luxury-gold" />
                Authentication Settings
              </CardTitle>
              <CardDescription>
                Configure how users authenticate with your system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="twoFactorAuth"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Two-Factor Authentication</FormLabel>
                      <FormDescription>
                        Require staff to use a second authentication method
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="failedLoginAttempts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Failed Login Attempts</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="1" max="10" className="luxury-input" />
                      </FormControl>
                      <FormDescription>
                        Number of failed attempts before account is locked
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sessionTimeout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Timeout (minutes)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min="5" max="120" className="luxury-input" />
                      </FormControl>
                      <FormDescription>
                        How long until an inactive session expires
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-card bg-white dark:bg-luxury-dark/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key size={20} className="text-luxury-gold" />
                Password Policy
              </CardTitle>
              <CardDescription>
                Configure password requirements and expiration policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="passwordExpiry"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Password Expiration</FormLabel>
                      <FormDescription>
                        Force password changes every 90 days
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
                name="passwordHistory"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Password History</FormLabel>
                      <FormDescription>
                        Prevent reuse of the last 5 passwords
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
            </CardContent>
          </Card>

          <Card className="luxury-card bg-white dark:bg-luxury-dark/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCcw size={20} className="text-luxury-gold" />
                API & Logging
              </CardTitle>
              <CardDescription>
                Configure API security and system logging options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="apiLogging"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                    <div className="space-y-0.5">
                      <FormLabel>API Access Logging</FormLabel>
                      <FormDescription>
                        Track all API calls and access attempts
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
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <ButtonCustom 
              type="submit" 
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-colors"
              variant="luxury"
            >
              <Save size={16} />
              Save Security Settings
            </ButtonCustom>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SecuritySettings;
