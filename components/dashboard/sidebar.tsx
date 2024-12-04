"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  Clock, 
  FileText, 
  BarChart3,
  Settings
} from 'lucide-react';

const routes = [
  {
    label: 'Visão Geral',
    icon: Clock,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'Solicitações',
    icon: FileText,
    href: '/dashboard/requests',
    color: 'text-violet-500',
  },
  {
    label: 'Relatórios',
    icon: BarChart3,
    href: '/dashboard/reports',
    color: 'text-pink-700',
  },
  {
    label: 'Configurações',
    icon: Settings,
    href: '/dashboard/settings',
    color: 'text-orange-700',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-secondary/10 text-secondary-foreground">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathname === route.href
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground'
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}