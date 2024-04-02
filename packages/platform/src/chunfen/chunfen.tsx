import React, { useMemo } from 'react'
import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'

import { formatRouterConfig } from './helper'
import type { ChunfenProps } from './interface'
import Result from './result'

const Chunfen: React.FC<ChunfenProps> = props => {
  const routes = useMemo(
    () => [
      ...formatRouterConfig(props.routes),
      {
        path: '*',
        element: (
          <Result status="404" text="哎呀，出错了！你访问的页面不存在…" />
        ),
      },
    ],
    [props.routes],
  )
  return useRoutes(routes as RouteObject[])
}

export default Chunfen
