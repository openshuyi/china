import type { ArchaeologySite, SiteConnection } from './history-data';

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
  '东北文化圈': 'rgba(14, 165, 233, 0.15)',
  '黄河文化圈': 'rgba(245, 158, 11, 0.15)',
  '长江文化圈': 'rgba(16, 185, 129, 0.15)',
  '中原文化圈': 'rgba(139, 92, 246, 0.15)',
  '西南文化圈': 'rgba(236, 72, 153, 0.15)',
};

// 连线类型颜色映射
export const connectionTypeColors: Record<string, string> = {
  '文化圈': 'rgba(139, 92, 246, 0.6)',
  '时期': 'rgba(249, 115, 22, 0.6)',
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

// 生成遗址连线
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
            color: 'rgba(139, 92, 246, 0.6)',
            weight: 2,
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
      if (groupSites.length > 1) {
        for (let i = 0; i < groupSites.length; i++) {
          for (let j = i + 1; j < groupSites.length; j++) {
            connections.push({
              from: groupSites[i].id,
              to: groupSites[j].id,
              type: '时期',
              color: 'rgba(249, 115, 22, 0.6)',
              weight: 3,
            });
          }
        }
      }
    });
  }

  return connections;
}

// 计算两个坐标点之间的距离（公里）
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // 地球半径（公里）
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 获取所有地区列表
export function getRegions(sites: ArchaeologySite[]): string[] {
  const regions = new Set<string>(['全部']);
  sites.forEach((site) => regions.add(site.region));
  return Array.from(regions);
}

// 获取所有时期列表
export function getPeriods(sites: ArchaeologySite[]): string[] {
  const periods = new Set<string>(['全部']);
  sites.forEach((site) => periods.add(site.period));
  return Array.from(periods);
}

// 获取所有文化圈列表
export function getCulturalCircles(sites: ArchaeologySite[]): string[] {
  const circles = new Set<string>(['全部']);
  sites.forEach((site) => {
    if (site.culturalCircle) circles.add(site.culturalCircle);
  });
  return Array.from(circles);
}
