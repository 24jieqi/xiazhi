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
    type: 'Int',
    authScopes: {
      public: true,
    },
    args: {
      input: t.arg({ type: CreateAppInput, required: true }),
    },
    resolve: (_, { input: { name, description, languages, pictures } }, __) => {
      return AppDataSource.createApp({
        name,
        description: description || undefined,
        languages,
        pictures: pictures || undefined,
      })
    },
  }),
)
