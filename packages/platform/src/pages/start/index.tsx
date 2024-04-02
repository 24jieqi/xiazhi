import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import { APP_LIST } from '../application/route'

import StartLayout from './components/layout'
import coverImg from './images/cover.webp'

const StartPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <StartLayout title="处暑多语言词库平台" coverImg={coverImg}>
      <Button
        size="large"
        type="primary"
        style={{ width: '100%' }}
        onClick={() => navigate(APP_LIST)}>
        开始使用
      </Button>
    </StartLayout>
  )
}

export default StartPage
