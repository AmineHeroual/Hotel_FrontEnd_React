
import { z } from "zod";

export type ReservationStatus = "confirmed" | "pending" | "checked_in" | "checked_out" | "cancelled";

export interface Reservation {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: Date;
  checkOut: Date;
  status: ReservationStatus;
  email?: string;
  phone?: string;
  guests: number;
  roomType: string;
  totalAmount: number;
  paymentStatus: "paid" | "pending" | "partial";
}

export const NewReservationSchema = z.object({
  guestName: z.string().min(3, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  roomType: z.string().min(1, "Type de chambre requis"),
  roomNumber: z.string().min(1, "Numéro de chambre requis"),
  guests: z.coerce.number().min(1, "Minimum 1 invité").max(10, "Maximum 10 invités"),
  totalAmount: z.coerce.number().min(0, "Le montant ne peut pas être négatif"),
  paymentStatus: z.enum(["paid", "pending", "partial"]),
});

export type NewReservationValues = z.infer<typeof NewReservationSchema>;
