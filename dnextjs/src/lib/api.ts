import { env } from '@/config/env';

/**
 * API 客户端配置
 * 使用验证后的环境变量，确保类型安全
 */

/**
 * 获取 API 基础 URL
 * 在服务端使用内部地址，在客户端使用公开地址
 */
export function getApiUrl(): string {
  if (typeof window === 'undefined') {
    // 服务端：使用内部 API 地址（Docker 服务名）
    return env.API_URL;
  } else {
    // 客户端：使用公开 API 地址
    return env.NEXT_PUBLIC_API_URL;
  }
}

/**
 * API 请求封装
 * 自动处理 API URL 和错误
 */
export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${getApiUrl()}/api${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

/**
 * 使用示例：
 * 
 * // 获取产品列表
 * const products = await apiRequest<Product[]>('/products');
 * 
 * // 创建产品
 * const newProduct = await apiRequest<Product>('/products', {
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'New Product', price: 100 }),
 * });
 */
