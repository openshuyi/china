# 考古地图页面实施计划

## 文件结构

```
src/
├── app/(home)/archaeology-map/
│   ├── page.tsx                    # 页面主文件（已存在，需重构）
│   └── layout.tsx                  # 可选：页面特定布局
├── components/
│   ├── map-explorer.tsx            # 地图探索器组件（已存在，需重构）
│   ├── interactive-map.tsx         # 新增：交互式地图组件
│   ├── site-marker.tsx             # 新增：遗址标记点组件
│   ├── site-card.tsx               # 新增：遗址卡片组件
│   ├── site-filter-bar.tsx         # 新增：筛选栏组件
│   ├── site-detail-modal.tsx       # 新增：遗址详情模态框
│   └── cultural-circle-layer.tsx   # 新增：文化圈图层组件
├── lib/
│   ├── history-data.ts             # 历史数据（需扩展）
│   ├── map-utils.ts                # 新增：地图工具函数
│   └── map-styles.ts               # 新增：地图样式配置
└── types/
    └── map.types.ts                # 新增：地图相关类型定义
```

## 实施步骤

### 阶段一：环境准备和数据扩展

#### 步骤 1.1：安装地图库依赖

```bash
bun add leaflet react-leaflet
bun add -d @types/leaflet
```

#### 步骤 1.2：扩展遗址数据类型

在 `src/lib/history-data.ts` 中扩展 `ArchaeologySite` 类型：

```typescript
export type ArchaeologySite = {
  id: string;
  name: string;
  region: string;
  period: string;
  latitude: number;
  longitude: number;
  highlight: string;
  significance: string;
  importance: '普通' | '重要' | '核心';
  culturalCircle?: string;
  relatedArtifacts?: string[];
  relatedEvents?: string[];
  description?: string;
};
```

#### 步骤 1.3：添加新遗址数据

在 `archaeologySites` 数组中添加更多遗址：

```typescript
export const archaeologySites: ArchaeologySite[] = [
  // 现有遗址（更新 importance 字段）
  {
    id: 'site-1',
    name: '周口店遗址',
    region: '华北',
    period: '旧石器时代',
    latitude: 39.68,
    longitude: 115.93,
    highlight: '古人类化石',
    significance: '人类演化与用火行为研究核心地点。',
    importance: '核心',
    culturalCircle: '华北文化圈',
    description: '周口店遗址是世界上材料最丰富、最系统的旧石器时代早期遗址之一...',
  },
  // ... 其他现有遗址

  // 新增遗址
  {
    id: 'site-7',
    name: '贾湖遗址',
    region: '黄河中游',
    period: '新石器时代',
    latitude: 33.62,
    longitude: 113.68,
    highlight: '骨笛与原始文字',
    significance: '发现世界上最早的吹奏乐器和可能的原生文字符号。',
    importance: '重要',
    culturalCircle: '黄河文化圈',
  },
  {
    id: 'site-8',
    name: '龙山文化遗址',
    region: '黄河中游',
    period: '新石器时代晚期',
    latitude: 36.73,
    longitude: 117.13,
    highlight: '黑陶技术',
    significance: '代表新石器时代晚期黄河流域的先进文明。',
    importance: '重要',
    culturalCircle: '黄河文化圈',
  },
  {
    id: 'site-9',
    name: '红山文化遗址',
    region: '华北',
    period: '新石器时代',
    latitude: 41.97,
    longitude: 119.57,
    highlight: '玉猪龙',
    significance: '展现东北地区独特的玉器文明和祭祀文化。',
    importance: '重要',
    culturalCircle: '东北文化圈',
  },
  {
    id: 'site-10',
    name: '马家窑文化遗址',
    region: '黄河中游',
    period: '新石器时代',
    latitude: 35.58,
    longitude: 103.83,
    highlight: '彩陶艺术',
    significance: '代表黄河上游地区彩陶文化的高峰。',
    importance: '普通',
    culturalCircle: '黄河文化圈',
  },
  {
    id: 'site-11',
    name: '大汶口文化遗址',
    region: '黄河中游',
    period: '新石器时代',
    latitude: 36.20,
    longitude: 117.12,
    highlight: '文字符号',
    significance: '发现早期文字符号，反映社会复杂化进程。',
    importance: '重要',
    culturalCircle: '黄河文化圈',
  },
  {
    id: 'site-12',
    name: '石峁遗址',
    region: '黄河中游',
    period: '新石器时代晚期',
    latitude: 38.55,
    longitude: 110.33,
    highlight: '大型石城',
    significance: '中国北方地区已发现规模最大的史前石城遗址。',
    importance: '核心',
    culturalCircle: '黄河文化圈',
  },
  {
    id: 'site-13',
    name: '陶寺遗址',
    region: '黄河中游',
    period: '新石器时代晚期',
    latitude: 35.88,
    longitude: 111.50,
    highlight: '观象台',
    significance: '发现中国最早的观象台遗迹，反映天文历法知识。',
    importance: '重要',
    culturalCircle: '黄河文化圈',
  },
];
```

