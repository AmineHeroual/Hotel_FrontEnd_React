
import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ButtonCustom } from "@/components/ui/button-custom";
import PaymentStatusBadge from "./PaymentStatusBadge";
import PaymentMethodBadge from "./PaymentMethodBadge";

interface Payment {
  id: string;
  reservationId: string;
  guestName: string;
  amount: number;
  method: string;
  status: string;
  date: Date;
}

interface PaymentsTableProps {
  payments: Payment[];
}

const PaymentsTable = ({ payments }: PaymentsTableProps) => {
  const navigate = useNavigate();

  // Handle payment status update
  const handleStatusUpdate = (paymentId: string, newStatus: string) => {
    // In a real application, this would make an API call
    toast({
      title: "Payment Status Updated",
      description: `Payment ${paymentId} status changed to ${newStatus}`,
    });
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payment ID</TableHead>
            <TableHead>Reservation</TableHead>
            <TableHead>Guest</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <TableRow
                key={payment.id}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">
                  {payment.id}
                </TableCell>
                <TableCell>{payment.reservationId}</TableCell>
                <TableCell>{payment.guestName}</TableCell>
                <TableCell>
                  {format(payment.date, "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  <PaymentMethodBadge method={payment.method} />
                </TableCell>
                <TableCell>
                  <PaymentStatusBadge status={payment.status} />
                </TableCell>
                <TableCell className="text-right">
                  ${payment.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <Select
                      value={payment.status}
                      onValueChange={(value) => handleStatusUpdate(payment.id, value)}
                    >
                      <SelectTrigger className="h-8 w-28">
                        <SelectValue placeholder="Update" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Complete</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="refunded">Refund</SelectItem>
                      </SelectContent>
                    </Select>
                    <ButtonCustom
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/dashboard/admin/payments/${payment.id}`)}
                    >
                      View
                    </ButtonCustom>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-24 text-center"
              >
                No payments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentsTable;
