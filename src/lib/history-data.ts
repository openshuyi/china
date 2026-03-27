export type Era = '史前' | '夏商周' | '秦汉' | '三国两晋南北朝' | '隋唐五代' | '宋辽金夏元' | '明清' | '近现代';

export type TimelineEvent = {
  id: string;
  era: Era;
  period: string;
  gregorianDate: string;
  title: string;
  summary: string;
  region: string;
  evidence: string;
};

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

export type CulturalCircle = {
  id: string;
  name: string;
  color: string;
  region: string;
  center: [number, number];
  radius: number;
  sites: string[];
};

export type SiteConnection = {
  from: string;
  to: string;
  type: '文化圈' | '时期';
  weight?: number;
  color?: string;
};

export type Artifact = {
  id: string;
  name: string;
  period: string;
  category: '陶器' | '玉器' | '青铜器' | '骨器' | '礼器';
  material: string;
  site: string;
  detail: string;
};

export type Debate = {
  id: string;
  title: string;
  topic: '年代学' | '社会形态' | '文化传播' | '技术起源';
  mainstream: string;
  alternative: string;
  evidenceLevel: '高' | '中' | '探索中';
};

export type Theme = {
  id: string;
  title: string;
  era: Era | '早期文明';
  region: string;
  summary: string;
  focus: string;
};

