
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface PaymentStatusBadgeProps {
  status: string;
}

const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  let variant: "default" | "destructive" | "outline" | "secondary" = "default";
  let label = status;
  let icon = null;

  switch (status) {
    case "completed":
      variant = "default";
      icon = <CheckCircle className="h-3.5 w-3.5 mr-1" />;
      break;
    case "pending":
      variant = "secondary";
      icon = <Clock className="h-3.5 w-3.5 mr-1" />;
      break;
    case "processing":
      variant = "outline";
      icon = <Clock className="h-3.5 w-3.5 mr-1" />;
      label = "Processing";
      break;
    case "refunded":
      variant = "destructive";
      icon = <XCircle className="h-3.5 w-3.5 mr-1" />;
      break;
    default:
      variant = "outline";
  }

  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </Badge>
  );
};

export default PaymentStatusBadge;
