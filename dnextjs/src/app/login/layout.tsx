import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '登录/注册 - 商城CMS',
  description: '登录您的商城CMS账户，或创建新账户开始购物。支持邮箱登录和第三方账号快速登录',
  keywords: '用户登录,账号注册,第三方登录,会员中心',
  openGraph: {
    title: '登录/注册 - 商城CMS',
    description: '登录或注册您的账户',
    type: 'website',
    locale: 'zh_CN',
  },
  robots: {
    index: false, // 登录页面不需要被搜索引擎索引
    follow: true,
  },
  alternates: {
    canonical: 'https://your-domain.com/login',
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
