/**
 * 生成相对路径的路由用户路由配置
 * @param moduleRootPath 模块根路由
 * @param path 当前页面路由
 * @param params 页面参数(单个场景)
 */
export function generateRelativePath(
  moduleRootPath: string,
  path: string,
  param?: string,
) {
  let relativePath = path.replace(moduleRootPath, '')
  if (relativePath.startsWith('/')) {
    relativePath = relativePath.substring(1)
  }
  if (!relativePath.endsWith('/')) {
    relativePath = `${relativePath}/`
  }
  if (param) {
    return `${relativePath}:${param}`
  }
  return relativePath
}
