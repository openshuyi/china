import type { Metadata } from 'next';
import { ThemeBrowser } from '@/components/theme-browser';

export const metadata: Metadata = {
  title: '文明专题',
  description: '围绕关键文化与遗址建立深度阅读入口。',
};

export default function ThemesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-10 md:px-6">
      <section className="rounded-2xl border border-fd-border bg-fd-card p-8">
        <p className="text-sm font-medium text-fd-primary">深度阅读</p>
        <h1 className="mt-2 text-3xl font-bold">文明专题</h1>
        <p className="mt-3 max-w-3xl text-fd-muted-foreground">
          按时代组织核心专题，聚焦典型文化、关键遗址与证据体系，帮助你建立完整的研究视角。
        </p>
      </section>
      <ThemeBrowser />
    </main>
  );
}
