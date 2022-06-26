import { makeSchema, asNexusMethod } from 'nexus'
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars'
import path from 'path'
import * as types from './schema'

const jsonScalar = asNexusMethod(JSONObjectResolver, 'json')
const dateTimeScalar = asNexusMethod(DateTimeResolver, 'date')

const schema = makeSchema({
  types: {
    jsonScalar,
    dateTimeScalar,
    ...types,
  },
  outputs: {
    schema: path.join(process.cwd(), './src/graphql/generated/schema.graphql'),
    typegen: path.join(process.cwd(), './src/graphql/generated/types.d.ts'),
  },
  sourceTypes: {
    modules: [{ module: '.prisma/client', alias: 'PrismaClient' }],
  },
  contextType: {
    module: path.join(process.cwd(), './src/graphql/context.ts'),
    export: 'Context',
  },
})

export default schema
