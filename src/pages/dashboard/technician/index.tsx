import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  BedDouble, 
  Calendar, 
  ClipboardCheck, 
  ArrowRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TechnicianDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const issueReports = [
    {
      id: 1,
      title: "Climatisation en panne dans Chambre 304",
      description: "L'unité de climatisation ne refroidit pas correctement et la température de la chambre est très élevée.",
      priority: "high",
      status: "open",
      createdAt: "2024-04-18T09:30:00",
    },
    {
      id: 2,
      title: "Robinet qui fuit dans Chambre 201",
      description: "Le robinet de la salle de bain fuit et doit être réparé.",
      priority: "medium",
      status: "in_progress",
      createdAt: "2024-04-18T10:15:00",
    },
    {
      id: 3,
      title: "Ampoules à remplacer dans Chambre 105",
      description: "Deux ampoules dans la pièce principale doivent être remplacées.",
      priority: "low",
      status: "resolved",
      createdAt: "2024-04-18T11:45:00",
    }
  ];

  const handleStartTask = (taskTitle) => {
    toast({
      title: "Tâche démarrée",
      description: `Vous avez commencé la tâche: ${taskTitle}`,
    });
  };

  const viewAllTasks = () => {
    navigate("/dashboard/technician/tasks");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole="technician" />
      
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Tableau de bord technicien</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total des tâches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">24</div>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tâches en attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">8</div>
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Terminées aujourd'hui</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">5</div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tâches urgentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">3</div>
                <AlertTriangle className="h-5 w-5 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Issue Reports Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Rapports d'incidents</CardTitle>
                  <CardDescription>Derniers rapports d'incidents signalés</CardDescription>
                </div>
                <ButtonCustom variant="outline" onClick={() => navigate('/dashboard/technician/reports')}>
                  Voir tous les rapports
                  <ArrowRight className="ml-2 h-4 w-4" />
                </ButtonCustom>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issueReports.map((report) => (
                  <div key={report.id} className="bg-muted p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{report.title}</h3>
                          <Badge
                            className={
                              report.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                              report.priority === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' :
                              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            }
                          >
                            {report.priority === 'high' ? 'Urgent' :
                             report.priority === 'medium' ? 'Moyen' : 'Faible'}
                          </Badge>
                          <Badge
                            className={
                              report.status === 'open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                              report.status === 'in_progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' :
                              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            }
                          >
                            {report.status === 'open' ? 'Ouvert' :
                             report.status === 'in_progress' ? 'En cours' : 'Résolu'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {report.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {new Date(report.createdAt).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tasks Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Résumé des tâches du jour</CardTitle>
              <CardDescription>Votre programme de maintenance pour aujourd'hui</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Statut des tâches</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm">Terminées</span>
                      </div>
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm">En cours</span>
                      </div>
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">En attente</span>
                      </div>
                      <span className="text-sm font-medium">8</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Répartition par priorité</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span className="text-sm">Urgent</span>
                      </div>
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                        <span className="text-sm">Moyen</span>
                      </div>
                      <span className="text-sm font-medium">6</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">Faible</span>
                      </div>
                      <span className="text-sm font-medium">6</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Activités récentes</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Douche réparée dans Chambre 402</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Télécommande TV remplacée dans Chambre 205</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Serrure réparée dans Chambre 308</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <ButtonCustom variant="outline" className="w-full" onClick={viewAllTasks}>
                    <ClipboardCheck className="h-4 w-4 mr-2" />
                    Voir la liste complète des tâches
                  </ButtonCustom>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
