import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '全部商品 - 商城CMS',
  description: '浏览商城CMS全部商品，包括电子产品、时尚服饰、家居生活等多个分类，支持筛选和排序，找到您心仪的商品',
  keywords: '商品列表,电子产品,时尚服饰,家居用品,商品筛选,价格排序',
  openGraph: {
    title: '全部商品 - 商城CMS',
    description: '浏览全部商品，支持分类筛选和价格排序',
    type: 'website',
    locale: 'zh_CN',
  },
  alternates: {
    canonical: 'https://your-domain.com/products',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
