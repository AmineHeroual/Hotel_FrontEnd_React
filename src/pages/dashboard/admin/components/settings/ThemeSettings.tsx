
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Save, Palette, Monitor, Moon, Sun, Check } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  darkModeDefault: z.boolean().default(false),
  systemPreference: z.boolean().default(true),
  animationsEnabled: z.boolean().default(true),
  highContrastMode: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

type ColorTheme = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  className: string;
};

const ThemeSettings = () => {
  const [selectedColorTheme, setSelectedColorTheme] = useState("gold");
  const { toast } = useToast();
  
  const colorThemes: ColorTheme[] = [
    { name: "gold", primary: "#C8AA6E", secondary: "#3C2A1A", accent: "#F5D244", className: "theme-gold" },
    { name: "emerald", primary: "#10B981", secondary: "#064E3B", accent: "#6EE7B7", className: "theme-emerald" },
    { name: "sapphire", primary: "#3B82F6", secondary: "#1E40AF", accent: "#93C5FD", className: "theme-sapphire" },
    { name: "ruby", primary: "#EF4444", secondary: "#991B1B", accent: "#FCA5A5", className: "theme-ruby" },
    { name: "amethyst", primary: "#8B5CF6", secondary: "#5B21B6", accent: "#C4B5FD", className: "theme-amethyst" },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      darkModeDefault: localStorage.getItem("theme") === "dark",
      systemPreference: localStorage.getItem("theme-source") === "system",
      animationsEnabled: localStorage.getItem("animations-enabled") !== "false",
      highContrastMode: localStorage.getItem("high-contrast-mode") === "true",
    },
  });

  useEffect(() => {
    // Apply previously selected color theme on mount
    const savedTheme = localStorage.getItem("color-theme") || "gold";
    setSelectedColorTheme(savedTheme);
    applyColorTheme(savedTheme);
    
    // Apply dark mode if needed
    if (form.getValues("darkModeDefault") && !form.getValues("systemPreference")) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const applyColorTheme = (themeName: string) => {
    // Remove all theme classes first
    document.documentElement.classList.remove(
      "theme-gold", "theme-emerald", "theme-sapphire", "theme-ruby", "theme-amethyst"
    );
    
    // Add the selected theme class
    const theme = colorThemes.find(t => t.name === themeName);
    if (theme) {
      document.documentElement.classList.add(theme.className);
    }
  };

  const applyDarkMode = (isDark: boolean, isSystem: boolean) => {
    const root = window.document.documentElement;
    
    if (isSystem) {
      // Use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      prefersDark ? root.classList.add("dark") : root.classList.remove("dark");
      localStorage.setItem("theme-source", "system");
      localStorage.removeItem("theme");
    } else {
      // Use explicit setting
      isDark ? root.classList.add("dark") : root.classList.remove("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      localStorage.removeItem("theme-source");
    }
  };

  const onSubmit = (data: FormValues) => {
    // Apply color theme
    localStorage.setItem("color-theme", selectedColorTheme);
    applyColorTheme(selectedColorTheme);
    
    // Apply dark mode settings
    applyDarkMode(data.darkModeDefault, data.systemPreference);
    
    // Save other settings
    localStorage.setItem("animations-enabled", data.animationsEnabled.toString());
    localStorage.setItem("high-contrast-mode", data.highContrastMode.toString());
    
    // Notify the user
    toast({
      title: "Paramètres de thème enregistrés",
      description: "Vos préférences de thème ont été mises à jour avec succès."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-medium">Paramètres de thème</h3>
        <p className="text-muted-foreground">
          Personnalisez l'apparence de votre tableau de bord
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="luxury-card bg-white dark:bg-luxury-dark/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette size={20} className="text-luxury-gold" />
                Thèmes de couleurs
              </CardTitle>
              <CardDescription>
                Choisissez un thème de couleur pour votre tableau de bord d'hôtel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {colorThemes.map((theme) => (
                  <div
                    key={theme.name}
                    className={`relative cursor-pointer rounded-md p-1 ${
                      selectedColorTheme === theme.name
                        ? "ring-2 ring-luxury-gold ring-offset-2"
                        : "hover:opacity-80"
                    }`}
                    onClick={() => setSelectedColorTheme(theme.name)}
                  >
                    <div className="flex flex-col items-center p-2 rounded-md border border-luxury-gold/10">
                      <div className="flex space-x-1 mb-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.accent }}
                        />
                      </div>
                      <span className="text-sm capitalize">{theme.name}</span>
                      
                      {selectedColorTheme === theme.name && (
                        <div className="absolute top-1 right-1 bg-luxury-gold rounded-full p-0.5">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-card bg-white dark:bg-luxury-dark/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor size={20} className="text-luxury-gold" />
                Options d'affichage
              </CardTitle>
              <CardDescription>
                Configurez l'affichage du tableau de bord
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <Label className="text-lg">Mode d'apparence</Label>
                <div className="flex items-center border border-luxury-gold/20 rounded-lg p-1">
                  <button
                    type="button"
                    className={`flex items-center px-3 py-1.5 rounded ${
                      !form.watch("darkModeDefault") && !form.watch("systemPreference")
                        ? "bg-luxury-gold text-luxury-dark"
                        : "hover:bg-luxury-gold/10"
                    }`}
                    onClick={() => {
                      form.setValue("darkModeDefault", false);
                      form.setValue("systemPreference", false);
                      applyDarkMode(false, false);
                    }}
                  >
                    <Sun size={16} className="mr-2" />
                    Clair
                  </button>
                  <button
                    type="button"
                    className={`flex items-center px-3 py-1.5 rounded ${
                      form.watch("darkModeDefault") && !form.watch("systemPreference")
                        ? "bg-luxury-gold text-luxury-dark"
                        : "hover:bg-luxury-gold/10"
                    }`}
                    onClick={() => {
                      form.setValue("darkModeDefault", true);
                      form.setValue("systemPreference", false);
                      applyDarkMode(true, false);
                    }}
                  >
                    <Moon size={16} className="mr-2" />
                    Sombre
                  </button>
                  <button
                    type="button"
                    className={`flex items-center px-3 py-1.5 rounded ${
                      form.watch("systemPreference")
                        ? "bg-luxury-gold text-luxury-dark"
                        : "hover:bg-luxury-gold/10"
                    }`}
                    onClick={() => {
                      form.setValue("systemPreference", true);
                      applyDarkMode(form.getValues("darkModeDefault"), true);
                    }}
                  >
                    <Monitor size={16} className="mr-2" />
                    Système
                  </button>
                </div>
              </div>

              <FormField
                control={form.control}
                name="animationsEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Activer les animations</FormLabel>
                      <FormDescription>
                        Afficher des transitions et animations fluides dans l'interface
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
                name="highContrastMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-luxury-gold/10 p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Mode contraste élevé</FormLabel>
                      <FormDescription>
                        Augmenter le contraste pour une meilleure accessibilité
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
              <CardTitle>Aperçu</CardTitle>
              <CardDescription>
                Voyez à quoi ressemblera votre thème sélectionné
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-luxury-gold/20 rounded-md overflow-hidden">
                <div className="bg-luxury-dark/10 dark:bg-luxury-dark/80 p-4 border-b border-luxury-gold/10 flex items-center justify-between">
                  <div className="text-lg font-medium">Aperçu du tableau de bord</div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-4 flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/3">
                    <div className={`p-4 rounded-md bg-primary text-primary-foreground mb-2`}>
                      Élément primaire
                    </div>
                    <div className="p-4 rounded-md bg-muted text-muted-foreground">
                      Élément secondaire
                    </div>
                  </div>
                  <div className="w-full md:w-2/3">
                    <div className="p-4 rounded-md bg-background border border-luxury-gold/10 mb-2">
                      <h4 className="font-medium mb-2">Boîte de contenu</h4>
                      <p className="text-sm text-muted-foreground">C'est ainsi que votre contenu apparaîtra avec le thème sélectionné.</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground"
                      >
                        Bouton primaire
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-md border border-luxury-gold/20 bg-transparent"
                      >
                        Bouton secondaire
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <ButtonCustom 
              type="submit" 
              className="flex items-center gap-2"
              variant="luxury"
            >
              <Save size={16} />
              Enregistrer les paramètres de thème
            </ButtonCustom>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ThemeSettings;
