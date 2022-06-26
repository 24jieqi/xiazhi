import React from 'react'
import { useI18n } from '@/i18n/context'

const Home: React.FC = () => {
  const { I18N } = useI18n()
  return (
    <div>
      home
      <span>{I18N.common.all}</span>
    </div>
  )
}

export default Home
