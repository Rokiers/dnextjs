import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '商城CMS - 优质商品在线购物平台',
  description: '商城CMS提供电子产品、时尚服饰、家居生活等优质商品，享受便捷的在线购物体验，全场包邮，7天无理由退换货',
  keywords: '在线购物,电商平台,电子产品,时尚服饰,家居用品,优惠促销',
  openGraph: {
    title: '商城CMS - 优质商品在线购物平台',
    description: '发现优质商品，享受购物乐趣。全场包邮，7天无理由退换货',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://your-domain.com',
    siteName: '商城CMS',
  },
  twitter: {
    card: 'summary_large_image',
    title: '商城CMS - 优质商品在线购物平台',
    description: '发现优质商品，享受购物乐趣',
  },
  alternates: {
    canonical: 'https://your-domain.com',
  },
};

// 模拟商品数据
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    description: '最新款苹果旗舰手机，配备A17 Pro芯片',
    price: 9999,
    image: '/placeholder-product.jpg',
    category: 'electronics',
    stock: 50,
  },
  {
    id: '2',
    name: 'MacBook Pro 16"',
    description: 'M3 Max芯片，专业级性能笔记本',
    price: 25999,
    image: '/placeholder-product.jpg',
    category: 'electronics',
    stock: 30,
  },
  {
    id: '3',
    name: 'AirPods Pro 2',
    description: '主动降噪无线耳机，音质出众',
    price: 1899,
    image: '/placeholder-product.jpg',
    category: 'electronics',
    stock: 100,
  },
  {
    id: '4',
    name: '时尚休闲外套',
    description: '秋冬新款，舒适保暖',
    price: 599,
    image: '/placeholder-product.jpg',
    category: 'fashion',
    stock: 80,
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 轮播横幅 */}
      <section className="mb-12">
        <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">欢迎来到商城CMS</h1>
              <p className="text-xl mb-8">发现优质商品，享受购物乐趣</p>
              <Link
                href="/products"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                立即购物
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 分类导航 */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">热门分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/products?category=electronics"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
          >
            <div className="text-4xl mb-2">📱</div>
            <h3 className="font-semibold">电子产品</h3>
          </Link>
          <Link
            href="/products?category=fashion"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
          >
            <div className="text-4xl mb-2">👔</div>
            <h3 className="font-semibold">时尚服饰</h3>
          </Link>
          <Link
            href="/products?category=home"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
          >
            <div className="text-4xl mb-2">🏠</div>
            <h3 className="font-semibold">家居生活</h3>
          </Link>
          <Link
            href="/products?category=sports"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
          >
            <div className="text-4xl mb-2">⚽</div>
            <h3 className="font-semibold">运动户外</h3>
          </Link>
        </div>
      </section>

      {/* 精选商品 */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">精选商品</h2>
          <Link href="/products" className="text-blue-600 hover:text-blue-700 font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 促销横幅 */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">限时优惠</h2>
          <p className="text-xl mb-6">全场商品8折起，满500减50</p>
          <Link
            href="/products"
            className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            立即抢购
          </Link>
        </div>
      </section>
    </div>
  );
}
