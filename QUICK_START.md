# 快速开始指南

## 📋 前置要求

- Node.js 18+ 或 Docker
- npm 或 yarn

## 🚀 快速启动步骤

### 方式 1: 使用 npm（本地开发）

#### 1. 安装依赖

```bash
# Backend
cd backend
npm install

# Frontend
cd ../dnextjs
npm install
```

#### 2. 配置环境变量

```bash
# Backend
cd backend
cp .env.example .env
# 编辑 .env 文件，填写实际的值

# Frontend
cd ../dnextjs
cp env.example .env.local
# 编辑 .env.local 文件
```

#### 3. 启动服务

```bash
# Backend (在一个终端)
cd backend
npm run start:dev

# Frontend (在另一个终端)
cd dnextjs
npm run dev
```

### 方式 2: 使用 Docker Compose（推荐）

```bash
# 在项目根目录
docker-compose up -d
```

访问：
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API 文档: http://localhost:4000/api/docs

## ⚠️ 重要提示

### 环境变量验证

本项目使用 **Zod** 进行环境变量验证。如果环境变量配置不正确，应用会在启动时立即报错并显示详细信息。

**常见错误：**

1. **JWT_SECRET 太短**
   ```
   ❌ JWT_SECRET: String must contain at least 32 character(s)
   ```
   解决：使用至少 32 个字符的密钥

2. **DATABASE_URL 格式错误**
   ```
   ❌ DATABASE_URL: Invalid url
   ```
   解决：确保使用正确的 PostgreSQL 连接字符串格式

3. **NEXT_PUBLIC_API_URL 格式错误**
   ```
   ❌ NEXT_PUBLIC_API_URL: Invalid url
   ```
   解决：确保是完整的 URL，包括 http:// 或 https://

### Backend 必需的环境变量

```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=至少32个字符的安全密钥
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

### Frontend 必需的环境变量

```env
NODE_ENV=development
API_URL=http://backend:4000
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_NAME=E-commerce App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📚 详细文档

查看 [ENV_SETUP.md](./ENV_SETUP.md) 了解：
- 为什么需要环境变量验证
- 如何在代码中使用环境变量
- 如何添加新的环境变量
- 安全最佳实践
- 完整的使用示例

## 🧪 测试环境变量验证

你可以故意设置错误的值来测试验证：

```bash
# Backend - JWT_SECRET 太短会失败
cd backend
JWT_SECRET=short npm run start:dev

# Frontend - 无效的 URL 会失败
cd dnextjs
NEXT_PUBLIC_API_URL=invalid npm run dev
```

## 🔧 故障排除

### 应用启动失败

1. 检查环境变量是否正确配置
2. 查看错误信息，通常会明确指出哪个变量有问题
3. 参考 `.env.example` 文件确认格式

### TypeScript 错误

如果看到 "找不到模块 'zod'" 等错误：
```bash
# 确保已安装依赖
npm install
```

### 数据库连接失败

1. 确保 PostgreSQL 正在运行
2. 检查 `DATABASE_URL` 格式
3. 确认数据库用户名和密码正确

## 💡 提示

- 使用 `.env.local` (Next.js) 和 `.env` (Backend) 存储本地配置
- 这些文件已在 `.gitignore` 中，不会被提交
- 生产环境使用不同的配置和更强的密钥
- 定期更新 `.env.example` 文件作为模板
