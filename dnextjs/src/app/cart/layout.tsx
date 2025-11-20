import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '购物车 - 商城CMS',
  description: '查看购物车中的商品，调整商品数量，计算订单总额，快速结算您的订单',
  keywords: '购物车,结算,订单总额,商品数量',
  openGraph: {
    title: '购物车 - 商城CMS',
    description: '查看购物车，快速结算',
    type: 'website',
    locale: 'zh_CN',
  },
  robots: {
    index: false, // 购物车页面不需要被搜索引擎索引
    follow: true,
  },
  alternates: {
    canonical: 'https://your-domain.com/cart',
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
