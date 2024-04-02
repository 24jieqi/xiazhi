module.exports = {
  client: {
    service: {
      url: 'http://192.168.10.233:9406/graphql',
    },
    includes: ['./src/graphql/operations/**/*.{gql,graphql}'],
  },
}