### 阶段二：创建地图组件

#### 步骤 2.1：创建地图工具函数

创建 `src/lib/map-utils.ts`：

```typescript
import L from 'leaflet';
import { ArchaeologySite } from './history-data';

// 时期颜色映射
export const periodColors: Record<string, string> = {
  '旧石器时代': '#ef4444',
  '新石器时代': '#f59e0b',
  '新石器时代晚期': '#f97316',
  '青铜时代早期': '#8b5cf6',
  '青铜时代': '#7c3aed',
  '晚商': '#6d28d9',
};

// 文化圈颜色映射
export const culturalCircleColors: Record<string, string> = {
  '华北文化圈': 'rgba(59, 130, 246, 0.15)',
  '黄河文化圈': 'rgba(245, 158, 11, 0.15)',
  '长江文化圈': 'rgba(16, 185, 129, 0.15)',
  '中原文化圈': 'rgba(139, 92, 246, 0.15)',
  '西南文化圈': 'rgba(236, 72, 153, 0.15)',
};

// 获取时期颜色
export function getPeriodColor(period: string): string {
  return periodColors[period] || '#3b82f6';
}

// 获取文化圈颜色
export function getCulturalCircleColor(circle: string): string {
  return culturalCircleColors[circle] || 'rgba(107, 114, 128, 0.15)';
}

// 根据重要程度获取标记大小
export function getMarkerSize(importance: '普通' | '重要' | '核心'): number {
  switch (importance) {
    case '核心':
      return 28;
    case '重要':
      return 24;
    default:
      return 20;
  }
}

// 创建自定义标记图标
export function createCustomIcon(
  period: string,
  importance: '普通' | '重要' | '核心'
): L.DivIcon {
  const size = getMarkerSize(importance);
  const color = getPeriodColor(period);

  return L.divIcon({
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
      "></div>
    `,
  });
}

