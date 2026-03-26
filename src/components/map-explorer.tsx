'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import {
  archaeologySites,
  culturalCircles,
  siteConnections,
  artifacts,
  timelineEvents,
  type ArchaeologySite,
} from '@/lib/history-data';
import { InteractiveMap } from '@/components/interactive-map';
import { SiteCard } from '@/components/site-card';
import { SiteFilterBar } from '@/components/site-filter-bar';
import { SiteDetailModal } from '@/components/site-detail-modal';

type ViewMode = '地图' | '列表' | '混合';

export function MapExplorer() {
  const [selectedSite, setSelectedSite] = useState<ArchaeologySite | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('地图');
  const [selectedRegion, setSelectedRegion] = useState('全部');
  const [selectedPeriod, setSelectedPeriod] = useState('全部');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showConnections, setShowConnections] = useState(false);
  const [showCulturalCircles, setShowCulturalCircles] = useState(true);
  const [connectionType, setConnectionType] = useState<'文化圈' | '时期' | null>(null);

  // 筛选逻辑
  const filteredSites = useMemo(() => {
    return archaeologySites.filter((site) => {
      if (selectedRegion !== '全部' && site.region !== selectedRegion) return false;
      if (selectedPeriod !== '全部' && site.period !== selectedPeriod) return false;
      return true;
    });
  }, [selectedRegion, selectedPeriod]);

  // 视图模式切换
  const viewModes: ViewMode[] = ['地图', '列表', '混合'];

  return (
    <section className="space-y-6">
      {/* 筛选栏 */}
      <SiteFilterBar
        sites={archaeologySites}
        selectedRegion={selectedRegion}
        selectedPeriod={selectedPeriod}
        onRegionChange={setSelectedRegion}
        onPeriodChange={setSelectedPeriod}
        filteredCount={filteredSites.length}
        showHeatmap={showHeatmap}
        showConnections={showConnections}
        showCulturalCircles={showCulturalCircles}
        connectionType={connectionType}
        onHeatmapToggle={setShowHeatmap}
        onConnectionsToggle={setShowConnections}
        onCulturalCirclesToggle={setShowCulturalCircles}
        onConnectionTypeChange={setConnectionType}
      />

      {/* 视图模式切换 */}
      <div className="flex items-center justify-center gap-2">
        {viewModes.map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setViewMode(mode)}
            className={clsx(
              'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
              viewMode === mode
                ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                : 'border-fd-border text-fd-muted-foreground hover:border-fd-primary/40 hover:text-fd-foreground'
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* 主内容区 */}
      {viewMode === '地图' && (
        <InteractiveMap
          sites={filteredSites}
          selectedSite={selectedSite}
          onSiteSelect={setSelectedSite}
          showHeatmap={showHeatmap}
          showConnections={showConnections}
          showCulturalCircles={showCulturalCircles}
          connectionType={connectionType}
          culturalCircles={culturalCircles}
          connections={siteConnections}
        />
      )}

      {viewMode === '列表' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-4 md:grid-cols-2"
        >
          {filteredSites.map((site) => (
            <SiteCard
              key={site.id}
              site={site}
              isSelected={selectedSite?.id === site.id}
              onSelect={() => setSelectedSite(site)}
            />
          ))}
        </motion.div>
      )}

      {viewMode === '混合' && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-1">
            <InteractiveMap
              sites={filteredSites}
              selectedSite={selectedSite}
              onSiteSelect={setSelectedSite}
              showHeatmap={showHeatmap}
              showConnections={showConnections}
              showCulturalCircles={showCulturalCircles}
              connectionType={connectionType}
              culturalCircles={culturalCircles}
              connections={siteConnections}
            />
          </div>
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 max-h-[600px] overflow-y-auto pr-2"
            >
              {filteredSites.map((site) => (
                <SiteCard
                  key={site.id}
                  site={site}
                  isSelected={selectedSite?.id === site.id}
                  onSelect={() => setSelectedSite(site)}
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
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <p className="text-lg">未找到匹配的遗址</p>
          <p className="text-sm mt-1">请尝试调整筛选条件</p>
        </motion.div>
      )}

      {/* 遗址详情模态框 */}
      <SiteDetailModal
        site={selectedSite}
        onClose={() => setSelectedSite(null)}
        artifacts={artifacts}
        timelineEvents={timelineEvents}
      />
    </section>
  );
}
