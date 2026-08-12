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
  { label: "About Us", path: "/about/" },
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
  { label: "Safety Center", path: "/safety/" },
  {
    label: "Media",
    path: "/media/",
    mega: false,
    children: [
      {
        label: "Newsroom",
        description: "Press releases and announcements.",
        path: "/media/news/",
        icon: icon(Newspaper),
      },
      {
        label: "Brand Assets",
        description: "Logos, photography, and brand guide.",
        path: "/media/brand/",
        icon: icon(Building2),
      },
      {
        label: "Safety Reports",
        description: "Independent audits and certifications.",
        path: "/media/reports/",
        icon: icon(ShieldCheck),
      },
    ],
  },
  { label: "Tech", path: "/tech/" },
];

export const popularTopics = [
  { label: "Battery-Swap Stations near me", path: "/network/stations/" },
  { label: "2-Wheeler Compatibility", path: "/solutions/2-wheeler/" },
  { label: "3-Wheeler Compatibility", path: "/solutions/3-wheeler/" },
  { label: "How Battery Swapping Works", path: "/how-it-works/" },
];

export const techIcon = icon(Cpu);
