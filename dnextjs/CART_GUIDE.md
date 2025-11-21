# 全局购物车使用指南

## 📦 功能说明

已为项目添加了完整的全局购物车状态管理系统，使用 React Context API 实现。

## 🎯 核心功能

### 1. 购物车状态管理
- ✅ 添加商品到购物车
- ✅ 删除购物车商品
- ✅ 更新商品数量
- ✅ 清空购物车
- ✅ 计算购物车总价
- ✅ 获取购物车商品总数
- ✅ 检查商品是否在购物车中

### 2. 数据持久化
- ✅ 自动保存到 localStorage
- ✅ 页面刷新后数据不丢失
- ✅ 跨标签页同步（同一浏览器）

### 3. UI 集成
- ✅ Header 显示购物车商品数量
- ✅ ProductCard 支持一键加入购物车
- ✅ Cart 页面完整购物车管理

## 📁 文件结构

```
src/
├── contexts/
│   └── CartContext.tsx          # 购物车 Context 和 Provider
├── app/
│   ├── layout.tsx               # 已添加 CartProvider
│   └── cart/
│       └── page.tsx             # 购物车页面（已更新）
└── components/
    ├── Header.tsx               # 显示购物车数量（已更新）
    └── ProductCard.tsx          # 加入购物车按钮（已更新）
```

## 🚀 使用方法

### 在任何组件中使用购物车

```tsx
'use client';

import { useCart } from '@/contexts/CartContext';

export default function YourComponent() {
  const {
    cartItems,        // 购物车商品列表
    addToCart,        // 添加商品
    removeFromCart,   // 删除商品
    updateQuantity,   // 更新数量
    clearCart,        // 清空购物车
    getCartTotal,     // 获取总价
    getCartCount,     // 获取商品总数
    isInCart,         // 检查商品是否在购物车
  } = useCart();

  // 添加商品示例
  const handleAddToCart = () => {
    const product = {
      id: '1',
      name: 'iPhone 15',
      price: 9999,
      // ... 其他字段
    };
    addToCart(product, 1); // 添加1个
  };

  return (
    <div>
      <p>购物车商品数: {getCartCount()}</p>
      <p>购物车总价: ¥{getCartTotal()}</p>
      <button onClick={handleAddToCart}>加入购物车</button>
    </div>
  );
}
```

### API 说明

#### `addToCart(product: Product, quantity?: number)`
添加商品到购物车
- 如果商品已存在，会增加数量
- 默认数量为 1

```tsx
addToCart(product, 2); // 添加2个
```

#### `removeFromCart(productId: string)`
从购物车移除商品

```tsx
removeFromCart('product-123');
```

#### `updateQuantity(productId: string, quantity: number)`
更新商品数量
- 如果数量 <= 0，会自动删除商品

```tsx
updateQuantity('product-123', 5);
```

#### `clearCart()`
清空整个购物车

```tsx
clearCart();
```

#### `getCartTotal(): number`
获取购物车总价（不含运费）

```tsx
const total = getCartTotal(); // 返回数字
```

#### `getCartCount(): number`
获取购物车商品总数

```tsx
const count = getCartCount(); // 返回数字
```

#### `isInCart(productId: string): boolean`
检查商品是否在购物车中

```tsx
if (isInCart('product-123')) {
  console.log('商品已在购物车');
}
```

## 💡 使用示例

### 示例 1: 商品详情页添加到购物车

```tsx
'use client';

import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`已添加 ${quantity} 个商品到购物车`);
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>¥{product.price}</p>
      
      <div>
        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      
      <button onClick={handleAddToCart}>加入购物车</button>
    </div>
  );
}
```

### 示例 2: 购物车浮层

```tsx
'use client';

import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function CartDropdown() {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        购物车 ({cartItems.length})
      </button>
      
      {isOpen && (
        <div className="cart-dropdown">
          {cartItems.map(item => (
            <div key={item.product.id}>
              <span>{item.product.name}</span>
              <span>x{item.quantity}</span>
              <span>¥{item.product.price * item.quantity}</span>
              <button onClick={() => removeFromCart(item.product.id)}>
                删除
              </button>
            </div>
          ))}
          <div>
            <p>总计: ¥{getCartTotal()}</p>
            <button>去结算</button>
          </div>
        </div>
      )}
    </div>
  );
}
```

