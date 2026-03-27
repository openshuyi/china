'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import type { ArchaeologySite, CulturalCircle, SiteConnection } from '@/lib/history-data';
import { getMarkerSize, getPeriodColor } from '@/lib/map-utils';

interface InteractiveMapProps {
  sites: ArchaeologySite[];
  selectedSite: ArchaeologySite | null;
  onSiteSelect: (site: ArchaeologySite) => void;
  showHeatmap: boolean;
  showConnections: boolean;
  showCulturalCircles: boolean;
  showSiteLabels: boolean;
  connectionType: '文化圈' | '时期' | null;
  culturalCircles: CulturalCircle[];
  connections: SiteConnection[];
  className?: string;
}

function createCustomIcon(
  period: string,
  importance: '普通' | '重要' | '核心',
  isSelected: boolean = false
): L.DivIcon {
  const size = getMarkerSize(importance);
  const color = getPeriodColor(period);
  const scale = isSelected ? 1.3 : 1;
  const actualSize = size * scale;

  return L.divIcon({
    className: 'custom-marker',
    iconSize: [actualSize, actualSize],
    iconAnchor: [actualSize / 2, actualSize / 2],
    html: `
      <div style="
        width: ${actualSize}px;
        height: ${actualSize}px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3), ${isSelected ? `0 0 0 4px ${color}40` : ''};
        transition: all 0.3s ease;
        cursor: pointer;
      "></div>
    `,
  });
}

function getMapBounds(sites: ArchaeologySite[]): L.LatLngBounds {
  const bounds = L.latLngBounds([]);
  sites.forEach((site) => {
    bounds.extend([site.latitude, site.longitude]);
  });
  return bounds;
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
  showHeatmap,
  showConnections,
  showCulturalCircles,
  showSiteLabels,
  connectionType,
  culturalCircles,
  connections,
  className,
}: InteractiveMapProps) {
  const mapRef = useRef<L.Map>(null);

  // 过滤出当前需要显示的连线
  const filteredConnections = connections.filter((conn) => {
    if (!connectionType) return false;
    return conn.type === connectionType;
  });

  // 创建遗址ID到遗址的映射
  const siteMap = new Map(sites.map((site) => [site.id, site]));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={[
        'relative w-full h-[calc(100vh-60px)] rounded-2xl overflow-hidden border border-fd-border/60 bg-fd-card/80',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
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

        <MapBounds sites={sites} />

        {/* 文化圈图层 */}
        <AnimatePresence>
          {showCulturalCircles && (
            <>
              {culturalCircles.map((circle) => (
                <Circle
                  key={circle.id}
                  center={circle.center}
                  radius={circle.radius * 1000}
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
          )}
        </AnimatePresence>

        {/* 连线图层 */}
        <AnimatePresence>
          {showConnections && connectionType && (
            <>
              {filteredConnections.map((connection, index) => {
                const fromSite = siteMap.get(connection.from);
                const toSite = siteMap.get(connection.to);

                if (!fromSite || !toSite) return null;

                return (
                  <Polyline
                    key={`${connection.from}-${connection.to}-${index}`}
                    positions={[
                      [fromSite.latitude, fromSite.longitude],
                      [toSite.latitude, toSite.longitude],
                    ]}
                    color={connection.color || 'rgba(139, 92, 246, 0.6)'}
                    weight={connection.weight || 2}
                    opacity={0.6}
                    dashArray={connection.type === '时期' ? '10, 10' : undefined}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* 遗址标记点 */}
        {sites.map((site) => {
          const isSelected = selectedSite?.id === site.id;
          const icon = createCustomIcon(site.period, site.importance, isSelected);

          return (
            <Marker
              key={site.id}
              position={[site.latitude, site.longitude]}
              icon={icon}
              eventHandlers={{
                click: () => onSiteSelect(site),
              }}
            >
              {showSiteLabels && (
                <Tooltip
                  permanent
                  direction="top"
                  offset={[0, -10]}
                  className="!bg-fd-card/90 !border-fd-border/60 !text-fd-foreground !font-medium !px-2 !py-0.5 !rounded-md !shadow-sm"
                >
                  {site.name}
                </Tooltip>
              )}
              <Popup>
                <div className="text-sm max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium text-white"
                      style={{ backgroundColor: getPeriodColor(site.period) }}
                    >
                      {site.period}
                    </span>
                    {site.importance === '核心' && (
                      <span className="rounded-full bg-amber-500/20 text-amber-600 px-2 py-0.5 text-xs font-medium">
                        核心
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-fd-foreground">{site.name}</h3>
                  <p className="text-fd-muted-foreground text-xs mt-1">{site.highlight}</p>
                  <p className="text-xs text-fd-muted-foreground mt-2">
                    {site.region} · {site.latitude.toFixed(2)}, {site.longitude.toFixed(2)}
                  </p>
                </div>
              </Popup>
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
              const bounds = getMapBounds(sites);
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
            显示 {sites.length} 个遗址
          </p>
        </div>
      </div>
    </motion.div>
  );
}
