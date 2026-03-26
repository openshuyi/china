import type { Metadata } from 'next';
import Link from 'next/link';
import { MapExplorer } from '@/components/map-explorer';

export const metadata: Metadata = {
  title: '考古地图 - 空间分布视图',
  description: '按区域查看遗址分布与坐标，理解文明的空间结构。',
};

export default function ArchaeologyMapPage() {
  return (
    <main className="relative mx-auto w-full max-w-6xl flex-1 space-y-12 px-4 py-10 md:px-6 overflow-hidden">
      {/* 炫酷背景光晕 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-fd-primary/10 blur-[100px] rounded-[100%] pointer-events-none -z-10" />
      <div className="absolute top-40 -left-40 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-80 -right-40 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* 页面标题区 */}
      <section className="relative rounded-3xl border border-fd-border/50 bg-fd-background/40 backdrop-blur-md p-10 md:p-16 text-center shadow-2xl overflow-hidden">
        {/* 装饰性网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

        <div className="inline-flex items-center rounded-full border border-fd-primary/30 bg-fd-primary/10 px-3 py-1 text-sm font-medium text-fd-primary mb-6 shadow-[0_0_15px_rgba(var(--fd-primary-rgb),0.2)]">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fd-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-fd-primary"></span>
          </span>
          空间分布视图
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-fd-foreground to-fd-foreground/60 drop-shadow-sm">
          考古遗址地图
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-fd-muted-foreground leading-relaxed">
          从遗址的地域分布、时间层位与核心发现，观察不同文化圈之间的联系与差异。
          <br className="hidden md:block" />
          通过地理空间维度，探索中华文明形成的物质证据。
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/timeline"
            className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-fd-primary px-8 font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--fd-primary-rgb),0.4)]"
          >
            <span className="mr-2">在时间轴中探索历史演进</span>
            <svg aria-hidden="true" className="transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><title>前往时间轴</title><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Link>
          <Link
            href="/artifacts"
            className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full border border-fd-border/60 bg-fd-card/80 px-8 font-medium text-fd-foreground transition-all duration-300 hover:scale-105 hover:border-fd-primary/40"
          >
            <span className="mr-2">查看文物库</span>
            <svg aria-hidden="true" className="transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><title>前往文物库</title><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Link>
        </div>
      </section>

      {/* 地图探索器 */}
      <MapExplorer />
    </main>
  );
}
