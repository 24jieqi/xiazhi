# 多语言词库平台

## server

> graphql 服务端（graphql+prisma+pg）

### 启动服务

1. 启动`postgres sql`服务（推荐使用docker），并将`server/.env`文件下的`DATABASE_URL`替换为启动好的服务地址。
2. 运行`yarn prisma:migrate`初始化数据库和数据。
3. 启动服务
```bash
# 启动服务
cd server && yarn dev
```

## client

> 基于[web-template](https://github.com/hjfruit/web-template)初始化的 React 客户端渲染

```bash
cd client && yarn start
```
### 部署应用
> ⚠️ 所有步骤均`server`目录下执行

1. 运行`npx prisma migrate deploy --./src/prisma/schema.prisma`进行数据库迁移。
2. 运行`yarn build:auto`（完成client打包、服务端构建和服务启动）
3. 完成后服务会使用`pm2`部署在`localhost:3000`，直接访问`localohost:3000`为平台web入口，`localohost:3000/graphql`为服务端地址。

