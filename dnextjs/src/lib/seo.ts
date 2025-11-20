import { Product } from '@/types';

// 生成商品的 JSON-LD 结构化数据
export function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'CNY',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://your-domain.com/products/${product.id}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '128',
    },
  };
}

// 生成网站的 JSON-LD 结构化数据
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '商城CMS',
    url: 'https://your-domain.com',
    description: '优质商品在线购物平台',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://your-domain.com/products?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };
}

// 生成组织的 JSON-LD 结构化数据
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '商城CMS',
    url: 'https://your-domain.com',
    logo: 'https://your-domain.com/logo.png',
    description: '提供优质商品和服务的电商平台',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-400-123-4567',
      contactType: 'customer service',
      areaServed: 'CN',
      availableLanguage: ['zh-CN'],
    },
    sameAs: [
      'https://www.facebook.com/yourpage',
      'https://twitter.com/yourpage',
      'https://www.instagram.com/yourpage',
    ],
  };
}

// 生成面包屑导航的 JSON-LD 结构化数据
export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
