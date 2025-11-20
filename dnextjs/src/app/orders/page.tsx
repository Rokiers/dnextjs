'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Order } from '@/types';

// 模拟订单数据
const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    userId: 'user1',
    items: [
      {
        productId: '1',
        productName: 'iPhone 15 Pro Max',
        quantity: 1,
        price: 9999,
        image: '/placeholder-product.jpg',
      },
      {
        productId: '3',
        productName: 'AirPods Pro 2',
        quantity: 2,
        price: 1899,
        image: '/placeholder-product.jpg',
      },
    ],
    totalAmount: 13797,
    status: 'delivered',
    createdAt: '2024-11-15',
    shippingAddress: '上海市浦东新区某某街道123号',
  },
  {
    id: 'ORD-2024-002',
    userId: 'user1',
    items: [
      {
        productId: '2',
        productName: 'MacBook Pro 16"',
        quantity: 1,
        price: 25999,
        image: '/placeholder-product.jpg',
      },
    ],
    totalAmount: 25999,
    status: 'shipped',
    createdAt: '2024-11-18',
    shippingAddress: '上海市浦东新区某某街道123号',
  },
  {
    id: 'ORD-2024-003',
    userId: 'user1',
    items: [
      {
        productId: '4',
        productName: '时尚休闲外套',
        quantity: 1,
        price: 599,
        image: '/placeholder-product.jpg',
      },
    ],
    totalAmount: 599,
    status: 'processing',
    createdAt: '2024-11-20',
    shippingAddress: '上海市浦东新区某某街道123号',
  },
];

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="text-green-600" size={24} />;
    case 'shipped':
      return <Truck className="text-blue-600" size={24} />;
    case 'processing':
      return <Clock className="text-yellow-600" size={24} />;
    case 'cancelled':
      return <XCircle className="text-red-600" size={24} />;
    default:
      return <Package className="text-gray-600" size={24} />;
  }
};

const getStatusText = (status: Order['status']) => {
  const statusMap = {
    pending: '待处理',
    processing: '处理中',
    shipped: '已发货',
    delivered: '已送达',
    cancelled: '已取消',
  };
  return statusMap[status];
};

const getStatusColor = (status: Order['status']) => {
  const colorMap = {
    pending: 'bg-gray-100 text-gray-800',
    processing: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return colorMap[status];
};

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">我的订单</h1>

      {/* 筛选栏 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            全部订单
          </button>
          <button
            onClick={() => setFilterStatus('processing')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'processing'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            处理中
          </button>
          <button
            onClick={() => setFilterStatus('shipped')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'shipped'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            已发货
          </button>
          <button
            onClick={() => setFilterStatus('delivered')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterStatus === 'delivered'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            已送达
          </button>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 订单头部 */}
            <div className="bg-gray-50 px-6 py-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>订单号: {order.id}</p>
                <p>下单时间: {order.createdAt}</p>
              </div>
            </div>

            {/* 订单商品 */}
            <div className="p-6">
              <div className="space-y-4 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.productName}</h3>
                      <p className="text-gray-600 text-sm">数量: {item.quantity}</p>
                      <p className="text-red-600 font-semibold">¥{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 订单底部 */}
              <div className="border-t pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="text-sm text-gray-600">
                  <p>配送地址: {order.shippingAddress}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">订单总额</p>
                    <p className="text-2xl font-bold text-red-600">¥{order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/orders/${order.id}`}
                      className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      查看详情
                    </Link>
                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        再次购买
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {filteredOrders.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-4">暂无订单</p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            去购物
          </Link>
        </div>
      )}
    </div>
  );
}
