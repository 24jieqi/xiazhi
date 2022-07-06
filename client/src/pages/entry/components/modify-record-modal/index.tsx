import React, { cloneElement, useMemo, useState } from 'react'
import { Button, Descriptions, Empty, Modal, Space, Tag } from 'antd'
import dayjs from 'dayjs'
import { ProList } from '@ant-design/pro-components'
import { LanguageTypeEnum, RecordItem } from '@/graphql/generated/types'

interface ModifyRecordsProps {
  modifyRecords: RecordItem[]
  children?: React.ReactElement
}

function langDiff(
  prevLang: Record<LanguageTypeEnum, any>,
  currLang: Record<LanguageTypeEnum, any>,
) {
  const langs = currLang ? Object.keys(currLang) : []
  const prevCopy = prevLang ? { ...prevLang } : {}
  const result = {
    add: [],
    delete: [],
    modify: [],
  }
  for (const lang of langs) {
    // 多语言新增
    if (!prevCopy[lang]) {
      result.add.push(currLang[lang])
    } else if (prevCopy[lang] !== currLang[lang]) {
      // 编辑的情况
      result.modify.push(`${currLang[lang]}（${prevCopy[lang]}）`)
      delete prevCopy[lang]
    } else {
      delete prevCopy[lang]
    }
  }
  const keys = Object.keys(prevCopy)
  if (keys.length) {
    for (const key of keys) {
      result.delete.push(prevCopy[key])
    }
  }
  return result
}

function renderActionTag(diffResult: any) {
  const result = []
  if (diffResult.add.length) {
    result.push(
      <Tag key="add" color="#87d068">
        新增
      </Tag>,
    )
  }
  if (diffResult.delete.length) {
    result.push(
      <Tag key="delete" color="#f50">
        删除
      </Tag>,
    )
  }
  if (diffResult.modify.length) {
    result.push(
      <Tag key="edit" color="#108ee9">
        编辑
      </Tag>,
    )
  }
  return result
}

const ModifyRecordsModal: React.FC<ModifyRecordsProps> = ({
  modifyRecords,
  children,
}) => {
  const [visible, setVisible] = useState(false)
  function handleShowModal() {
    setVisible(true)
  }
  function handleCloseModal() {
    setVisible(false)
  }
  const ActionComp = children ? (
    cloneElement(children, { onClick: handleShowModal })
  ) : (
    <Button type="link" onClick={handleShowModal}>
      查看
    </Button>
  )
  const dataSource = useMemo(() => {
    return modifyRecords.map(record => {
      const diffResult = langDiff(record.prevLangs, record.currLangs)
      return {
        title: dayjs(record.createdAt).format('YY-MM-DD HH:mm'),
        subTitle: <Space>{renderActionTag(diffResult)}</Space>,
        content: (
          <div>
            {diffResult.add.length ? (
              <p>新增：{diffResult.add.join('、')}</p>
            ) : null}
            {diffResult.delete.length ? (
              <p>删除：{diffResult.delete.join('、')}</p>
            ) : null}
            {diffResult.modify.length ? (
              <p>编辑{diffResult.modify.join('、')}</p>
            ) : null}
          </div>
        ),
      }
    })
  }, [modifyRecords])
  return (
    <>
      {ActionComp}
      <Modal
        width={768}
        destroyOnClose
        title="编辑记录"
        visible={visible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}>
        <ProList<any>
          grid={{ gutter: 16, column: 2 }}
          showActions="always"
          onItem={(record: any) => {
            return {}
          }}
          metas={{
            title: {},
            subTitle: {},
            content: {},
            actions: {},
          }}
          dataSource={dataSource}
        />
      </Modal>
    </>
  )
}

export default ModifyRecordsModal
