import Link from 'next/link';
import { siteRoutes, timelineEvents } from '@/lib/history-data';

export default function HomePage() {
  const highlights = timelineEvents.slice(0, 4);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-10 md:px-6">
      <section className="rounded-2xl border border-fd-border bg-fd-card p-8 md:p-12">
        <p className="text-sm font-medium text-fd-primary">中国历史 · 考古 · 人类文化起源</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
          用时间、空间与证据理解文明如何形成
        </h1>
        <p className="mt-4 max-w-3xl text-fd-muted-foreground">
          这个网站聚焦中国历史与考古发现，通过时间轴、遗址地图、专题与文物证据，帮助你建立可追溯、可比较、可持续学习的文明认知框架。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/timeline"
            className="rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground"
          >
            开始探索时间轴
          </Link>
          <Link href="/archaeology-map" className="rounded-lg border border-fd-border px-4 py-2 text-sm font-medium">
            查看考古地图
          </Link>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {siteRoutes.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-fd-border bg-fd-card p-4 transition hover:border-fd-primary/40"
          >
            <h2 className="font-semibold">{item.label}</h2>
            <p className="mt-1 text-sm text-fd-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">关键历史节点</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {highlights.map((item) => (
            <article key={item.id} className="rounded-xl border border-fd-border bg-fd-card p-4">
              <p className="text-xs text-fd-muted-foreground">
                {item.era} · {item.period}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-fd-muted-foreground">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
