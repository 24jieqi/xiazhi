export interface ExtConfig {
  /**
   * 源文件或源文件夹目录（默认src）
   */
  rootPath: string
  /**
   * 是否只扫描文件，并不进行替换，如果设置为false，则会进行源文件替换，且集成kiwi-intl
   */
  extractOnly: boolean
  /**
   * 文件类型白名单，指定只扫描文件类型，可过滤掉图片/字体等文件的干扰
   */
  whiteList: string[]
  /**
   * 处理模板字符串时，用于原处替换的函数名称
   */
  templateString?: {
    funcName: string
  }
  /**
   * 支持的多语言
   */
  langs?: string[]
  /**
   * 远程API地址
   */
  origin?: string
  /**
   * 用户访问权限
   */
  accessKey?: string
}