export const siteRoutes = [
  { href: '/', label: '首页', description: '总览与快速入口' },
  { href: '/timeline', label: '时间轴', description: '按时代浏览关键节点' },
  { href: '/archaeology-map', label: '考古地图', description: '按地域探索遗址分布' },
  { href: '/themes', label: '文明专题', description: '围绕典型文化做深度阅读' },
  { href: '/origins', label: '文化起源', description: '聚焦人类文化形成路径' },
  { href: '/artifacts', label: '文物库', description: '查看典型器物与证据' },
  { href: '/debates', label: '研究与争鸣', description: '比较不同学术观点' },
  { href: '/docs/implementation-plan', label: '实施计划', description: '阶段任务与交付节奏' },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'evt-1',
    era: '史前',
    period: '三皇五帝 (原始社会)',
    gregorianDate: '约前3000年 - 前2070年',
    title: '史前文明',
    summary: '包含更早的史前文明（前32-前31世纪），三皇（伏羲、燧人/女娲、神农）与五帝（黄帝、颛顼、帝喾、唐尧、虞舜）时期。',
    region: '黄河及长江流域',
    evidence: '仰韶文化、良渚文化等新石器时代遗址',
  },
  {
    id: 'evt-2',
    era: '夏商周',
    period: '夏朝',
    gregorianDate: '前2070年 - 前1600年',
    title: '夏朝建立 (奴隶社会)',
    summary: '中国历史上第一个奴隶制王朝，标志着“家天下”的开端。',
    region: '中原（今河南中西部、山西南部）',
    evidence: '二里头遗址及早期青铜器',
  },
  {
    id: 'evt-3',
    era: '夏商周',
    period: '商朝',
    gregorianDate: '前1600年 - 前1046年',
    title: '商朝与甲骨文',
    summary: '前1300年盘庚迁殷。青铜铸造、甲骨文字进入高度发展阶段，具有成熟的国家机器和礼制。',
    region: '黄河中下游',
    evidence: '殷墟遗址、甲骨文、司母戊鼎等',
  },
  {
    id: 'evt-4',
    era: '夏商周',
    period: '西周',
    gregorianDate: '前1046年 - 前771年',
    title: '西周分封与宗法',
    summary: '实行分封制与宗法制，确立了周天子的共主地位。',
    region: '关中与中原',
    evidence: '毛公鼎、何尊等带有长篇铭文的青铜器',
  },
  {
    id: 'evt-5',
    era: '夏商周',
    period: '春秋 (东周)',
    gregorianDate: '前770年 - 前476年',
    title: '春秋时期',
    summary: '周平王东迁洛邑，周王室衰微，诸侯争霸（春秋五霸）。',
    region: '黄河、长江流域',
    evidence: '侯马盟书、兵器及车马坑',
  },
  {
    id: 'evt-6',
    era: '夏商周',
    period: '战国 (东周)',
    gregorianDate: '前475年 - 前221年',
    title: '战国时期 (封建社会开端)',
    summary: '战国七雄并立，各国变法图强，思想文化空前繁荣（诸子百家），进入封建社会。',
    region: '黄河、长江流域',
    evidence: '曾侯乙编钟、兵马俑早期雏形',
  },
  {
    id: 'evt-7',
    era: '秦汉',
    period: '秦朝',
    gregorianDate: '前221年 - 前207年',
    title: '秦朝统一中国',
    summary: '中国历史上第一个大一统的封建帝国，统一度量衡、文字和货币，建立郡县制。',
    region: '全国',
    evidence: '秦始皇陵兵马俑、里耶秦简',
  },
  {
    id: 'evt-8',
    era: '秦汉',
    period: '西汉',
    gregorianDate: '前202年 - 8年',
    title: '西汉',
    summary: '汉高祖刘邦建立，汉武帝时期罢黜百家、独尊儒术，张骞出使西域开辟丝绸之路。',
    region: '全国',
    evidence: '马王堆汉墓、海昏侯墓',
  },
  {
    id: 'evt-9',
    era: '秦汉',
    period: '新朝',
    gregorianDate: '9年 - 23年',
    title: '王莽代汉与新朝',
    summary: '王莽篡汉建立新朝，推行托古改制，最终在绿林赤眉起义中覆灭。',
    region: '全国',
    evidence: '新莽铜嘉量',
  },
  {
    id: 'evt-10',
    era: '秦汉',
    period: '东汉',
    gregorianDate: '25年 - 220年',
    title: '东汉',
    summary: '光武帝刘秀建立东汉，恢复汉朝统治。',
    region: '全国',
    evidence: '击鼓说唱陶俑、熹平石经',
  },
  {
    id: 'evt-11-1',
    era: '三国两晋南北朝',
    period: '曹魏',
    gregorianDate: '220年 - 266年',
    title: '曹魏',
    summary: '曹丕代汉称帝，定都洛阳，实行九品中正制。',
    region: '北方',
    evidence: '曹魏邺城遗址',
  },
  {
    id: 'evt-11-2',
    era: '三国两晋南北朝',
    period: '蜀汉',
    gregorianDate: '221年 - 263年',
    title: '蜀汉',
    summary: '刘备在成都称帝，延续汉室法统。',
    region: '西南',
    evidence: '武侯祠遗迹',
  },
  {
    id: 'evt-11-3',
    era: '三国两晋南北朝',
    period: '孙吴',
    gregorianDate: '229年 - 280年',
    title: '孙吴',
    summary: '孙权在建业称帝，开发江南地区。',
    region: '江南',
    evidence: '走马楼吴简',
  },
  {
    id: 'evt-12',
    era: '三国两晋南北朝',
    period: '西晋',
    gregorianDate: '265年 - 316年',
    title: '西晋短暂统一',
    summary: '司马炎代魏建晋，后灭吴短暂统一全国。后因八王之乱及五胡内迁灭亡。',
    region: '全国',
    evidence: '晋代青瓷、家族墓地',
  },
  {
    id: 'evt-13-1',
    era: '三国两晋南北朝',
    period: '东晋',
    gregorianDate: '317年 - 420年',
    title: '东晋偏安',
    summary: '晋室南渡，衣冠南渡促进了江南地区的开发。',
    region: '南方',
    evidence: '王羲之书法（摹本）、东晋青瓷',
  },
  {
    id: 'evt-13-2',
    era: '三国两晋南北朝',
    period: '十六国',
    gregorianDate: '304年 - 439年',
    title: '五胡十六国',
    summary: '北方少数民族纷纷建立政权，经历了长期的割据混战。',
    region: '北方',
    evidence: '十六国时期佛像',
  },
  {
    id: 'evt-14-1',
    era: '三国两晋南北朝',
    period: '南朝 (宋齐梁陈)',
    gregorianDate: '420年 - 589年',
    title: '南朝更迭',
    summary: '南方先后经历刘宋、南齐、南梁、南陈四个朝代的更迭。',
    region: '南方',
    evidence: '南朝陵墓石刻',
  },
  {
    id: 'evt-14-2',
    era: '三国两晋南北朝',
    period: '北魏',
    gregorianDate: '386年 - 534年',
    title: '北魏统一北方',
    summary: '拓跋部建立北魏，孝文帝改革促进了深度的民族融合。',
    region: '北方',
    evidence: '云冈石窟、龙门石窟、北魏洛阳城遗址',
  },
  {
    id: 'evt-14-3',
    era: '三国两晋南北朝',
    period: '东魏与西魏',
    gregorianDate: '534年 - 557年',
    title: '北魏分裂',
    summary: '北魏分裂为东魏与西魏，各自发展。',
    region: '北方',
    evidence: '北朝石刻与造像',
  },
  {
    id: 'evt-14-4',
    era: '三国两晋南北朝',
    period: '北齐与北周',
    gregorianDate: '550年 - 581年',
    title: '北齐与北周对峙',
    summary: '高氏代东魏建北齐，宇文氏代西魏建北周，最终北周灭北齐统一北方。',
    region: '北方',
    evidence: '北齐壁画墓',
  },
  {
    id: 'evt-15',
    era: '隋唐五代',
    period: '隋朝',
    gregorianDate: '581年 - 618年',
    title: '隋朝大一统与大运河',
    summary: '结束南北朝分裂局面，开凿京杭大运河，创立科举制。',
    region: '全国',
    evidence: '隋大兴城（长安）遗址、大运河遗迹',
  },
  {
    id: 'evt-16',
    era: '隋唐五代',
    period: '唐朝',
    gregorianDate: '618年 - 907年',
    title: '大唐盛世',
    summary: '出现贞观之治、开元盛世，文化繁荣，对外交流频繁。',
    region: '全国',
    evidence: '唐长安城遗址、法门寺地宫、敦煌莫高窟盛唐壁画',
  },
  {
    id: 'evt-16-1',
    era: '隋唐五代',
    period: '武周',
    gregorianDate: '690年 - 705年',
    title: '武则天称帝',
    summary: '武则天废唐睿宗自立，改国号为周，是中国历史上唯一的女皇帝。',
    region: '全国',
    evidence: '乾陵无字碑、洛阳龙门石窟',
  },
  {
    id: 'evt-17-1',
    era: '隋唐五代',
    period: '五代 (梁唐晋汉周)',
    gregorianDate: '907年 - 960年',
    title: '五代更迭',
    summary: '中原地区先后经历后梁、后唐、后晋、后汉、后周五个短暂政权。',
    region: '北方',
    evidence: '五代石窟与壁画',
  },
  {
    id: 'evt-17-2',
    era: '隋唐五代',
    period: '十国',
    gregorianDate: '902年 - 979年',
    title: '十国割据',
    summary: '南方及部分北方地区先后存在十个割据政权。',
    region: '南方及部分北方',
    evidence: '王建墓、南唐二陵',
  },
  {
    id: 'evt-18-1',
    era: '宋辽金夏元',
    period: '辽朝',
    gregorianDate: '907年 - 1125年',
    title: '契丹建辽',
    summary: '耶律阿保机建立契丹国（后改国号为辽），与北宋形成长期对峙。',
    region: '北方',
    evidence: '辽代陈国公主墓',
  },
  {
    id: 'evt-18-2',
    era: '宋辽金夏元',
    period: '北宋',
    gregorianDate: '960年 - 1127年',
    title: '北宋建立与繁荣',
    summary: '赵匡胤陈桥兵变建立北宋，重文轻武，商品经济与城市文化高度繁荣。',
    region: '中原及南方',
    evidence: '清明上河图、汝窑瓷器',
  },
  {
    id: 'evt-18-3',
    era: '宋辽金夏元',
    period: '西夏',
    gregorianDate: '1038年 - 1227年',
    title: '党项建夏',
    summary: '李元昊建立西夏，与宋、辽（金）鼎立，创制西夏文。',
    region: '西北',
    evidence: '西夏王陵、黑水城遗址',
  },
  {
    id: 'evt-18-4',
    era: '宋辽金夏元',
    period: '金朝',
    gregorianDate: '1115年 - 1234年',
    title: '女真建金',
    summary: '完颜阿骨打建立金朝，灭辽与北宋，与南宋划淮水为界对峙。',
    region: '北方',
    evidence: '金中都水关遗址',
  },
  {
    id: 'evt-19',
    era: '宋辽金夏元',
    period: '南宋',
    gregorianDate: '1127年 - 1279年',
    title: '靖康之变与南宋偏安',
    summary: '金灭北宋后，宋室南迁建立南宋，经济重心彻底南移。',
    region: '南方',
    evidence: '南海一号沉船、南宋官窑',
  },
  {
    id: 'evt-19-1',
    era: '宋辽金夏元',
    period: '蒙古',
    gregorianDate: '1206年 - 1271年',
    title: '成吉思汗建立蒙古汗国',
    summary: '铁木真统一蒙古各部，被尊为成吉思汗，建立大蒙古国。1271年忽必烈改国号为元。',
    region: '蒙古高原',
    evidence: '成吉思汗陵',
  },
  {
    id: 'evt-20',
    era: '宋辽金夏元',
    period: '元朝',
    gregorianDate: '1271年 - 1368年',
    title: '蒙元帝国建立',
    summary: '忽必烈建立元朝，统一全国，疆域空前辽阔，设立行省制度。',
    region: '全国',
    evidence: '元大都遗址、青花瓷',
  },
  {
    id: 'evt-21',
    era: '明清',
    period: '明朝',
    gregorianDate: '1368年 - 1644年',
    title: '大明王朝与郑和下西洋',
    summary: '朱元璋建立明朝，废除丞相制度；郑和下西洋展示航海实力。',
    region: '全国',
    evidence: '明十三陵、故宫（紫禁城）、明长城',
  },
  {
    id: 'evt-21-1',
    era: '明清',
    period: '后金',
    gregorianDate: '1616年 - 1636年',
    title: '努尔哈赤建立后金',
    summary: '努尔哈赤统一女真各部，建立后金政权，定都赫图阿拉（今辽宁新宾）。',
    region: '东北',
    evidence: '沈阳故宫早期建筑、赫图阿拉城遗址',
  },
  {
    id: 'evt-22',
    era: '明清',
    period: '清朝',
    gregorianDate: '1636年 - 1912年',
    title: '清朝统治与康乾盛世',
    summary: '皇太极改国号为清，1644年清军入关。奠定了现代中国的版图。1840年鸦片战争后，中国逐渐沦为半殖民地半封建社会。',
    region: '全国',
    evidence: '清东陵、避暑山庄、圆明园遗址',
  },
  {
    id: 'evt-23',
    era: '近现代',
    period: '中华民国',
    gregorianDate: '1912年 - 1949年',
    title: '辛亥革命与中华民国',
    summary: '辛亥革命推翻封建帝制，建立资产阶级民主共和国。处于半殖民地半封建社会时期。',
    region: '全国',
    evidence: '南京总统府、黄埔军校旧址',
  },
  {
    id: 'evt-24',
    era: '近现代',
    period: '中华人民共和国',
    gregorianDate: '1949年10月1日 - 至今',
    title: '新中国成立与社会主义建设',
    summary: '1949年成立，经历过渡时期(1949-1956)后，1956年正式进入社会主义社会。',
    region: '全国',
    evidence: '天安门广场人民英雄纪念碑',
  },
];

