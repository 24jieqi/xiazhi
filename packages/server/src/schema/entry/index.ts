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
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    }
  },
})

const EntryPaging = builder.simpleObject('EntryPaging', {
  fields: t => ({
    total: t.int({ nullable: false }),
    pageSize: t.int({ nullable: false }),
    current: t.int({ nullable: false }),
    records: t.field({ type: [EntryItem] }),
  }),
})

const CreateEntryInput = builder.inputType('CreateEntryInput', {
  fields(t) {
    return {
      appId: t.int({ required: true }),
      langs: t.field({ type: 'JSON', required: true }),
      key: t.string({ required: true }),
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

builder.queryField('pageAppEntries', t =>
  t.field({
    description: '词条: 应用词条分页',
    authScopes: {
      public: true,
    },
    args: {
      appId: t.arg.int({ required: true }),
      pageSize: t.arg.int({ required: true }),
      pageNo: t.arg.int({ required: true }),
      mainLangText: t.arg.string(),
      key: t.arg.string(),
    },
    type: EntryPaging,
    resolve: (_, args) =>
      EntryDataSource.pageAppEntry({
        ...args,
        mainLangText: args.mainLangText || undefined,
        key: args.key || undefined,
      }),
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
      langs: t.arg({ type: 'JSON' }),
    },
    resolve: (_, { entryId, langs }) =>
      EntryDataSource.updateAppEntry({
        entryId,
        langs,
      }),
  }),
)

builder.mutationField('createEntry', t =>
  t.field({
    description: '词条: 创建词条',
    authScopes: {
      public: true,
    },
    type: 'Int',
    args: {
      input: t.arg({ type: CreateEntryInput, required: true }),
    },
    resolve: (_, args) =>
      EntryDataSource.createEntry({ ...args.input, langs: args.input.langs! }),
  }),
)
