# Frontend 环境变量配置

## 使用方法

### 在任何地方使用

```typescript
import { env } from '@/config/env';

// 直接访问，有类型提示和类型检查
console.log(env.NEXT_PUBLIC_API_URL);
console.log(env.NEXT_PUBLIC_APP_NAME);
console.log(env.NODE_ENV);
```

### 在组件中使用

```tsx
import { env } from '@/config/env';

export default function Header() {
  return (
    <header>
      <h1>{env.NEXT_PUBLIC_APP_NAME}</h1>
    </header>
  );
}
```

### 在 API 调用中使用

```typescript
import { env } from '@/config/env';

export async function fetchProducts() {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/products`);
  return response.json();
}
```

### 使用封装的 API 客户端（推荐）

```typescript
import { apiRequest } from '@/lib/api';

// 自动处理 API URL
const products = await apiRequest<Product[]>('/products');
```

## Next.js 环境变量规则

### NEXT_PUBLIC_ 前缀

- **有前缀** (`NEXT_PUBLIC_*`): 暴露给浏览器，可以在客户端使用
- **无前缀**: 只在服务端可用，不会暴露给浏览器

```typescript
// ✅ 可以在客户端使用
env.NEXT_PUBLIC_API_URL

// ❌ 只能在服务端使用
env.API_URL  // 在客户端会是 undefined
```

### 服务端 vs 客户端

```typescript
import { env, isServer, isClient } from '@/config/env';

if (isServer) {
  // 服务端代码
  // 可以访问所有环境变量
  console.log(env.API_URL);
  console.log(env.NEXT_PUBLIC_API_URL);
}

if (isClient) {
  // 客户端代码
  // 只能访问 NEXT_PUBLIC_ 开头的变量
  console.log(env.NEXT_PUBLIC_API_URL);
}
```

## 验证规则

当前配置的验证规则：

- **NODE_ENV**: 'development' | 'production' | 'test'
- **API_URL**: 有效的 URL（服务端使用）
- **NEXT_PUBLIC_API_URL**: 有效的 URL（客户端使用）
- **NEXT_PUBLIC_APP_NAME**: 字符串，默认 'E-commerce App'
- **NEXT_PUBLIC_APP_URL**: 有效的 URL，默认 'http://localhost:3000'

## 添加新的环境变量

### 1. 客户端变量（浏览器可访问）

```typescript
// 在 src/config/env.ts 中
const envSchema = z.object({
  // ... 现有配置
  
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string().min(1),
});
```

### 2. 服务端变量（仅服务端）

```typescript
const envSchema = z.object({
  // ... 现有配置
  
  STRIPE_SECRET_KEY: z.string().min(1),
  DATABASE_URL: z.string().url(),
});
```

### 3. 更新 env.example

```env
# 新增的环境变量
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
STRIPE_SECRET_KEY=sk_test_xxxxx
```

## 常见使用场景

### 1. API 调用

```typescript
// lib/api.ts
import { env } from '@/config/env';

export const api = {
  baseURL: env.NEXT_PUBLIC_API_URL,
  
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    return response.json();
  },
};
```

### 2. 第三方服务配置

```typescript
// lib/analytics.ts
import { env } from '@/config/env';

export function initAnalytics() {
  if (env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
    // 初始化 Google Analytics
  }
}
```

### 3. 条件渲染

```tsx
import { env } from '@/config/env';

export default function DevTools() {
  if (env.NODE_ENV !== 'development') {
    return null;
  }
  
  return <div>开发工具</div>;
}
```

### 4. Server Actions

```typescript
'use server';

import { env } from '@/config/env';

export async function createOrder() {
  // 服务端可以访问所有环境变量
  const apiUrl = env.API_URL;
  
  const response = await fetch(`${apiUrl}/api/orders`, {
    method: 'POST',
    // ...
  });
  
  return response.json();
}
```

## Docker 环境配置

在 `docker-compose.yml` 中：

```yaml
services:
  frontend:
    environment:
      # 服务端变量
      - API_URL=http://backend:4000
      
      # 客户端变量（必须在构建时可用）
      - NEXT_PUBLIC_API_URL=http://localhost:4000
      - NEXT_PUBLIC_APP_NAME=My App
```

## 错误处理

如果环境变量验证失败：

```
🚨 环境变量验证失败:

  ❌ NEXT_PUBLIC_API_URL: Invalid url
  ❌ API_URL: Required

请检查你的 .env.local 文件，确保所有必需的环境变量都已正确配置。
参考 env.example 文件查看所需的环境变量。
```

## 最佳实践

1. **敏感信息不要使用 NEXT_PUBLIC_ 前缀**
   ```typescript
   // ❌ 错误 - API 密钥会暴露给浏览器
   NEXT_PUBLIC_API_SECRET=secret123
   
   // ✅ 正确 - 只在服务端可用
   API_SECRET=secret123
   ```

2. **使用类型安全的访问**
   ```typescript
   // ✅ 正确 - 有类型检查
   import { env } from '@/config/env';
   const url = env.NEXT_PUBLIC_API_URL;
   
   // ❌ 避免 - 没有类型检查
   const url = process.env.NEXT_PUBLIC_API_URL;
   ```

3. **区分环境**
   ```bash
   # .env.local (本地开发)
   NEXT_PUBLIC_API_URL=http://localhost:4000
   
   # .env.production (生产环境)
   NEXT_PUBLIC_API_URL=https://api.production.com
   ```

4. **使用辅助函数**
   ```typescript
   import { getApiUrl } from '@/lib/api';
   
   // 自动根据环境选择正确的 URL
   const url = getApiUrl();
   ```

## 调试技巧

### 检查环境变量是否正确加载

```typescript
// 在组件中
console.log('Environment:', {
  NODE_ENV: env.NODE_ENV,
  API_URL: env.NEXT_PUBLIC_API_URL,
  APP_NAME: env.NEXT_PUBLIC_APP_NAME,
});
```

### 验证客户端变量

在浏览器控制台中：

```javascript
// 只有 NEXT_PUBLIC_ 开头的变量可见
console.log(process.env);
```

## 更多资源

- [Next.js 环境变量文档](https://nextjs.org/docs/basic-features/environment-variables)
- [Zod 文档](https://zod.dev/)
