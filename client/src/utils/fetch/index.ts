import qs from 'querystring'
import { message } from 'antd'
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios'

import Config from '@/config'

// import { permissionStore } from '@/stores/permissions'
import { msgs, handleNoCommonError } from './error-handle'

/**
 * 接口返回的数据基础结构
 */
interface ResponseBase {
  /** data */
  data?: any

  /** errCode */
  errCode?: number

  /** errMsg */
  errMsg?: string
}

// Axios 拦截器，同意处理错误
axios.interceptors.response.use(
  (response: AxiosResponse<ResponseBase>) => {
    const data = response.data

    // 操作不成功时直接提示
    if (data.errCode !== 200) {
      message.error(data.errMsg)
      return Promise.reject(data.errMsg)
    }

    return response
  },
  ({ response }: AxiosError<ResponseBase>) => {
    if (response) {
      const { data, config } = response
      const message = data?.errMsg || msgs.errorMsg

      // 全局响应拦截需要重写
      handleNoCommonError(message, config)

      throw new Error(message)
      // return Promise.reject(message);
    } else {
      throw new Error(msgs.networkErrorMsg)
      // return Promise.reject(msg.networkErrorMsg);
    }
  },
)

// 在 buildOptions 的时候已经把 GET 类的参数添加到了 URL 上，这里就可以不需要序列化
// axios.interceptors.request.use((config: AxiosRequestConfig) => {
//   config.paramsSerializer = (params: any) => qs.stringify(params);
//   return config;
// });

/**
 * axios request 请求
 * @description 对请求简单封装，添加默认参数
 */
export const request = <T = any>(options: AxiosRequestConfig) => {
  // const Authorization = permissionStore.getState().token || ''
  const Authorization = ''
  const newOptions: AxiosRequestConfig = {
    // credentials: 'include',
    timeout: 60000,
    withCredentials: true,
    validateStatus(status: any) {
      return status >= 200 && status < 300
    },
    ...options,
    headers: {
      // 自定义 header 的时候应该可以重置 token 字符串
      Authorization,
      ...(options.headers || {}),
    },
    url: `${Config.baseUrl}${options.url}`,
  }
  return axios.request<T>(newOptions).then(data => data.data)
}

/**
 * 构建接口参数
 */
export const buildOptions = (
  path: string,
  queryParams: Record<string, any>,
  method: Method,
): AxiosRequestConfig => {
  const params = {
    ...(queryParams || {}),
  }
  const isGet =
    method === 'GET' ||
    method === 'DELETE' ||
    method === 'HEAD' ||
    method === 'OPTIONS'
  let url = path.replace(/\{([^\\}]*(?:\\.[^\\}]*)*)\}/gm, (_, key) => {
    // eslint-disable-next-line no-param-reassign
    key = key.trim()

    if (params[key] !== undefined) {
      const value = params[key]
      delete params[key]
      return value
    }
    // eslint-disable-next-line no-console
    console.warn('Please set value for template key: ', key)
    return ''
  })

  // GET 请求参数放置 URL 上
  if (isGet && Object.keys(params).length) {
    url = `${url}?${qs.stringify(params)}`
  }

  return {
    url,
    method,
    data: isGet ? null : params,
  }
}