export const archaeologySites: ArchaeologySite[] = [
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
  },
  {
    id: 'site-2',
    name: '半坡遗址',
    region: '黄河中游',
    period: '新石器时代',
    latitude: 34.29,
    longitude: 108.99,
    highlight: '彩陶与聚落',
    significance: '揭示早期农业社会的居住与生产组织。',
    importance: '重要',
  },
  {
    id: 'site-3',
    name: '良渚古城',
    region: '长江下游',
    period: '新石器时代晚期',
    latitude: 30.38,
    longitude: 119.97,
    highlight: '水利系统',
    significance: '展示复杂社会治理能力与礼制体系。',
    importance: '核心',
  },
  {
    id: 'site-4',
    name: '二里头遗址',
    region: '中原',
    period: '青铜时代早期',
    latitude: 34.7,
    longitude: 112.62,
    highlight: '宫殿区',
    significance: '早期国家形成与都邑规划的重要证据。',
    importance: '核心',
  },
  {
    id: 'site-5',
    name: '殷墟遗址',
    region: '中原',
    period: '晚商',
    latitude: 36.13,
    longitude: 114.33,
    highlight: '甲骨文',
    significance: '文字、王权与祭祀系统研究关键样本。',
    importance: '核心',
  },
  {
    id: 'site-6',
    name: '三星堆遗址',
    region: '西南',
    period: '青铜时代',
    latitude: 31.01,
    longitude: 104.26,
    highlight: '青铜面具',
    significance: '多元区域文明交流与工艺创新的重要见证。',
    importance: '核心',
    culturalCircle: '西南文化圈',
  },
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
    relatedArtifacts: ['art-4'],
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
];

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
    sites: ['site-2', 'site-7', 'site-8', 'site-10'],
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

