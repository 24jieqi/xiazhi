<h1 style="" align="center">夏至-React多语言解决方案</h1>

> 使用**夏至**多语言解决方案可以让你在少量设置（**近乎零成本**）后完成`React`和`React-Native`项目的多语言集成，它包含以下几部分：

- [server](./packages/server/README.md) `Api Server`: 提供词条上报和应用/词条基础管理服务
- [platform](./packages/platform/README.md) `Web`: 提供应用/词条等的在线管理
- [ext-intl](./packages/ext-intl/README.md) `脚本`：提供多语言本地替换/解决方案集成/词条文件本地更新维护等一些列能力<sup>4.0.0</sup>

## 运行

### 启动 server

1. 配置环境变量
   > 在`server`根目录创建`.env`文件，该文件至少包含以下字段

```
DATABASE_URL="postgres://postgres:xiazhi.2024@localhost:8889?schema=xiazhi" // PG数据库连接地址
SERVER_ADDRESS="http://localhost:4000" // 仅build模式下使用：建议开发环境配置配置为本地地址 正式环境配置成域名
```

2. 在根目录运行`pnpm dev:server`

### 启动 platform

在根目录运行`pnpm dev:web`

### 安装多语言脚本

> 在需要埋点的项目中安装*最新版本*[ext-intl](https://www.npmjs.com/package/ext-intl)，并按照其指引完成相关配置

## 发布到生产环境

> 确保`server`的环境变量配置完成，在项目根目录运行`yarn run deploy`即可
