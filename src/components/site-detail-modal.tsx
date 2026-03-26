'use client';

import { useMemo } from 'react';
import type { ArchaeologySite, Artifact, TimelineEvent } from '@/lib/history-data';
import { getPeriodColor } from '@/lib/map-utils';

interface SiteDetailModalProps {
  site: ArchaeologySite | null;
  onClose: () => void;
  artifacts: Artifact[];
  timelineEvents: TimelineEvent[];
}

export function SiteDetailModal({
  site,
  onClose,
  artifacts,
  timelineEvents,
}: SiteDetailModalProps) {
  const relatedArtifacts = useMemo(() => {
    if (!site) return [];
    return artifacts.filter((artifact) =>
      site.relatedArtifacts?.includes(artifact.id)
    );
  }, [site, artifacts]);

  const relatedEvents = useMemo(() => {
    if (!site) return [];
    return timelineEvents.filter((event) =>
      site.relatedEvents?.includes(event.id)
    );
  }, [site, timelineEvents]);

  if (!site) return null;

  return (
    <>
      {/* 背景遮罩 */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* 模态框 */}
      <div
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2"
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-4 rounded-2xl border border-fd-border/60 bg-fd-card/95 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* 头部 */}
          <div className="relative overflow-hidden p-6 pb-4">
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundColor: getPeriodColor(site.period) }}
            />
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white shadow-sm"
                      style={{ backgroundColor: getPeriodColor(site.period) }}
                    >
                      {site.period}
                    </span>
                    {site.importance === '核心' && (
                      <span className="rounded-full bg-amber-500/20 text-amber-600 px-2 py-0.5 text-xs font-medium">
                        核心
                      </span>
                    )}
                    {site.importance === '重要' && (
                      <span className="rounded-full bg-blue-500/20 text-blue-600 px-2 py-0.5 text-xs font-medium">
                        重要
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-fd-foreground">
                    {site.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-4 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-fd-muted/50 transition-colors"
                  aria-label="关闭"
                >
                  <svg
                    aria-hidden="true"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* 内容 */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* 基本信息 */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-fd-muted/30 p-4">
                <p className="text-xs text-fd-muted-foreground mb-1">地区</p>
                <p className="font-medium text-fd-foreground">{site.region}</p>
              </div>
              <div className="rounded-lg bg-fd-muted/30 p-4">
                <p className="text-xs text-fd-muted-foreground mb-1">坐标</p>
                <p className="font-medium text-fd-foreground">
                  {site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}
                </p>
              </div>
            </div>

            {/* 文化圈 */}
            {site.culturalCircle && (
              <div>
                <h3 className="text-sm font-semibold text-fd-foreground mb-2">
                所属文化圈
              </h3>
              <p className="text-sm text-fd-muted-foreground">
                {site.culturalCircle}
              </p>
              </div>
            )}

            {/* 核心发现 */}
            <div>
              <h3 className="text-sm font-semibold text-fd-foreground mb-2">
                核心发现
              </h3>
              <p className="text-sm text-fd-muted-foreground">
                {site.highlight}
              </p>
            </div>

            {/* 历史意义 */}
            <div>
              <h3 className="text-sm font-semibold text-fd-foreground mb-2">
                历史意义
              </h3>
              <p className="text-sm text-fd-muted-foreground">
                {site.significance}
              </p>
            </div>

            {/* 详细描述 */}
            {site.description && (
              <div>
                <h3 className="text-sm font-semibold text-fd-foreground mb-2">
                  详细描述
                </h3>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">
                  {site.description}
                </p>
              </div>
            )}

            {/* 关联文物 */}
            {relatedArtifacts.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-fd-foreground mb-2">
                  关联文物
                </h3>
                <div className="flex flex-wrap gap-2">
                  {relatedArtifacts.map((artifact) => (
                    <span
                      key={artifact.id}
                      className="rounded-full bg-fd-primary/10 text-fd-primary px-3 py-1 text-sm"
                    >
                      {artifact.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 相关历史事件 */}
            {relatedEvents.length > 1 && (
              <div>
                <h3 className="text-sm font-semibold text-fd-foreground mb-2">
                  相关历史事件
                </h3>
                <div className="space-y-2">
                  {relatedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-lg border border-fd-border/60 p-3"
                    >
                      <p className="text-sm font-medium text-fd-foreground">
                        {event.title}
                      </p>
                      <p className="text-xs text-fd-muted-foreground mt-1">
                        {event.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
