import React, { cloneElement, useMemo, useState } from 'react'
import { Button, message, Modal, Space, Tag } from 'antd'
import dayjs from 'dayjs'
import { ProList } from '@ant-design/pro-components'
import {
  EntryItem,
  LanguageTypeEnum,
  RecordItem,
} from '@/graphql/generated/types'
import { useUpdateEntryMutation } from '@/graphql/operations/__generated__/entry.generated'

interface ModifyRecordsProps {
  modifyRecords: RecordItem[]
  records: {
    entry_id: number
    langs: EntryItem['langs']
    key: string
  }
  onRollbackSucess: () => void
  children?: React.ReactElement
}

interface ProListType {
  data: {
    prevLangs: RecordItem['prevLangs']
    langs: EntryItem['langs']
    entry_id: number
    key: string
  }
}

const LANGUAGE_ARRAY = [
  LanguageTypeEnum.Chinese,
  LanguageTypeEnum.English,
  LanguageTypeEnum.Thai,
  LanguageTypeEnum.Vietnamese,
]
const LANGUAGE_MAP = {
  [LanguageTypeEnum.Chinese]: '中文',
  [LanguageTypeEnum.English]: '英文',
  [LanguageTypeEnum.Thai]: '泰文',
  [LanguageTypeEnum.Vietnamese]: '泰文',
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
    // 如果当前语言不存在词条且先前存在词条，则表示删除
    const curr = currLang[lang]
    const prev = prevCopy[lang]
    if (!curr && prev) {
      result.delete.push(prev)
    }
    // 如果当前存在且先前不存在，则表示新增
    if (curr && !prev) {
      result.add.push(curr)
    } else if (prev !== curr) {
      // 都存在且不相等的情况
      result.modify.push({
        prev,
        curr,
      })
    }
    delete prevCopy[lang]
  }
  const keys = Object.keys(prevCopy)
  if (keys.length) {
    for (const key of keys) {
      result.delete.push(prevCopy[key])
    }
  }
  return result
}

const ModifyRecordsModal: React.FC<ModifyRecordsProps> = ({
  modifyRecords,
  records,
  children,
  onRollbackSucess,
}) => {
  const [visible, setVisible] = useState(false)
  const [updateEntry] = useUpdateEntryMutation()
  function handleShowModal() {
    setVisible(true)
  }
  function handleCloseModal() {
    setVisible(false)
  }
  function formateRollbackMessage(langs) {
    return Object.keys(langs)
      .map(lang => {
        if (LANGUAGE_ARRAY.includes(lang as LanguageTypeEnum)) {
          return `${LANGUAGE_MAP[lang]}:${langs[lang]}`
        }
        return null
      })
      .filter(lang => lang)
  }
  function handleRollback(record: ProListType) {
    const {
      data: { langs, prevLangs, key, entry_id },
    } = record
    const current = formateRollbackMessage(langs)
    const preview = formateRollbackMessage(prevLangs)
    if (JSON.stringify(current) === JSON.stringify(preview)) {
      message.warning('回滚词条与当前一致，不支持回滚')
      return
    }
    Modal.confirm({
      title: '确认回滚?',
      content: `确认将词条【${current.join('，')}】回滚为【${preview.join(
        '，',
      )}】?`,
      onOk: async () => {
        await updateEntry({
          variables: {
            entryId: entry_id,
            key,
            langs: prevLangs,
            isRollback: true,
          },
        })
        onRollbackSucess()
        setVisible(false)
        message.success('回滚成功')
      },
    })
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
        data: {
          prevLangs: { ...record.prevLangs },
          entry_id: records.entry_id,
          langs: records.langs,
          key: records.key,
        },
        title: dayjs(record.createdAt).format('YY-MM-DD HH:mm'),
        subTitle: record.creatorInfo?.name,
        content: (
          <Space direction="vertical">
            {diffResult.add.length ? (
              <Space align="start">
                <Tag key="add" color="#87d068">
                  新增
                </Tag>
                {diffResult.add.map((text, idx) => (
                  <span key={idx} style={{ fontWeight: 'bold' }}>
                    {text}
                  </span>
                ))}
              </Space>
            ) : null}
            {diffResult.delete.length ? (
              <Space align="start">
                <Tag key="delete" color="#f50">
                  删除
                </Tag>
                <p style={{ textDecoration: 'line-through' }}>
                  {diffResult.delete.join('、')}
                </p>
              </Space>
            ) : null}
            {diffResult.modify.length ? (
              <Space align="start">
                <Tag key="edit" color="#108ee9">
                  编辑
                </Tag>
                {diffResult.modify.map((item, idx) => (
                  <span key={idx} style={{ fontWeight: 'bold' }}>
                    {item.curr}(
                    <span
                      style={{
                        textDecoration: 'line-through',
                        fontWeight: 'normal',
                      }}>
                      {item.prev}
                    </span>
                    )
                  </span>
                ))}
              </Space>
            ) : null}
          </Space>
        ),
        avatar: record.creatorInfo?.avatar,
      }
    })
  }, [modifyRecords, records])
  return (
    <>
      {ActionComp}
      <Modal
        bodyStyle={{ maxHeight: 480, overflow: 'auto' }}
        width={768}
        destroyOnClose
        title="编辑记录"
        visible={visible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}>
        <ProList<ProListType>
          grid={{ gutter: 16, column: 2 }}
          showActions="always"
          onItem={(record: any) => {
            return {}
          }}
          metas={{
            title: {},
            subTitle: {},
            content: {},
            actions: {
              render: (_, row) => [
                <Button
                  key={row.data.entry_id}
                  type="link"
                  onClick={() => handleRollback(row)}>
                  回滚
                </Button>,
              ],
            },
            avatar: {
              // render(_, entity) {
              //   return (
              //     <Popover title="123">
              //       <Avatar size="small" src={entity.avatar?.avatar}>
              //         U
              //       </Avatar>
              //     </Popover>
              //   )
              // },
            },
          }}
          dataSource={dataSource}
        />
      </Modal>
    </>
  )
}

export default ModifyRecordsModal
