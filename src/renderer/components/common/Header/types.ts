import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

export interface HeaderProps {
  appName?: string;
  navItems?: NavItem[];
  onLogoClick?: () => void;
}