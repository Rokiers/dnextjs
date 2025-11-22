# 环境变量配置指南

本项目使用 **Zod** 进行环境变量验证，确保应用启动前所有必需的环境变量都已正确配置。

## 🎯 为什么需要环境变量验证？

- ✅ **早期错误检测** - 在应用启动时就发现配置问题，而不是在运行时
- ✅ **类型安全** - TypeScript 类型支持，避免拼写错误
- ✅ **清晰的错误信息** - 准确指出哪个环境变量缺失或格式错误
- ✅ **文档化** - 代码即文档，清楚地定义了需要哪些环境变量

## 📦 安装依赖

### Backend (NestJS)

```bash
cd backend
npm install
```

### Frontend (Next.js)

```bash
cd dnextjs
npm install
```

## ⚙️ 配置环境变量

### Backend 配置

1. 复制示例文件：
```bash
cd backend
cp .env.example .env
```

2. 编辑 `.env` 文件，填写实际的值：

```env
# 应用配置
NODE_ENV=development
PORT=4000

# 数据库配置
DATABASE_URL="postgresql://postgres:password@postgres:5432/ecommerce?schema=public"

# JWT 配置
JWT_SECRET=your-super-secret-key-at-least-32-characters-long
JWT_EXPIRES_IN=7d

# CORS 配置
CORS_ORIGIN=http://localhost:3000
```

**重要提示：**
- `JWT_SECRET` 必须至少 32 个字符
- `DATABASE_URL` 必须是有效的 PostgreSQL 连接字符串
- 生产环境中务必使用强密码和安全的密钥

### Frontend 配置

1. 复制示例文件：
```bash
cd dnextjs
cp env.example .env.local
```

2. 编辑 `.env.local` 文件：

```env
# Node 环境
NODE_ENV=development

# 后端 API 地址（服务端使用）
API_URL=http://backend:4000

# 后端 API 地址（客户端使用）
NEXT_PUBLIC_API_URL=http://localhost:4000

# 应用配置
NEXT_PUBLIC_APP_NAME=E-commerce App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Next.js 环境变量说明：**
- `NEXT_PUBLIC_*` 前缀的变量会暴露给浏览器
- 没有前缀的变量只在服务端可用
- `API_URL` 用于服务端渲染时调用后端
- `NEXT_PUBLIC_API_URL` 用于客户端调用后端

## 🚀 使用方法

### Backend 中使用

环境变量会在应用启动时自动验证。你可以通过 NestJS 的 `ConfigService` 访问：

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './config/env.validation';

@Injectable()
export class SomeService {
  constructor(private configService: ConfigService<EnvConfig>) {}

  someMethod() {
    // 类型安全的访问
    const jwtSecret = this.configService.get('JWT_SECRET', { infer: true });
    const port = this.configService.get('PORT', { infer: true });
  }
}
```

或者直接导入验证后的配置：

```typescript
import { getEnvConfig } from './config/env.validation';

const env = getEnvConfig();
console.log(env.JWT_SECRET); // 类型安全
```

### Frontend 中使用

直接导入验证后的环境变量对象：

```typescript
import { env, isServer, isClient } from '@/config/env';

// 在任何地方使用，都有类型提示
console.log(env.NEXT_PUBLIC_API_URL);

// 检查运行环境
if (isServer) {
  // 服务端代码
  console.log(env.API_URL);
}

if (isClient) {
  // 客户端代码
  console.log(env.NEXT_PUBLIC_API_URL);
}
```

在组件中使用：

```tsx
import { env } from '@/config/env';

export default function HomePage() {
  const handleFetch = async () => {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/products`);
    // ...
  };

  return <div>{env.NEXT_PUBLIC_APP_NAME}</div>;
}
```

## ❌ 错误处理

如果环境变量验证失败，应用会在启动时显示清晰的错误信息：

```
🚨 环境变量验证失败:

  ❌ JWT_SECRET: String must contain at least 32 character(s)
  ❌ DATABASE_URL: Invalid url

请检查你的 .env 文件，确保所有必需的环境变量都已正确配置。
参考 .env.example 文件查看所需的环境变量。
```

## 🔒 安全最佳实践

1. **永远不要提交 `.env` 文件到 Git**
   - `.env` 和 `.env.local` 已在 `.gitignore` 中
   - 只提交 `.env.example` 作为模板

2. **使用强密钥**
   - JWT_SECRET 至少 32 个字符
   - 使用随机生成的密钥，不要使用简单的字符串

3. **区分环境**
   - 开发、测试、生产环境使用不同的配置
   - 生产环境的密钥必须足够强

4. **敏感信息**
   - 数据库密码、API 密钥等敏感信息只存在 `.env` 文件中
   - 使用环境变量管理工具（如 Vault）管理生产环境的密钥

## 🐳 Docker 环境

在 Docker Compose 中，环境变量通过 `docker-compose.yml` 配置：

```yaml
services:
  backend:
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@postgres:5432/ecommerce
      - JWT_SECRET=${JWT_SECRET}
    env_file:
      - ./backend/.env

  frontend:
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:4000
      - API_URL=http://backend:4000
    env_file:
      - ./dnextjs/.env.local
```

## 📝 添加新的环境变量

### Backend

1. 在 `backend/src/config/env.validation.ts` 中添加验证规则：

```typescript
const envSchema = z.object({
  // ... 现有配置
  NEW_VAR: z.string().min(1, {
    message: 'NEW_VAR 不能为空',
  }),
});
```

2. 更新 `backend/.env.example`
3. 更新你的 `.env` 文件

### Frontend

1. 在 `dnextjs/src/config/env.ts` 中添加验证规则：

```typescript
const envSchema = z.object({
  // ... 现有配置
  NEXT_PUBLIC_NEW_VAR: z.string().default('default-value'),
});
```

2. 更新 `dnextjs/env.example`
3. 更新你的 `.env.local` 文件

## 🧪 测试环境变量

你可以通过故意设置错误的值来测试验证是否工作：

```bash
# Backend
cd backend
JWT_SECRET=short npm run start:dev  # 会失败，因为太短

# Frontend
cd dnextjs
NEXT_PUBLIC_API_URL=invalid-url npm run dev  # 会失败，因为不是有效 URL
```

## 📚 更多资源

- [Zod 文档](https://zod.dev/)
- [NestJS 配置文档](https://docs.nestjs.com/techniques/configuration)
- [Next.js 环境变量文档](https://nextjs.org/docs/basic-features/environment-variables)
