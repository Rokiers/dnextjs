import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import type { Metadata } from 'next';

// 模拟商品详情数据
const getProductById = (id: string) => {
  return {
    id,
    name: 'iPhone 15 Pro Max',
    description: '最新款苹果旗舰手机，配备A17 Pro芯片，钛金属边框，支持USB-C接口',
    price: 9999,
    image: '/placeholder-product.jpg',
    category: 'electronics',
    stock: 50,
    rating: 4.8,
    reviews: 128,
    features: [
      'A17 Pro 芯片',
      '6.7英寸超视网膜XDR显示屏',
      '4800万像素主摄像头',
      '钛金属设计',
      '支持5G网络',
      '最长29小时视频播放',
    ],
  };
};

// 动态生成每个商品的 SEO 元数据
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = getProductById(params.id);
  
  return {
    title: `${product.name} - 商城CMS`,
    description: `${product.description}。价格：¥${product.price}，库存充足，支持7天无理由退换货。立即购买享受优惠！`,
    keywords: `${product.name},${product.category},在线购买,优惠价格,正品保证`,
    openGraph: {
      title: `${product.name} - 商城CMS`,
      description: product.description,
      type: 'website',
      locale: 'zh_CN',
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - 商城CMS`,
      description: product.description,
      images: [product.image],
    },
    alternates: {
      canonical: `https://your-domain.com/products/${params.id}`,
    },
    // 商品结构化数据（JSON-LD）
    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'CNY',
      'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
      'product:condition': 'new',
    },
  };
}

import JsonLd from '@/components/JsonLd';
import { generateProductJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  
  // 生成面包屑导航结构化数据
  const breadcrumbItems = [
    { name: '首页', url: 'https://your-domain.com' },
    { name: '商品', url: 'https://your-domain.com/products' },
    { name: product.name, url: `https://your-domain.com/products/${params.id}` },
  ];

  return (
    <>
      <JsonLd data={generateProductJsonLd(product)} />
      <JsonLd data={generateBreadcrumbJsonLd(breadcrumbItems)} />
      <div className="container mx-auto px-4 py-8">
      {/* 面包屑导航 */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-blue-600">商品</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 商品图片 */}
          <div>
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative h-24 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75">
                  <Image
                    src={product.image}
                    alt={`${product.name} ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 商品信息 */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* 评分 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={star <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} 评价)
              </span>
            </div>

            {/* 价格 */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-red-600">¥{product.price.toFixed(2)}</span>
              <p className="text-gray-600 mt-2">库存: {product.stock} 件</p>
            </div>

            {/* 描述 */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* 特性列表 */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">产品特性:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-4 mb-6">
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold">
                <ShoppingCart size={20} />
                加入购物车
              </button>
              <button className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                立即购买
              </button>
            </div>

            {/* 辅助操作 */}
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
                <Heart size={20} />
                收藏
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Share2 size={20} />
                分享
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
