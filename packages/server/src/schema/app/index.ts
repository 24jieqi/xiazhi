import { builder } from '../../builder'

import { AppDataSource } from './app.datasource'

const CreateAppInput = builder.inputType('CreateAppInput', {
  fields: t => ({
    name: t.string({ required: true }),
    description: t.string(),
    languages: t.stringList({ required: true }),
    pictures: t.stringList(),
  }),
})

builder.mutationField('createApp', t =>
  t.field({
    description: '应用: 创建应用',
    type: 'Int',
    authScopes: {
      public: true,
    },
    args: {
      input: t.arg({ type: CreateAppInput, required: true }),
    },
    resolve: (_, { input: { name, description, languages, pictures } }) => {
      return AppDataSource.createApp({
        name,
        description: description || undefined,
        languages,
        pictures: pictures || undefined,
      })
    },
  }),
)

builder.mutationField('refreshAccessKey', t =>
  t.field({
    description: '应用: 生成访问key',
    type: 'String',
    authScopes: {
      public: true,
    },
    args: {
      appId: t.arg.int({ required: true }),
    },
    resolve: (_, args) => AppDataSource.refreshAccessKey(args.appId),
  }),
)
