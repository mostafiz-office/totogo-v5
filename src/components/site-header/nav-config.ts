import {
  Zap,
  Smartphone,
  Users,
  Truck,
  ShieldCheck,
  Newspaper,
  Cpu,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { createElement, type ReactNode } from "react";

export type NavChild = {
  label: string;
  description: string;
  path: string;
  icon?: ReactNode;
};

export type NavItem = {
  label: string;
  path: string;
  children?: NavChild[];
  mega?: boolean;
};

const icon = (I: LucideIcon) => createElement(I, { size: 18, strokeWidth: 2 });

export const navLinks: NavItem[] = [
  { label: "The Idea", path: "/the-idea/" },
  {
    label: "Our Solutions",
    path: "/solutions/",
    mega: true,
    children: [
      {
        label: "Battery Swapping",
        description: "Swap a depleted battery in under 2 minutes.",
        path: "/solutions/battery-swapping/",
        icon: icon(Zap),
      },
      {
        label: "Driver App",
        description: "Find the nearest station, in real time.",
        path: "/solutions/driver-app/",
        icon: icon(Smartphone),
      },
      {
        label: "Partner App",
        description: "Operate a swap station with one tap.",
        path: "/solutions/partner-app/",
        icon: icon(Users),
      },
      {
        label: "Fleet Onboarding",
        description: "Move your 2 & 3-wheeler fleet to electric.",
        path: "/solutions/fleet/",
        icon: icon(Truck),
      },
    ],
  },
  { label: "Investment", path: "/investment/" },
  {
    label: "Join Our Network",
    path: "/join/",
    mega: false,
    children: [
      {
        label: "Own an EV",
        description: "Own a totooGO electric three-wheeler.",
        path: "/join/own-an-ev/",
        icon: icon(Bike),
      },
      {
        label: "Dealership",
        description: "Sell and service totooGO vehicles.",
        path: "/join/dealership/",
        icon: icon(Store),
      },
      {
        label: "Franchise Program",
        description: "Run a totooGO swap point in your area.",
        path: "/join/franchise/",
        icon: icon(Handshake),
      },
    ],
  },
  { label: "Tech", path: "/tech/" },
];

export const techIcon = icon(Cpu);
