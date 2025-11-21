# E-commerce Backend API

基于 NestJS + Prisma + PostgreSQL 的电商后端 API

## 📦 技术栈

- **NestJS** - Node.js 框架
- **Prisma** - ORM 数据库工具
- **PostgreSQL** - 关系型数据库
- **Swagger** - API 文档
- **TypeScript** - 类型安全

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ecommerce?schema=public"
PORT=4000
CORS_ORIGIN=http://localhost:3000
```

### 3. 数据库迁移

```bash
# 生成 Prisma Client
npm run prisma:generate

# 运行数据库迁移
npm run prisma:migrate

# (可选) 打开 Prisma Studio 查看数据
npm run prisma:studio
```

### 4. 启动开发服务器

```bash
npm run start:dev
```

访问：
- API: http://localhost:4000
- Swagger 文档: http://localhost:4000/api/docs

## 🐳 Docker 部署

### 单独运行后端

```bash
# 构建镜像
docker build -t ecommerce-backend .

# 运行容器
docker run -p 4000:4000 \
  -e DATABASE_URL="postgresql://postgres:password@host.docker.internal:5432/ecommerce" \
  ecommerce-backend
```

### 使用 docker-compose（推荐）

在项目根目录运行：

```bash
docker-compose up -d
```

这将启动：
- PostgreSQL 数据库 (端口 5432)
- NestJS 后端 (端口 4000)
- Next.js 前端 (端口 3000)
- Nginx 反向代理 (端口 8080)

## 📚 API 文档

启动服务后访问 Swagger 文档：http://localhost:4000/api/docs

### 主要 API 端点

#### 商品 (Products)
- `GET /api/products` - 获取所有商品
- `GET /api/products/:id` - 获取单个商品
- `POST /api/products` - 创建商品
- `PUT /api/products/:id` - 更新商品
- `DELETE /api/products/:id` - 删除商品

#### 分类 (Categories)
- `GET /api/categories` - 获取所有分类
- `GET /api/categories/:id` - 获取单个分类

#### 订单 (Orders)
- `GET /api/orders` - 获取所有订单
- `GET /api/orders/:id` - 获取单个订单

#### 购物车 (Cart)
- `GET /api/cart/:userId` - 获取用户购物车
- `POST /api/cart/:userId/items` - 添加商品到购物车
- `DELETE /api/cart/:userId/items/:productId` - 从购物车移除商品

#### 用户 (Users)
- `GET /api/users/:id` - 获取用户信息

## 🗄️ 数据库结构

### 主要表

- **users** - 用户表
- **categories** - 商品分类
- **products** - 商品
- **orders** - 订单
- **order_items** - 订单项
- **carts** - 购物车
- **cart_items** - 购物车项
- **reviews** - 商品评价

详细 schema 见 `prisma/schema.prisma`

## 🛠️ 开发命令

```bash
# 开发模式
npm run start:dev

# 生产构建
npm run build
npm run start:prod

# 代码格式化
npm run format

# 代码检查
npm run lint

# 运行测试
npm test

# Prisma 相关
npm run prisma:generate    # 生成 Prisma Client
npm run prisma:migrate     # 运行迁移
npm run prisma:studio      # 打开 Prisma Studio
npm run prisma:seed        # 运行种子数据
```

## 📁 项目结构

```
backend/
├── prisma/
│   └── schema.prisma      # Prisma 数据库 schema
├── src/
│   ├── app.module.ts      # 根模块
│   ├── main.ts            # 入口文件
│   ├── prisma/            # Prisma 服务
│   ├── products/          # 商品模块
│   ├── categories/        # 分类模块
│   ├── orders/            # 订单模块
│   ├── users/             # 用户模块
│   └── cart/              # 购物车模块
├── Dockerfile             # Docker 配置
├── package.json
└── tsconfig.json
```

## 🔧 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `NODE_ENV` | 运行环境 | `development` |
| `PORT` | 服务端口 | `4000` |
| `DATABASE_URL` | 数据库连接 | - |
| `CORS_ORIGIN` | CORS 允许源 | `http://localhost:3000` |
| `JWT_SECRET` | JWT 密钥 | - |

## 📝 注意事项

1. **首次运行**需要先运行数据库迁移
2. **生产环境**请修改数据库密码和 JWT 密钥
3. **Prisma Client** 在 schema 修改后需要重新生成
4. **Docker 部署**会自动运行迁移

## 🤝 开发规范

- 使用 TypeScript 严格模式
- 遵循 NestJS 模块化架构
- API 使用 RESTful 设计
- 所有 API 添加 Swagger 文档
- 使用 DTO 进行数据验证

## 📄 License

MIT
