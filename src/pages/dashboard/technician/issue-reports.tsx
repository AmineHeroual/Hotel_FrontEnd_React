
import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, FileText } from "lucide-react";

const IssueReportsPage = () => {
  const reports = [
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

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole="technician" />
      
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Rapports d'incidents</h1>
            <p className="text-muted-foreground">Gérez et suivez tous les rapports d'incidents</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tous les rapports</CardTitle>
            <CardDescription>Liste complète des rapports d'incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date de création</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{report.description}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      {new Date(report.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IssueReportsPage;
