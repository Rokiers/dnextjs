# 安装指南

## ⚠️ 重要提示

由于 Windows PowerShell 环境问题，请在 **Git Bash** 终端中运行以下命令。

## 📦 安装步骤

### 1. 打开 Git Bash 终端

在项目目录右键选择 "Git Bash Here" 或在 Git Bash 中导航到项目目录：

```bash
cd /c/tools/docker-map-file/nextdocker/dnextjs
```

### 2. 安装图标库依赖

```bash
pnpm add lucide-react
```

或者使用 npm：

```bash
npm install lucide-react
```

### 3. 运行开发服务器

```bash
pnpm dev
```

或者：

```bash
npm run dev
```

### 4. 访问应用

打开浏览器访问: [http://localhost:3000](http://localhost:3000)

## 🎯 可用页面

- **首页**: http://localhost:3000/
- **商品列表**: http://localhost:3000/products
- **商品详情**: http://localhost:3000/products/1
- **购物车**: http://localhost:3000/cart
- **订单**: http://localhost:3000/orders
- **登录**: http://localhost:3000/login

## 🔧 常见问题

### Q: pnpm 命令不存在？

A: 安装 pnpm：
```bash
npm install -g pnpm
```

### Q: 端口 3000 被占用？

A: 修改端口运行：
```bash
pnpm dev -p 3001
```

### Q: 图片不显示？

A: 项目使用占位符图片，你需要：
1. 在 `public/` 目录添加真实商品图片
2. 或使用在线图片 URL
3. 或集成图片服务（如 Cloudinary）

## 📝 下一步

查看 `PROJECT_GUIDE.md` 了解项目详细说明和自定义配置。
