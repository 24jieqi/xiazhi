import { getIpAddress, getServerAddress } from '@/utils/getServerAddress'

export const ipAddress = getIpAddress()
export const PORT = 4000
export const SECRET_KEY = 'fafamnx!!2d**8z'

export const serverAddress =
  process.env.NODE_ENV === 'development'
    ? getServerAddress(false, ipAddress!, PORT)
    : process.env.SERVER_ADDRESS
