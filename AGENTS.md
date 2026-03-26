# AGENTS.md - 代码库指南

## 项目概述
Next.js 16 + React 19 应用，使用 Fumadocs 构建中华文明源流文档网站。

## 核心命令

### 开发与构建
```bash
bun run dev          # 启动开发服务器 (localhost:3000)
bun run build        # 构建生产版本
bun run start        # 启动生产服务器
```

### 类型检查
```bash
bun run types:check  # 运行 TypeScript 类型检查
```

**注意**: 当前项目无测试文件，无需单测运行命令。

## 代码风格指南

### 导入规范
- **绝对路径**: 使用 `@/*` 别名引用 `src/*` 目录（例如: `@/lib/source`, `@/components/theme-browser`）
- **集合导入**: 使用 `collections/*` 别名引用 `.source/*` 目录（例如: `collections/server`）
- **Next.js 导入**: 从 `next` 导入类型（`Metadata`）和函数（`notFound`）
- **第三方库**: 从 `fumadocs-ui`, `fumadocs-core`, `fumadocs-mdx` 导入组件和工具
- **排序导入**: 导入语句按以下顺序排列：React/Next.js → 第三方库 → 本地模块

### 类型定义
- **严格模式**: TypeScript 启用 `strict: true`，禁止类型断言（`as any`, `@ts-ignore`）
- **类型导出**: 共享类型定义在 `lib/history-data.ts` 中，使用 `export type`
- **联合类型**: 对象字面量类型使用联合类型（如: `'陶器' | '玉器' | '青铜器'`）

### 组件规范
- **客户端组件**: 使用 `'use client'` 指令在文件顶部
- **命名**: 组件使用 PascalCase（如 `ThemeBrowser`），函数使用 camelCase
- **Props**: 使用 TypeScript 接口定义，必要时使用泛型（如 `PageProps<'/docs/[[...slug]]'>`）
- **客户端状态**: 使用 React Hooks（`useState`, `useMemo`）管理组件状态

### 样式规范
- **Tailwind CSS v4**: 全局样式在 `src/app/global.css` 中，使用 `@import` 指令
- **Fumadocs 主题**: 使用 `fumadocs-ui` 提供的设计令牌（如 `fd-primary`, `fd-border`, `fd-card`）
- **实用类优先**: 优先使用 Tailwind 实用类，避免内联样式
- **响应式**: 使用 Tailwind 响应式前缀（如 `md:grid-cols-2`）

### 文件命名与结构
- **页面路由**: App Router 路由在 `src/app/` 中，文件名使用 kebab-case（如 `archaeology-map/page.tsx`）
- **组件**: 放在 `src/components/`，文件名使用 kebab-case（如 `theme-browser.tsx`）
- **工具函数**: 放在 `src/lib/`，文件名使用 kebab-case（如 `source.ts`）
- **布局共享**: `src/lib/layout.shared.tsx` 定义共享的布局选项（可选但推荐）

### 错误处理
- **404 页面**: 使用 Next.js 的 `notFound()` 函数处理路由不存在的页面
- **异步参数**: App Router 中 `params` 需要使用 `await props.params` 解包

### 元数据
- **静态元数据**: 在路由组件中使用 `export const metadata` 或 `export async function generateMetadata()`
- **Open Graph**: 支持图片，使用 `getPageImage()` 生成 OG 图片 URL

### 数据源
- **MDX 内容**: 放在 `content/docs/` 目录，通过 `source.config.ts` 配置
- **静态数据**: 历史数据、文物数据等放在 `src/lib/history-data.ts`
- **图片生成**: OG 图片通过 `app/og/docs/[...slug]/route.tsx` 生成

## 开发注意事项
- **文档构建**: MDX 文档通过 `fumadocs-mdx` 处理，内容路由自动生成
- **搜索功能**: 使用 `fumadocs-core/search/server` 的 `createFromSource` 创建搜索 API
- **图标系统**: 使用 `fumadocs-core/source/lucide-icons` 插件自动解析 MDX 中的图标
- **图片优化**: 使用 `@takumi-rs/image-response` 生成动态图片（已在 `next.config.mjs` 中配置为外部包）

## 项目依赖
- Next.js: 16.2.1
- React: 19.2.4
- Fumadocs: Core 16.7.6, UI 16.7.6, MDX 14.2.11
- Tailwind CSS: 4.2.2
- TypeScript: 6.0.2

## 关键文件说明
- `next.config.mjs`: Next.js 配置，集成 Fumadocs MDX
- `source.config.ts`: MDX 内容源配置
- `src/lib/source.ts`: 文档加载器、图片 URL 生成器
- `src/lib/history-data.ts`: 历史数据、文物、遗址等静态数据
- `src/lib/shared.ts`: 路由常量和 Git 配置
