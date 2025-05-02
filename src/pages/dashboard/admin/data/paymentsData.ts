
// Dummy data for payments
export const payments = [
  {
    id: "PAY-001",
    reservationId: "RES-001",
    guestName: "John Smith",
    amount: 750,
    method: "credit_card",
    status: "completed",
    date: new Date(2023, 10, 14),
  },
  {
    id: "PAY-002",
    reservationId: "RES-003",
    guestName: "Robert Davis",
    amount: 250,
    method: "paypal",
    status: "completed",
    date: new Date(2023, 10, 19),
  },
  {
    id: "PAY-003",
    reservationId: "RES-002",
    guestName: "Alice Johnson",
    amount: 600,
    method: "credit_card",
    status: "pending",
    date: new Date(2023, 10, 17),
  },
  {
    id: "PAY-004",
    reservationId: "RES-005",
    guestName: "James Wilson",
    amount: 800,
    method: "bank_transfer",
    status: "completed",
    date: new Date(2023, 10, 22),
  },
  {
    id: "PAY-005",
    reservationId: "RES-006",
    guestName: "Sarah Brown",
    amount: 675,
    method: "credit_card",
    status: "completed",
    date: new Date(2023, 10, 30),
  },
  {
    id: "PAY-006",
    reservationId: "RES-004",
    guestName: "Maria Garcia",
    amount: 450,
    method: "credit_card",
    status: "refunded",
    date: new Date(2023, 10, 23),
  },
  {
    id: "PAY-007",
    reservationId: "RES-007",
    guestName: "David Miller",
    amount: 275,
    method: "paypal",
    status: "pending",
    date: new Date(2023, 11, 2),
  },
  {
    id: "PAY-008",
    reservationId: "RES-008",
    guestName: "Emily Davis",
    amount: 550,
    method: "apple_pay",
    status: "completed",
    date: new Date(2023, 11, 5),
  },
  {
    id: "PAY-009",
    reservationId: "RES-009",
    guestName: "Michael Wilson",
    amount: 400,
    method: "bank_transfer",
    status: "processing",
    date: new Date(2023, 11, 8),
  },
];

// Calculate payment statistics
export const calculatePaymentStats = () => {
  const totalPayments = payments.reduce((total, payment) => {
    if (payment.status === "completed") {
      return total + payment.amount;
    }
    return total;
  }, 0);

  const pendingPayments = payments.reduce((total, payment) => {
    if (payment.status === "pending") {
      return total + payment.amount;
    }
    return total;
  }, 0);

  const refundedPayments = payments.reduce((total, payment) => {
    if (payment.status === "refunded") {
      return total + payment.amount;
    }
    return total;
  }, 0);

  const completedPaymentsCount = payments.filter(p => p.status === "completed").length;

  return {
    totalPayments,
    pendingPayments,
    refundedPayments,
    completedPaymentsCount
  };
};
