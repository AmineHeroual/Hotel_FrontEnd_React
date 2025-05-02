
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Printer, Download, X } from "lucide-react";
import { toast } from "sonner";

interface RoomOccupancyReportProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoomOccupancyReport: React.FC<RoomOccupancyReportProps> = ({ isOpen, onClose }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock data for room occupancy
  const roomOccupancy = [
    { roomNumber: "101", type: "Standard", status: "Occupied", guest: "John Smith", checkIn: "2023-04-10", checkOut: "2023-04-15" },
    { roomNumber: "102", type: "Standard", status: "Available", guest: "", checkIn: "", checkOut: "" },
    { roomNumber: "201", type: "Deluxe", status: "Occupied", guest: "Sarah Johnson", checkIn: "2023-04-12", checkOut: "2023-04-18" },
    { roomNumber: "202", type: "Deluxe", status: "Reserved", guest: "Michael Brown", checkIn: "2023-04-20", checkOut: "2023-04-25" },
    { roomNumber: "301", type: "Suite", status: "Maintenance", guest: "", checkIn: "", checkOut: "" },
    { roomNumber: "302", type: "Suite", status: "Available", guest: "", checkIn: "", checkOut: "" },
  ];

  const occupancyRate = ((roomOccupancy.filter(room => room.status === "Occupied").length / roomOccupancy.length) * 100).toFixed(1);
  const reservationRate = ((roomOccupancy.filter(room => room.status === "Reserved").length / roomOccupancy.length) * 100).toFixed(1);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setIsGenerating(true);
    // Simulate download delay
    setTimeout(() => {
      toast.success("Report downloaded successfully");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto print:max-w-none print:overflow-visible">
        <DialogHeader>
          <div className="flex items-center justify-between w-full print:hidden">
            <DialogTitle>Room Occupancy Report</DialogTitle>
            <div className="flex items-center gap-2">
              <ButtonCustom variant="outline" size="sm" onClick={handlePrint} disabled={isGenerating}>
                <Printer className="h-4 w-4 mr-1" />
                Print
              </ButtonCustom>
              <ButtonCustom variant="outline" size="sm" onClick={handleDownload} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <span className="animate-spin mr-1">⏳</span>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-1" />
                    Download PDF
                  </>
                )}
              </ButtonCustom>
              <ButtonCustom variant="ghost" size="sm" onClick={onClose} className="print:hidden">
                <X className="h-4 w-4" />
              </ButtonCustom>
            </div>
          </div>
          <DialogDescription className="print:hidden">
            View and analyze current room occupancy data
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 print:grid-cols-4">
          <div className="print:hidden lg:col-span-1">
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-3">Select Date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </Card>
          </div>

          <div className="lg:col-span-3 print:col-span-4">
            <div className="print:text-center print:mb-4 hidden print:block">
              <h1 className="text-2xl font-bold">Room Occupancy Report</h1>
              <p className="text-gray-600">Date: {date?.toLocaleDateString()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                <h3 className="text-sm font-medium mb-1">Occupancy Rate</h3>
                <p className="text-2xl font-bold">{occupancyRate}%</p>
              </Card>
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                <h3 className="text-sm font-medium mb-1">Reservation Rate</h3>
                <p className="text-2xl font-bold">{reservationRate}%</p>
              </Card>
              <Card className="p-4 bg-amber-50 dark:bg-amber-900/20">
                <h3 className="text-sm font-medium mb-1">Available Rooms</h3>
                <p className="text-2xl font-bold">
                  {roomOccupancy.filter(room => room.status === "Available").length}
                </p>
              </Card>
            </div>

            <div className="rounded-lg border overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left">Room</th>
                      <th className="px-4 py-3 text-left">Type</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Guest</th>
                      <th className="px-4 py-3 text-left">Check-in</th>
                      <th className="px-4 py-3 text-left">Check-out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomOccupancy.map((room, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white dark:bg-gray-950" : "bg-muted/30 dark:bg-gray-900"}>
                        <td className="px-4 py-3">{room.roomNumber}</td>
                        <td className="px-4 py-3">{room.type}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            room.status === "Occupied" ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" :
                            room.status === "Available" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" :
                            room.status === "Reserved" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300" :
                            "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                          }`}>
                            {room.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{room.guest || "-"}</td>
                        <td className="px-4 py-3">{room.checkIn || "-"}</td>
                        <td className="px-4 py-3">{room.checkOut || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 print:mt-8">
              <Card className="p-4">
                <h3 className="text-sm font-medium mb-3">Room Status Distribution</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-sm">Occupied</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                      <span className="text-sm">Available</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
                      <span className="text-sm">Reserved</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      <span className="text-sm">Maintenance</span>
                    </div>
                  </div>
                  <div className="relative w-32 h-32">
                    {/* Simplified pie chart representation */}
                    <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: "polygon(50% 50%, 0 0, 100% 0, 100% 50%)" }}></div>
                    <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}></div>
                    <div className="absolute inset-0 rounded-full border-8 border-amber-500" style={{ clipPath: "polygon(50% 50%, 50% 100%, 0 100%, 0 70%)" }}></div>
                    <div className="absolute inset-0 rounded-full border-8 border-red-500" style={{ clipPath: "polygon(50% 50%, 0 70%, 0 0)" }}></div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-sm font-medium mb-3">Room Type Distribution</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Standard Rooms</span>
                      <span>33%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "33%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Deluxe Rooms</span>
                      <span>33%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "33%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Suites</span>
                      <span>33%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: "33%" }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="text-sm text-muted-foreground print:mt-8">
              <p>Report generated on {new Date().toLocaleString()} by Hotel Managerium System</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomOccupancyReport;
