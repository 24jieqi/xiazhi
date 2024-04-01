import { builder } from '../../builder'

import { PostsDataSource } from './posts.datasource'

const PostItem = builder.prismaObject('Post', {
  description: '用户发帖信息',
  fields: t => ({
    id: t.exposeInt('id'),
    title: t.exposeString('title', { nullable: false }),
    content: t.exposeString('content', { nullable: true }),
    published: t.exposeBoolean('published', { nullable: false }),
    viewCount: t.exposeInt('viewCount', { nullable: false }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    createdBy: t.relation('author'),
  }),
})

builder.queryFields(t => ({
  allPosts: t.field({
    type: [PostItem],
    authScopes: {
      role: ['MAINTAINER'],
    },
    resolve: () => PostsDataSource.getAllPosts(),
  }),
  userPosts: t.prismaField({
    type: [PostItem],
    authScopes: {
      public: false,
    },
    // eslint-disable-next-line max-params
    resolve: (querys, _, __, ctx) =>
      ctx.prisma.post.findMany({
        ...querys,
        where: {
          authorId: ctx.decoded!.userId,
        },
      }),
  }),
}))

builder.mutationField('createPost', t =>
  t.field({
    type: 'Int',
    authScopes: {
      public: false,
    },
    args: {
      title: t.arg.string({ required: true }),
      content: t.arg.string({ required: false }),
    },
    resolve: (_, args, ctx) =>
      PostsDataSource.createPost(args.title, ctx.decoded!.userId, args.content),
  }),
)
