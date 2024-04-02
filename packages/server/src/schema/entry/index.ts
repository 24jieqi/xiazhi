import { builder } from '@/builder'

import { EntryDataSource, ExtractEntryItem } from './entry.datasource'

const ExtractEntryResult = builder.simpleObject('ExtractEntryResult', {
  fields: t => ({
    add: t.int({ nullable: false }),
    modify: t.int({ nullable: false }),
    ignore: t.int({ nullable: false }),
  }),
})

const EntryItem = builder.prismaObject('Entry', {
  fields(t) {
    return {
      id: t.exposeInt('entry_id'),
      key: t.exposeString('key', { nullable: true }),
      langs: t.expose('langs', { type: 'JSON' }),
      mainLang: t.exposeString('mainLang'),
      mainLangText: t.exposeString('mainLangText', { nullable: true }),
    }
  },
})

builder.mutationField('uploadEntries', t =>
  t.field({
    description: '词条: 词条上报',
    authScopes: {
      public: true,
    },
    args: {
      ak: t.arg.string({ required: true }),
      entries: t.arg({ type: [ExtractEntryItem], required: true }),
    },
    type: ExtractEntryResult,
    resolve: (_, args) => {
      return EntryDataSource.uploadEntries(args.ak, args.entries)
    },
  }),
)

builder.queryField('getEntries', t =>
  t.field({
    description: '词条: 获取应用所有词条',
    authScopes: {
      public: true,
    },
    args: {
      ak: t.arg.string({ required: true }),
    },
    type: [EntryItem],
    resolve: (_, args) => EntryDataSource.getAppEntries(args.ak),
  }),
)

builder.mutationField('editEntry', t =>
  t.field({
    description: '词条: 词条更新',
    authScopes: {
      public: true,
    },
    type: 'Boolean',
    args: {
      entryId: t.arg.int({ required: true }),
      appId: t.arg.int({ required: true }),
      langs: t.arg({ type: 'JSON' }),
      key: t.arg.string(),
    },
    resolve: (_, { entryId, appId, langs, key }) =>
      EntryDataSource.updateAppEntry({
        entryId,
        appId,
        langs,
        key: key || undefined,
      }),
  }),
)
