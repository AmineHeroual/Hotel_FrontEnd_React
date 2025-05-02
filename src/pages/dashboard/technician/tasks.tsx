
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import { Task } from "@/components/dashboard/technician/TaskCard";
import { TaskStats } from "@/components/dashboard/technician/TaskStats";
import { NewTaskDialog } from "@/components/dashboard/technician/NewTaskDialog";
import { TaskFilters } from "@/components/dashboard/technician/TaskFilters";
import { TaskTabs } from "@/components/dashboard/technician/TaskTabs";

const TechnicianTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Remplacer les ampoules dans Chambre 203",
      priority: "medium",
      status: "pending",
      dueDate: "Aujourd'hui, 14:00",
      category: "Électrique",
      room: "203",
    },
    {
      id: 2,
      title: "Réparer le robinet qui fuit dans Chambre 105",
      priority: "high",
      status: "in_progress",
      dueDate: "Aujourd'hui, 12:30",
      category: "Plomberie",
      room: "105",
    },
    {
      id: 3,
      title: "Réparer l'unité de climatisation dans Chambre 302",
      priority: "high",
      status: "pending",
      dueDate: "Demain, 10:00",
      category: "CVC",
      room: "302",
    },
    {
      id: 4,
      title: "Remplacer le porte-serviettes dans Chambre 415",
      priority: "low",
      status: "completed",
      dueDate: "Hier",
      category: "Mobilier",
      room: "415",
    },
  ]);
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Handle task status change
  const handleTaskAction = (task: Task) => {
    if (task.status === "pending") {
      // Start task
      const updatedTasks = tasks.map(t => 
        t.id === task.id ? { ...t, status: "in_progress" as const } : t
      );
      setTasks(updatedTasks);
      toast({
        title: "Tâche démarrée",
        description: `Vous avez commencé à travailler sur "${task.title}"`,
      });
    } else if (task.status === "in_progress") {
      // Complete task
      const updatedTasks = tasks.map(t => 
        t.id === task.id ? { ...t, status: "completed" as const } : t
      );
      setTasks(updatedTasks);
      toast({
        title: "Tâche terminée",
        description: `Vous avez terminé la tâche "${task.title}"`,
      });
    }
  };
  
  // Handle create new task
  const handleCreateTask = (newTaskData: Omit<Task, "id" | "status" | "dueDate">) => {
    const newTaskObj: Task = {
      id: tasks.length + 1,
      title: newTaskData.title,
      priority: newTaskData.priority,
      status: "pending",
      dueDate: "Aujourd'hui, 14:00",
      category: newTaskData.category,
      room: newTaskData.room,
      description: newTaskData.description
    };
    
    setTasks([newTaskObj, ...tasks]);
  };

  // Filter tasks by selected date
  const filteredTasks = selectedDate 
    ? tasks.filter(task => task.dueDate.includes(selectedDate))
    : tasks;

  return (
    <div className="flex min-h-screen">
      <Sidebar userRole="technician" />
      
      <div className="flex-1">
        <div className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Gestion des Tâches</h1>
            <NewTaskDialog 
              open={false} 
              onOpenChange={() => {}} 
              onAddTask={handleCreateTask} 
            />
          </div>
          
          <TaskStats tasks={filteredTasks} />
          
          <TaskFilters 
            selectedDate={selectedDate}
            onDateFilterChange={setSelectedDate}
          />
          
          <TaskTabs 
            tasks={filteredTasks} 
            onTaskAction={handleTaskAction} 
          />
        </div>
      </div>
    </div>
  );
};

export default TechnicianTasks;
