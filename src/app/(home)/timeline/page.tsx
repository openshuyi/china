import type { Metadata } from 'next';
import Link from 'next/link';
import { TimelineExplorer } from '@/components/timeline-explorer';

export const metadata: Metadata = {
  title: '时间轴 - 历史演化视图',
  description: '按时代与地域筛选中国历史和考古关键事件。',
};

export default function TimelinePage() {
  return (
    <main className="relative w-full max-w-[100vw] flex-1 space-y-4 px-2 py-4 md:px-4 lg:px-6 overflow-x-hidden">
      {/* 炫酷背景光晕 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-fd-primary/10 blur-[100px] rounded-[100%] pointer-events-none -z-10" />
      <div className="absolute top-40 -left-40 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-80 -right-40 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <section className="relative rounded-xl border border-fd-border/50 bg-fd-background/40 backdrop-blur-md p-4 md:p-6 text-center shadow-sm overflow-hidden w-full mx-auto">
        {/* 装饰性网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
        
        <div className="inline-flex items-center rounded-full border border-fd-primary/30 bg-fd-primary/10 px-2.5 py-0.5 text-xs font-medium text-fd-primary mb-2 shadow-[0_0_15px_rgba(var(--fd-primary-rgb),0.2)]">
          <span className="relative flex h-1.5 w-1.5 mr-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fd-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-fd-primary"></span>
          </span>
          历史演化视图
        </div>
        
        <h1 className="mt-1 text-2xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-fd-foreground to-fd-foreground/60 drop-shadow-sm">
          中华文明演进时间轴
        </h1>
        
        <p className="mx-auto mt-2 max-w-3xl text-sm text-fd-muted-foreground leading-relaxed">
          跨越百万年的人类足迹，从满天星斗的早期聚落到大一统帝国的制度整合。
          <span className="hidden md:inline"> 通过时间与空间的双维度坐标，探索文明形成的物质证据。</span>
        </p>
        
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link 
            href="/archaeology-map" 
            className="group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-full bg-fd-primary px-4 text-xs font-medium text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--fd-primary-rgb),0.4)]"
          >
            <span className="mr-1.5">在地图中探索空间分布</span>
            <svg aria-hidden="true" className="transition-transform group-hover:translate-x-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><title>前往地图</title><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Link>
        </div>
      </section>
      
      <TimelineExplorer />
    </main>
  );
}
