'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteRoutes } from '@/lib/history-data';

export function SiteHeaderNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto px-2 md:px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-[50vw] md:max-w-none">
      {siteRoutes.map((route) => {
        const active = pathname === route.href;
        return (
          <Link
            key={route.href}
            href={route.href}
            className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm transition ${
              active
                ? 'border-fd-primary bg-fd-primary/10 text-fd-primary font-medium'
                : 'border-transparent text-fd-muted-foreground hover:bg-fd-muted/50 hover:text-fd-foreground'
            }`}
          >
            {route.label}
          </Link>
        );
      })}
    </div>
  );
}
