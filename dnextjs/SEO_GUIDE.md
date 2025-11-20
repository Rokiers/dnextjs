# SEO 优化指南

本项目已经为所有页面添加了完整的 SEO 优化配置。

## 📋 已实现的 SEO 功能

### 1. 页面元数据（Metadata）

所有页面都包含完整的 SEO 元数据：

#### 首页 (`/`)
- ✅ 标题、描述、关键词
- ✅ Open Graph 标签（社交媒体分享）
- ✅ Twitter Card 标签
- ✅ 规范链接（Canonical URL）

#### 商品列表页 (`/products`)
- ✅ 独立的页面标题和描述
- ✅ 分类筛选和排序的 SEO 优化

#### 商品详情页 (`/products/[id]`)
- ✅ **动态 SEO 元数据**（每个商品独立的标题、描述）
- ✅ 商品图片的 Open Graph 标签
- ✅ 商品价格、库存等结构化数据
- ✅ 面包屑导航结构化数据

#### 其他页面
- ✅ 购物车、订单、登录页面（设置为 noindex，不被搜索引擎索引）

### 2. 结构化数据（JSON-LD）

#### 网站级别
```json
{
  "@type": "WebSite",
  "name": "商城CMS",
  "url": "https://your-domain.com",
  "potentialAction": {
    "@type": "SearchAction"
  }
}
```

#### 组织信息
```json
{
  "@type": "Organization",
  "name": "商城CMS",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+86-400-123-4567"
  }
}
```

#### 商品信息
```json
{
  "@type": "Product",
  "name": "商品名称",
  "offers": {
    "@type": "Offer",
    "price": "9999",
    "priceCurrency": "CNY"
  }
}
```

#### 面包屑导航
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

### 3. Sitemap（站点地图）

文件位置：`/sitemap.xml`

自动生成所有页面的站点地图：
- 首页
- 商品列表页
- 所有商品详情页
- 优先级和更新频率配置

### 4. Robots.txt

文件位置：`/robots.txt`

配置搜索引擎爬虫规则：
- 允许爬取公开页面
- 禁止爬取私密页面（购物车、订单、登录等）
- 指向 sitemap.xml

## 🔧 配置说明

### 修改域名

在以下文件中将 `https://your-domain.com` 替换为你的实际域名：

1. `src/app/layout.tsx` - 第 34 行
2. `src/app/page.tsx` - 第 15、24 行
3. `src/app/products/layout.tsx` - 第 16 行
4. `src/app/products/[id]/page.tsx` - 第 58、78-80 行
5. `src/lib/seo.ts` - 多处
6. `src/app/sitemap.ts` - 第 4 行
7. `src/app/robots.ts` - 第 4、22 行

### 修改 Google 验证码

在 `src/app/layout.tsx` 第 69 行：
```typescript
verification: {
  google: 'your-google-verification-code', // 替换为你的验证码
}
```

### 添加 Open Graph 图片

在 `public/` 目录下添加以下图片：
- `og-image.jpg` (1200x630px) - Open Graph 分享图片
- `twitter-image.jpg` (1200x600px) - Twitter 卡片图片
- `logo.png` - 网站 Logo

## 📊 SEO 工具函数

位置：`src/lib/seo.ts`

提供以下函数：
- `generateProductJsonLd()` - 生成商品结构化数据
- `generateWebsiteJsonLd()` - 生成网站结构化数据
- `generateOrganizationJsonLd()` - 生成组织结构化数据
- `generateBreadcrumbJsonLd()` - 生成面包屑导航结构化数据

## 🎯 使用示例

### 为新页面添加 SEO

#### 服务端组件（推荐）

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '页面标题 - 商城CMS',
  description: '页面描述',
  keywords: '关键词1,关键词2',
  openGraph: {
    title: '页面标题',
    description: '页面描述',
    type: 'website',
  },
};

export default function Page() {
  return <div>页面内容</div>;
}
```

#### 客户端组件

创建 `layout.tsx` 文件：

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '页面标题 - 商城CMS',
  description: '页面描述',
};

export default function Layout({ children }) {
  return <>{children}</>;
}
```

### 添加结构化数据

```typescript
import JsonLd from '@/components/JsonLd';

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '文章标题',
    // ... 其他字段
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <div>页面内容</div>
    </>
  );
}
```

## 🔍 SEO 检查清单

- [ ] 所有页面都有唯一的标题和描述
- [ ] 商品页面包含价格、库存等结构化数据
- [ ] Open Graph 图片已添加到 public 目录
- [ ] 域名已替换为实际域名
- [ ] Google Search Console 验证码已配置
- [ ] Sitemap 已提交到搜索引擎
- [ ] Robots.txt 配置正确
- [ ] 所有图片都有 alt 属性
- [ ] 页面加载速度优化
- [ ] 移动端响应式设计

## 📈 SEO 监控工具

推荐使用以下工具监控 SEO 效果：

1. **Google Search Console** - 监控搜索表现
2. **Google Analytics** - 分析流量来源
3. **PageSpeed Insights** - 检查页面速度
4. **Schema.org Validator** - 验证结构化数据
5. **Open Graph Debugger** - 检查社交媒体分享

## 🚀 进阶优化

### 1. 动态生成商品 Sitemap

修改 `src/app/sitemap.ts`，从数据库获取所有商品：

```typescript
// 从 API 或数据库获取商品
const products = await fetch('your-api/products').then(r => r.json());
const productPages = products.map(product => ({
  url: `${baseUrl}/products/${product.id}`,
  lastModified: new Date(product.updatedAt),
  priority: 0.8,
}));
```

### 2. 添加新闻/博客页面

创建 `src/app/blog/` 目录，添加文章页面和 SEO 配置。

### 3. 多语言 SEO

使用 Next.js 国际化功能，为不同语言创建独立的 SEO 配置。

### 4. 性能优化

- 使用 Next.js Image 组件优化图片
- 启用静态生成（SSG）提高加载速度
- 使用 CDN 加速资源加载

## 📝 注意事项

1. **避免重复内容**：确保每个页面的标题和描述都是唯一的
2. **关键词密度**：自然使用关键词，避免堆砌
3. **移动优先**：确保移动端体验良好
4. **HTTPS**：生产环境必须使用 HTTPS
5. **定期更新**：保持内容新鲜，定期更新商品信息

## 🔗 相关资源

- [Next.js Metadata 文档](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org 文档](https://schema.org/)
- [Google SEO 指南](https://developers.google.com/search/docs)
