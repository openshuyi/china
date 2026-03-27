import type { Metadata } from 'next';
import { MapExplorer } from '@/components/map-explorer';

export const metadata: Metadata = {
  title: '考古地图 - 空间分布视图',
  description: '按区域查看遗址分布与坐标，理解文明的空间结构。',
};

export default function ArchaeologyMapPage() {
  return (
    <main className="relative isolate w-full max-w-[100vw] min-h-[calc(100vh-56px)] flex-1 overflow-x-hidden px-2 py-2 md:px-4 md:py-3 lg:px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-10%,rgba(var(--fd-primary-rgb),0.26),transparent_52%),radial-gradient(circle_at_16%_22%,rgba(6,182,212,0.14),transparent_36%),radial-gradient(circle_at_88%_18%,rgba(139,92,246,0.18),transparent_34%),linear-gradient(to_bottom,rgba(15,23,42,0.08),transparent_35%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:26px_26px] opacity-35" />

      <MapExplorer />
    </main>
  );
}
