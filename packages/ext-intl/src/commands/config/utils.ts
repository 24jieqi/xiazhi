import { INIT_CONFIG } from './constant'
import type { ExtConfig } from './interface'

/**
 * 对传入的配置和默认配置进行diff 返回未配置的字段
 * @param config
 * @returns
 */
export function diffConfig(config: ExtConfig) {
  const allKeys = Object.keys(INIT_CONFIG)
  const customConfigKeys = Object.keys(config)
  const diffResult: Partial<ExtConfig> = {}
  for (const key of allKeys) {
    if (!customConfigKeys.includes(key)) {
      diffResult[key] = INIT_CONFIG[key]
    }
  }
  return diffResult
}
