# ext-intl

> 基于`TypeScript Compiler API`，**零**配置`React`多语言脚本

## 功能

- 提取并替换代码中的中文词条，生成词条文件
- 集成基于[kiwi-intl](https://github.com/alibaba/kiwi/tree/master/kiwi-intl)的多语言框架
- 支持`React`及`React-Native`项目
- 脚本支持离线和配合[夏至多语言解决方案](https://github.com/24jieqi/xiazhi)在线使用（需<sup>4.0.0</sup>以上版本）

## 使用

### CLI（推荐）

1. `yarn add --dev ext-intl`
2. 在`package.json`中，`scripts`中配置如下：

```json
  {
    ...
    "scripts": {
      ...
      "intl:config": "extintl config", // 生成配置文件
      "intl:sync": "extintl sync", // 同步远程词条文件
      "intl:start": "extintl start", // 开始提取
      "intl:update": "extintl update", // 更新本地词条文件
    }
  }
```

3. 运行`yarn intl:xx`即可

> 上述`command`的详情，可以通过运行`yarn extintl -h`查看

### API 调用

> 如果你想以编程的方式使用`ext-intl`，你可以使用下面的API

```js
import {
  sync,
  start,
  update,
  generateConfigFile,
  readConfigFile,
  getMergedConfig,
  checkConfig,
} from 'ext-intl'
```
#### sync(origin: string, accessKey: string): Promise<boolean>
> 同步远程词条并写入到本地`path/to/entries.json`中，写入完成返回`true`，失败则返回`false`

#### start(config: ExtConfig): Promise<MatchText[] | undefined>
> 运行一次多语言提取，返回文件未能匹配到的(即未在`path/to/entries.json`中出现)中文词条列表

#### update(config: ExtConfig): Promise<void>
> 根据本地`path/to/entries.json`中的词条资源，更新词条文件

#### generateConfigFile(override?: boolean): Promise<void>
> 生成`.extintl.json`配置文件

#### readConfigFile(): Promise<ExtConfig>
> 读取本地配置文件`.extintl.json`

#### checkConfig(config?: ExtConfig): Promise<ExtConfig | null | undefined>
> 检查并返回配置，如果没有则写入默认配置到文件 检查配置的流程：

1. 如果传入了config，则直接使用config以及默认配置合并
2. 读取本地文件配置 合并后返回
3. 以默认配置生成配置文件并结束进程


3. 项目根目录下运行`node xx.js`

### 配置项

| 参数                               | 说明                                                                                       | 类型       |
| ---------------------------------- | ------------------------------------------------------------------------------------------ | ---------- |
| rootPath                           | 源文件或源文件目录                                                                  | `string`   |
| langs                           | 支持的多语言                                                                        | `string[]`   |
| extractOnly                        | 是否只扫描中文词条，不做任何替换和集成    | `boolean`  |
| whiteList                          | 文件类型白名单，指定只扫描文件类型，可过滤掉图片/字体等文件的干扰                          | `string[]` |
| templateString.funcName            | 处理模板字符串时，用于原处替换的函数名称                                                   | `string`   |
| origin                             | 词库平台的 OpenAPI 地址（graphql 实现）                                                    | `string`   |
| accessKey                          | 词库平台应用的访问权限 key                                                                 | `string`   |
| appFilePath                          | 入口组件文件的路径（一般为`App.js(x)/ts(x)`）                                                                 | `string`   |

参数默认值如下：

```js
export const INIT_CONFIG: ExtConfig = {
  rootPath: resolvePath('./src'),
  langs: ['zh', 'en'],
  extractOnly: true,
  whiteList: ['.ts', '.tsx', '.js', '.jsx'],
  templateString: {
    funcName: 'I18N.get',
  },
  origin: '',
  accessKey: '',
  appFilePath: resolvePath(`./src/App.${isUseTs ? 'tsx' : 'js'}`),
}
```

### 运行模式

> 当未配置`accessKey`或者`origin`时，将以**离线模式**运行脚本，否则为**在线模式**，**在线模式**可以使用所有功能，而离线模式只能使用*词条提取*功能

离线模式的使用步骤：

1. 运行`yarn extintl config`生成配置文件
2. 运行`yarn extintl start`进行词条提取
3. 提取完成后将会在`path/to/i18n/langs`目录下生成对应语言的资源文件，你可以修改**除中文目录**下的资源文件，填充对应词条的翻译

