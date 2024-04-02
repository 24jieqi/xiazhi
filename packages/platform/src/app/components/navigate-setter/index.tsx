import type { NavigateFunction } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

interface IHistory {
  navigate: NavigateFunction
}

export const History: IHistory = {
  navigate: null,
}

const NavigateSetter = () => {
  History.navigate = useNavigate()
  return null
}

export default NavigateSetter
