
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Printer, Download, X, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addDays, format, startOfMonth, endOfMonth } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FinancialReportProps {
  isOpen: boolean;
  onClose: () => void;
}

type DateRange = {
  from: Date;
  to?: Date;
};

export const FinancialReport: React.FC<FinancialReportProps> = ({ isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [date, setDate] = React.useState<DateRange>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  // Mock financial data
  const financialData = {
    revenue: {
      total: 42750,
      roomRevenue: 35000,
      foodAndBeverage: 4800,
      spa: 1500,
      other: 1450,
    },
    expenses: {
      total: 28500,
      salary: 15000,
      maintenance: 3500,
      utilities: 4500,
      supplies: 2000,
      marketing: 1500,
      other: 2000,
    },
    metrics: {
      occupancyRate: 78.5,
      averageDailyRate: 185,
      revenuePerAvailableRoom: 145.23,
    },
    payments: [
      { id: 'P001', date: '2023-04-02', guest: 'John Smith', amount: 950, method: 'Credit Card', status: 'Completed' },
      { id: 'P002', date: '2023-04-03', guest: 'Emma Johnson', amount: 1200, method: 'Credit Card', status: 'Completed' },
      { id: 'P003', date: '2023-04-05', guest: 'Michael Brown', amount: 850, method: 'PayPal', status: 'Completed' },
      { id: 'P004', date: '2023-04-07', guest: 'Sarah Wilson', amount: 1500, method: 'Credit Card', status: 'Completed' },
      { id: 'P005', date: '2023-04-10', guest: 'David Lee', amount: 750, method: 'Cash', status: 'Completed' },
      { id: 'P006', date: '2023-04-12', guest: 'Lisa Chen', amount: 2100, method: 'Bank Transfer', status: 'Pending' },
      { id: 'P007', date: '2023-04-15', guest: 'James Taylor', amount: 980, method: 'Credit Card', status: 'Completed' },
    ]
  };

  const profit = financialData.revenue.total - financialData.expenses.total;
  const profitMargin = (profit / financialData.revenue.total * 100).toFixed(1);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setIsGenerating(true);
    // Simulate download delay
    setTimeout(() => {
      toast.success("Financial report downloaded successfully");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto print:max-w-none print:overflow-visible">
        <DialogHeader>
          <div className="flex items-center justify-between w-full print:hidden">
            <DialogTitle>Financial Report</DialogTitle>
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
            Analyze hotel financial performance and revenue metrics
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 print:grid-cols-1">
          <div className="print:hidden lg:col-span-1">
            <Card className="p-4">
              <h3 className="text-sm font-medium mb-3">Report Period</h3>
              
              <div className="grid gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <ButtonCustom
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </ButtonCustom>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="from" className="text-xs">From</Label>
                    <Input 
                      id="from" 
                      type="date" 
                      value={date.from ? format(date.from, "yyyy-MM-dd") : ""} 
                      onChange={(e) => {
                        const from = new Date(e.target.value);
                        setDate((prev) => ({ ...prev, from }));
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="to" className="text-xs">To</Label>
                    <Input 
                      id="to" 
                      type="date" 
                      value={date.to ? format(date.to, "yyyy-MM-dd") : ""} 
                      onChange={(e) => {
                        const to = new Date(e.target.value);
                        setDate((prev) => ({ ...prev, to }));
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <ButtonCustom variant="outline" size="sm" className="w-full justify-start" onClick={() => {
                  const now = new Date();
                  setDate({
                    from: startOfMonth(now),
                    to: endOfMonth(now),
                  });
                }}>
                  Current Month
                </ButtonCustom>
                <ButtonCustom variant="outline" size="sm" className="w-full justify-start" onClick={() => {
                  const now = new Date();
                  setDate({
                    from: addDays(now, -30),
                    to: now,
                  });
                }}>
                  Last 30 Days
                </ButtonCustom>
                <ButtonCustom variant="outline" size="sm" className="w-full justify-start" onClick={() => {
                  const now = new Date();
                  setDate({
                    from: addDays(now, -90),
                    to: now,
                  });
                }}>
                  Last 90 Days
                </ButtonCustom>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3 print:col-span-1">
            <div className="print:text-center print:mb-4 hidden print:block">
              <h1 className="text-2xl font-bold">Financial Report</h1>
              <p className="text-gray-600">
                {format(date.from, "LLL dd, y")} - {format(date.to || date.from, "LLL dd, y")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
                <h3 className="text-sm font-medium mb-1">Total Revenue</h3>
                <p className="text-2xl font-bold">{financialData.revenue.total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
              </Card>
              <Card className="p-4 bg-red-50 dark:bg-red-900/20">
                <h3 className="text-sm font-medium mb-1">Total Expenses</h3>
                <p className="text-2xl font-bold">{financialData.expenses.total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
              </Card>
              <Card className="p-4 bg-green-50 dark:bg-green-900/20">
                <h3 className="text-sm font-medium mb-1">Net Profit</h3>
                <p className="text-2xl font-bold">{profit.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
                <p className="text-xs text-muted-foreground">Profit Margin: {profitMargin}%</p>
              </Card>
            </div>

            <Tabs defaultValue="overview" className="mb-6">
              <TabsList className="mb-4 print:hidden">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card className="p-4">
                    <h3 className="text-sm font-medium mb-3">Revenue Breakdown</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Room Revenue</span>
                          <span>{Math.round(financialData.revenue.roomRevenue / financialData.revenue.total * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.round(financialData.revenue.roomRevenue / financialData.revenue.total * 100)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Food & Beverage</span>
                          <span>{Math.round(financialData.revenue.foodAndBeverage / financialData.revenue.total * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${Math.round(financialData.revenue.foodAndBeverage / financialData.revenue.total * 100)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Spa & Wellness</span>
                          <span>{Math.round(financialData.revenue.spa / financialData.revenue.total * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${Math.round(financialData.revenue.spa / financialData.revenue.total * 100)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Other Revenue</span>
                          <span>{Math.round(financialData.revenue.other / financialData.revenue.total * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.round(financialData.revenue.other / financialData.revenue.total * 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="text-sm font-medium mb-3">Expense Breakdown</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Salary & Wages</span>
                          <span>{Math.round(financialData.expenses.salary / financialData.expenses.total * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: `${Math.round(financialData.expenses.salary / financialData.expenses.total * 100)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Maintenance</span>
                          <span>{Math.round(financialData.expenses.maintenance / financialData.expenses.total * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${Math.round(financialData.expenses.maintenance / financialData.expenses.total * 100)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Utilities</span>
                          <span>{Math.round(financialData.expenses.utilities / financialData.expenses.total * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.round(financialData.expenses.utilities / financialData.expenses.total * 100)}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Other Expenses</span>
                          <span>{Math.round((financialData.expenses.supplies + financialData.expenses.marketing + financialData.expenses.other) / financialData.expenses.total * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-500 h-2 rounded-full" style={{ width: `${Math.round((financialData.expenses.supplies + financialData.expenses.marketing + financialData.expenses.other) / financialData.expenses.total * 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-4 mb-6">
                  <h3 className="text-sm font-medium mb-3">Key Performance Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                      <p className="text-2xl font-semibold">{financialData.metrics.occupancyRate}%</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">Average Daily Rate</p>
                      <p className="text-2xl font-semibold">${financialData.metrics.averageDailyRate}</p>
                    </div>
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">RevPAR</p>
                      <p className="text-2xl font-semibold">${financialData.metrics.revenuePerAvailableRoom}</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="revenue">
                <Card className="p-4 mb-6">
                  <h3 className="text-sm font-medium mb-3">Revenue Details</h3>
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left">Revenue Source</th>
                          <th className="px-4 py-3 text-right">Amount</th>
                          <th className="px-4 py-3 text-right">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-3">Room Revenue</td>
                          <td className="px-4 py-3 text-right">{financialData.revenue.roomRevenue.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                          <td className="px-4 py-3 text-right">{Math.round(financialData.revenue.roomRevenue / financialData.revenue.total * 100)}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3">Food & Beverage</td>
                          <td className="px-4 py-3 text-right">{financialData.revenue.foodAndBeverage.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                          <td className="px-4 py-3 text-right">{Math.round(financialData.revenue.foodAndBeverage / financialData.revenue.total * 100)}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3">Spa & Wellness</td>
                          <td className="px-4 py-3 text-right">{financialData.revenue.spa.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                          <td className="px-4 py-3 text-right">{Math.round(financialData.revenue.spa / financialData.revenue.total * 100)}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3">Other Revenue</td>
                          <td className="px-4 py-3 text-right">{financialData.revenue.other.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                          <td className="px-4 py-3 text-right">{Math.round(financialData.revenue.other / financialData.revenue.total * 100)}%</td>
                        </tr>
                        <tr className="font-medium bg-muted/20">
                          <td className="px-4 py-3">Total Revenue</td>
                          <td className="px-4 py-3 text-right">{financialData.revenue.total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                          <td className="px-4 py-3 text-right">100%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="expenses">
                <Card className="p-4 mb-6">
                  <h3 className="text-sm font-medium mb-3">Expense Details</h3>
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left">Expense Category</th>
                          <th className="px-4 py-3 text-right">Amount</th>
                          <th className="px-4 py-3 text-right">Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-3">Salary & Wages</td>
                          <td className="px-4 py-3 text-right">{financialData.expenses.salary.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                          <td className="px-4 py-3 text-right">{Math.round(financialData.expenses.salary / financialData.expenses.total * 100)}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3">Maintenance</td>
                          <td className="px-4 py-3 text-right">{financialData.expenses.maintenance.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                          <td className="px-4 py-3 text-right">{Math.round(financialData.expenses.maintenance / financialData.expenses.total * 100)}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3">Utilities</td>
                          <td className="px-4 py-3 text-right">{financialData.expenses.utilities.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                          <td className="px-4 py-3 text-right">{Math.round(financialData.expenses.utilities / financialData.expenses.total * 100)}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3">Supplies</td>
                          <td className="px-4 py-3 text-right">{financialData.expenses.supplies.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                          <td className="px-4 py-3 text-right">{Math.round(financialData.expenses.supplies / financialData.expenses.total * 100)}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3">Marketing</td>
                          <td className="px-4 py-3 text-right">{financialData.expenses.marketing.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                          <td className="px-4 py-3 text-right">{Math.round(financialData.expenses.marketing / financialData.expenses.total * 100)}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3">Other Expenses</td>
                          <td className="px-4 py-3 text-right">{financialData.expenses.other.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                          <td className="px-4 py-3 text-right">{Math.round(financialData.expenses.other / financialData.expenses.total * 100)}%</td>
                        </tr>
                        <tr className="font-medium bg-muted/20">
                          <td className="px-4 py-3">Total Expenses</td>
                          <td className="px-4 py-3 text-right">{financialData.expenses.total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                          <td className="px-4 py-3 text-right">100%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="transactions">
                <Card className="p-4 mb-6">
                  <h3 className="text-sm font-medium mb-3">Recent Transactions</h3>
                  <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left">ID</th>
                          <th className="px-4 py-3 text-left">Date</th>
                          <th className="px-4 py-3 text-left">Guest</th>
                          <th className="px-4 py-3 text-right">Amount</th>
                          <th className="px-4 py-3 text-left">Method</th>
                          <th className="px-4 py-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {financialData.payments.map((payment, index) => (
                          <tr key={payment.id} className={index % 2 === 0 ? "" : "bg-muted/20"}>
                            <td className="px-4 py-3">{payment.id}</td>
                            <td className="px-4 py-3">{payment.date}</td>
                            <td className="px-4 py-3">{payment.guest}</td>
                            <td className="px-4 py-3 text-right">{payment.amount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</td>
                            <td className="px-4 py-3">{payment.method}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                payment.status === 'Completed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
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

export default FinancialReport;
