import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 关于我们 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">关于我们</h3>
            <p className="text-sm mb-4">
              我们致力于为您提供最优质的商品和服务，打造最佳的购物体验。
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-blue-400">
                  全部商品
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-blue-400">
                  我的订单
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-blue-400">
                  购物车
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400">
                  关于我们
                </Link>
              </li>
            </ul>
          </div>

          {/* 客户服务 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">客户服务</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="hover:text-blue-400">
                  帮助中心
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-blue-400">
                  配送信息
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-blue-400">
                  退换货政策
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400">
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系我们 */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">联系我们</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>400-123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@shop.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>中国上海市浦东新区<br />某某街道123号</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 商城CMS. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
}
