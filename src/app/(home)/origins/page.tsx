import type { Metadata } from 'next';
import { originNarrative } from '@/lib/history-data';

export const metadata: Metadata = {
  title: '人类文化起源',
  description: '以环境、技术、组织与符号四条主线理解文化起源。',
};

export default function OriginsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-10 md:px-6">
      <section className="rounded-2xl border border-fd-border bg-fd-card p-8">
        <p className="text-sm font-medium text-fd-primary">起源路径</p>
        <h1 className="mt-2 text-3xl font-bold">人类文化起源</h1>
        <p className="mt-3 max-w-3xl text-fd-muted-foreground">
          从旧石器到早期国家，文化起源不是单点事件，而是多阶段、多区域、跨技术系统的长期演进。
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {originNarrative.map((item, index) => (
          <article key={item.title} className="rounded-xl border border-fd-border bg-fd-card p-5">
            <p className="text-xs text-fd-muted-foreground">阶段 {index + 1}</p>
            <h2 className="mt-1 text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-fd-muted-foreground">{item.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
