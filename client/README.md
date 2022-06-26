### Web-Template

> 基于[create-react-app](https://github.com/facebook/create-react-app)的单页 Web 应用初始化模板

- 采用`TypeScript`
- 数据管理 集成`dva-core`
- 路由管理使用`react-router`，支持嵌套路由

### 项目结构

[![B7Yiuj.png](https://s1.ax1x.com/2020/11/09/B7Yiuj.png)](https://imgchr.com/i/B7Yiuj)

### 使用说明

#### 如何配置多层嵌套的子路由？

假设有个这样的应用：`/`表示首页，会根据用户登录状态跳转到`/login`登录页或具体的模块页，例如用户管理模块页`/user`。

按照分模块隔离的方式配置，`config`目录下的配置如下：

```
config/
|
|----home/ // 首页路由配置
|        |-index.ts
|----login/ // 登录校验路由配置
|        |-index.ts
|        |-path.ts
|----user-manage/ // 用户管理路由配置
|        |-index.ts
|        |-path.ts
|----index.ts // 路由配置统一导出

```

其中，每一项路由可配置项如下：

```ts
interface IRouteConfig {
  path: string // 路径
  component: React.ComponentType<any> | string // 路由渲染组件
  title: string // 路由页面名称
  exact?: boolean
  auth?: boolean // 是否需要登录
  redirect?: string
  strict?: boolean
  sensitive?: boolean
  routes?: IRouteConfig[] // 子路由相关配置
}
// exact/redirect/strict/sensitive 是`react-router`默认支持的属性，使用方式见：https://reactrouter.com/web/guides/quick-start
```

开始配置时，需要考虑某个路由是否是子路由，例如`/login`登录页的路由配置可以是如下：

```ts
const routes: IRouteConfig = {
  path: LOGIN,
  component: LoginPage,
  title: '登录页',
  exact: true,
}
```

> 注意：`/login`作为作为根路由的子路由，理论上是应该使用子路由的方式配置，但是由于`/`路由并没有相应的*布局组件*，所有可以直接配置。

`/user`用户管理模块主页页是一个子页面，因此，配置如下：

```ts
import UserManagePage from '@/pages/user-manage'
import Layout from '@/pages/layout'
import { MODULE_INDEX, USER_MANAGEMENT } from './path'
const routes: IRouteConfig = {
  path: MODULE_INDEX,
  component: Layout,
  title: '模块布局页',
  routes: [
    {
      path: USER_MANAGEMENT,
      component: UserManagePage,
      title: '用户管理',
      exact: true,
    },
  ],
}

// ./path.ts
const MODULE_INDEX = '/user'
const USER_MANAGEMENT = `${INDEX}`
const USER_MANAGEMENT_ADD = `${INDEX}/add`
```

负责`/user`具体渲染的`<UserManagePage />`组件将作为布局组件`<Layout />`的`children`渲染，对于所有的`Route`，都经过`RouteWithSubRoutes(route): Route`包装，简易实现如下：

```ts
// 注意：RouteWithSubRoutes后续版本已经发生了变化
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        return route.auth ? (
          <Auth>
            <route.component {...props} routes={route.routes} />
          </Auth>
        ) : (
          <route.component {...props} routes={route.routes} />
        )
      }}
    />
  )
}
```

所有负责渲染的组件均包含`routes`属性，对于*布局组件*，`routes`表示其子路由，对于*内容组件*，`routes`为`undefined`。

对于*布局组件*，在拿到`routes`后再使用`RouteWithSubRoutes`函数渲染`Route`，使用方式见`src/pages/layout/index.tsx`。经过以上步骤，**多层嵌套路由**的配置就完成了。

> 特别注意：对于在同一个布局组件中渲染的路由，其`path`是不能相同的。比如存在两个模块`user-manage`和`goods-manage`，他们同样使用了一个`Layout`作为布局组件，我们可以分别指定`path`为`/user`和`/goods`，添加用户模块路由指定为`/user/add`，相比之前设计，减少了一层`/dashboard`路由，整体看来也更符合语义。

> 一般约定：使用本模板的项目分模块进行开发，不同模块之间一般情况下保持隔离。模块的命名方式一般为`xx-module`或`xx-manage`，例如用户模块可命名为`user-module`或`user-manage`；模块子页面按照页面功能性命名，且不冗余模块名，例如用户模块新增用户页面一般命名为`add/`。相关页面的路由为：`/user`用户模块主页，`/user/add`，用户模块新增用户页。

#### 如何开启基于路由的懒加载？

本应用支持基于路由的懒加载，使用的是`Webpack`提供的`Lazy load`方案，并结合`React`提供的`lazy`和`Suspense`。懒加载功能完全是可选的，开发者可以根据当前的页面情况来决定是否进行分割。

`IRouteConfig.component`支持`Component`和`string`，如果配置为`Component`则不需要分割；为`string`时表示需要分割，`string`为该路由所对应页面相对于`@/pages`的`path`。例如，如果路由所对应的页面`path`为`@/pages/user-manage`，则配置`component: '/user-manage'`即可。

所有懒加载的页面必须位于`src/pages/`目录下。

至于为什么需要配置相对于`@/pages/`的相对路径，可以查看[Error: Cannot find module with dynamic import #6680](https://github.com/webpack/webpack/issues/6680)。

#### 怎样书写`models`？

初始版本的`Models`按模块组织，手动导出，在实际使用过程中，`pages`和`models`分散，并且为了保持对应关系，需要建立和`pages`高度相似的目录结构，并且手动维护导入导出关系，一定程度上会影响开发体验。针对这样的问题，新版的`models`完全放弃了单独的`models`维护，改为**页面、Model**就近维护。

> 建议：某个页面的`models`直接位于页面所在的目录中即可。

具体的匹配规则为`src/pages/`目录下的所有`model.ts`文件将会被认作`Model`文件，`model.ts`文件不需要组织导出导出关系。

> 注意：v0.1.3 版本支持全局 models，即`src/models/*`下所有的`ts`文件会被自动注册为`model`。

这里使用到了`Webpack`提供的一种技术`require.context`，它能够让我们自己组织上下文关系，这能让我们实现批量导入。更多详情见[require.context](https://webpack.js.org/guides/dependency-management/#requirecontext)。

#### 使用`dva-loading`？

`dva-loading`是`dva`的一个插件，使用的这个插件，就可以免于手动对于 loading 状态的管理，loading 状态管理的结构如下：

```js
loading: {
  global: false,
  effects: {}
  models: {
    users: false,
    todos: false,
    ...
  },
}
```

> 注：loading 状态的变更只取决于*异步请求*。

`dva-loading`对三种不同层级的状态进行管理，`global`全局`loading`状态；`effects`某个`effect`的 loading 状态，`models`某个注册`model`的 loading 状态。

例如：一个`namespace`为`xx`的`model`，如果该`model`的名为`effect1`的`effect`发起了一个请求并未返回，此时 loading 的状态为：

```ts
loading: {
  global: true，
  effects: {
    'xx/effect1': true
  },
  models: {
    xx: true
  }
}
```

请求完毕，状态又变更为：

```ts
loading: {
  global: false
  effects: {
    'xx/effect1': false
  },
  models: {
    xx: false
  }
}
```

某个页面需要三种`loading`状态，直接取即可。

#### 测试

本项目测试采用的是`Jest`+`@testing-library/react`的组合，原则上应当避免实现细节的测试，应当把测试重心放在网页交互逻辑的测试，一般来讲，页面任何页面的主流程都会进行测试，公共组件/函数都应该进行测试。

> 由于使用了`webpack`的`require.context`批量导入`models`，并且针对`dva`的`unit`测试目前并没有*最佳实践*。在对页面进行`unit`测试时，可能会存在问题！

例如：如果某个页面使用`connect`连接了`redux`，`export default connect(mapStateToProps)(Login)`，那么在现有的情况下将不能完成测试。见[如果你想更好的测试你的 react， 那你可能还需要了解一下这些](https://github.com/frontend9/fe9-library/issues/266)

在遇到测试包含`models`注入的页面时，可以尝试使用上文提到的解决方案，或者跳过此类页面。

在本项目中，对于*逻辑复杂*的页面进行`unit`测试是比较困难的，这类页面可以进行`e2e`测试，而公共组件/函数需要进行`unit`测试。

测试文件以`.test.ts`或者`.test.tsx`结尾，测试文件原则上就近维护。

1.

#### 如何生成初始化模块/页面?

本项目支持初始化模块/页面生成,脚本在[wbd-frontend-kit](https://www.npmjs.com/package/wbd-frontend-kit)这个`package`(已集成到本项目)下.生成步骤如下:

1. 运行`yarn script module`,如果是首次运行该命令,则会生成配置文件模板`moduleConfig.json`,

```json
{
  "name": "xx-module",
  "pages": ["page1", "page2"]
}
```

修改配置,`config.name`表示模块名,`config.pages`表示该模块下的所有页面名.

2. 如果是首次运行,修改完`moduleConfig.json`后,再次运行`yarn script module`,生成模块模板文件

3. 运行`yarn start`访问新创建的页面

4. 如果是在当前模块新增一个(或多个)页面,只需要在`config.pages`中新增页面名并运行`yarn script module`即可

> 注意:一般情况下,配置的模块名和页面名将会按照一定的规则自动生成路由,生成的路由配置一般不需要再进行维护.

### CHANGE LOG

> 初始版本来自[cra-tpl-ts-schnauzer](https://github.com/zkzhao/cra-template-schnauzer)，感谢[@zkzhao](https://github.com/zkzhao)。

#### v0.1.0 2020.11.09

- 路由及路由配置修改，支持多层嵌套路由

#### v0.1.1 2020.11.11

- 新增约定式`model`注册方式，无需手动注册
- 新增`dva-loading`
- 部分**类型定义**重写

#### v0.1.2 2020.11.18

- 单元测试
- 可选基于路由的懒加载实现

#### v.0.1.3 2020.12.08

- 添加构建分析 plugin`webpack-bundle-analyzer`
- 替换`momentjs`为`dayjs`
- 更新`react-scripts@4.0.1`，解决无法使用`alias`的问题
- 更新`wbd-frontend-kit@1.0.8`以完全支持模块/页面生成
- 全局`models`支持
