'use client';

import { useMemo, useState } from 'react';
import { artifacts } from '@/lib/history-data';

type Category = '全部' | '陶器' | '玉器' | '青铜器' | '骨器' | '礼器';

const categories: Category[] = ['全部', '陶器', '玉器', '青铜器', '骨器', '礼器'];

export function ArtifactGallery() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<Category>('全部');

  const filtered = useMemo(() => {
    return artifacts.filter((item) => {
      if (category !== '全部' && item.category !== category) return false;
      if (!keyword.trim()) return true;
      const key = keyword.toLowerCase();
      return (
        item.name.toLowerCase().includes(key) ||
        item.site.toLowerCase().includes(key) ||
        item.period.toLowerCase().includes(key)
      );
    });
  }, [keyword, category]);

  return (
    <section className="space-y-5">
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="flex items-center rounded-lg border border-fd-border bg-fd-card px-3 py-2">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="输入文物名、遗址或时期进行检索"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                category === item
                  ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                  : 'border-fd-border hover:border-fd-primary/40'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((item) => (
          <article key={item.id} className="rounded-xl border border-fd-border bg-fd-card p-4">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="mt-1 text-sm text-fd-muted-foreground">{item.detail}</p>
            <p className="mt-3 text-xs text-fd-muted-foreground">
              {item.period} · {item.category} · {item.material} · {item.site}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
