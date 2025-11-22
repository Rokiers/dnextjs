# E-commerce Full Stack Application

一个使用 Next.js + NestJS + PostgreSQL 构建的全栈电商应用。

## 🎯 特性

- ✅ **类型安全的环境变量** - 使用 Zod 进行验证，启动时自动检测配置错误
- ✅ **Next.js 16** - React 19 + Server Components
- ✅ **NestJS** - 企业级 Node.js 框架
- ✅ **PostgreSQL + Prisma** - 类型安全的数据库访问
- ✅ **Docker 支持** - 一键启动开发环境
- ✅ **API 文档** - Swagger/OpenAPI 自动生成

## 🚀 快速开始

### 方式 1: 使用 Docker (推荐)

```bash
# 克隆项目
git clone <repository-url>
cd nextdocker

# 配置环境变量
cp backend/.env.example backend/.env
cp dnextjs/env.example dnextjs/.env.local

# 启动所有服务
docker-compose up -d
```

访问：
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API 文档: http://localhost:4000/api/docs

### 方式 2: 本地开发

```bash
# 1. 安装依赖
cd backend && npm install
cd ../dnextjs && npm install

# 2. 配置环境变量
cd backend
cp .env.example .env
npm run generate:jwt-secret  # 生成安全的 JWT 密钥
# 编辑 .env 文件

cd ../dnextjs
cp env.example .env.local
# 编辑 .env.local 文件

# 3. 启动服务
cd backend && npm run start:dev
cd dnextjs && npm run dev
```

## ⚙️ 环境变量配置

本项目使用 **Zod** 进行环境变量验证，确保配置正确。

### 重要提示
- ✅ 应用启动时会自动验证所有环境变量
- ✅ 配置错误会显示清晰的错误信息
- ✅ 类型安全，有完整的 TypeScript 支持

### 详细文档
- 📖 [环境变量配置说明](./环境变量配置说明.md) - **推荐先看这个**
- 📖 [快速开始指南](./QUICK_START.md)
- 📖 [详细配置指南](./ENV_SETUP.md)
- 📖 [配置检查清单](./SETUP_CHECKLIST.md)
- 📖 [方案总结](./ENV_VALIDATION_SUMMARY.md)

### 必需的环境变量

#### Backend
```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:password@postgres:5432/ecommerce
JWT_SECRET=至少32个字符的安全密钥
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

#### Frontend
```env
NODE_ENV=development
API_URL=http://backend:4000
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_APP_NAME=E-commerce App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📁 项目结构

```
nextdocker/
├── backend/              # NestJS 后端
│   ├── src/
│   │   ├── config/      # 环境变量验证配置
│   │   ├── products/    # 产品模块
│   │   ├── users/       # 用户模块
│   │   └── ...
│   ├── prisma/          # 数据库 Schema
│   └── scripts/         # 工具脚本
├── dnextjs/             # Next.js 前端
│   ├── src/
│   │   ├── config/      # 环境变量验证配置
│   │   └── lib/         # 工具函数
│   └── ...
└── docker-compose.yml   # Docker 配置
```

## 🛠️ 技术栈

### Backend
- **NestJS** - Node.js 框架
- **Prisma** - ORM
- **PostgreSQL** - 数据库
- **Swagger** - API 文档
- **Zod** - 环境变量验证

### Frontend
- **Next.js 16** - React 框架
- **React 19** - UI 库
- **TailwindCSS** - 样式
- **TypeScript** - 类型安全
- **Zod** - 环境变量验证

## 📚 开发指南

### 添加新的环境变量

1. 在验证文件中添加规则：
   - Backend: `backend/src/config/env.validation.ts`
   - Frontend: `dnextjs/src/config/env.ts`

2. 更新示例文件：
   - Backend: `backend/.env.example`
   - Frontend: `dnextjs/env.example`

3. 更新你的 `.env` 文件

### 使用环境变量

#### Backend
```typescript
import { ConfigService } from '@nestjs/config';

constructor(private config: ConfigService) {}

const secret = this.config.get('JWT_SECRET');
```

#### Frontend
```typescript
import { env } from '@/config/env';

const apiUrl = env.NEXT_PUBLIC_API_URL;
```

## 🧪 测试

```bash
# Backend
cd backend
npm test

# Frontend
cd dnextjs
npm test
```

## 🔒 安全

- ✅ 环境变量验证确保配置正确
- ✅ JWT 密钥至少 32 个字符
- ✅ `.env` 文件不会被提交到 Git
- ✅ 生产环境使用不同的配置

## 📝 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！
