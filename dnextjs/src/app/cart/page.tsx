'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '@/types';

// 模拟购物车数据
const initialCartItems: CartItem[] = [
  {
    product: {
      id: '1',
      name: 'iPhone 15 Pro Max',
      description: '最新款苹果旗舰手机，配备A17 Pro芯片',
      price: 9999,
      image: '/placeholder-product.jpg',
      category: 'electronics',
      stock: 50,
    },
    quantity: 1,
  },
  {
    product: {
      id: '3',
      name: 'AirPods Pro 2',
      description: '主动降噪无线耳机，音质出众',
      price: 1899,
      image: '/placeholder-product.jpg',
      category: 'electronics',
      stock: 100,
    },
    quantity: 2,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">购物车</h1>

      {cartItems.length === 0 ? (
        /* 空购物车 */
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-4">您的购物车是空的</p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            去购物
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 购物车商品列表 */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-md p-6 flex gap-6"
              >
                {/* 商品图片 */}
                <div className="relative w-32 h-32 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 商品信息 */}
                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="text-lg font-semibold hover:text-blue-600 mb-2 block"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">
                        ¥{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        单价: ¥{item.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 删除按钮 */}
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-600 hover:text-red-700 self-start"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* 订单摘要 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">订单摘要</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">小计</span>
                  <span className="font-semibold">¥{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">运费</span>
                  <span className="font-semibold">
                    {shipping === 0 ? '免费' : `¥${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">总计</span>
                    <span className="text-2xl font-bold text-red-600">
                      ¥{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
                去结算
              </button>
              <Link
                href="/products"
                className="block text-center text-blue-600 hover:text-blue-700"
              >
                继续购物
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
