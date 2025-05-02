
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface PaymentStats {
  totalPayments: number;
  pendingPayments: number;
  refundedPayments: number;
  completedPaymentsCount: number;
}

const PaymentStatsCards = ({ 
  totalPayments, 
  pendingPayments, 
  refundedPayments, 
  completedPaymentsCount 
}: PaymentStats) => {
  const averagePayment = (totalPayments / (completedPaymentsCount || 1)).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <div className="text-3xl font-bold">${totalPayments.toFixed(2)}</div>
            <div className="ml-2 text-sm text-green-500 flex items-center">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
              8.2%
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            From all completed payments
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Pending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-yellow-500">
            ${pendingPayments.toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            Awaiting processing
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Refunded</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-destructive">
            ${refundedPayments.toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            Total refunded amount
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Average Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <div className="text-3xl font-bold">
              ${averagePayment}
            </div>
            <div className="ml-2 text-sm text-red-500 flex items-center">
              <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
              3.1%
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Per completed payment
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentStatsCards;
