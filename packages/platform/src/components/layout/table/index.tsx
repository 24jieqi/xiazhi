import { Flex } from '@fruits-chain/react-bailu'
import { isType } from '@fruits-chain/utils'
import type { PaginationProps } from 'antd'
import { Pagination, Space, Table } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import classNames from 'classnames'
import React, { useMemo } from 'react'

import styles from './style.module.less'
import useTableBodyHeight from './useTableBodyHeight'

function getTableOverflow<RecordType = any>(
  columns: ColumnsType<RecordType> = [],
) {
  return columns.some(column => column.fixed === 'right')
}

interface TableLayoutProps<RecordType>
  extends Omit<TableProps<RecordType>, 'pagination' | 'scroll' | 'title'> {
  actions?: React.ReactNode
  pagination?: PaginationProps
  title?: React.ReactNode
  wrapperStyle?: React.CSSProperties
  /**
   * 顶部自定义渲染的额外内容
   */
  topExtra?: React.ReactNode
  /**
   * 表格额外的描述条，一般用于放置行选择结果和操作等
   */
  tableAlert?: React.ReactNode
}

/**
 * 特定样式布局的表格组件（列表页表格）
 * @param param0
 * @returns
 */
function TableLayout<RecordType extends object = any>({
  actions,
  pagination,
  title,
  wrapperStyle = {},
  topExtra,
  tableAlert,
  ...restTableProps
}: TableLayoutProps<RecordType>) {
  const { contentRef, height } = useTableBodyHeight()
  const showHeader = title || actions
  function renderTitle() {
    if (!title) {
      return null
    }
    if (isType('String')(title)) {
      return <p className={styles.title}>{title}</p>
    }
    return title
  }
  const tableClassName = useMemo(() => {
    return classNames(
      restTableProps.className,
      getTableOverflow(restTableProps.columns)
        ? styles.tableOverflowScrollY
        : styles.tableOverflowAutoY,
    )
  }, [restTableProps.columns, restTableProps.className])
  return (
    <div className={styles.contentWrapper} style={wrapperStyle}>
      {topExtra || null}
      {showHeader ? (
        <Flex className={styles.actionWrapper} justify="between">
          {renderTitle()}
          <Space size={16}>{actions}</Space>
        </Flex>
      ) : null}
      {tableAlert ? (
        <div className={styles.alertWrapper}>{tableAlert}</div>
      ) : null}
      <div ref={contentRef} className={styles.content}>
        <Table
          {...restTableProps}
          className={tableClassName}
          pagination={false}
          scroll={{ y: height, x: 1100 }}
        />
      </div>
      {pagination ? (
        <div className={styles.footer}>
          <Pagination
            showSizeChanger
            showTotal={total => `共${total}条记录`}
            {...pagination}
          />
        </div>
      ) : null}
    </div>
  )
}

export default TableLayout
