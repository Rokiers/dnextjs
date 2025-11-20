'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { Filter } from 'lucide-react';

// SEO 元数据通过 layout 或单独的 metadata 文件处理
// 对于客户端组件，我们需要创建单独的 metadata 文件

// 模拟商品数据
const allProducts: Product[] = [
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
  {
    id: '5',
    name: '运动跑鞋',
    description: '轻便透气，适合长跑',
    price: 799,
    image: '/placeholder-product.jpg',
    category: 'fashion',
    stock: 60,
  },
  {
    id: '6',
    name: '智能手表',
    description: '健康监测，运动追踪',
    price: 2499,
    image: '/placeholder-product.jpg',
    category: 'electronics',
    stock: 45,
  },
  {
    id: '7',
    name: '咖啡机',
    description: '全自动意式咖啡机',
    price: 3999,
    image: '/placeholder-product.jpg',
    category: 'home',
    stock: 25,
  },
  {
    id: '8',
    name: '北欧风台灯',
    description: '简约设计，护眼光源',
    price: 299,
    image: '/placeholder-product.jpg',
    category: 'home',
    stock: 70,
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  // 过滤商品
  const filteredProducts = allProducts.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  // 排序商品
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">全部商品</h1>

      {/* 筛选和排序栏 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={20} />
            <span className="font-semibold">筛选:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setSelectedCategory('electronics')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'electronics'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                电子产品
              </button>
              <button
                onClick={() => setSelectedCategory('fashion')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'fashion'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                时尚服饰
              </button>
              <button
                onClick={() => setSelectedCategory('home')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === 'home'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                家居生活
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">排序:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">默认</option>
              <option value="price-low">价格从低到高</option>
              <option value="price-high">价格从高到低</option>
              <option value="name">名称</option>
            </select>
          </div>
        </div>
      </div>

      {/* 商品列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* 空状态 */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">暂无商品</p>
        </div>
      )}
    </div>
  );
}
