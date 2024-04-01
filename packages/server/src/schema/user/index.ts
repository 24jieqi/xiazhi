import { UserRole } from '@prisma/client'

import { builder } from '../../builder'

import { UserDataSource } from './user.datasource'

const UserUniqueInput = builder.inputType('UserUniqueInput', {
  fields: t => ({
    name: t.string(),
    email: t.string({ required: true }),
    role: t.field({ type: UserRoleEnum, required: true }),
  }),
})

const UserRoleEnum = builder.enumType('UserRoleEnum', {
  description: '用户角色枚举',
  values: Object.fromEntries(
    Object.entries(UserRole).map(([name, value]) => [name, { value }]),
  ),
})

const User = builder.prismaObject('User', {
  fields: t => ({
    id: t.exposeInt('id', { nullable: false }),
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email', { nullable: false }),
    role: t.expose('role', {
      type: UserRoleEnum,
      nullable: false,
      description: '用户角色',
    }),
  }),
})

builder.queryFields(t => ({
  allUsers: t.prismaField({
    type: [User],
    nullable: true,
    authScopes: {
      role: ['MAINTAINER'],
    },
    unauthorizedResolver: () => [],
    resolve: () => UserDataSource.getAllUsers(),
  }),
  user: t.prismaField({
    type: User,
    nullable: true,
    authScopes: {
      public: false,
    },
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (_, __, args) => UserDataSource.getUser(args.id),
  }),
}))

builder.mutationFields(t => ({
  regist: t.prismaField({
    type: 'User',
    authScopes: {
      public: true,
    },
    args: {
      input: t.arg({ type: UserUniqueInput, required: true }),
    },
    resolve: async (_, __, { input: { email, role, name } }) =>
      UserDataSource.regist(email, role, name),
  }),
  login: t.field({
    args: {
      email: t.arg.string({ required: true }),
    },
    authScopes: {
      public: true,
    },
    type: 'String',
    resolve: async (_, args) => {
      return UserDataSource.login(args.email)
    },
  }),
}))
