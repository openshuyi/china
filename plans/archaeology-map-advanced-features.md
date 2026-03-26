# 考古地图页面高级功能设计

## 1. 开源免费地图方案

### 1.1 推荐方案：OpenStreetMap + CartoDB

**优势：**
- 完全免费，无需 API 密钥
- 开源数据，社区维护
- 多种底图样式可选
- 高质量的中国地图数据

**底图选项：**
1. **CartoDB Positron**（推荐）：浅色简洁，适合数据可视化
2. **CartoDB Voyager**：更简洁的浅色底图
3. **OpenStreetMap Standard**：标准底图
4. **Stamen Toner**：黑白风格，适合打印

### 1.2 实现方案

```typescript
// 使用 CartoDB Positron 底图
<TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
/>
```

### 1.3 替代方案

**方案二：MapTiler**
- 免费额度：每月 100,000 次请求
- 需要注册获取 API 密钥
- 提供更多底图样式

**方案三：Stamen Maps**
- 完全免费
- 风格独特（Toner, Watercolor, Terrain）
- 适合艺术化展示

## 2. 遗址密度热力图

### 2.1 技术实现

使用 `react-leaflet-heatmap-layer` 库：

```bash
bun add react-leaflet-heatmap-layer
```

### 2.2 热力图数据结构

```typescript
export type HeatmapPoint = {
  lat: number;
  lng: number;
  intensity: number; // 0-1 之间的强度值
};
```

### 2.3 热力图配置

```typescript
const heatmapOptions = {
  radius: 25,          // 热力点半径
  maxZoom: 10,         // 最大缩放级别
  max: 1.0,            // 最大强度值
  minOpacity: 0.1,     // 最小透明度
  gradient: {
    0.0: 'blue',
    0.2: 'cyan',
    0.4: 'lime',
    0.6: 'yellow',
    0.8: 'orange',
    1.0: 'red',
  },
};
```

### 2.4 热力图组件

```typescript
'use client';

import { HeatmapLayer } from 'react-leaflet-heatmap-layer';
import { ArchaeologySite } from '@/lib/history-data';

interface HeatmapViewProps {
  sites: ArchaeologySite[];
  showHeatmap: boolean;
}

export function HeatmapView({ sites, showHeatmap }: HeatmapViewProps) {
  const heatmapData = sites.map((site) => ({
    lat: site.latitude,
    lng: site.longitude,
    intensity: site.importance === '核心' ? 1.0 : site.importance === '重要' ? 0.7 : 0.4,
  }));

  if (!showHeatmap) return null;

  return (
    <HeatmapLayer
      points={heatmapData}
      longitudeExtractor={(point) => point.lng}
      latitudeExtractor={(point) => point.lat}
      intensityExtractor={(point) => point.intensity}
      {...heatmapOptions}
    />
  );
}
```

### 2.5 热力图控制开关

在筛选栏中添加热力图开关：

```typescript
<div className="flex items-center gap-3">
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={showHeatmap}
      onChange={(e) => setShowHeatmap(e.target.checked)}
      className="w-4 h-4 rounded border-fd-border text-fd-primary focus:ring-fd-primary"
    />
    <span className="text-sm text-fd-foreground">显示热力图</span>
  </label>
</div>
```

## 3. 遗址连线功能

### 3.1 连线类型

1. **文化圈内连线**：同一文化圈内的遗址之间连线
2. **时期连线**：同一时期的遗址之间连线
3. **自定义连线**：用户手动选择的遗址之间连线

### 3.2 连线数据结构

```typescript
export type SiteConnection = {
  from: string; // 遗址ID
  to: string;   // 遗址ID
  type: '文化圈' | '时期' | '自定义';
  weight?: number; // 连线粗细
  color?: string; // 连线颜色
};
```

### 3.3 连线组件

