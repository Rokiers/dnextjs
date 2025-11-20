import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '我的订单 - 商城CMS',
  description: '查看和管理您的所有订单，包括订单状态、物流信息、订单详情等，支持订单筛选和查询',
  keywords: '订单管理,订单查询,物流跟踪,订单状态,订单详情',
  openGraph: {
    title: '我的订单 - 商城CMS',
    description: '查看和管理您的所有订单',
    type: 'website',
    locale: 'zh_CN',
  },
  robots: {
    index: false, // 订单页面不需要被搜索引擎索引
    follow: true,
  },
  alternates: {
    canonical: 'https://your-domain.com/orders',
  },
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
