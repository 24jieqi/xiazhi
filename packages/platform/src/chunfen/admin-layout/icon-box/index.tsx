import React from 'react'

import './style.less'

const IconBox: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  return (
    <div
      {...props}
      className={['chunfen-icon-box', props.className]
        .filter(Boolean)
        .join(' ')}>
      <div className="chunfen-icon-box-inner">{props.children}</div>
    </div>
  )
}

export default IconBox
