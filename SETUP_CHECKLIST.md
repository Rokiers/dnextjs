# 环境变量配置检查清单

使用这个清单确保你的环境变量配置正确。

## 📦 1. 安装依赖

### Backend
```bash
cd backend
npm install
```
- [ ] 依赖安装成功
- [ ] `zod` 包已安装

### Frontend
```bash
cd dnextjs
npm install
```
- [ ] 依赖安装成功
- [ ] `zod` 包已安装

## ⚙️ 2. Backend 配置

### 创建 .env 文件
```bash
cd backend
cp .env.example .env
```
- [ ] `.env` 文件已创建

### 配置环境变量

编辑 `backend/.env` 文件：

- [ ] `NODE_ENV` - 设置为 `development`
- [ ] `PORT` - 设置为 `4000` 或其他端口
- [ ] `DATABASE_URL` - 配置正确的 PostgreSQL 连接字符串
  ```
  格式: postgresql://用户名:密码@主机:端口/数据库名
  示例: postgresql://postgres:password@localhost:5432/ecommerce
  ```
- [ ] `JWT_SECRET` - **至少 32 个字符**
  ```bash
  # 生成安全的密钥
  npm run generate:jwt-secret
  ```
- [ ] `JWT_EXPIRES_IN` - 设置为 `7d` 或其他值
- [ ] `CORS_ORIGIN` - 设置为前端地址（如 `http://localhost:3000`）

### 验证配置
```bash
npm run start:dev
```
- [ ] 应用启动成功，没有环境变量错误
- [ ] 看到启动成功的消息

## 🎨 3. Frontend 配置

### 创建 .env.local 文件
```bash
cd dnextjs
cp env.example .env.local
```
- [ ] `.env.local` 文件已创建

### 配置环境变量

编辑 `dnextjs/.env.local` 文件：

- [ ] `NODE_ENV` - 设置为 `development`
- [ ] `API_URL` - 服务端 API 地址
  - 本地开发: `http://localhost:4000`
  - Docker: `http://backend:4000`
- [ ] `NEXT_PUBLIC_API_URL` - 客户端 API 地址
  - 设置为: `http://localhost:4000`
- [ ] `NEXT_PUBLIC_APP_NAME` - 应用名称（可选）
- [ ] `NEXT_PUBLIC_APP_URL` - 应用地址（可选）

### 验证配置
```bash
npm run dev
```
- [ ] 应用启动成功，没有环境变量错误
- [ ] 可以访问 http://localhost:3000

## 🐳 4. Docker 配置（可选）

如果使用 Docker Compose：

### 检查 docker-compose.yml
- [ ] Backend 服务的环境变量已配置
- [ ] Frontend 服务的环境变量已配置
- [ ] 数据库连接字符串使用正确的服务名

### 启动服务
```bash
docker-compose up -d
```
- [ ] 所有服务启动成功
- [ ] Backend 可访问: http://localhost:4000
- [ ] Frontend 可访问: http://localhost:3000
- [ ] API 文档可访问: http://localhost:4000/api/docs

## ✅ 5. 功能测试

### Backend 测试
- [ ] 访问 http://localhost:4000/api/docs
- [ ] Swagger 文档正常显示
- [ ] API 端点可以正常调用

### Frontend 测试
- [ ] 访问 http://localhost:3000
- [ ] 页面正常加载
- [ ] 可以调用后端 API

### 环境变量验证测试

#### 测试 Backend 验证
```bash
cd backend

# 测试 JWT_SECRET 太短
JWT_SECRET=short npm run start:dev
# 应该看到错误: JWT_SECRET 必须至少 32 个字符

# 测试 DATABASE_URL 格式错误
DATABASE_URL=invalid npm run start:dev
# 应该看到错误: DATABASE_URL 必须是有效的 URL
```
- [ ] 验证功能正常工作

#### 测试 Frontend 验证
```bash
cd dnextjs

# 测试 NEXT_PUBLIC_API_URL 格式错误
NEXT_PUBLIC_API_URL=invalid npm run dev
# 应该看到错误: NEXT_PUBLIC_API_URL 必须是有效的 URL
```
- [ ] 验证功能正常工作

## 🔒 6. 安全检查

- [ ] `.env` 文件不在 Git 版本控制中
- [ ] `.env.local` 文件不在 Git 版本控制中
- [ ] `.gitignore` 包含 `.env` 和 `.env.local`
- [ ] `JWT_SECRET` 至少 32 个字符
- [ ] 生产环境使用不同的密钥和配置
- [ ] 敏感信息没有硬编码在代码中

## 📚 7. 文档检查

- [ ] 阅读 `ENV_SETUP.md` - 详细配置指南
- [ ] 阅读 `QUICK_START.md` - 快速开始
- [ ] 阅读 `ENV_VALIDATION_SUMMARY.md` - 方案总结
- [ ] 查看 `backend/src/config/README.md` - Backend 使用文档
- [ ] 查看 `dnextjs/src/config/README.md` - Frontend 使用文档

## 🎯 8. 代码集成检查

### Backend
- [ ] `app.module.ts` 已配置环境变量验证
- [ ] 可以通过 `ConfigService` 访问环境变量
- [ ] 类型提示正常工作

### Frontend
- [ ] 可以导入 `env` 对象
- [ ] 类型提示正常工作
- [ ] `lib/api.ts` 正常工作

## 🚀 9. 部署准备

### 开发环境
- [ ] 本地开发配置完成
- [ ] 所有功能正常工作

### 生产环境准备
- [ ] 准备生产环境的 `.env` 文件
- [ ] 使用强随机密钥
- [ ] 配置正确的数据库连接
- [ ] 配置正确的 CORS 源
- [ ] 配置正确的 API URL

## ❓ 遇到问题？

### 常见问题

1. **"找不到模块 'zod'"**
   - 解决: 运行 `npm install`

2. **"JWT_SECRET 必须至少 32 个字符"**
   - 解决: 运行 `npm run generate:jwt-secret` 生成新密钥

3. **"DATABASE_URL 必须是有效的 URL"**
   - 解决: 检查连接字符串格式
   - 格式: `postgresql://user:password@host:port/database`

4. **"NEXT_PUBLIC_API_URL 必须是有效的 URL"**
   - 解决: 确保包含 `http://` 或 `https://`

5. **API 调用失败**
   - 检查 Backend 是否运行
   - 检查 `NEXT_PUBLIC_API_URL` 是否正确
   - 检查 CORS 配置

### 获取帮助

查看详细文档：
- [ENV_SETUP.md](./ENV_SETUP.md)
- [QUICK_START.md](./QUICK_START.md)
- [ENV_VALIDATION_SUMMARY.md](./ENV_VALIDATION_SUMMARY.md)

## ✨ 完成！

如果所有项目都已勾选，恭喜你！环境变量配置已完成。

现在你的应用：
- ✅ 有类型安全的环境变量访问
- ✅ 启动时自动验证配置
- ✅ 提供清晰的错误信息
- ✅ 不会因为配置错误导致难以追踪的 bug

开始开发吧！🚀
