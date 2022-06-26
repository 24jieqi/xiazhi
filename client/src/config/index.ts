/**
 * 配置文件
 */
interface CommonConfig {
  /** 权限key */
  authKey: string
  /** 系统是否需鉴权 */
  authorization: boolean
}
interface EnvConfig {
  /** api host */
  apiHost: string
  /** 上传host */
  uploadHost: string
  /** 项目根路径 */
  baseUrl: string
}
export interface IConfig extends CommonConfig, EnvConfig {}

type Env = 'development' | 'production' | 'test'

const env: any = process.env.NODE_ENV
// 配置(公共)
const commonConfig: CommonConfig = {
  authKey: 'Authorization',
  authorization: true,
}
// 配置(根据环境变量区分)
export const envConfig: Record<Env, EnvConfig> = {
  // 开发环境
  development: {
    apiHost: 'http://192.168.10.233:18080', // 开发地址 http://192.168.10.233:10004 测试地址 https://peach-test.hjgpscm.com
    uploadHost: '',
    baseUrl: '/',
  },
  // 测试环境
  test: {
    apiHost: '',
    uploadHost: '',
    baseUrl: '/',
  },
  // 生产环境
  production: {
    apiHost: 'https://durian.hjgpscm.com',
    uploadHost: 'https://durian.hjgpscm.com',
    baseUrl: '/',
  },
}
const config = { ...commonConfig, ...envConfig[env] }
export default config