// 计算地图边界
export function getMapBounds(sites: ArchaeologySite[]): L.LatLngBounds {
  const bounds = L.latLngBounds([]);
  sites.forEach((site) => {
    bounds.extend([site.latitude, site.longitude]);
  });
  return bounds;
}
```

#### 步骤 2.2：创建交互式地图组件

创建 `src/components/interactive-map.tsx`：

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { ArchaeologySite } from '@/lib/history-data';
import { createCustomIcon, getMapBounds } from '@/lib/map-utils';

interface InteractiveMapProps {
  sites: ArchaeologySite[];
  selectedSite: ArchaeologySite | null;
  onSiteSelect: (site: ArchaeologySite) => void;
  filteredSites: ArchaeologySite[];
}

// 地图边界控制组件
function MapBounds({ sites }: { sites: ArchaeologySite[] }) {
  const map = useMap();

  useEffect(() => {
    if (sites.length > 0) {
      const bounds = getMapBounds(sites);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [sites, map]);

  return null;
}

export function InteractiveMap({
  sites,
  selectedSite,
  onSiteSelect,
  filteredSites,
}: InteractiveMapProps) {
  const mapRef = useRef<L.Map>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative h-full min-h-[500px] rounded-2xl overflow-hidden border border-fd-border/60 bg-fd-card/80 shadow-xl"
    >
      <MapContainer
        ref={mapRef}
        center={[35, 110]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        <MapBounds sites={filteredSites} />

        {sites.map((site) => {
          const icon = createCustomIcon(site.period, site.importance);
          const isSelected = selectedSite?.id === site.id;

          return (
            <Marker
              key={site.id}
              position={[site.latitude, site.longitude]}
              icon={icon}
              eventHandlers={{
                click: () => onSiteSelect(site),
              }}
            >
              {/* 可以添加 Popup 组件显示基本信息 */}
            </Marker>
          );
        })}
      </MapContainer>

      {/* 地图控制按钮 */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-fd-card border border-fd-border/60 shadow-lg hover:bg-fd-primary/10 transition-colors"
          onClick={() => {
            if (mapRef.current) {
              const bounds = getMapBounds(filteredSites);
              mapRef.current.fitBounds(bounds, { padding: [50, 50] });
            }
          }}
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
            <title>重置视图</title>
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      {/* 遗址数量统计 */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <div className="rounded-lg bg-fd-card/90 backdrop-blur-sm border border-fd-border/60 px-4 py-2 shadow-lg">
          <p className="text-sm font-medium text-fd-foreground">
            显示 {filteredSites.length} 个遗址
          </p>
        </div>
      </div>
    </motion.div>
  );
}
```

#### 步骤 2.3：创建遗址卡片组件

创建 `src/components/site-card.tsx`：

```typescript
'use client';

import { motion } from 'framer-motion';
import { ArchaeologySite } from '@/lib/history-data';
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

        {/* 地区和坐标 */}
        <div className="flex items-center gap-4 text-xs text-fd-muted-foreground">
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
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
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
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            {site.latitude.toFixed(2)}, {site.longitude.toFixed(2)}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
```

#### 步骤 2.4：创建筛选栏组件

创建 `src/components/site-filter-bar.tsx`：

```typescript
'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { archaeologySites, type ArchaeologySite } from '@/lib/history-data';

interface SiteFilterBarProps {
  selectedRegion: string;
  selectedPeriod: string;
  onRegionChange: (region: string) => void;
  onPeriodChange: (period: string) => void;
  filteredCount: number;
}

export function SiteFilterBar({
  selectedRegion,
  selectedPeriod,
  onRegionChange,
  onPeriodChange,
  filteredCount,
}: SiteFilterBarProps) {
  const regions = useMemo(() => {
    const values = new Set<string>(['全部']);
    for (const site of archaeologySites) values.add(site.region);
    return Array.from(values);
  }, []);

  const periods = useMemo(() => {
    const values = new Set<string>(['全部']);
    for (const site of archaeologySites) values.add(site.period);
    return Array.from(values);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-16 z-30 grid gap-4 md:grid-cols-2 rounded-2xl border border-fd-border/50 bg-fd-background/60 p-4 backdrop-blur-xl shadow-lg shadow-black/5"
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
                "relative rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300",
                selectedRegion === region
                  ? 'border-transparent text-white shadow-md'
                  : 'border-fd-border text-fd-muted-foreground hover:border-fd-primary/40 hover:text-fd-foreground'
              )}
            >
              {selectedRegion === region && (
                <motion.div
                  layoutId="region-active-pill"
                  className="absolute inset-0 rounded-full bg-fd-primary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
                "relative rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300",
                selectedPeriod === period
                  ? 'border-transparent text-white shadow-md'
                  : 'border-fd-border text-fd-muted-foreground hover:border-blue-500/40 hover:text-fd-foreground'
              )}
            >
              {selectedPeriod === period && (
                <motion.div
                  layoutId="period-active-pill"
                  className="absolute inset-0 rounded-full bg-blue-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  style={{ zIndex: -1 }}
                />
              )}
              {period}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
```

#### 步骤 2.5：创建遗址详情模态框

创建 `src/components/site-detail-modal.tsx`：

