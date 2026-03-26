import type { Metadata } from 'next';
import { ArtifactGallery } from '@/components/artifact-gallery';

export const metadata: Metadata = {
  title: '文物库',
  description: '查看典型器物并按类别检索其时代背景与考古证据。',
};

export default function ArtifactsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 space-y-8 px-4 py-10 md:px-6">
      <section className="rounded-2xl border border-fd-border bg-fd-card p-8">
        <p className="text-sm font-medium text-fd-primary">器物证据视图</p>
        <h1 className="mt-2 text-3xl font-bold">文物库</h1>
        <p className="mt-3 max-w-3xl text-fd-muted-foreground">
          通过器物类型、材质与出土地，理解技术发展、社会结构与礼制文化的演变。
        </p>
      </section>
      <ArtifactGallery />
    </main>
  );
}
