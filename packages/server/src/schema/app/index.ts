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

const AppItem = builder.prismaObject('App', {
  fields(t) {
    return {
      appId: t.exposeInt('app_id'),
      name: t.exposeString('name'),
      description: t.exposeString('description', { nullable: true }),
      languages: t.exposeStringList('languages'),
      pictures: t.exposeStringList('pictures'),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      accessKey: t.exposeString('accessKey', { nullable: true }),
      push: t.exposeBoolean('push'),
      access: t.exposeBoolean('access'),
      entries: t.relation('entries'),
    }
  },
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

builder.queryField('getApps', t =>
  t.field({
    description: '应用: 应用列表',
    type: [AppItem],
    resolve: () => AppDataSource.getApps(),
  }),
)

builder.queryField('getAppById', t =>
  t.field({
    description: '应用: 获取目标应用',
    type: AppItem,
    args: {
      appId: t.arg.int({ required: true }),
    },
    resolve: async (_, args) => {
      const app = await AppDataSource.getAppById(args.appId)
      return app!
    },
  }),
)