```typescript
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArchaeologySite } from '@/lib/history-data';
import { getPeriodColor } from '@/lib/map-utils';
import { artifacts, timelineEvents } from '@/lib/history-data';

interface SiteDetailModalProps {
  site: ArchaeologySite | null;
  onClose: () => void;
}

export function SiteDetailModal({ site, onClose }: SiteDetailModalProps) {
  const relatedArtifacts = artifacts.filter((artifact) =>
    site?.relatedArtifacts?.includes(artifact.id)
  );

  const relatedEvents = timelineEvents.filter((event) =>
    site?.relatedEvents?.includes(event.id)
  );

  return (
    <AnimatePresence>
      {site && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* 模态框 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2"
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
                          className="rounded-full px-3 py-1 text-sm font-medium text-white"
                          style={{ backgroundColor: getPeriodColor(site.period) }}
                        >
                          {site.period}
                        </span>
                        {site.importance === '核心' && (
                          <span className="rounded-full bg-amber-500/20 text-amber-600 px-3 py-1 text-sm font-medium">
                            核心遗址
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
                        <title>关闭</title>
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

                {/* 关联事件 */}
                {relatedEvents.length > 0 && (
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### 阶段三：重构页面和主组件

#### 步骤 3.1：重构页面文件

更新 `src/app/(home)/archaeology-map/page.tsx`：

```typescript
import type { Metadata } from 'next';
import { MapExplorer } from '@/components/map-explorer';

export const metadata: Metadata = {
  title: '考古地图 - 空间分布视图',
  description: '按区域查看遗址分布与坐标，理解文明的空间结构。',
};

