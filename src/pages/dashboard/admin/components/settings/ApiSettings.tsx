
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Save, Key, RefreshCw, Eye, EyeOff, Copy, CheckCircle2 } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  enableApi: z.boolean().default(true),
  rateLimit: z.coerce.number().min(10).max(1000).default(100),
  logApiCalls: z.boolean().default(true),
  allowThirdPartyAccess: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const ApiSettings = () => {
  const [apiKey, setApiKey] = useState("sk_live_2023_abcdefghijklmnopqrstuvwxyz123456");
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableApi: true,
      rateLimit: 100,
      logApiCalls: true,
      allowThirdPartyAccess: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("API settings updated:", data);
    // You would typically save this to your backend
  };

  const regenerateApiKey = () => {
    // This would typically make a call to your backend to generate a new API key
    const newKey = "sk_live_" + new Date().getFullYear() + "_" + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-medium">API Settings</h3>
        <p className="text-muted-foreground">
          Manage API access and configuration
        </p>
      </div>

      <Card className="luxury-card bg-white dark:bg-luxury-dark/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key size={20} className="text-luxury-gold" />
            API Keys
          </CardTitle>
          <CardDescription>
            Manage your API keys for external integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="apiKey">Your API Key</Label>
            <div className="flex">
              <div className="relative flex-1">
                <Input 
                  id="apiKey" 
                  value={apiKey} 
                  readOnly 
                  type={showApiKey ? "text" : "password"}
                  className="luxury-input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <ButtonCustom
                type="button"
                variant="outline"
                className="ml-2 flex gap-2 items-center"
                onClick={copyApiKey}
              >
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
              </ButtonCustom>
              <ButtonCustom
                type="button"
                variant="outline"
                className="ml-2 flex gap-2 items-center"
                onClick={regenerateApiKey}
              >
                <RefreshCw size={16} />
                Regenerate
              </ButtonCustom>
            </div>
            <p className="text-sm text-muted-foreground">
              This key grants full access to your API. Keep it secure and never share it publicly.
            </p>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="luxury-card bg-white dark:bg-luxury-dark/30">
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Configure how your API operates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="enableApi"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Enable API</FormLabel>
                      <FormDescription>
                        Allow external systems to connect via API
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

              {form.watch("enableApi") && (
                <>
                  <FormField
                    control={form.control}
                    name="rateLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rate Limit (requests per minute)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="10" max="1000" className="luxury-input" />
                        </FormControl>
                        <FormDescription>
                          Maximum number of API requests allowed per minute from a single IP
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logApiCalls"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Log API Calls</FormLabel>
                          <FormDescription>
                            Keep detailed logs of all API requests
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
                    name="allowThirdPartyAccess"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Third-Party Access</FormLabel>
                          <FormDescription>
                            Allow access from third-party services and applications
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
                </>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <ButtonCustom 
              type="submit" 
              className="flex items-center gap-2"
              variant="luxury"
            >
              <Save size={16} />
              Save API Settings
            </ButtonCustom>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ApiSettings;
