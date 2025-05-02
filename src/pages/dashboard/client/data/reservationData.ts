
import { Reservation } from "../components/ReservationList";

export const reservationsData: Reservation[] = [
  {
    roomType: "Deluxe Room",
    roomNumber: "301",
    checkIn: "June 15, 2023",
    checkOut: "June 20, 2023",
    status: "upcoming",
    price: 995,
    guests: 2,
  },
  {
    roomType: "Executive Suite",
    roomNumber: "401",
    checkIn: "July 10, 2023",
    checkOut: "July 15, 2023",
    status: "upcoming",
    price: 1495,
    guests: 2,
  },
  {
    roomType: "Standard Room",
    roomNumber: "205",
    checkIn: "May 5, 2023",
    checkOut: "May 7, 2023",
    status: "completed",
    price: 398,
    guests: 1,
  },
  {
    roomType: "Premium Room",
    roomNumber: "502",
    checkIn: "April 12, 2023",
    checkOut: "April 15, 2023",
    status: "completed",
    price: 747,
    guests: 2,
  },
  {
    roomType: "Family Suite",
    roomNumber: "601",
    checkIn: "March 1, 2023",
    checkOut: "March 5, 2023",
    status: "cancelled",
    price: 1200,
    guests: 4,
  }
];
