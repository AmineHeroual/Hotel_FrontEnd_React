import { useMemo } from "react";
import { UserRole } from "@/types";
import {
  LayoutDashboard,
  User,
  Calendar,
  BedDouble,
  CreditCard,
  Settings,
  Bell,
  Wrench,
  ClipboardList,
  Users,
  ListChecks,
  FileText,
} from "lucide-react";

export type NavigationItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

export const useSidebarNavigation = (userRole: UserRole): NavigationItem[] => {
  return useMemo(() => {
    switch (userRole) {
      case "client":
        return [
          {
            icon: LayoutDashboard,
            label: "Tableau de bord",
            href: "/dashboard/client",
          },
          { icon: User, label: "Mon profil", href: "/dashboard/client/profile" },
          {
            icon: Calendar,
            label: "Réservations",
            href: "/dashboard/client/reservations",
          },
          {
            icon: BedDouble,
            label: "Parcourir les chambres",
            href: "/dashboard/client/rooms",
          },
          {
            icon: CreditCard,
            label: "Paiements",
            href: "/dashboard/client/payments",
          },
          {
            icon: Wrench,
            label: "Maintenance",
            href: "/dashboard/client/maintenance",
          },
        ];
        
      case "admin":
        return [
          {
            icon: LayoutDashboard,
            label: "Tableau de bord",
            href: "/dashboard/admin",
          },
          { icon: Users, label: "Utilisateurs", href: "/dashboard/admin/users" },
          {
            icon: BedDouble,
            label: "Chambres",
            href: "/dashboard/admin/rooms",
          },
          {
            icon: Calendar,
            label: "Réservations",
            href: "/dashboard/admin/reservations",
          },
          {
            icon: CreditCard,
            label: "Paiements",
            href: "/dashboard/admin/payments",
          },
          {
            icon: Wrench,
            label: "Maintenance",
            href: "/dashboard/admin/maintenance",
          },
          {
            icon: Settings,
            label: "Paramètres",
            href: "/dashboard/admin/settings",
          },
        ];

      case "technician":
        return [
          {
            icon: LayoutDashboard,
            label: "Tableau de bord",
            href: "/dashboard/technician",
          },
          {
            icon: ClipboardList,
            label: "Tâches",
            href: "/dashboard/technician/tasks",
          },
          {
            icon: FileText,
            label: "Rapports",
            href: "/dashboard/technician/reports",
          },
          {
            icon: Bell,
            label: "Incidents",
            href: "/dashboard/technician/issue-reports",
          },
        ];

      case "receptionist":
        return [
          {
            icon: LayoutDashboard,
            label: "Tableau de bord",
            href: "/dashboard/receptionist",
          },
          {
            icon: Calendar,
            label: "Réservations",
            href: "/dashboard/receptionist/reservations",
          },
          {
            icon: BedDouble,
            label: "Chambres",
            href: "/dashboard/receptionist/rooms",
          },
          {
            icon: Wrench,
            label: "Maintenance",
            href: "/dashboard/receptionist/maintenance",
          },
          {
            icon: CreditCard,
            label: "Paiements",
            href: "/dashboard/receptionist/payments",
          },
        ];

      default:
        return [];
    }
  }, [userRole]);
};
