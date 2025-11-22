import { z } from 'zod';

/**
 * Next.js 环境变量验证 Schema
 * 
 * 注意：
 * - 客户端环境变量必须以 NEXT_PUBLIC_ 开头
 * - 服务端环境变量不需要前缀
 */
const envSchema = z.object({
  // Node 环境
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // 后端 API 地址（服务端使用）
  API_URL: z.string().url({
    message: 'API_URL 必须是有效的 URL',
  }).default('http://localhost:4000'),

  // 后端 API 地址（客户端使用）
  NEXT_PUBLIC_API_URL: z.string().url({
    message: 'NEXT_PUBLIC_API_URL 必须是有效的 URL',
  }).default('http://localhost:4000'),

  // 应用配置
  NEXT_PUBLIC_APP_NAME: z.string().default('E-commerce App'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
});

/**
 * 验证环境变量的类型
 */
export type EnvConfig = z.infer<typeof envSchema>;

/**
 * 验证并获取环境变量
 * 
 * 在 Next.js 中，这个函数会在构建时和运行时都执行
 * 确保环境变量在应用启动前就被验证
 */
function validateEnv(): EnvConfig {
  // 在客户端，只有 NEXT_PUBLIC_ 开头的变量可用
  const env = {
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  };

  try {
    const validated = envSchema.parse(env);
    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err) => {
        const path = err.path.join('.');
        return `  ❌ ${path}: ${err.message}`;
      });

      console.error('\n🚨 环境变量验证失败:\n');
      console.error(errorMessages.join('\n'));
      console.error('\n请检查你的 .env.local 文件，确保所有必需的环境变量都已正确配置。');
      console.error('参考 .env.example 文件查看所需的环境变量。\n');

      // 在开发环境下，我们抛出错误以便快速发现问题
      if (process.env.NODE_ENV === 'development') {
        throw new Error('环境变量验证失败');
      }

      // 在生产环境下，我们退出进程
      process.exit(1);
    }
    throw error;
  }
}

/**
 * 导出已验证的环境变量
 * 使用这个对象而不是直接访问 process.env，可以获得类型安全
 */
export const env = validateEnv();

/**
 * 辅助函数：检查是否在服务端
 */
export const isServer = typeof window === 'undefined';

/**
 * 辅助函数：检查是否在客户端
 */
export const isClient = typeof window !== 'undefined';
