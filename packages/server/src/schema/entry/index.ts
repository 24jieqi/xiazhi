import { builder } from '@/builder'

builder.prismaObject('Entry', {
  fields: t => ({
    // key: t.exposeString('key'),
  }),
})
