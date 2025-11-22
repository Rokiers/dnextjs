import { z } from 'zod';

/**
 * 环境变量验证 Schema
 * 使用 Zod 进行类型安全的环境变量验证
 * 应用启动时会自动验证所有必需的环境变量
 */
const envSchema = z.object({
  // 应用配置
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().regex(/^\d+$/).transform(Number).default('4000'),

  // 数据库配置
  DATABASE_URL: z.string().url({
    message: 'DATABASE_URL 必须是有效的数据库连接字符串',
  }),

  // JWT 配置
  JWT_SECRET: z.string().min(32, {
    message: 'JWT_SECRET 必须至少 32 个字符以确保安全性',
  }),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // CORS 配置
  CORS_ORIGIN: z.string().url({
    message: 'CORS_ORIGIN 必须是有效的 URL',
  }).default('http://localhost:3000'),
});

/**
 * 验证环境变量的类型
 */
export type EnvConfig = z.infer<typeof envSchema>;

/**
 * 验证环境变量
 * @throws {Error} 如果环境变量验证失败
 */
export function validateEnv(): EnvConfig {
  try {
    const validated = envSchema.parse(process.env);
    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => {
        const path = err.path.join('.');
        return `  ❌ ${path}: ${err.message}`;
      });

      console.error('\n🚨 环境变量验证失败:\n');
      console.error(errorMessages.join('\n'));
      console.error('\n请检查你的 .env 文件，确保所有必需的环境变量都已正确配置。');
      console.error('参考 .env.example 文件查看所需的环境变量。\n');
      
      process.exit(1);
    }
    throw error;
  }
}

/**
 * 获取已验证的环境变量配置
 * 这个函数会缓存验证结果，避免重复验证
 */
let cachedEnv: EnvConfig | null = null;

export function getEnvConfig(): EnvConfig {
  if (!cachedEnv) {
    cachedEnv = validateEnv();
  }
  return cachedEnv;
}
