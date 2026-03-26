import type { Metadata } from 'next';
import { DebateBoard } from '@/components/debate-board';

export const metadata: Metadata = {
  title: '研究与争鸣',
  description: '对比主流与替代观点，理解历史与考古研究中的学术分歧。',
};

export default function DebatesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-10 md:px-6">
      <section className="rounded-2xl border border-fd-border bg-fd-card p-8">
        <p className="text-sm font-medium text-fd-primary">学术视角</p>
        <h1 className="mt-2 text-3xl font-bold">研究与争鸣</h1>
        <p className="mt-3 max-w-3xl text-fd-muted-foreground">
          同一批材料可能支持不同解释。这里按议题呈现观点差异，并标注证据强度，帮助你建立批判性阅读框架。
        </p>
      </section>
      <DebateBoard />
    </main>
  );
}