```typescript
'use client';

import { Polyline } from 'react-leaflet';
import { ArchaeologySite, SiteConnection } from '@/lib/history-data';

interface ConnectionLayerProps {
  sites: ArchaeologySite[];
  connections: SiteConnection[];
  showConnections: boolean;
}

export function ConnectionLayer({ sites, connections, showConnections }: ConnectionLayerProps) {
  if (!showConnections) return null;

  const siteMap = new Map(sites.map((site) => [site.id, site]));

  return (
    <>
      {connections.map((connection, index) => {
        const fromSite = siteMap.get(connection.from);
        const toSite = siteMap.get(connection.to);

        if (!fromSite || !toSite) return null;

        const color = connection.color || getConnectionColor(connection.type);
        const weight = connection.weight || getConnectionWeight(connection.type);

        return (
          <Polyline
            key={`${connection.from}-${connection.to}-${index}`}
            positions={[
              [fromSite.latitude, fromSite.longitude],
              [toSite.latitude, toSite.longitude],
            ]}
            color={color}
            weight={weight}
            opacity={0.6}
            dashArray={connection.type === '自定义' ? '10, 10' : undefined}
          />
        );
      })}
    </>
  );
}

function getConnectionColor(type: SiteConnection['type']): string {
  switch (type) {
    case '文化圈':
      return '#3b82f6';
    case '时期':
      return '#8b5cf6';
    case '自定义':
      return '#f59e0b';
    default:
      return '#6b7280';
  }
}

function getConnectionWeight(type: SiteConnection['type']): number {
  switch (type) {
    case '文化圈':
      return 3;
    case '时期':
      return 2;
    case '自定义':
      return 4;
    default:
      return 2;
  }
}
```

### 3.4 连线控制面板

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

type ConnectionType = '文化圈' | '时期' | '自定义';

interface ConnectionControlProps {
  showConnections: boolean;
  onToggleConnections: (show: boolean) => void;
  connectionType: ConnectionType | null;
  onConnectionTypeChange: (type: ConnectionType | null) => void;
}