export const siteConnections: SiteConnection[] = [
  // 黄河文化圈连线
  { from: 'site-2', to: 'site-7', type: '文化圈', color: 'rgba(245, 158, 11, 0.6)', weight: 2 },
  { from: 'site-2', to: 'site-8', type: '文化圈', color: 'rgba(245, 158, 11, 0.6)', weight: 2 },
  { from: 'site-7', to: 'site-8', type: '文化圈', color: 'rgba(245, 158, 11, 0.6)', weight: 2 },
  { from: 'site-8', to: 'site-10', type: '文化圈', color: 'rgba(245, 158, 11, 0.6)', weight: 2 },
  // 中原文化圈连线
  { from: 'site-4', to: 'site-5', type: '文化圈', color: 'rgba(139, 92, 246, 0.6)', weight: 2 },
  // 新石器时代连线
  { from: 'site-2', to: 'site-3', type: '时期', color: 'rgba(249, 115, 22, 0.6)', weight: 3 },
  { from: 'site-2', to: 'site-7', type: '时期', color: 'rgba(249, 115, 22, 0.6)', weight: 3 },
  { from: 'site-3', to: 'site-8', type: '时期', color: 'rgba(249, 115, 22, 0.6)', weight: 3 },
  { from: 'site-3', to: 'site-10', type: '时期', color: 'rgba(249, 115, 22, 0.6)', weight: 3 },
  // 青铜时代连线
  { from: 'site-4', to: 'site-5', type: '时期', color: 'rgba(139, 92, 246, 0.6)', weight: 3 },
  { from: 'site-4', to: 'site-6', type: '时期', color: 'rgba(139, 92, 246, 0.6)', weight: 3 },
  { from: 'site-5', to: 'site-6', type: '时期', color: 'rgba(139, 92, 246, 0.6)', weight: 3 },
];

