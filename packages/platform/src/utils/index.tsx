import type { UploadFile } from 'antd'

export function sleep<ReturnType = void>(
  time: number,
  returnValue?: ReturnType,
) {
  return new Promise<ReturnType>(resolve => {
    setTimeout(() => {
      resolve(returnValue)
    }, time)
  })
}

interface FileVO {
  data: string
}

export function getPictureUrlList(fileList: UploadFile<Partial<FileVO>>[]) {
  if (!fileList?.length) {
    return []
  }
  return fileList
    .filter(file => file.status === 'done')
    .map(f => f?.response?.data || f?.url)
}