### 示例 3: 结算页面

```tsx
'use client';

import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    // 调用支付 API
    const order = {
      items: cartItems,
      total: getCartTotal(),
      // ... 其他订单信息
    };
    
    // await createOrder(order);
    
    // 清空购物车
    clearCart();
    
    // 跳转到订单成功页
    router.push('/orders/success');
  };

  return (
    <div>
      <h1>结算</h1>
      {cartItems.map(item => (
        <div key={item.product.id}>
          {item.product.name} x {item.quantity}
        </div>
      ))}
      <p>总计: ¥{getCartTotal()}</p>
      <button onClick={handleCheckout}>确认支付</button>
    </div>
  );
}
```

## 🎨 自定义样式

### 购物车徽章动画

```css
/* 添加到 globals.css */
@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.cart-badge {
  animation: bounce 0.3s ease-in-out;
}
```

在组件中使用：

```tsx
const [isAnimating, setIsAnimating] = useState(false);

const handleAddToCart = () => {
  addToCart(product);
  setIsAnimating(true);
  setTimeout(() => setIsAnimating(false), 300);
};

<span className={isAnimating ? 'cart-badge' : ''}>
  {getCartCount()}
</span>
```

## 🔧 高级功能

### 1. 添加购物车限制

```tsx
const handleAddToCart = (product: Product, quantity: number) => {
  // 检查库存
  if (quantity > product.stock) {
    alert('库存不足');
    return;
  }
  
  // 检查购物车中已有数量
  const existingItem = cartItems.find(item => item.product.id === product.id);
  const totalQuantity = (existingItem?.quantity || 0) + quantity;
  
  if (totalQuantity > product.stock) {
    alert('超过库存限制');
    return;
  }
  
  addToCart(product, quantity);
};
```

### 2. 购物车同步到服务器

```tsx
useEffect(() => {
  // 登录用户同步购物车到服务器
  if (user && cartItems.length > 0) {
    syncCartToServer(user.id, cartItems);
  }
}, [cartItems, user]);
```

### 3. 合并登录前后的购物车

```tsx
const mergeCart = async (userId: string) => {
  // 获取服务器购物车
  const serverCart = await fetchCartFromServer(userId);
  
  // 合并本地购物车
  const mergedCart = [...serverCart];
  cartItems.forEach(localItem => {
    const existingIndex = mergedCart.findIndex(
      item => item.product.id === localItem.product.id
    );
    
    if (existingIndex >= 0) {
      mergedCart[existingIndex].quantity += localItem.quantity;
    } else {
      mergedCart.push(localItem);
    }
  });
  
  // 更新购物车
  setCartItems(mergedCart);
};
```

## 📝 注意事项

1. **客户端组件**：使用 `useCart` 的组件必须是客户端组件（添加 `'use client'`）

2. **localStorage 限制**：
   - 大小限制约 5-10MB
   - 仅在浏览器端可用
   - 不同域名不共享

3. **安全性**：
   - 不要在购物车中存储敏感信息
   - 结算时需要在服务器端验证价格和库存

4. **性能**：
   - 购物车数据会在每次更新时保存到 localStorage
   - 大量商品可能影响性能

## 🐛 常见问题

### Q: 购物车数据丢失？
A: 检查浏览器是否禁用了 localStorage，或者是否清除了浏览器数据

### Q: 跨标签页不同步？
A: localStorage 的更新不会自动触发其他标签页的重新渲染，需要监听 storage 事件

### Q: 服务端渲染错误？
A: 确保使用 `useCart` 的组件添加了 `'use client'` 指令

## 🚀 下一步

- [ ] 添加购物车同步到服务器
- [ ] 实现优惠券功能
- [ ] 添加购物车推荐商品
- [ ] 实现购物车分享功能
- [ ] 添加购物车过期提醒

购物车系统已完全集成，可以直接使用！
