# 商城CMS - Next.js 电商平台

这是一个基于 Next.js 14+ 构建的现代化电商CMS平台框架。

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页 - 轮播横幅、分类导航、精选商品
│   ├── products/          # 商品相关页面
│   │   ├── page.tsx       # 商品列表页 - 筛选、排序功能
│   │   └── [id]/          # 商品详情页 - 详细信息、加购功能
│   ├── cart/              # 购物车页面 - 数量调整、结算
│   ├── orders/            # 订单页面 - 订单列表、状态筛选
│   ├── login/             # 登录/注册页面 - 表单验证、第三方登录
│   └── layout.tsx         # 根布局 - Header、Footer
├── components/            # 可复用组件
│   ├── Header.tsx         # 顶部导航栏 - 搜索、购物车、用户菜单
│   ├── Footer.tsx         # 页脚 - 链接、联系方式
│   └── ProductCard.tsx    # 商品卡片组件
└── types/                 # TypeScript 类型定义
    └── index.ts           # Product, Order, User, CartItem 等类型
```

## 🚀 快速开始

### 1. 安装依赖

**重要**: 请在 Git Bash 终端中运行以下命令：

```bash
pnpm install
pnpm add lucide-react
```

### 2. 运行开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 3. 构建生产版本

```bash
pnpm build
pnpm start
```

## 📄 页面说明

### 首页 (`/`)
- **轮播横幅**: 展示主要促销信息
- **分类导航**: 快速访问不同商品分类
- **精选商品**: 展示推荐商品
- **促销横幅**: 限时优惠信息

### 商品列表页 (`/products`)
- **筛选功能**: 按分类筛选商品
- **排序功能**: 价格、名称排序
- **商品网格**: 响应式商品展示

### 商品详情页 (`/products/[id]`)
- **商品图片**: 主图和缩略图
- **详细信息**: 价格、库存、评分
- **产品特性**: 功能列表
- **操作按钮**: 加入购物车、立即购买

### 购物车页 (`/cart`)
- **商品列表**: 已添加的商品
- **数量调整**: 增加/减少商品数量
- **价格计算**: 小计、运费、总计
- **结算功能**: 进入支付流程

### 订单页 (`/orders`)
- **订单列表**: 所有历史订单
- **状态筛选**: 按订单状态筛选
- **订单详情**: 商品信息、配送地址
- **状态标识**: 处理中、已发货、已送达等

### 登录页 (`/login`)
- **登录/注册**: 切换表单
- **表单验证**: 邮箱、密码验证
- **第三方登录**: Google、GitHub 登录
- **密码显示**: 切换密码可见性

## 🎨 技术栈

- **框架**: Next.js 16+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **图标**: Lucide React
- **字体**: Geist Sans & Geist Mono

## 🔧 自定义配置

### 修改商品数据

商品数据目前是模拟数据，位于各个页面组件中。后续可以：
1. 连接到后端 API
2. 使用数据库（如 MongoDB、PostgreSQL）
3. 集成 CMS（如 Strapi、Contentful）

### 添加新页面

在 `src/app/` 目录下创建新文件夹和 `page.tsx` 文件：

```tsx
// src/app/about/page.tsx
export default function AboutPage() {
  return <div>关于我们</div>;
}
```

### 修改样式

所有组件使用 Tailwind CSS 类名。修改 `src/app/globals.css` 可以自定义全局样式。

## 📝 待实现功能

- [ ] 用户认证系统（JWT、Session）
- [ ] 后端 API 集成
- [ ] 支付网关集成
- [ ] 商品搜索功能
- [ ] 用户个人中心
- [ ] 商品评价系统
- [ ] 优惠券系统
- [ ] 订单跟踪
- [ ] 管理后台

## 🐳 Docker 部署

项目已包含 Dockerfile，可以使用 Docker 部署：

```bash
docker build -t nextjs-shop .
docker run -p 3000:3000 nextjs-shop
```

## 📦 依赖说明

- `next`: Next.js 框架
- `react` & `react-dom`: React 库
- `typescript`: TypeScript 支持
- `tailwindcss`: CSS 框架
- `lucide-react`: 图标库（需要手动安装）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
