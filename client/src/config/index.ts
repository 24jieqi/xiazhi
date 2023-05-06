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

type Env = 'development' | 'production'

const env: any = process.env.NODE_ENV
// 配置(公共)
const commonConfig: CommonConfig = {
  authKey: 'Authorization',
  authorization: false,
}
// 配置(根据环境变量区分)
export const envConfig: Record<Env, EnvConfig> = {
  // 开发环境
  development: {
    apiHost: 'http://localhost:3000',
    uploadHost: '',
    baseUrl: '/',
  },
  // 生产环境
  production: {
    apiHost: 'https://xiazhi-lang.hjgpscm.com',
    uploadHost: 'https://durian.hjgpscm.com',
    baseUrl: '/',
  },
}
const config: EnvConfig & CommonConfig = { ...commonConfig, ...envConfig[env] }
export default config
