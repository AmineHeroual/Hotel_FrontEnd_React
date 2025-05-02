
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

interface TaskFiltersProps {
  onDateFilterChange: (date: string | null) => void;
  selectedDate: string | null;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ onDateFilterChange, selectedDate }) => {
  const [showDateFilter, setShowDateFilter] = useState(false);

  return (
    <div className="flex items-center gap-2 mb-4">
      <Popover open={showDateFilter} onOpenChange={setShowDateFilter}>
        <PopoverTrigger asChild>
          <ButtonCustom variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtrer par date
          </ButtonCustom>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <h4 className="font-medium">Filtrer par date</h4>
            <div className="space-y-2">
              <ButtonCustom 
                variant="outline" 
                size="sm" 
                className="w-full justify-start" 
                onClick={() => {
                  onDateFilterChange("Aujourd'hui");
                  setShowDateFilter(false);
                }}
              >
                Aujourd'hui
              </ButtonCustom>
              <ButtonCustom 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => {
                  onDateFilterChange("Demain");
                  setShowDateFilter(false);
                }}
              >
                Demain
              </ButtonCustom>
              <ButtonCustom 
                variant="outline" 
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  onDateFilterChange(null);
                  setShowDateFilter(false);
                }}
              >
                Toutes les dates
              </ButtonCustom>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {selectedDate && (
        <Badge variant="outline" className="flex gap-1 items-center">
          {selectedDate}
          <ButtonCustom 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 p-0" 
            onClick={() => onDateFilterChange(null)}
          >
            <span className="sr-only">Effacer le filtre</span>
            ×
          </ButtonCustom>
        </Badge>
      )}
    </div>
  );
};
