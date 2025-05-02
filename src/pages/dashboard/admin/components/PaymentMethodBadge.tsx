
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Banknote, Wallet } from "lucide-react";

interface PaymentMethodBadgeProps {
  method: string;
}

const PaymentMethodBadge = ({ method }: PaymentMethodBadgeProps) => {
  let label = method.replace("_", " ");
  let icon = null;

  switch (method) {
    case "credit_card":
      icon = <CreditCard className="h-3.5 w-3.5 mr-1" />;
      label = "Credit Card";
      break;
    case "bank_transfer":
      icon = <Banknote className="h-3.5 w-3.5 mr-1" />;
      label = "Bank Transfer";
      break;
    case "paypal":
      icon = <Wallet className="h-3.5 w-3.5 mr-1" />;
      label = "PayPal";
      break;
    case "apple_pay":
      icon = <Wallet className="h-3.5 w-3.5 mr-1" />;
      label = "Apple Pay";
      break;
    default:
      icon = <CreditCard className="h-3.5 w-3.5 mr-1" />;
  }

  return (
    <Badge variant="outline" className="flex items-center capitalize">
      {icon}
      {label}
    </Badge>
  );
};

export default PaymentMethodBadge;
