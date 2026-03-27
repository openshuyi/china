import type { Metadata } from 'next';
import { TimelineExplorer } from '@/components/timeline-explorer';

export const metadata: Metadata = {
  title: '时间轴 - 历史演化视图',
  description: '按时代与地域筛选中国历史和考古关键事件。',
};

export default function TimelinePage() {
  return (
    <main className="relative w-full max-w-[100vw] flex-1 px-2 py-3 md:px-4 lg:px-6 overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-fd-primary/10 blur-[100px] rounded-[100%] pointer-events-none -z-10" />
      <div className="absolute top-40 -left-40 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-80 -right-40 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <TimelineExplorer />
    </main>
  );
}
