'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 bg-gray-200">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-red-600">
              ¥{product.price.toFixed(2)}
            </span>
            <p className="text-sm text-gray-500">库存: {product.stock}</p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsAdding(true);
              addToCart(product, 1);
              setTimeout(() => setIsAdding(false), 1000);
            }}
            disabled={isAdding}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              isAdding
                ? 'bg-green-600 text-white'
                : isInCart(product.id)
                ? 'bg-gray-600 text-white hover:bg-gray-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <ShoppingCart size={18} />
            {isAdding ? '已添加!' : isInCart(product.id) ? '再次添加' : '加入购物车'}
          </button>
        </div>
      </div>
    </div>
  );
}
