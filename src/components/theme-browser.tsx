'use client';

import { useMemo, useState } from 'react';
import { themes } from '@/lib/history-data';

type FilterEra = '全部' | '史前' | '早期国家' | '先秦' | '秦汉' | '魏晋南北朝' | '隋唐宋元' | '明清' | '早期文明';

const eras: FilterEra[] = ['全部', '早期文明', '史前', '早期国家', '先秦', '秦汉', '魏晋南北朝', '隋唐宋元', '明清'];

export function ThemeBrowser() {
  const [era, setEra] = useState<FilterEra>('全部');

  const filtered = useMemo(() => {
    if (era === '全部') return themes;
    return themes.filter((item) => item.era === era);
  }, [era]);

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {eras.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setEra(item)}
            className={`rounded-full border px-3 py-1 text-sm transition ${
              era === item
                ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                : 'border-fd-border hover:border-fd-primary/40'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((item) => (
          <article key={item.id} className="rounded-xl border border-fd-border bg-fd-card p-5">
            <p className="text-xs text-fd-muted-foreground">
              {item.era} · {item.region}
            </p>
            <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-fd-muted-foreground">{item.summary}</p>
            <p className="mt-3 text-sm">
              <span className="font-medium">专题重点：</span>
              {item.focus}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
