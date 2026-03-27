'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import type { ArchaeologySite } from '@/lib/history-data';
import { getRegions, getPeriods } from '@/lib/map-utils';

interface SiteFilterBarProps {
  sites: ArchaeologySite[];
  selectedRegion: string;
  selectedPeriod: string;
  onRegionChange: (region: string) => void;
  onPeriodChange: (period: string) => void;
  filteredCount: number;
  showHeatmap: boolean;
  showConnections: boolean;
  showCulturalCircles: boolean;
  showSiteLabels: boolean;
  connectionType: '文化圈' | '时期' | null;
  onHeatmapToggle: (show: boolean) => void;
  onConnectionsToggle: (show: boolean) => void;
  onCulturalCirclesToggle: (show: boolean) => void;
  onSiteLabelsToggle: (show: boolean) => void;
  onConnectionTypeChange: (type: '文化圈' | '时期' | null) => void;
}

export function SiteFilterBar({
  sites,
  selectedRegion,
  selectedPeriod,
  onRegionChange,
  onPeriodChange,
  filteredCount,
  showHeatmap,
  showConnections,
  showCulturalCircles,
  showSiteLabels,
  connectionType,
  onHeatmapToggle,
  onConnectionsToggle,
  onCulturalCirclesToggle,
  onSiteLabelsToggle,
  onConnectionTypeChange,
}: SiteFilterBarProps) {
  const regions = useMemo(() => getRegions(sites), [sites]);
  const periods = useMemo(() => getPeriods(sites), [sites]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-h-[calc(100vh-240px)] overflow-y-auto space-y-4 rounded-2xl border border-fd-border/50 bg-fd-background/60 p-4 backdrop-blur-xl shadow-lg shadow-black/5"
    >
      {/* 地区筛选 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-fd-muted-foreground flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-fd-primary inline-block"></span>
            地区筛选
          </h3>
          <span className="text-xs text-fd-muted-foreground">
            {filteredCount} 个遗址
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {regions.map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => onRegionChange(region)}
              className={clsx(
                'relative rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300',
                selectedRegion === region
                  ? 'border-transparent text-white shadow-md'
                  : 'border-fd-border text-fd-muted-foreground hover:border-fd-primary/40 hover:text-fd-foreground'
              )}
            >
              {selectedRegion === region && (
                <motion.div
                  layoutId="region-active-pill"
                  className="absolute inset-0 rounded-full bg-fd-primary"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* 时期筛选 */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-fd-muted-foreground flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-blue-500 inline-block"></span>
          时期筛选
        </h3>
        <div className="flex flex-wrap gap-2">
          {periods.map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => onPeriodChange(period)}
              className={clsx(
                'relative rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300',
                selectedPeriod === period
                  ? 'border-transparent text-white shadow-md'
                  : 'border-fd-border text-fd-muted-foreground hover:border-blue-500/40 hover:text-fd-foreground'
              )}
            >
              {selectedPeriod === period && (
                <motion.div
                  layoutId="period-active-pill"
                  className="absolute inset-0 rounded-full bg-blue-500"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* 图层控制 */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-fd-muted-foreground flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-purple-500 inline-block"></span>
          图层控制
        </h3>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCulturalCircles}
              onChange={(e) => onCulturalCirclesToggle(e.target.checked)}
              className="w-4 h-4 rounded border-fd-border text-fd-primary focus:ring-fd-primary"
            />
            <span className="text-sm text-fd-foreground">文化圈</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showHeatmap}
              onChange={(e) => onHeatmapToggle(e.target.checked)}
              className="w-4 h-4 rounded border-fd-border text-fd-primary focus:ring-fd-primary"
            />
            <span className="text-sm text-fd-foreground">热力图</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showConnections}
              onChange={(e) => onConnectionsToggle(e.target.checked)}
              className="w-4 h-4 rounded border-fd-border text-fd-primary focus:ring-fd-primary"
            />
            <span className="text-sm text-fd-foreground">连线</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showSiteLabels}
              onChange={(e) => onSiteLabelsToggle(e.target.checked)}
              className="w-4 h-4 rounded border-fd-border text-fd-primary focus:ring-fd-primary"
            />
            <span className="text-sm text-fd-foreground">遗址名称</span>
          </label>
        </div>

        {/* 连线类型选择 */}
        {showConnections && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex gap-2 mt-2 ml-6"
          >
            {(['文化圈', '时期'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onConnectionTypeChange(connectionType === type ? null : type)}
                className={clsx(
                  'rounded-lg border px-3 py-1 text-xs transition-all',
                  connectionType === type
                    ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                    : 'border-fd-border text-fd-muted-foreground hover:border-fd-primary/40'
                )}
              >
                {type}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