export function ConnectionControl({
  showConnections,
  onToggleConnections,
  connectionType,
  onConnectionTypeChange,
}: ConnectionControlProps) {
  const connectionTypes: ConnectionType[] = ['文化圈', '时期', '自定义'];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-fd-border/60 bg-fd-card/80 p-4 space-y-3"
    >
      {/* 总开关 */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-fd-foreground">遗址连线</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showConnections}
            onChange={(e) => onToggleConnections(e.target.checked)}
            className="w-4 h-4 rounded border-fd-border text-fd-primary focus:ring-fd-primary"
          />
          <span className="text-xs text-fd-muted-foreground">启用</span>
        </label>
      </div>

      {/* 连线类型选择 */}
      {showConnections && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          {connectionTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                onConnectionTypeChange(connectionType === type ? null : type)
              }
              className={clsx(
                'w-full rounded-lg border px-3 py-2 text-left text-sm transition-all',
                connectionType === type
                  ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                  : 'border-fd-border text-fd-muted-foreground hover:border-fd-primary/40'
              )}
            >
              <div className="flex items-center justify-between">
                <span>{type}</span>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: getConnectionColor(type),
                  }}
                />
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
```

### 3.5 自动生成连线

```typescript
// 在 map-utils.ts 中添加
export function generateConnections(
  sites: ArchaeologySite[],
  type: '文化圈' | '时期'
): SiteConnection[] {
  const connections: SiteConnection[] = [];

  if (type === '文化圈') {
    // 按文化圈分组
    const circleGroups = new Map<string, ArchaeologySite[]>();
    sites.forEach((site) => {
      if (site.culturalCircle) {
        const group = circleGroups.get(site.culturalCircle) || [];
        group.push(site);
        circleGroups.set(site.culturalCircle, group);
      }
    });

    // 为每个文化圈生成连线
    circleGroups.forEach((groupSites) => {
      for (let i = 0; i < groupSites.length; i++) {
        for (let j = i + 1; j < groupSites.length; j++) {
          connections.push({
            from: groupSites[i].id,
            to: groupSites[j].id,
            type: '文化圈',
          });
        }
      }
    });
  } else if (type === '时期') {
    // 按时期分组
    const periodGroups = new Map<string, ArchaeologySite[]>();
    sites.forEach((site) => {
      const group = periodGroups.get(site.period) || [];
      group.push(site);
      periodGroups.set(site.period, group);
    });

    // 为每个时期生成连线
    periodGroups.forEach((groupSites) => {
      for (let i = 0; i < groupSites.length; i++) {
        for (let j = i + 1; j < groupSites.length; j++) {
          connections.push({
            from: groupSites[i].id,
            to: groupSites[j].id,
            type: '时期',
          });
        }
      }
    });
  }

  return connections;
}
```

## 4. 文化圈区域可视化

### 4.1 文化圈定义

```typescript
export type CulturalCircle = {
  id: string;
  name: string;
  color: string;
  region: string;
  center: [number, number]; // [latitude, longitude]
  radius: number; // 半径（公里）
  sites: string[]; // 包含的遗址ID
};
```

### 4.2 文化圈数据

```typescript
export const culturalCircles: CulturalCircle[] = [
  {
    id: 'circle-north',
    name: '华北文化圈',
    color: 'rgba(59, 130, 246, 0.15)',
    region: '华北',
    center: [39.5, 116.0],
    radius: 300,
    sites: ['site-1', 'site-9'],
  },
  {
    id: 'circle-yellow',
    name: '黄河文化圈',
    color: 'rgba(245, 158, 11, 0.15)',
    region: '黄河中游',
    center: [34.5, 111.0],
    radius: 400,
    sites: ['site-2', 'site-4', 'site-5', 'site-7', 'site-8', 'site-10', 'site-11', 'site-12', 'site-13'],
  },
  {
    id: 'circle-yangtze',
    name: '长江文化圈',
    color: 'rgba(16, 185, 129, 0.15)',
    region: '长江下游',
    center: [30.5, 120.0],
    radius: 300,
    sites: ['site-3'],
  },
  {
    id: 'circle-central',
    name: '中原文化圈',
    color: 'rgba(139, 92, 246, 0.15)',
    region: '中原',
    center: [34.8, 113.5],
    radius: 250,
    sites: ['site-4', 'site-5'],
  },
  {
    id: 'circle-southwest',
    name: '西南文化圈',
    color: 'rgba(236, 72, 153, 0.15)',
    region: '西南',
    center: [30.5, 104.0],
    radius: 250,
    sites: ['site-6'],
  },
];
```

### 4.3 文化圈图层组件

```typescript
'use client';

import { Circle, Popup } from 'react-leaflet';
import { CulturalCircle } from '@/lib/history-data';

interface CulturalCircleLayerProps {
  circles: CulturalCircle[];
  showCircles: boolean;
}

export function CulturalCircleLayer({ circles, showCircles }: CulturalCircleLayerProps) {
  if (!showCircles) return null;

  return (
    <>
      {circles.map((circle) => (
        <Circle
          key={circle.id}
          center={circle.center}
          radius={circle.radius * 1000} // 转换为米
          pathOptions={{
            color: circle.color.replace('0.15', '0.4'),
            fillColor: circle.color,
            fillOpacity: 0.15,
            weight: 2,
          }}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold mb-1">{circle.name}</h3>
              <p className="text-fd-muted-foreground">
                包含 {circle.sites.length} 个遗址
              </p>
            </div>
          </Popup>
        </Circle>
      ))}
    </>
  );
}
```

### 4.4 文化圈控制开关

```typescript
<div className="flex items-center gap-3">
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={showCulturalCircles}
      onChange={(e) => setShowCulturalCircles(e.target.checked)}
      className="w-4 h-4 rounded border-fd-border text-fd-primary focus:ring-fd-primary"
    />
    <span className="text-sm text-fd-foreground">显示文化圈</span>
  </label>
</div>
```

## 5. 更新的依赖列表

```json
{
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "react-leaflet-heatmap-layer": "^2.0.0",
  "@types/leaflet": "^1.9.8"
}
```

## 6. 更新的文件结构

```
src/
├── components/
│   ├── map-explorer.tsx            # 地图探索器组件（需重构）
│   ├── interactive-map.tsx         # 交互式地图组件
│   ├── site-marker.tsx             # 遗址标记点组件
│   ├── site-card.tsx               # 遗址卡片组件
│   ├── site-filter-bar.tsx         # 筛选栏组件
│   ├── site-detail-modal.tsx       # 遗址详情模态框
│   ├── heatmap-view.tsx            # 热力图视图组件（新增）
│   ├── connection-layer.tsx        # 连线图层组件（新增）
│   ├── connection-control.tsx      # 连线控制面板（新增）
│   └── cultural-circle-layer.tsx   # 文化圈图层组件（新增）
├── lib/
│   ├── history-data.ts             # 历史数据（需扩展）
│   ├── map-utils.ts                # 地图工具函数
│   └── map-styles.ts               # 地图样式配置
└── types/
    └── map.types.ts                # 地图相关类型定义
```

## 7. 更新的交互式地图组件

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { ArchaeologySite } from '@/lib/history-data';
import { createCustomIcon, getMapBounds } from '@/lib/map-utils';
import { HeatmapView } from '@/components/heatmap-view';
import { ConnectionLayer } from '@/components/connection-layer';
import { CulturalCircleLayer } from '@/components/cultural-circle-layer';
import { culturalCircles } from '@/lib/history-data';
import { generateConnections } from '@/lib/map-utils';

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
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const [connectionType, setConnectionType] = useState<'文化圈' | '时期' | null>(null);
  const [showCulturalCircles, setShowCulturalCircles] = useState(true);

  const connections = connectionType
    ? generateConnections(filteredSites, connectionType)
    : [];

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

        {/* 文化圈图层 */}
        <CulturalCircleLayer
          circles={culturalCircles}
          showCircles={showCulturalCircles}
        />

        {/* 热力图图层 */}
        <HeatmapView sites={filteredSites} showHeatmap={showHeatmap} />

        {/* 连线图层 */}
        <ConnectionLayer
          sites={filteredSites}
          connections={connections}
          showConnections={showConnections}
        />

        {/* 遗址标记点 */}
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
            />
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

      {/* 图层控制面板 */}
      <div className="absolute top-4 left-4 z-[1000] w-64">
        <div className="rounded-xl border border-fd-border/60 bg-fd-card/90 backdrop-blur-sm p-4 space-y-4 shadow-lg">
          {/* 文化圈开关 */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="show-circles"
              checked={showCulturalCircles}
              onChange={(e) => setShowCulturalCircles(e.target.checked)}
              className="w-4 h-4 rounded border-fd-border text-fd-primary focus:ring-fd-primary"
            />
            <label
              htmlFor="show-circles"
              className="text-sm text-fd-foreground cursor-pointer"
            >
              显示文化圈
            </label>
          </div>

          {/* 热力图开关 */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="show-heatmap"
              checked={showHeatmap}
              onChange={(e) => setShowHeatmap(e.target.checked)}
              className="w-4 h-4 rounded border-fd-border text-fd-primary focus:ring-fd-primary"
            />
            <label
              htmlFor="show-heatmap"
              className="text-sm text-fd-foreground cursor-pointer"
            >
              显示热力图
            </label>
          </div>

          {/* 连线开关 */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="show-connections"
                checked={showConnections}
                onChange={(e) => setShowConnections(e.target.checked)}
                className="w-4 h-4 rounded border-fd-border text-fd-primary focus:ring-fd-primary"
              />
              <label
                htmlFor="show-connections"
                className="text-sm text-fd-foreground cursor-pointer"
              >
                显示连线
              </label>
            </div>

            {/* 连线类型选择 */}
            {showConnections && (
              <div className="flex gap-2 ml-7">
                {(['文化圈', '时期'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setConnectionType(connectionType === type ? null : type)
                    }
                    className={`
                      rounded-lg border px-2 py-1 text-xs transition-all
                      ${connectionType === type
                        ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                        : 'border-fd-border text-fd-muted-foreground hover:border-fd-primary/40'
                      }
                    `}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
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

## 8. 图例组件

```typescript
'use client';

import { motion } from 'framer-motion';
import { periodColors } from '@/lib/map-utils';

export function MapLegend() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl border border-fd-border/60 bg-fd-card/90 backdrop-blur-sm p-4 shadow-lg"
    >
      <h3 className="text-sm font-semibold text-fd-foreground mb-3">图例</h3>

      {/* 时期图例 */}
      <div className="space-y-2">
        <p className="text-xs text-fd-muted-foreground mb-2">时期</p>
        {Object.entries(periodColors).map(([period, color]) => (
          <div key={period} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-fd-foreground">{period}</span>
          </div>
        ))}
      </div>

      {/* 重要程度图例 */}
      <div className="mt-4 space-y-2">
        <p className="text-xs text-fd-muted-foreground mb-2">重要程度</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-fd-foreground" />
            <span className="text-xs text-fd-foreground">核心</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-fd-foreground" />
            <span className="text-xs text-fd-foreground">重要</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-fd-foreground" />
            <span className="text-xs text-fd-foreground">普通</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

## 9. 总结

更新后的考古地图页面包含以下高级功能：

1. **真正的地图交互**：使用 OpenStreetMap + CartoDB，完全免费开源
2. **遗址密度热力图**：可视化遗址分布密度，支持开关控制
3. **遗址连线功能**：
   - 文化圈内连线
   - 时期连线
   - 可控制开关和类型选择
4. **文化圈区域可视化**：使用半透明圆形区域表示文化圈
5. **炫酷设计风格**：保持与时间轴页面一致的现代化设计
6. **详细信息模态框**：展示遗址详情和关联文物
7. **图例组件**：清晰展示时期和重要程度的颜色编码

所有功能都支持开关控制，用户可以根据需要自由组合显示不同的图层。
