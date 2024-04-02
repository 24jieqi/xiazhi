// eslint-disable-next-line @typescript-eslint/no-require-imports
const Mock = require('mockjs')

const { Random } = Mock

module.exports = {
  port: 6700,
  endpoint: {
    url: 'https://java-orange-graphql-dev.k8s-dev.hjfruit.cn/graphql',
  },
  mock: {
    enable: true,
    mockDirectiveDefaultEnableValue: true,
    context: {
      Random,
    },
    scalarMap: {
      Int: () => Random.integer(0, 100),
      String: () => Random.ctitle(2, 4),
      ID: () => Random.id(),
      Boolean: () => Random.boolean(),
      BigDecimal: () => Random.integer(0, 1000000),
      Float: () => Random.float(0, 100),
      Date: () => Random.date(),
      DateTime: () => Random.datetime(),
      Long: () => Random.integer(0, 10000),
      NumberOrBoolOrStringOrNull: () => null,
      NumberOrString: () => null,
      Object: () => ({}),
    },
    resolvers: {
      Mutation: {
        loginByPhone: async () => {
          return {
            token: Random.id(),
          }
        },
        refreshToken: async () => {
          return {
            token: Random.id(),
          }
        },
      },
    },
  },
}
