'use client';

import { useMemo, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { timelineEvents, type Era } from '@/lib/history-data';
import { clsx } from 'clsx';

const eras: Array<Era | '全部'> = [
  '全部',
  '史前',
  '夏商周',
  '秦汉',
  '三国两晋南北朝',
  '隋唐五代',
  '宋辽金夏元',
  '明清',
  '近现代',
];

export function TimelineExplorer() {
  const [selectedEra, setSelectedEra] = useState<Era | '全部'>('全部');
  const [selectedRegion, setSelectedRegion] = useState<string>('全部');
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const regions = useMemo(() => {
    const values = new Set<string>(['全部']);
    for (const event of timelineEvents) values.add(event.region);
    return Array.from(values);
  }, []);

  const filtered = useMemo(() => {
    return timelineEvents.filter((item) => {
      if (selectedEra !== '全部' && item.era !== selectedEra) return false;
      if (selectedRegion !== '全部' && item.region !== selectedRegion) return false;
      return true;
    });
  }, [selectedEra, selectedRegion]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 relative items-start w-full">
      {/* 左侧全局缩略图 */}
      <aside className="hidden lg:flex fixed left-0 top-14 bottom-0 w-40 shrink-0 flex-col gap-1 border-r border-fd-border/30 bg-fd-background/80 backdrop-blur-md z-40 overflow-y-auto custom-scrollbar shadow-sm">
        <div className="p-3 sticky top-0 bg-fd-background/90 backdrop-blur-sm z-10 border-b border-fd-border/30">
          <h3 className="text-[10px] font-bold tracking-widest text-fd-muted-foreground uppercase flex items-center gap-1.5">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            历史纪元导航
          </h3>
        </div>
        <div className="p-3 relative space-y-4">
          <div className="absolute left-[21px] top-5 bottom-5 w-[2px] bg-fd-border/30"></div>
          {eras.filter(e => e !== '全部').map((era) => {
            const eraEvents = timelineEvents.filter(e => e.era === era);
            return (
              <div key={era} className="relative z-10">
                <div className={clsx(
                  "absolute -left-[9px] top-1 w-2.5 h-2.5 rounded-full border-2 bg-fd-background transition-colors",
                  selectedEra === era || selectedEra === '全部' ? "border-fd-primary" : "border-fd-border"
                )} />
                <div className="pl-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEra(era);
                      const firstEvent = eraEvents[0];
                      if (firstEvent) {
                        const el = document.getElementById(`event-${firstEvent.id}`);
                        if (el) {
                          const y = el.getBoundingClientRect().top + window.scrollY - 100;
                          window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                      }
                    }}
                    className={clsx(
                      "text-xs font-bold text-left w-full transition-colors hover:text-fd-primary mb-1.5",
                      selectedEra === era ? "text-fd-primary" : "text-fd-foreground/80"
                    )}
                  >
                    {era}
                  </button>
                  <div className="flex flex-col gap-1">
                    {eraEvents.map(event => (
                      <button
                        type="button"
                        key={event.id}
                        onClick={() => {
                          const el = document.getElementById(`event-${event.id}`);
                          if (el) {
                            const y = el.getBoundingClientRect().top + window.scrollY - 100;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }}
                        className="text-[10px] text-left text-fd-muted-foreground hover:text-fd-primary transition-colors truncate w-full"
                        title={event.period}
                      >
                        {event.period}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* 固定悬浮在顶部的筛选面板 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-14 left-0 right-0 lg:left-40 z-50 overflow-hidden border-b border-fd-border/50 bg-fd-background/95 shadow-lg backdrop-blur-xl"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
        <div className="relative z-10 border-b border-fd-border/40 px-3 py-2.5 md:px-4 ">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-fd-primary/30 bg-fd-primary/10 px-2.5 py-0.5 text-xs font-medium text-fd-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fd-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fd-primary" />
              </span>
              时间轴筛选
            </div>
            <button
              type="button"
              aria-expanded={!isFilterCollapsed}
              onClick={() => setIsFilterCollapsed((prev) => !prev)}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-fd-border/60 bg-fd-card/80 text-fd-foreground transition hover:border-fd-primary/40 hover:text-fd-primary"
            >
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={clsx('transition-transform duration-200', isFilterCollapsed ? 'rotate-180' : '')}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
        <motion.div
          initial={false}
          animate={{
            height: isFilterCollapsed ? 0 : 'auto',
            opacity: isFilterCollapsed ? 0 : 1,
          }}
          transition={{ duration: 0.22 }}
          className="relative z-10 overflow-hidden"
        >
          <div className="grid gap-2.5 px-3 py-3 md:grid-cols-2 md:px-4 ">
            <div className="space-y-2">
              <h3 className="flex items-center gap-1.5 text-xs font-semibold text-fd-muted-foreground">
                <span className="inline-block h-3.5 w-1.5 rounded-full bg-fd-primary"></span>
                时代筛选
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {eras.map((era) => (
                  <button
                    key={era}
                    type="button"
                    onClick={() => setSelectedEra(era)}
                    className={clsx(
                      'relative rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300',
                      selectedEra === era
                        ? 'border-transparent text-white shadow-md'
                        : 'border-fd-border text-fd-muted-foreground hover:border-fd-primary/40 hover:text-fd-foreground'
                    )}
                  >
                    {selectedEra === era && (
                      <motion.div
                        layoutId="era-active-pill"
                        className="absolute inset-0 rounded-full bg-fd-primary"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    {era}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="flex items-center gap-1.5 text-xs font-semibold text-fd-muted-foreground">
                <span className="inline-block h-3.5 w-1.5 rounded-full bg-blue-500"></span>
                地域筛选
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {regions.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setSelectedRegion(region)}
                    className={clsx(
                      'relative rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300',
                      selectedRegion === region
                        ? 'border-transparent text-white shadow-md'
                        : 'border-fd-border text-fd-muted-foreground hover:border-blue-500/40 hover:text-fd-foreground'
                    )}
                  >
                    {selectedRegion === region && (
                      <motion.div
                        layoutId="region-active-pill"
                        className="absolute inset-0 rounded-full bg-blue-500"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 主内容区域 - 添加顶部padding以避免被固定筛选面板遮挡 */}
      <section className="flex-1 w-full min-w-0 space-y-4 lg:pl-44 pr-2 lg:pr-4 pt-32">
        <div ref={containerRef} className="relative w-full py-6">
          {/* 左侧发光的主线 */}
          <div className="absolute left-[20px] md:left-[200px] top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-fd-primary/30 to-transparent">
            <motion.div 
              className="absolute top-0 w-full bg-fd-primary shadow-[0_0_15px_rgba(var(--fd-primary-rgb),0.8)]"
              style={{ 
                height: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
                filter: 'drop-shadow(0 0 8px currentColor)'
              }}
            />
          </div>

          <div className="space-y-10 relative">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => {
                return (
                  <motion.div 
                    key={item.id}
                    id={`event-${item.id}`}
                    layout
                    initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative flex items-start w-full group pl-[50px] md:pl-0"
                  >
                    {/* 左侧西历时间 (仅桌面端显示在左侧，移动端可以放在卡片内或线旁) */}
                    <div className="hidden md:flex absolute left-0 w-[160px] top-3 flex-col items-end pr-8 text-right">
                      <span className="text-lg font-bold text-fd-foreground/80 tracking-wider">
                        {item.gregorianDate}
                      </span>
                    </div>

                    {/* 时间节点指示器 */}
                    <div className="absolute left-[20px] md:left-[200px] top-5 -translate-x-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full border-4 border-fd-background bg-fd-primary/20 flex items-center justify-center z-10 shadow-[0_0_0_4px_rgba(var(--fd-background-rgb),0.5)] group-hover:bg-fd-primary group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(var(--fd-primary-rgb),0.6)] transition-all duration-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-fd-primary group-hover:bg-white transition-colors" />
                    </div>

                    {/* 卡片容器 */}
                    <div className="w-full md:ml-[250px]">
                      <motion.article 
                        whileHover={{ y: -3, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative overflow-hidden rounded-xl border border-fd-border/60 bg-fd-card/80 p-4 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-fd-primary/50 transition-all duration-300"
                      >
                        {/* 背景光效 */}
                        <div className="absolute -right-20 -top-20 w-32 h-32 bg-fd-primary/10 rounded-full blur-3xl group-hover:bg-fd-primary/20 transition-colors" />
                        
                        <div className="relative z-10">
                          <div className="mb-2.5 flex flex-wrap items-center gap-2 text-[11px] font-medium">
                            <span className="rounded-full bg-gradient-to-r from-fd-primary to-blue-500 text-white px-2 py-0.5 shadow-sm">
                              {item.era}
                            </span>
                            <span className="text-fd-primary tracking-wider">{item.period}</span>
                            <span className="md:hidden text-fd-foreground/70 tracking-wider border-l border-fd-border pl-2">
                              {item.gregorianDate}
                            </span>
                            <div className="flex items-center gap-1 text-fd-muted-foreground bg-fd-muted/30 px-1.5 py-0.5 rounded-md">
                              <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><title>地域</title><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                              {item.region}
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-br from-fd-foreground to-fd-foreground/70 mb-1.5">
                            {item.title}
                          </h3>
                          
                          <p className="text-sm text-fd-muted-foreground leading-snug mb-3">
                            {item.summary}
                          </p>
                          
                          <div className="pt-2.5 border-t border-fd-border/50">
                            <p className="text-xs flex items-start gap-1.5">
                              <span className="shrink-0 rounded bg-fd-primary/10 p-0.5 text-fd-primary mt-0.5">
                                <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><title>证据</title><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
                              </span>
                              <span className="text-fd-muted-foreground">
                                <strong className="text-fd-foreground font-medium">核心证据/代表：</strong>
                                {item.evidence}
                              </span>
                            </p>
                          </div>
                        </div>
                      </motion.article>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {filtered.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-20 text-fd-muted-foreground"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fd-muted/30 mb-4">
                  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><title>未找到</title><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <p className="text-lg">未找到匹配的历史事件</p>
                <p className="text-sm mt-1">请尝试调整筛选条件</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
