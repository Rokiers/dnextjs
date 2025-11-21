'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* 顶部栏 */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            商城CMS
          </Link>

          {/* 搜索框 - 桌面版 */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="搜索商品..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* 右侧图标 */}
          <div className="flex items-center gap-6">
            <Link href="/login" className="hidden md:flex items-center gap-2 hover:text-blue-600">
              <User size={24} />
              <span>登录</span>
            </Link>
            <Link href="/cart" className="relative hover:text-blue-600">
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* 导航栏 */}
        <nav className="hidden md:flex items-center gap-8 py-3 border-t">
          <Link href="/" className="hover:text-blue-600 font-medium">
            首页
          </Link>
          <Link href="/products" className="hover:text-blue-600 font-medium">
            全部商品
          </Link>
          <Link href="/products?category=electronics" className="hover:text-blue-600 font-medium">
            电子产品
          </Link>
          <Link href="/products?category=fashion" className="hover:text-blue-600 font-medium">
            时尚服饰
          </Link>
          <Link href="/products?category=home" className="hover:text-blue-600 font-medium">
            家居生活
          </Link>
          <Link href="/orders" className="hover:text-blue-600 font-medium">
            我的订单
          </Link>
        </nav>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索商品..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                  <Search size={20} />
                </button>
              </div>
              <Link href="/" className="py-2 hover:text-blue-600">首页</Link>
              <Link href="/products" className="py-2 hover:text-blue-600">全部商品</Link>
              <Link href="/orders" className="py-2 hover:text-blue-600">我的订单</Link>
              <Link href="/login" className="py-2 hover:text-blue-600">登录</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
