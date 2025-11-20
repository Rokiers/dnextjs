// 产品类型定义
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

// 订单项类型
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

// 订单类型
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: string;
}

// 用户类型
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// 购物车项类型
export interface CartItem {
  product: Product;
  quantity: number;
}
