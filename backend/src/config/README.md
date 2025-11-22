# Backend 环境变量配置

## 使用方法

### 方式 1: 通过 ConfigService（推荐）

在 NestJS 服务中使用 `ConfigService`：

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './config/env.validation';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService<EnvConfig>) {}

  generateToken() {
    // 类型安全的访问环境变量
    const secret = this.configService.get('JWT_SECRET', { infer: true });
    const expiresIn = this.configService.get('JWT_EXPIRES_IN', { infer: true });
    
    // 使用 secret 和 expiresIn...
  }
}
```

### 方式 2: 直接导入（适用于非 NestJS 上下文）

```typescript
import { getEnvConfig } from './config/env.validation';

const env = getEnvConfig();

console.log(env.JWT_SECRET);  // 类型安全，有智能提示
console.log(env.PORT);         // 已转换为 number 类型
console.log(env.NODE_ENV);     // 'development' | 'production' | 'test'
```

## 验证规则

当前配置的验证规则：

- **NODE_ENV**: 必须是 'development', 'production', 或 'test'
- **PORT**: 必须是数字字符串，会自动转换为 number
- **DATABASE_URL**: 必须是有效的 URL 格式
- **JWT_SECRET**: 必须至少 32 个字符
- **JWT_EXPIRES_IN**: 字符串，如 '7d', '24h'
- **CORS_ORIGIN**: 必须是有效的 URL

## 添加新的环境变量

1. 在 `env.validation.ts` 中添加验证规则：

```typescript
const envSchema = z.object({
  // ... 现有配置
  
  // 新增配置
  REDIS_URL: z.string().url().optional(),
  MAX_FILE_SIZE: z.string().regex(/^\d+$/).transform(Number).default('10485760'),
});
```

2. 更新 `.env.example` 文件

3. 更新你的 `.env` 文件

## Zod 验证示例

```typescript
// 字符串验证
API_KEY: z.string().min(20),

// 数字验证（从字符串转换）
PORT: z.string().regex(/^\d+$/).transform(Number),

// 枚举验证
NODE_ENV: z.enum(['development', 'production', 'test']),

// URL 验证
DATABASE_URL: z.string().url(),

// 邮箱验证
ADMIN_EMAIL: z.string().email(),

// 可选值
OPTIONAL_VAR: z.string().optional(),

// 带默认值
DEFAULT_VAR: z.string().default('default-value'),

// 布尔值（从字符串转换）
ENABLE_FEATURE: z.string().transform(val => val === 'true'),

// 数组（从逗号分隔的字符串转换）
ALLOWED_ORIGINS: z.string().transform(val => val.split(',')),
```

## 错误处理

如果环境变量验证失败，应用会：

1. 在控制台显示详细的错误信息
2. 列出所有验证失败的变量
3. 退出进程（exit code 1）

示例错误输出：

```
🚨 环境变量验证失败:

  ❌ JWT_SECRET: String must contain at least 32 character(s)
  ❌ DATABASE_URL: Invalid url
  ❌ PORT: Expected string, received number

请检查你的 .env 文件，确保所有必需的环境变量都已正确配置。
参考 .env.example 文件查看所需的环境变量。
```

## 最佳实践

1. **永远不要在代码中硬编码敏感信息**
2. **使用类型安全的访问方式**
3. **为所有环境变量提供清晰的验证规则**
4. **在 .env.example 中提供示例值和说明**
5. **定期审查和更新环境变量配置**
