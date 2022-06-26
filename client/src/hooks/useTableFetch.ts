/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Form, FormInstance, TablePaginationConfig } from 'antd'
import { useLocation } from 'react-router'
import { DocumentNode } from 'graphql'
import { cacheState, getCachedOptions } from '@/utils/keep-state/inde'
import client from '@/graphql/client'

type ParamsWithoutPagiOptions<T> = Omit<T, 'pageNo' | 'pageSize'>

interface IPage<T0 = any> {
  /** current */
  current?: number

  /** hitCount */
  hitCount?: boolean

  /** pages */
  pages?: number

  /** records */
  records?: Array<T0>

  /** searchCount */
  searchCount?: boolean

  /** size */
  size?: number

  /** total */
  total?: number
}
interface ISearchParams<T = any> {
  params: ParamsWithoutPagiOptions<T>
  pageNo: number
  pageSize: number
}

interface ReturnType<ValueType = any, ParamsType = any> {
  total: number
  dataSource: ValueType[]
  loading: boolean
  refetch: () => void
  pagination: TablePaginationConfig
  updateParams: (params: ParamsWithoutPagiOptions<ParamsType>) => void
  refresh: () => void
  form: FormInstance<ParamsWithoutPagiOptions<ParamsType>>
}

interface ITableFetchOptions<ValueType> {
  /**
   * 请求本身
   */
  fetchAction: DocumentNode
  /**
   * 参数在请求时通过url拼接还是放在request body中
   */
  paramsType?: 'query' | 'body'
  /**
   * 除form表单额外的参数
   */
  extraParams?: any
  /**
   * 保存参数到sessionStorage
   */
  keep?: boolean

  pageNo?: number
  pageSize?: number
}

// todo: 针对每个页面进行请求参数和页码的缓存

const useTableFetch = <ValueType = any, ParamsType = any>({
  fetchAction,
  paramsType = 'body',
  extraParams = {},
  keep = false,
  pageNo = 1,
  pageSize = 10,
}: ITableFetchOptions<ValueType>): ReturnType<ValueType, ParamsType> => {
  // 缓存相关
  const location = useLocation()
  const params = getCachedOptions(location.pathname)

  const INIT_SEARCH_PARAMS: ISearchParams = useMemo(() => {
    return {
      params: {},
      pageNo: pageNo || 1,
      pageSize: pageSize || 10,
    }
  }, [pageNo, pageSize])

  // 通过keep与否来选择初始化数据
  const [searchParams, setSearchParams] = useState<ISearchParams<ParamsType>>(
    keep
      ? {
          pageNo: params.pagination.page,
          pageSize: params.pagination.size,
          params: params.query,
        }
      : { ...INIT_SEARCH_PARAMS },
  )
  // 上一次请求的查询参数
  const prevSearchParams = useRef<ISearchParams<ParamsType>>(
    keep
      ? {
          pageNo: params.pagination.page,
          pageSize: params.pagination.size,
          params: params.query,
        }
      : { ...INIT_SEARCH_PARAMS },
  )
  const [form] = Form.useForm<ParamsWithoutPagiOptions<ParamsType>>()
  // 参数变更后重新请求数据
  const queryParams = useMemo(() => {
    const params = {
      ...searchParams.params,
      pageNo: searchParams.pageNo,
      pageSize: searchParams.pageSize,
      ...extraParams,
    }
    // 有变动时，直接缓存查询参数到ref
    prevSearchParams.current = searchParams
    // 缓存到sessionStorage
    if (keep) {
      cacheState(
        {
          query: searchParams.params,
          pagination: {
            page: searchParams.pageNo,
            size: searchParams.pageSize,
          },
        },
        location.pathname,
      )
    }
    return paramsType === 'body'
      ? {
          queryParams: {},
          bodyParams: params,
        }
      : {
          queryParams: params,
        }
  }, [JSON.stringify(searchParams), JSON.stringify(extraParams)])
  // 获取请求

  const [loading, setLoading] = useState<boolean>(false)
  const [tableData, setTableData] = useState<IPage<ValueType>>({})

  useEffect(() => {
    fetchOrigin()
  }, [JSON.stringify(queryParams)])

  function fetchOrigin() {
    setLoading(true)
    client
      .query({
        query: fetchAction,
        variables: {
          input: {
            ...queryParams,
          },
        },
      })
      .then(res => {
        if (res.data) {
          setTableData(res.data)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  /* ******* 分页相关事件 */
  function handleChange(
    pageNo: number,
    pageSize: number = INIT_SEARCH_PARAMS.pageSize,
  ) {
    setSearchParams(prev => ({
      ...prev,
      pageNo,
      pageSize,
    }))
  }
  function handleShowSizeChange(_: number, pageSize: number) {
    setSearchParams(prev => ({
      ...prev,
      pageNo: INIT_SEARCH_PARAMS.pageNo,
      pageSize,
    }))
  }
  // function reset() {
  //   setSearchParams(prev => ({
  //     ...prev,
  //     pageNo: INIT_SEARCH_PARAMS.pageNo,
  //     pageSize: INIT_SEARCH_PARAMS.pageSize,
  //   }))
  // }

  /** ****** 分页相关事件 ***/
  function updateParams(params: ParamsWithoutPagiOptions<ParamsType>) {
    const nextParams = {
      params,
      pageNo: INIT_SEARCH_PARAMS.pageNo,
      pageSize: searchParams.pageSize,
    }
    if (
      JSON.stringify(nextParams) === JSON.stringify(prevSearchParams.current)
    ) {
      fetchOrigin()
      return
    }
    setSearchParams(nextParams)
  }
  // 重置
  function refresh() {
    // 如果请求参数没变
    if (
      JSON.stringify(prevSearchParams.current) ===
      JSON.stringify(INIT_SEARCH_PARAMS)
    ) {
      fetchOrigin()
      return
    }
    setSearchParams({ ...INIT_SEARCH_PARAMS })
  }
  // 处理表单与缓存数据同步
  useEffect(() => {
    if (Object.keys(params.query).length > 0) {
      form.setFieldsValue({ ...params.query })
    }
  }, [])
  return {
    dataSource: tableData?.records || [],
    total: tableData?.total || 0,
    loading,
    refetch: fetchOrigin,
    pagination: {
      total: tableData?.total || 0,
      current: searchParams.pageNo,
      pageSize: searchParams.pageSize,
      onChange: handleChange,
      onShowSizeChange: handleShowSizeChange,
      showSizeChanger: true,
      showTotal: total => `共有${total}记录`,
    },
    updateParams,
    refresh,
    form,
  }
}

export default useTableFetch
