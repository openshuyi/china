'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteRoutes } from '@/lib/history-data';

export function SiteHeaderNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-fd-border bg-fd-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 overflow-x-auto px-4 py-3 md:px-6">
        {siteRoutes.map((route) => {
          const active = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm transition ${
                active
                  ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                  : 'border-fd-border text-fd-muted-foreground hover:border-fd-primary/40 hover:text-fd-foreground'
              }`}
            >
              {route.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
