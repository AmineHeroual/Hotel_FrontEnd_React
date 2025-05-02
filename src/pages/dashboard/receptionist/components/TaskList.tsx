
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueTime?: string;
}

export interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskToggle }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-orange-500";
      case "low":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Tasks</CardTitle>
        <CardDescription>Your pending tasks for today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-start p-3 rounded-md",
                task.completed
                  ? "bg-muted/50 text-muted-foreground"
                  : "bg-muted"
              )}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onTaskToggle(task.id)}
                className="mt-0.5"
              />
              <div className="ml-3 flex-1">
                <p
                  className={cn(
                    "text-sm font-medium",
                    task.completed && "line-through"
                  )}
                >
                  {task.title}
                </p>
                {task.dueTime && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Due by {task.dueTime}
                  </p>
                )}
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "ml-2",
                  getPriorityColor(task.priority)
                )}
              >
                {task.priority}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
