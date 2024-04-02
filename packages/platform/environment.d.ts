declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GRAPHQL_PATH: string
      REACT_APP_BASE_URL: string
      REACT_APP_API_HOST: string
      RSA_PUBLIC_KEY: string
    }
  }
}

export {}
