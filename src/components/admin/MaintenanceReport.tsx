
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Printer, Download, X } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface MaintenanceReportProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MaintenanceReport: React.FC<MaintenanceReportProps> = ({ isOpen, onClose }) => {
  const [reportType, setReportType] = useState<string>("status");
  const [timeframe, setTimeframe] = useState<string>("month");
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock maintenance data
  const maintenanceData = {
    issues: [
      { id: 1, title: "Leaky faucet in Room 102", category: "plumbing", location: "Room 102", status: "completed", priority: "medium", assignedTo: "John Smith", createdAt: "2023-04-02", completedAt: "2023-04-03", resolution: "Replaced washer and sealed connection" },
      { id: 2, title: "AC not cooling in Room 305", category: "hvac", location: "Room 305", status: "in_progress", priority: "high", assignedTo: "Michael Brown", createdAt: "2023-04-05", completedAt: null, resolution: null },
      { id: 3, title: "Light fixture broken in hallway", category: "electrical", location: "2nd Floor Hallway", status: "pending", priority: "low", assignedTo: null, createdAt: "2023-04-08", completedAt: null, resolution: null },
      { id: 4, title: "Shower drain clogged", category: "plumbing", location: "Room 204", status: "completed", priority: "medium", assignedTo: "Sarah Johnson", createdAt: "2023-04-01", completedAt: "2023-04-01", resolution: "Cleared blockage and cleaned drain" },
      { id: 5, title: "Broken chair leg", category: "furniture", location: "Restaurant", status: "completed", priority: "low", assignedTo: "Lisa Chen", createdAt: "2023-03-28", completedAt: "2023-03-30", resolution: "Repaired leg and reinforced joint" },
      { id: 6, title: "TV not working", category: "appliance", location: "Room 410", status: "in_progress", priority: "medium", assignedTo: "John Smith", createdAt: "2023-04-07", completedAt: null, resolution: null },
      { id: 7, title: "Pool heater malfunction", category: "hvac", location: "Pool Area", status: "pending", priority: "high", assignedTo: null, createdAt: "2023-04-09", completedAt: null, resolution: null },
      { id: 8, title: "Ceiling water leak", category: "structural", location: "Room 505", status: "in_progress", priority: "emergency", assignedTo: "Michael Brown", createdAt: "2023-04-06", completedAt: null, resolution: null },
    ],
  };

  // Issue counts by status
  const statusCounts = {
    completed: maintenanceData.issues.filter(issue => issue.status === "completed").length,
    in_progress: maintenanceData.issues.filter(issue => issue.status === "in_progress").length,
    pending: maintenanceData.issues.filter(issue => issue.status === "pending").length,
  };

  // Issue counts by category
  const categoryCounts = maintenanceData.issues.reduce((acc: Record<string, number>, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {});

  // Issue counts by priority
  const priorityCounts = maintenanceData.issues.reduce((acc: Record<string, number>, issue) => {
    acc[issue.priority] = (acc[issue.priority] || 0) + 1;
    return acc;
  }, {});

  // Calculate average resolution time (in days) for completed issues
  const completedIssues = maintenanceData.issues.filter(issue => issue.status === "completed");
  const resolutionTimes = completedIssues.map(issue => {
    const createdDate = new Date(issue.createdAt);
    const completedDate = new Date(issue.completedAt as string);
    return Math.round((completedDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  });
  
  const averageResolutionTime = resolutionTimes.length 
    ? resolutionTimes.reduce((a, b) => a + b, 0) / resolutionTimes.length 
    : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setIsGenerating(true);
    // Simulate download delay
    setTimeout(() => {
      toast.success("Maintenance report downloaded successfully");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto print:max-w-none print:overflow-visible">
        <DialogHeader>
          <div className="flex items-center justify-between w-full print:hidden">
            <DialogTitle>Maintenance Report</DialogTitle>
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
            Analysis of maintenance requests and resolutions
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 print:grid-cols-1">
          <div className="print:hidden lg:col-span-1">
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-3">Report Options</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select
                    value={reportType}
                    onValueChange={setReportType}
                  >
                    <SelectTrigger id="report-type" className="w-full">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="status">By Status</SelectItem>
                      <SelectItem value="category">By Category</SelectItem>
                      <SelectItem value="priority">By Priority</SelectItem>
                      <SelectItem value="technician">By Technician</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeframe">Time Period</Label>
                  <Select
                    value={timeframe}
                    onValueChange={setTimeframe}
                  >
                    <SelectTrigger id="timeframe" className="w-full">
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last 7 Days</SelectItem>
                      <SelectItem value="month">Last 30 Days</SelectItem>
                      <SelectItem value="quarter">Last 90 Days</SelectItem>
                      <SelectItem value="year">Last 12 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3 print:col-span-1">
            <div className="print:text-center print:mb-4 hidden print:block">
              <h1 className="text-2xl font-bold">Maintenance Report</h1>
              <p className="text-gray-600">Period: Last {timeframe === 'week' ? '7 Days' : 
                               timeframe === 'month' ? '30 Days' : 
                               timeframe === 'quarter' ? '90 Days' : 
                               '12 Months'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                <h3 className="text-sm font-medium mb-1">Total Maintenance Requests</h3>
                <p className="text-2xl font-bold">{maintenanceData.issues.length}</p>
              </Card>
              <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                <h3 className="text-sm font-medium mb-1">Completed</h3>
                <p className="text-2xl font-bold">{statusCounts.completed}</p>
                <p className="text-xs text-muted-foreground">
                  ({Math.round((statusCounts.completed / maintenanceData.issues.length) * 100)}% of total)
                </p>
              </Card>
              <Card className="p-4 bg-amber-50 dark:bg-amber-900/20">
                <h3 className="text-sm font-medium mb-1">Average Resolution Time</h3>
                <p className="text-2xl font-bold">{averageResolutionTime.toFixed(1)} days</p>
              </Card>
            </div>

            <Tabs defaultValue="summary" className="mb-6">
              <TabsList className="mb-4 print:hidden">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary">
                <Card className="p-6 mb-6">
                  <h3 className="text-base font-medium mb-4">Maintenance Requests by Status</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Completed</span>
                        <span className="text-sm">{statusCounts.completed} ({Math.round((statusCounts.completed / maintenanceData.issues.length) * 100)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(statusCounts.completed / maintenanceData.issues.length) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">In Progress</span>
                        <span className="text-sm">{statusCounts.in_progress} ({Math.round((statusCounts.in_progress / maintenanceData.issues.length) * 100)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${(statusCounts.in_progress / maintenanceData.issues.length) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Pending</span>
                        <span className="text-sm">{statusCounts.pending} ({Math.round((statusCounts.pending / maintenanceData.issues.length) * 100)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(statusCounts.pending / maintenanceData.issues.length) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-base font-medium mb-4 mt-8">Maintenance Requests by Category</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      {Object.entries(categoryCounts).slice(0, 4).map(([category, count]) => (
                        <div key={category} className="mb-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm capitalize">{category}</span>
                            <span className="text-sm">{count}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className={`${
                              category === 'plumbing' ? 'bg-blue-500' :
                              category === 'electrical' ? 'bg-yellow-500' :
                              category === 'hvac' ? 'bg-green-500' :
                              category === 'furniture' ? 'bg-purple-500' :
                              'bg-gray-500'
                            } h-2.5 rounded-full`} style={{ width: `${(count / maintenanceData.issues.length) * 100}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      {Object.entries(categoryCounts).slice(4).map(([category, count]) => (
                        <div key={category} className="mb-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm capitalize">{category}</span>
                            <span className="text-sm">{count}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className={`${
                              category === 'appliance' ? 'bg-pink-500' :
                              category === 'structural' ? 'bg-indigo-500' :
                              category === 'housekeeping' ? 'bg-cyan-500' :
                              'bg-orange-500'
                            } h-2.5 rounded-full`} style={{ width: `${(count / maintenanceData.issues.length) * 100}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-base font-medium mb-4 mt-8">Maintenance Requests by Priority</h3>
                  <div className="space-y-4">
                    {Object.entries(priorityCounts).map(([priority, count]) => (
                      <div key={priority}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm capitalize">{priority}</span>
                          <span className="text-sm">{count} ({Math.round((count / maintenanceData.issues.length) * 100)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className={`${
                            priority === 'low' ? 'bg-blue-500' :
                            priority === 'medium' ? 'bg-amber-500' :
                            priority === 'high' ? 'bg-red-500' :
                            'bg-red-700'
                          } h-2.5 rounded-full`} style={{ width: `${(count / maintenanceData.issues.length) * 100}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="details">
                <Card className="p-4 mb-6 overflow-hidden">
                  <h3 className="text-sm font-medium mb-3">Maintenance Request Details</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left">ID</th>
                          <th className="px-4 py-3 text-left">Title</th>
                          <th className="px-4 py-3 text-left">Location</th>
                          <th className="px-4 py-3 text-left">Category</th>
                          <th className="px-4 py-3 text-left">Priority</th>
                          <th className="px-4 py-3 text-left">Status</th>
                          <th className="px-4 py-3 text-left">Assigned To</th>
                          <th className="px-4 py-3 text-left">Created</th>
                          <th className="px-4 py-3 text-left">Completed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {maintenanceData.issues.map((issue) => (
                          <tr key={issue.id} className="border-b">
                            <td className="px-4 py-3">{issue.id}</td>
                            <td className="px-4 py-3">{issue.title}</td>
                            <td className="px-4 py-3">{issue.location}</td>
                            <td className="px-4 py-3 capitalize">{issue.category}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                issue.priority === 'low' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                                issue.priority === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' :
                                issue.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                                'bg-red-200 text-red-900 dark:bg-red-900/70 dark:text-red-200'
                              }`}>
                                {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                issue.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                                issue.status === 'in_progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300' :
                                'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                              }`}>
                                {issue.status === 'completed' ? 'Completed' : 
                                issue.status === 'in_progress' ? 'In Progress' : 'Pending'}
                              </span>
                            </td>
                            <td className="px-4 py-3">{issue.assignedTo || '-'}</td>
                            <td className="px-4 py-3">{issue.createdAt}</td>
                            <td className="px-4 py-3">{issue.completedAt || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="performance">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card className="p-6">
                    <h3 className="text-base font-medium mb-4">Technician Performance</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <div>
                            <p className="font-medium">John Smith</p>
                            <p className="text-sm text-muted-foreground">3 completed / 1 in progress</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">75%</p>
                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <div>
                            <p className="font-medium">Sarah Johnson</p>
                            <p className="text-sm text-muted-foreground">1 completed / 0 in progress</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">100%</p>
                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <div>
                            <p className="font-medium">Michael Brown</p>
                            <p className="text-sm text-muted-foreground">0 completed / 2 in progress</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">0%</p>
                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <div>
                            <p className="font-medium">Lisa Chen</p>
                            <p className="text-sm text-muted-foreground">1 completed / 0 in progress</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">100%</p>
                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6">
                    <h3 className="text-base font-medium mb-4">Resolution Metrics</h3>
                    <div className="space-y-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Resolution Time (Days)</p>
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-center flex-1 p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">Min</p>
                            <p className="text-xl font-semibold">0</p>
                          </div>
                          <div className="text-center flex-1 p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">Average</p>
                            <p className="text-xl font-semibold">{averageResolutionTime.toFixed(1)}</p>
                          </div>
                          <div className="text-center flex-1 p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">Max</p>
                            <p className="text-xl font-semibold">{Math.max(...resolutionTimes)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Priority-Based Resolution Time (Days)</p>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Priority</th>
                              <th className="text-right py-2">Avg. Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">Low</td>
                              <td className="text-right">2.0</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">Medium</td>
                              <td className="text-right">1.0</td>
                            </tr>
                            <tr>
                              <td className="py-2">High</td>
                              <td className="text-right">0.5</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="text-sm font-medium mb-2">Category-Based Resolution Time (Days)</p>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Category</th>
                              <th className="text-right py-2">Avg. Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">Plumbing</td>
                              <td className="text-right">0.5</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">Electrical</td>
                              <td className="text-right">-</td>
                            </tr>
                            <tr>
                              <td className="py-2">Furniture</td>
                              <td className="text-right">2.0</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-sm text-muted-foreground print:mt-8">
              <p>Report generated on {new Date().toLocaleString()} by Hotel Managerium System</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MaintenanceReport;