export const artifacts: Artifact[] = [
  {
    id: 'art-1',
    name: '人面鱼纹彩陶盆',
    period: '仰韶文化',
    category: '陶器',
    material: '陶',
    site: '半坡遗址',
    detail: '反映图像表达与仪式语义，是早期精神文化的重要线索。',
  },
  {
    id: 'art-2',
    name: '玉琮',
    period: '良渚文化',
    category: '玉器',
    material: '透闪石',
    site: '良渚古城',
    detail: '体现等级秩序与礼仪规范，常见于高等级墓葬。',
  },
  {
    id: 'art-3',
    name: '司母戊鼎',
    period: '商代',
    category: '青铜器',
    material: '青铜',
    site: '殷墟遗址',
    detail: '大型青铜铸造技术与王权礼制的代表性器物。',
  },
  {
    id: 'art-4',
    name: '骨笛',
    period: '新石器时代',
    category: '骨器',
    material: '鹤骨',
    site: '贾湖遗址',
    detail: '可演奏音阶显示早期音乐系统与认知能力发展。',
  },
  {
    id: 'art-5',
    name: '青铜神树残件',
    period: '三星堆文化',
    category: '礼器',
    material: '青铜',
    site: '三星堆遗址',
    detail: '体现区域神话体系与祭祀空间想象。',
  },
];

