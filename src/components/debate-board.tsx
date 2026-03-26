'use client';

import { useMemo, useState } from 'react';
import { debates } from '@/lib/history-data';

type Topic = '全部' | '年代学' | '社会形态' | '文化传播' | '技术起源';

const topics: Topic[] = ['全部', '年代学', '社会形态', '文化传播', '技术起源'];

export function DebateBoard() {
  const [topic, setTopic] = useState<Topic>('全部');

  const filtered = useMemo(() => {
    if (topic === '全部') return debates;
    return debates.filter((item) => item.topic === topic);
  }, [topic]);

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {topics.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTopic(item)}
            className={`rounded-full border px-3 py-1 text-sm transition ${
              topic === item
                ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                : 'border-fd-border hover:border-fd-primary/40'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((item) => (
          <article key={item.id} className="rounded-xl border border-fd-border bg-fd-card p-5">
            <div className="mb-2 flex items-center gap-2 text-xs text-fd-muted-foreground">
              <span className="rounded-full bg-fd-accent px-2 py-1">{item.topic}</span>
              <span>证据强度：{item.evidenceLevel}</span>
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-fd-border p-3">
                <p className="text-xs font-medium text-fd-muted-foreground">主流观点</p>
                <p className="mt-1 text-sm">{item.mainstream}</p>
              </div>
              <div className="rounded-lg border border-fd-border p-3">
                <p className="text-xs font-medium text-fd-muted-foreground">替代观点</p>
                <p className="mt-1 text-sm">{item.alternative}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
