import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { generateWebsiteJsonLd, generateOrganizationJsonLd } from "@/lib/seo";
import { CartProvider } from "@/contexts/CartContext";

import { AntdRegistry } from '@ant-design/nextjs-registry'; //antd 为了nextjs 的服务器渲染特制的

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "商城CMS - 您的在线购物平台",
    template: "%s | 商城CMS",
  },
  description: "提供优质商品和服务的电商平台，包括电子产品、时尚服饰、家居生活等多个分类，全场包邮，7天无理由退换货",
  keywords: "在线购物,电商平台,电子产品,时尚服饰,家居用品,优惠促销,正品保证",
  authors: [{ name: "商城CMS" }],
  creator: "商城CMS",
  publisher: "商城CMS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://your-domain.com',
    siteName: '商城CMS',
    title: '商城CMS - 您的在线购物平台',
    description: '提供优质商品和服务的电商平台',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '商城CMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '商城CMS - 您的在线购物平台',
    description: '提供优质商品和服务的电商平台',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <JsonLd data={generateWebsiteJsonLd()} />
        <JsonLd data={generateOrganizationJsonLd()} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="min-h-screen bg-gray-50">
            <AntdRegistry>{children}</AntdRegistry>
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
