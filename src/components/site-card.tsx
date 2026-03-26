'use client';

import { motion } from 'framer-motion';
import type { ArchaeologySite } from '@/lib/history-data';
import { getPeriodColor } from '@/lib/map-utils';

interface SiteCardProps {
  site: ArchaeologySite;
  isSelected: boolean;
  onSelect: () => void;
}

export function SiteCard({ site, isSelected, onSelect }: SiteCardProps) {
  const periodColor = getPeriodColor(site.period);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onSelect}
      className={`
        relative overflow-hidden rounded-xl border p-5 cursor-pointer transition-all duration-300
        ${isSelected
          ? 'border-fd-primary/50 bg-fd-primary/5 shadow-lg shadow-fd-primary/10'
          : 'border-fd-border/60 bg-fd-card/80 hover:border-fd-primary/30 hover:shadow-lg'
        }
      `}
    >
      {/* 背景光效 */}
      <div
        className={`absolute -right-16 -top-16 w-32 h-32 rounded-full blur-3xl transition-colors ${
          isSelected ? 'bg-fd-primary/20' : 'bg-fd-primary/10'
        }`}
        style={{ backgroundColor: periodColor + '20' }}
      />

      <div className="relative z-10">
        {/* 顶部标签 */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium text-white shadow-sm"
            style={{ backgroundColor: periodColor }}
          >
            {site.period}
          </span>
          {site.importance === '核心' && (
            <span className="rounded-full bg-amber-500/20 text-amber-600 px-2.5 py-0.5 text-xs font-medium">
              核心
            </span>
          )}
          {site.importance === '重要' && (
            <span className="rounded-full bg-blue-500/20 text-blue-600 px-2.5 py-0.5 text-xs font-medium">
              重要
            </span>
          )}
        </div>

        {/* 遗址名称 */}
        <h4 className="text-lg font-bold text-fd-foreground mb-2">
          {site.name}
        </h4>

        {/* 核心发现 */}
        <p className="text-sm text-fd-muted-foreground mb-3">
          {site.highlight}
        </p>

        {/* 历史意义 */}
        <p className="text-xs text-fd-muted-foreground line-clamp-2">
          {site.significance}
        </p>

        {/* 地区和坐标 */}
        <div className="flex items-center gap-4 text-xs text-fd-muted-foreground mt-3">
          <div className="flex items-center gap-1">
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>地域</title>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9 13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {site.region}
          </div>
          <div className="flex items-center gap-1">
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>坐标</title>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1-4-10z"></path>
            </svg>
            {site.latitude.toFixed(2)}, {site.longitude.toFixed(2)}
          </div>
        </div>

        {/* 文化圈标签 */}
        {site.culturalCircle && (
          <div className="mt-3 pt-3 border-t border-fd-border/50">
            <div className="flex items-center gap-1 text-xs text-fd-muted-foreground">
              <svg
                aria-hidden="true"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>文化圈</title>
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1-4-10z"></path>
              </svg>
              {site.culturalCircle}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}
