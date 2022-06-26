import React from 'react'
import { render } from 'react-dom'
import './index.css'
import '@/assets/styles/basics.less'
import App from './App'

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
