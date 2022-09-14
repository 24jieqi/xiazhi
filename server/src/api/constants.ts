import { getIpAddress, getServerAddress } from "../utils"

export const historyApiFallbackWhiteList = ['/graphql', '/assets/template.xlsx']

export const PORT = 3000

export const ipAddress = getIpAddress()

export const serverAddress = getServerAddress(false, ipAddress!, PORT)

