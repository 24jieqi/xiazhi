import { useAntdTable } from 'ahooks'
import { DocumentNode } from '@apollo/client'
import { Form } from 'antd'
import { Dict } from 'wbd-frontend-kit'
import { Params } from 'ahooks/lib/useAntdTable/types'
import client from '@/graphql/client'

/**
 * 响应类型
 */
interface IResponseData {
  pageCurrent?: number
  pageSize?: number
  totalRecords?: number
  records?: any[]
  [key: string]: any
}

interface IParams {
  current: number
  pageSize: number
  [key: string]: any
}
interface IProps {
  /** 请求 */
  request: {
    request: DocumentNode
    responseKey: string
    formatParams?: (params: IParams) => Dict
    extraParams?: Dict
  }
  // 是否手动调用
  manual?: boolean
}
const useAsyncTable = (props: IProps) => {
  const {
    request: { request, responseKey, formatParams, extraParams = {} },
    manual = false,
  } = props
  const getTableData = (
    { current, pageSize }: Params[0],
    formData: Dict,
  ): Promise<{ total: number; list: any[] }> => {
    let params: any = {
      input: {
        pageCurrent: current,
        pageSize,
        ...formData,
        ...extraParams,
      },
    }
    if (typeof formatParams === 'function') {
      params = {
        input: {
          ...formatParams({ current, pageSize, ...extraParams, ...formData }),
        },
      }
    }
    return client
      .query({
        query: request,
        variables: params,
      })
      .then(res => {
        const data: IResponseData = res.data[responseKey]
        return { total: data.totalRecords, list: data.records }
      })
  }
  const [form] = Form.useForm()
  // 缓存逻辑结束
  const { tableProps, search, refresh } = useAntdTable(getTableData, {
    manual,
    form,
    defaultPageSize: 10,
  })
  const { submit, reset } = search
  tableProps['pagination'].showSizeChanger = true
  tableProps['pagination'].showTotal = total => `共 ${total} 记录`
  return { tableProps, search, form, submit, reset, refresh }
}

export default useAsyncTable
