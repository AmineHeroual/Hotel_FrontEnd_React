
import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ButtonCustom } from "@/components/ui/button-custom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Search, Filter, CalendarIcon, DownloadIcon, CreditCard } from "lucide-react";

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface FilterControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterMethod: string;
  setFilterMethod: (method: string) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

const PaymentFilterControls = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  filterMethod,
  setFilterMethod,
  dateRange,
  setDateRange,
}: FilterControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search payments..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 sm:w-48">
          <Select
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1 sm:w-48">
          <Select
            value={filterMethod}
            onValueChange={setFilterMethod}
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Payment method" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All methods</SelectItem>
              <SelectItem value="credit_card">Credit Card</SelectItem>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="apple_pay">Apple Pay</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <ButtonCustom
              variant="outline"
              className="w-full sm:w-auto justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Select date range</span>
              )}
            </ButtonCustom>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={{
                from: dateRange.from,
                to: dateRange.to,
              }}
              onSelect={(range) => 
                setDateRange({
                  from: range?.from,
                  to: range?.to,
                })
              }
              numberOfMonths={2}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        <ButtonCustom variant="outline" className="sm:w-auto flex-shrink-0">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export
        </ButtonCustom>
      </div>
    </div>
  );
};

export default PaymentFilterControls;
