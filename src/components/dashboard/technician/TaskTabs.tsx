
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Task, TaskCard } from "./TaskCard";

interface TaskTabsProps {
  tasks: Task[];
  onTaskAction: (task: Task) => void;
}

export const TaskTabs: React.FC<TaskTabsProps> = ({ tasks, onTaskAction }) => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all">Toutes les tâches</TabsTrigger>
        <TabsTrigger value="pending">En attente</TabsTrigger>
        <TabsTrigger value="in_progress">En cours</TabsTrigger>
        <TabsTrigger value="completed">Terminées</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onTaskAction={onTaskAction} />
        ))}
        {tasks.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            Aucune tâche trouvée pour cette date
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="pending">
        {tasks
          .filter((task) => task.status === "pending")
          .map((task) => (
            <TaskCard key={task.id} task={task} onTaskAction={onTaskAction} />
          ))}
        {tasks.filter(task => task.status === "pending").length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            Aucune tâche en attente trouvée
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="in_progress">
        {tasks
          .filter((task) => task.status === "in_progress")
          .map((task) => (
            <TaskCard key={task.id} task={task} onTaskAction={onTaskAction} />
          ))}
        {tasks.filter(task => task.status === "in_progress").length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            Aucune tâche en cours trouvée
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="completed">
        {tasks
          .filter((task) => task.status === "completed")
          .map((task) => (
            <TaskCard key={task.id} task={task} onTaskAction={onTaskAction} />
          ))}
        {tasks.filter(task => task.status === "completed").length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            Aucune tâche terminée trouvée
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
