
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Task } from "@/types";
import { Plus } from "lucide-react";

interface NewTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: Omit<Task, "id" | "status" | "dueDate">) => void;
}

export function NewTaskDialog({ open, onOpenChange, onAddTask }: NewTaskDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [category, setCategory] = useState("");
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask({
      title,
      priority,
      category,
      room,
      description,
    });
    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setTitle("");
    setPriority("medium");
    setCategory("");
    setRoom("");
    setDescription("");
  };

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Nouvelle Tâche
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Créer une Nouvelle Tâche</DialogTitle>
            <DialogDescription>
              Ajoutez les détails de la tâche à effectuer.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de la Tâche</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Remplacer les ampoules"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priorité</Label>
              <Select
                value={priority}
                onValueChange={(val: "high" | "medium" | "low") => setPriority(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Haute</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="low">Basse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Input
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Ex: Électrique"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Chambre/Localisation</Label>
                <Input
                  id="room"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="Ex: 205"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optionnel)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez la tâche en détail"
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">Créer la Tâche</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
