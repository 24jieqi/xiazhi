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
  graphqlPath: string
  /** api host */
  apiHost: string
  /** 项目根路径 */
  baseUrl: string
  /**
   * rsa公钥
   */
  rsaPublicKey: string
}

export interface IConfig extends CommonConfig, EnvConfig {
  /**
   * 内容区域元素 id，出现滚动条的是它
   */
  contentElementId: string
}

const {
  REACT_APP_GRAPHQL_PATH,
  REACT_APP_BASE_URL,
  REACT_APP_API_HOST,
  RSA_PUBLIC_KEY,
} = process.env

// 配置(公共)
const commonConfig: CommonConfig = {
  authKey: 'Authorization',
  authorization: true,
}

const config: IConfig = {
  ...commonConfig,
  graphqlPath: REACT_APP_GRAPHQL_PATH,
  baseUrl: REACT_APP_BASE_URL,
  apiHost: REACT_APP_API_HOST,
  contentElementId: 'CONTENT_ELEMENT_ID',
  rsaPublicKey: RSA_PUBLIC_KEY,
}

export default config
