# ActionGroup

操作按钮组。

## 何时使用

列表中有操作按钮时。

## 效果演示

[演示](https://durian-test.hjgpscm.com/setting/user)

**代码**

```ts
import React from 'react'
import ActionGroup from '@/components/ActionGroup'

const Demo: React.FC<{}> = () => {
  const actions = [
    {
      children: '编辑',
      onClick() {
        // logic
      },
    },
    {
      children: '修改密码',
      onClick() {
        // logic
      },
    },
  ]
  return <ActionGroup actions={actions} />
}
```

## API

<style>
table {
  table-layout: fixed;
  width: 100%;
}
table th {
  text-align: left
}
table th:first-of-type {
  width: 20%;
}
table th:nth-of-type(2) {
  width: 40%;
}
table th:nth-of-type(3) {
  width: 20%;
}
table th:nth-of-type(4) {
  width: 40%;
}
</style>

| 参数    | 说明               | 类型           | 默认值 |
| ------- | ------------------ | -------------- | ------ |
| divider | 字段值             | bool           | true   |
| actions | 字段值初始显示个数 | ButtonConfig[] | -      |

**_ButtonConfig_**

继承自 antd ButtonProps，并包含部分自定义属性

```ts
interface ButtonConfig extends ButtonProps {
  // 是否显示
  show?: boolean | (() => boolean)
  // 自定义渲染函数，会以ButtonNode为渲染函数参数
  render?: (ButtonNode: React.ReactNode) => React.ReactNode
}
```
