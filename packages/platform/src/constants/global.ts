import {
  App,
  message as antdMessage,
  notification as antdNotification,
  Modal as antdModal,
} from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import type { NotificationInstance } from 'antd/es/notification/interface'

let message: MessageInstance = antdMessage
let notification: NotificationInstance = antdNotification
let modal: Omit<ModalStaticFunctions, 'warn'> = antdModal

export default () => {
  const staticFunction = App.useApp()
  message = staticFunction.message
  modal = staticFunction.modal
  notification = staticFunction.notification
  return null
}

export { message, notification, modal }
