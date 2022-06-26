## 路由组织逻辑

### 路由配置

1. 路由配置结构`CustomRouteConfig`除了`react-route6`支持的配置外，还添加了**面包屑导航配置**以及**菜单和权限等相关配置**
   一个典型的路由配置如下：

```js
{
  path: LICENSE_DETAIL,
  element: <LicenseDetail />,
  authKey: false,
  meta: {
    title: 'licenseManagement',
    isMenu: true,
  },
  breadcrumb: [
    { name: 'basicInformationManagement' },
    { name: 'licenseManagement', path: LICENSE },
    { name: '许可详情' },
  ],
}
```

需要注意的是，`react-route6`中`element`只指出传入一个组件，如果需要路由的懒加载，则需要`const LoginComp = loadable(() => import('@/pages/others/login'))`，然后再使用该组件

2. `react-route6`提供了` useRoutes``hooks `来渲染静态路由配置，和`react-router-config`提供的`renderRoutes`函数不同的是，该函数全局使用一次即可，在子路由`layout`中，使用`<Outlet />`即可以渲染子路由（类似插槽的概念）

3. 路由配置时，如需要重定向，需要使用`Navigate`组件，并且制定`to`属性为需要跳转的路由，例如：`{ path: '', element: <Navigate to={REDIRECT} /> }`，在某个子路由下，如果是该子路由的根路由，则跳转到`REDIRECT`所指的页面

### 权限路由

> 路由是按照权限路由的方式设计的，各个项目可以根据项目的需要配置成非权限路由，是否开启权限路由可以在`@/config`的`authorization`字段进行配置，如果设置为`false`则只启动 token 鉴权；如果设置为`true`，也会启动对菜单和路由权限的控制，使用路由配置的`authKey`字段，该字段可以选`string | false`，如果某个路由不需要权限，则需要手动指定为`false`，如果后端未为某个功能模块的具体页面配置权限，则需要手动填写父级权限。

#### 路由鉴权

1. 在路由配置时，需要分为未登录可访问路由`noAuthRoutes`和登录后访问路由`routes`两套（如果不需要路由鉴权`noAuthRoutes`为空即可）
2. 用户权限会在登录后异步获取，通过`usePermissionRoutes`来切换路由栈
3. 用户登录后，会统一跳转至中间页，见`src/pages/others/redirect/index.tsx`，该页面使用`useRedirect`hooks 来处理权限和跳转逻辑
4. 用户退出登录，只需要清空`token`和`permission`即可，具体的逻辑为：`permission`的清空会引起路由栈切换，切换后的路由栈无法匹配到当前路由，会被重定向到`INIT_PAGE`，再由该页面的处理逻辑跳转到登录页

#### 菜单鉴权

1. `config.meta.isMenu`设置为`true`时会被认为是菜单
2. 如果`authKey`设置为`false`或者命中权限列表，则该菜单会显示

#### 不使用路由权限

1. 在`config`中配置`authorization`为 false
2. `noAuthRoutes`路由列表设置为`[]`
