import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 开始填充数据库...');

  // 1. 清理旧数据 (按照依赖关系顺序删除)
  const deleteOrderItems = prisma.orderItem.deleteMany();
  const deleteOrders = prisma.order.deleteMany();
  const deleteCartItems = prisma.cartItem.deleteMany();
  const deleteCarts = prisma.cart.deleteMany();
  const deleteReviews = prisma.review.deleteMany();
  const deleteProducts = prisma.product.deleteMany();
  const deleteCategories = prisma.category.deleteMany();
  const deleteUsers = prisma.user.deleteMany();

  await prisma.$transaction([
    deleteOrderItems,
    deleteOrders,
    deleteCartItems,
    deleteCarts,
    deleteReviews,
    deleteProducts,
    deleteCategories,
    deleteUsers,
  ]);

  console.log('🗑️  旧数据已清理');

  // 2. 创建用户 (密码统一为 Password123!)
  const hashedPassword = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: '系统管理员',
      password: hashedPassword,
      role: Role.ADMIN,
      cart: { create: {} }, // 每个用户都应该有个空购物车
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: '测试用户',
      password: hashedPassword,
      role: Role.USER,
      cart: { create: {} },
    },
  });

  console.log(`👤 创建用户: Admin(${admin.email}), User(${user.email})`);

  // 3. 创建分类
  const electronics = await prisma.category.create({
    data: {
      name: '电子数码',
      slug: 'electronics',
      description: '手机、电脑、耳机及数码配件',
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: '潮流服饰',
      slug: 'clothing',
      description: '当季新款男装、女装',
    },
  });

  // 4. 创建商品
  await prisma.product.create({
    data: {
      name: 'iPhone 15 Pro Max',
      slug: 'iphone-15-pro-max',
      description: '钛金属设计，A17 Pro 芯片，史上最强 iPhone。',
      price: 9999.00,
      stock: 50,
      categoryId: electronics.id,
      images: ['https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg'],
    },
  });

  await prisma.product.create({
    data: {
      name: 'MacBook Pro M3',
      slug: 'macbook-pro-m3',
      description: '惊人的续航，令人咋舌的速度。',
      price: 12999.00,
      stock: 20,
      categoryId: electronics.id,
      images: ['https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg'],
    },
  });

  await prisma.product.create({
    data: {
      name: '纯棉重磅卫衣',
      slug: 'heavy-cotton-hoodie',
      description: '400g重磅纯棉，挺阔有型，秋冬必备。',
      price: 299.00,
      stock: 200,
      categoryId: clothing.id,
      images: ['https://assets.uniqlo.com/goods/462233/item/goods_09_462233.jpg'],
    },
  });

  console.log('📦 商品数据已创建');
  console.log('✅ 数据库初始化完成！');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
