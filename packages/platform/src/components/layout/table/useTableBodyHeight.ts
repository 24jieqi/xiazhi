import { useSize } from 'ahooks'
import { useEffect, useRef, useState } from 'react'

const useTableBodyHeight = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const size = useSize(contentRef)
  const [height, setHeight] = useState(500)
  useEffect(() => {
    if (!size?.height) {
      return
    }
    const headerHeight =
      contentRef.current?.querySelector('.ant-table-header')?.clientHeight || 55
    setHeight(Math.ceil(size.height - headerHeight))
  }, [size?.height])
  return {
    contentRef,
    height,
  }
}

export default useTableBodyHeight
