'use client';

import { useMemo } from 'react';
import { periodColors } from '@/lib/map-utils';

export function MapLegend() {
  return (
    <div className="rounded-xl border border-fd-border/60 bg-fd-card/90 backdrop-blur-sm p-4 shadow-lg">
      {/* 时期图例 */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-fd-foreground mb-3">时期</h3>
      <div className="space-y-2">
          {Object.entries(periodColors).map(([period, color]) => (
          <div key={period} className="flex items-center gap-2">
              <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs font-medium text-fd-foreground">{period}</span>
          </div>
        ))}
      </div>
      </div>

      {/* 重要程度图例 */}
      <div>
        <h3 className="text-sm font-semibold text-fd-foreground mb-3">重要程度</h3>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-fd-foreground" />
          <span className="text-xs font-medium text-fd-foreground">核心</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-fd-foreground" />
          <span className="text-xs font-medium text-fd-foreground">重要</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-fd-foreground" />
          <span className="text-xs font-medium text-fd-foreground">普通</span>
        </div>
      </div>
      </div>
    </div>
  );
}
