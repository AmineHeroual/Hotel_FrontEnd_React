
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  BarChart3, 
  AreaChart,
  PieChart,
  Calendar,
  Filter,
  Clock,
  CheckCircle,
  Wrench,
  AlertTriangle
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RechartsPieChart, Pie, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const TechnicianReports = () => {
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState("");
  const { toast } = useToast();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Sample data for charts
  const maintenanceByType = [
    { name: "Plomberie", value: 35, fill: "#2563eb" },
    { name: "Électrique", value: 25, fill: "#16a34a" },
    { name: "CVC", value: 20, fill: "#ea580c" },
    { name: "Mobilier", value: 15, fill: "#9333ea" },
    { name: "Autre", value: 5, fill: "#94a3b8" },
  ];
  
  const weeklyTasksData = [
    { day: "Lun", completed: 8, pending: 2 },
    { day: "Mar", completed: 6, pending: 3 },
    { day: "Mer", completed: 7, pending: 1 },
    { day: "Jeu", completed: 9, pending: 2 },
    { day: "Ven", completed: 5, pending: 4 },
    { day: "Sam", completed: 4, pending: 1 },
    { day: "Dim", completed: 3, pending: 0 },
  ];
  
  const recentReports = [
    {
      id: "RPT-2023-001",
      title: "Résumé de maintenance mensuel",
      date: "2024-04-01",
      description: "Résumé de toutes les tâches de maintenance terminées en mars",
      type: "monthly",
      status: "completed",
    },
    {
      id: "RPT-2023-002",
      title: "Rapport d'inspection du système CVC",
      date: "2024-03-25",
      description: "Inspection détaillée des systèmes CVC à tous les étages",
      type: "technical",
      status: "completed",
    },
    {
      id: "RPT-2023-003",
      title: "Rapport d'état des chambres",
      date: "2024-03-20",
      description: "Rapport d'état sur la maintenance et la disponibilité des chambres",
      type: "operational",
      status: "completed",
    },
    {
      id: "RPT-2023-004",
      title: "Audit trimestriel des équipements",
      date: "2024-03-15",
      description: "Audit de tous les équipements et fournitures de maintenance",
      type: "inventory",
      status: "pending",
    },
    {
      id: "RPT-2023-005",
      title: "Calendrier de maintenance préventive",
      date: "2024-03-10",
      description: "Tâches de maintenance préventive à venir pour Q2",
      type: "planning",
      status: "pending",
    },
  ];
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { month: "short", day: "numeric", year: "numeric" });
  };
  
  const getReportTypeBadge = (type) => {
    switch (type) {
      case "monthly":
        return <Badge className="bg-blue-100 text-blue-800">Mensuel</Badge>;
      case "technical":
        return <Badge className="bg-amber-100 text-amber-800">Technique</Badge>;
      case "operational":
        return <Badge className="bg-green-100 text-green-800">Opérationnel</Badge>;
      case "inventory":
        return <Badge className="bg-purple-100 text-purple-800">Inventaire</Badge>;
      case "planning":
        return <Badge className="bg-cyan-100 text-cyan-800">Planification</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Terminé</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">En attente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleGenerateReport = () => {
    if (!selectedReportType) {
      toast({
        title: "Type de rapport manquant",
        description: "Veuillez sélectionner un type de rapport",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Rapport en cours de génération",
      description: "Votre rapport sera disponible dans quelques instants"
    });
    
    // Simulate a delay for report generation
    setTimeout(() => {
      toast({
        title: "Rapport généré avec succès",
        description: "Votre rapport est maintenant disponible pour consultation"
      });
      setIsGenerateDialogOpen(false);
    }, 2000);
  };
  
  const handleCardGenerateReport = (title) => {
    setSelectedReportType(title);
    toast({
      title: "Rapport en cours de génération",
      description: `Le rapport "${title}" sera disponible dans quelques instants`
    });
    
    // Simulate a delay for report generation
    setTimeout(() => {
      toast({
        title: "Rapport généré avec succès",
        description: `Le rapport "${title}" est maintenant disponible pour consultation`
      });
    }, 2000);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole="technician" />
      
      <div className="flex-1">
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Rapports de maintenance</h1>
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="flex gap-2 mb-4 md:mb-0">
              <Popover>
                <PopoverTrigger asChild>
                  <ButtonCustom variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Plage de dates
                  </ButtonCustom>
                </PopoverTrigger>
                <PopoverContent className="p-4 w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Sélectionner une plage de dates</h4>
                    <div className="grid gap-2">
                      <Label htmlFor="start-date">Date de début</Label>
                      <Input 
                        id="start-date" 
                        type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end-date">Date de fin</Label>
                      <Input 
                        id="end-date" 
                        type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <ButtonCustom 
                      className="w-full" 
                      onClick={() => {
                        if (startDate && endDate) {
                          toast({
                            title: "Plage de dates sélectionnée",
                            description: `Du ${startDate} au ${endDate}`
                          });
                        }
                      }}
                    >
                      Appliquer
                    </ButtonCustom>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type de rapport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="monthly">Mensuel</SelectItem>
                  <SelectItem value="technical">Technique</SelectItem>
                  <SelectItem value="operational">Opérationnel</SelectItem>
                  <SelectItem value="inventory">Inventaire</SelectItem>
                  <SelectItem value="planning">Planification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
              <DialogTrigger asChild>
                <ButtonCustom>
                  <FileText className="h-4 w-4 mr-2" />
                  Générer un nouveau rapport
                </ButtonCustom>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Générer un nouveau rapport</DialogTitle>
                  <DialogDescription>
                    Sélectionnez le type de rapport et la période pour générer un nouveau rapport.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="report-type">Type de rapport</Label>
                    <Select 
                      value={selectedReportType} 
                      onValueChange={setSelectedReportType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maintenance-summary">Résumé de maintenance</SelectItem>
                        <SelectItem value="equipment-status">État des équipements</SelectItem>
                        <SelectItem value="staff-performance">Performance du personnel</SelectItem>
                        <SelectItem value="cost-analysis">Analyse des coûts</SelectItem>
                        <SelectItem value="trends-analysis">Analyse des tendances</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="start-date-dialog">Date de début</Label>
                      <Input id="start-date-dialog" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end-date-dialog">Date de fin</Label>
                      <Input id="end-date-dialog" type="date" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Notes supplémentaires</Label>
                    <Textarea id="description" placeholder="Ajoutez des notes ou des instructions spécifiques..." />
                  </div>
                </div>
                <div className="flex justify-end">
                  <ButtonCustom onClick={handleGenerateReport}>Générer le rapport</ButtonCustom>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Aperçu</TabsTrigger>
              <TabsTrigger value="recent">Rapports récents</TabsTrigger>
              <TabsTrigger value="generate">Générer des rapports</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tâches de maintenance par catégorie</CardTitle>
                    <CardDescription>Distribution des tâches de maintenance effectuées ce mois</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={maintenanceByType}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {maintenanceByType.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} tâches`, 'Nombre']} />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Achèvement des tâches hebdomadaires</CardTitle>
                    <CardDescription>Tâches terminées vs en attente la semaine dernière</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={weeklyTasksData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="completed" name="Terminé" fill="#16a34a" />
                          <Bar dataKey="pending" name="En attente" fill="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Résumé de l'achèvement des tâches</CardTitle>
                    <CardDescription>Aperçu de l'état des tâches de maintenance et de l'efficacité</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Total des tâches</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">124</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Terminées</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center">
                            <div className="text-2xl font-bold">98</div>
                            <Badge className="ml-2 bg-green-100 text-green-800">79%</Badge>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Temps moyen de résolution</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">3,2h</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">Jour de pointe</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">Jeudi</div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="recent">
              <Card>
                <CardHeader>
                  <CardTitle>Rapports récents</CardTitle>
                  <CardDescription>Accédez et téléchargez vos rapports de maintenance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID du rapport</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{report.title}</div>
                              <div className="text-xs text-muted-foreground">{report.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(report.date)}</TableCell>
                          <TableCell>{getReportTypeBadge(report.type)}</TableCell>
                          <TableCell>{getStatusBadge(report.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <ButtonCustom variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-1" />
                                Voir
                              </ButtonCustom>
                              <ButtonCustom variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </ButtonCustom>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="generate">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-center rounded-full bg-blue-100 w-12 h-12 mb-4">
                      <BarChart3 className="h-6 w-6 text-blue-700" />
                    </div>
                    <CardTitle>Résumé de maintenance</CardTitle>
                    <CardDescription>Générer un rapport récapitulatif de toutes les activités de maintenance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-6">
                      Comprend le nombre de tâches, les taux d'achèvement, les temps moyens de résolution et les problèmes courants.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <ButtonCustom className="w-full" onClick={() => handleCardGenerateReport("Résumé de maintenance")}>
                      Générer le rapport
                    </ButtonCustom>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-center rounded-full bg-green-100 w-12 h-12 mb-4">
                      <Wrench className="h-6 w-6 text-green-700" />
                    </div>
                    <CardTitle>État des équipements</CardTitle>
                    <CardDescription>Rapport sur l'état des équipements et installations de l'hôtel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-6">
                      Inventaire de l'état des équipements, historique de maintenance et recommandations de remplacement.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <ButtonCustom className="w-full" onClick={() => handleCardGenerateReport("État des équipements")}>
                      Générer le rapport
                    </ButtonCustom>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-center rounded-full bg-amber-100 w-12 h-12 mb-4">
                      <Clock className="h-6 w-6 text-amber-700" />
                    </div>
                    <CardTitle>Performance du personnel</CardTitle>
                    <CardDescription>Rapport sur les indicateurs de performance du personnel de maintenance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-6">
                      Taux d'achèvement des tâches, temps moyens de résolution et évaluations de qualité par membre du personnel.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <ButtonCustom className="w-full" onClick={() => handleCardGenerateReport("Performance du personnel")}>
                      Générer le rapport
                    </ButtonCustom>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-center rounded-full bg-purple-100 w-12 h-12 mb-4">
                      <PieChart className="h-6 w-6 text-purple-700" />
                    </div>
                    <CardTitle>Analyse des coûts</CardTitle>
                    <CardDescription>Rapport financier sur les dépenses de maintenance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-6">
                      Répartition des coûts de maintenance par catégorie, par chambre et comparaison au budget.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <ButtonCustom className="w-full" onClick={() => handleCardGenerateReport("Analyse des coûts")}>
                      Générer le rapport
                    </ButtonCustom>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-center rounded-full bg-cyan-100 w-12 h-12 mb-4">
                      <AreaChart className="h-6 w-6 text-cyan-700" />
                    </div>
                    <CardTitle>Analyse des tendances</CardTitle>
                    <CardDescription>Rapport sur les modèles et tendances de maintenance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-6">
                      Identifier les problèmes récurrents, les modèles saisonniers et les opportunités de maintenance préventive.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <ButtonCustom className="w-full" onClick={() => handleCardGenerateReport("Analyse des tendances")}>
                      Générer le rapport
                    </ButtonCustom>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-center rounded-full bg-red-100 w-12 h-12 mb-4">
                      <AlertTriangle className="h-6 w-6 text-red-700" />
                    </div>
                    <CardTitle>Rapport d'incident</CardTitle>
                    <CardDescription>Rapport sur les incidents liés à la maintenance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-6">
                      Documentation des problèmes de maintenance importants, résolutions et mesures préventives.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <ButtonCustom className="w-full" onClick={() => handleCardGenerateReport("Rapport d'incident")}>
                      Générer le rapport
                    </ButtonCustom>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TechnicianReports;