export default function ArchaeologyMapPage() {
  return (
    <main className="relative mx-auto w-full max-w-6xl flex-1 space-y-12 px-4 py-10 md:px-6 overflow-hidden">
      {/* 炫酷背景光晕 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-fd-primary/10 blur-[100px] rounded-[100%] pointer-events-none -z-10" />
      <div className="absolute top-40 -left-40 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-80 -right-40 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* 页面标题区 */}
      <section className="relative rounded-3xl border border-fd-border/50 bg-fd-background/40 backdrop-blur-md p-10 md:p-16 text-center shadow-2xl overflow-hidden">
        {/* 装饰性网格背景 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

        <div className="inline-flex items-center rounded-full border border-fd-primary/30 bg-fd-primary/10 px-3 py-1 text-sm font-medium text-fd-primary mb-6 shadow-[0_0_15px_rgba(var(--fd-primary-rgb),0.2)]">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fd-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-fd-primary"></span>
          </span>
          空间分布视图
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-fd-foreground to-fd-foreground/60 drop-shadow-sm">
          考古遗址地图
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-fd-muted-foreground leading-relaxed">
          从遗址的地域分布、时间层位与核心发现，观察不同文化圈之间的联系与差异。
          <br className="hidden md:block" />
          通过地理空间维度，探索中华文明形成的物质证据。
        </p>
      </section>

      <MapExplorer />
    </main>
  );
}
```

#### 步骤 3.2：重构地图探索器组件

更新 `src/components/map-explorer.tsx`：

```typescript
'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { archaeologySites, type ArchaeologySite } from '@/lib/history-data';
import { InteractiveMap } from '@/components/interactive-map';
import { SiteCard } from '@/components/site-card';
import { SiteFilterBar } from '@/components/site-filter-bar';
import { SiteDetailModal } from '@/components/site-detail-modal';

type ViewMode = '地图' | '列表' | '混合';

export function MapExplorer() {
  const [selectedRegion, setSelectedRegion] = useState('全部');
  const [selectedPeriod, setSelectedPeriod] = useState('全部');
  const [selectedSite, setSelectedSite] = useState<ArchaeologySite | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('混合');

  const filteredSites = useMemo(() => {
    return archaeologySites.filter((site) => {
      if (selectedRegion !== '全部' && site.region !== selectedRegion) return false;
      if (selectedPeriod !== '全部' && site.period !== selectedPeriod) return false;
      return true;
    });
  }, [selectedRegion, selectedPeriod]);

  const handleSiteSelect = (site: ArchaeologySite) => {
    setSelectedSite(site);
  };

  const handleCloseModal = () => {
    setSelectedSite(null);
  };

  return (
    <section className="space-y-6">
      {/* 筛选栏 */}
      <SiteFilterBar
        selectedRegion={selectedRegion}
        selectedPeriod={selectedPeriod}
        onRegionChange={setSelectedRegion}
        onPeriodChange={setSelectedPeriod}
        filteredCount={filteredSites.length}
      />

      {/* 视图模式切换 */}
      <div className="flex items-center justify-center gap-2">
        {(['地图', '列表', '混合'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setViewMode(mode)}
            className={`
              rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300
              ${viewMode === mode
                ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                : 'border-fd-border text-fd-muted-foreground hover:border-fd-primary/40'
              }
            `}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* 主内容区 */}
      {viewMode === '地图' ? (
        <InteractiveMap
          sites={filteredSites}
          selectedSite={selectedSite}
          onSiteSelect={handleSiteSelect}
          filteredSites={filteredSites}
        />
      ) : viewMode === '列表' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-4 md:grid-cols-2"
        >
          {filteredSites.map((site) => (
            <SiteCard
              key={site.id}
              site={site}
              isSelected={selectedSite?.id === site.id}
              onSelect={() => handleSiteSelect(site)}
            />
          ))}
        </motion.div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-1">
            <InteractiveMap
              sites={filteredSites}
              selectedSite={selectedSite}
              onSiteSelect={handleSiteSelect}
              filteredSites={filteredSites}
            />
          </div>
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 max-h-[600px] overflow-y-auto pr-2"
            >
              {filteredSites.map((site) => (
                <SiteCard
                  key={site.id}
                  site={site}
                  isSelected={selectedSite?.id === site.id}
                  onSelect={() => handleSiteSelect(site)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      )}

      {/* 空状态 */}
      {filteredSites.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-fd-muted-foreground"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fd-muted/30 mb-4">
            <svg
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>未找到</title>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <p className="text-lg">未找到匹配的遗址</p>
          <p className="text-sm mt-1">请尝试调整筛选条件</p>
        </motion.div>
      )}

      {/* 遗址详情模态框 */}
      <SiteDetailModal site={selectedSite} onClose={handleCloseModal} />
    </section>
  );
}
```

### 阶段四：添加 Leaflet CSS

#### 步骤 4.1：在全局样式中导入 Leaflet CSS

更新 `src/app/global.css`：

```css
@import "tailwindcss";

/* Leaflet 样式 */
@import "leaflet/dist/leaflet.css";

/* 自定义地图标记样式 */
.custom-marker {
  transition: all 0.3s ease;
}

.custom-marker:hover {
  transform: scale(1.2);
}
```

### 阶段五：测试和优化

#### 步骤 5.1：运行开发服务器测试

```bash
bun run dev
```

#### 步骤 5.2：测试清单

- [ ] 地图正常加载和显示
- [ ] 遗址标记点正确显示
- [ ] 筛选功能正常工作
- [ ] 点击标记点打开详情模态框
- [ ] 视图模式切换正常
- [ ] 响应式布局在移动端正常
- [ ] 动画效果流畅
- [ ] 无控制台错误

#### 步骤 5.3：性能优化

- [ ] 实现地图组件懒加载
- [ ] 优化标记点渲染性能
- [ ] 添加加载状态

#### 步骤 5.4：可访问性优化

- [ ] 添加 ARIA 标签
- [ ] 支持键盘导航
- [ ] 确保颜色对比度符合标准

## 总结

本实施计划将考古地图页面从基础的列表视图升级为功能完整、视觉精美的交互式地图应用，包括：

1. **交互式地图**：使用 React Leaflet 实现真正的地图可视化
2. **多维筛选**：按地区和时期筛选遗址
3. **多种视图**：地图、列表、混合三种视图模式
4. **详情展示**：模态框展示遗址详细信息
5. **视觉优化**：与时间轴页面一致的现代化设计风格
6. **数据扩展**：添加更多重要遗址数据

实施完成后，用户将能够通过地理空间维度直观地探索中华文明的遗址分布，理解不同文化圈之间的联系与差异。
