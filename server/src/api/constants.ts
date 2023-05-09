import { getIpAddress, getServerAddress } from "../utils";

export const historyApiFallbackWhiteList = [
  "/graphql",
  "/assets/template.xlsx",
  "/_upload"
];

export const PORT = 3000;

export const ipAddress = getIpAddress();

export const serverAddress =
  process.env.NODE_ENV === "development"
    ? getServerAddress(false, ipAddress!, PORT)
    : process.env.SERVER_ADDRESS;