export const debates: Debate[] = [
  {
    id: 'debate-1',
    title: '夏王朝考古对应关系',
    topic: '年代学',
    mainstream: '二里头文化与早期国家形态存在高度对应，但需保持术语审慎。',
    alternative: '二里头可视作区域性强权中心，未必直接等同文献中的夏王朝。',
    evidenceLevel: '中',
  },
  {
    id: 'debate-2',
    title: '青铜技术来源路径',
    topic: '技术起源',
    mainstream: '本地技术演进为主，并在交流中吸收周边技术要素。',
    alternative: '关键冶金工艺可能由跨区域网络快速传播并重组。',
    evidenceLevel: '探索中',
  },
  {
    id: 'debate-3',
    title: '良渚社会形态判定',
    topic: '社会形态',
    mainstream: '具备复杂分层和公共工程，接近文明门槛或已进入文明阶段。',
    alternative: '应避免单一路径模型，良渚可能是独特区域复杂社会。',
    evidenceLevel: '高',
  },
  {
    id: 'debate-4',
    title: '欧亚文化因素交流强度',
    topic: '文化传播',
    mainstream: '交流存在但不改变中原及区域文明自主演进主轴。',
    alternative: '交流在技术与观念上可能更具结构性影响。',
    evidenceLevel: '中',
  },
];

export const originNarrative = [
  {
    title: '环境适应',
    description: '从气候波动到生态位选择，早期人群通过采集、狩猎与火使用提升生存韧性。',
  },
  {
    title: '技术积累',
    description: '石器标准化、陶器烧制、农业工具改进推动生产效率与协作方式改变。',
  },
  {
    title: '社会组织',
    description: '聚落扩展、公共工程和礼仪空间形成，促成社会分工与治理结构出现。',
  },
  {
    title: '符号系统',
    description: '纹饰、祭祀和文字实践逐步建立跨代记忆与共同认同。',
  },
];

export const themes: Theme[] = [
  {
    id: 'theme-1',
    title: '仰韶文化：农业与聚落协作',
    era: '早期文明',
    region: '黄河中游',
    summary: '关注彩陶、房址与墓地结构，理解定居社会的组织逻辑。',
    focus: '聚落结构、生产协作、精神表达',
  },
  {
    id: 'theme-2',
    title: '良渚文明：工程与礼制秩序',
    era: '早期文明',
    region: '长江下游',
    summary: '结合水利系统和玉礼器谱系，观察复杂社会治理机制。',
    focus: '大型工程、等级秩序、仪式体系',
  },
  {
    id: 'theme-3',
    title: '殷墟：文字与王权体系',
    era: '夏商周',
    region: '中原',
    summary: '通过甲骨文与青铜礼器，研究国家治理与宗教实践关系。',
    focus: '甲骨卜辞、王权结构、礼制实践',
  },
  {
    id: 'theme-4',
    title: '三星堆：区域文明与交流网络',
    era: '夏商周',
    region: '西南',
    summary: '聚焦独特器物组合与祭祀坑现象，讨论多元文明并行发展。',
    focus: '区域创新、跨域交流、神话体系',
  },
];
