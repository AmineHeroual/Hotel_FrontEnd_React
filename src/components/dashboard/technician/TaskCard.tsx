
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, Wrench, BedDouble } from "lucide-react";

export interface Task {
  id: number;
  title: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed";
  dueDate: string;
  category: string;
  room: string;
  description?: string;
}

interface TaskCardProps {
  task: Task;
  onTaskAction: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskAction }) => {
  const priorityColors = {
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    medium: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };
  
  const priorityLabels = {
    high: "Urgent",
    medium: "Moyen",
    low: "Faible",
  };
  
  const statusIcons = {
    pending: <Clock className="h-4 w-4 text-blue-500" />,
    in_progress: <Wrench className="h-4 w-4 text-amber-500" />,
    completed: <CheckCircle className="h-4 w-4 text-green-500" />,
  };
  
  const statusLabels = {
    pending: "Démarrer",
    in_progress: "Terminer",
    completed: "Terminé",
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-2 mt-1">
                <BedDouble className="h-4 w-4" /> Chambre {task.room} - {task.category}
              </div>
            </CardDescription>
          </div>
          <Badge className={priorityColors[task.priority]}>
            {priorityLabels[task.priority]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{task.dueDate}</span>
          </div>
          <div className="flex items-center gap-2">
            {task.status !== "completed" ? (
              <ButtonCustom size="sm" onClick={() => onTaskAction(task)}>
                {statusLabels[task.status]}
              </ButtonCustom>
            ) : (
              <div className="flex items-center gap-1">
                {statusIcons[task.status]}
                <span className="text-sm text-green-500">Terminé</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
