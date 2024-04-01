/* eslint-disable import/no-named-as-default */
import type { SchemaTypes } from '@pothos/core'
import SchemaBuilder from '@pothos/core'
import DataloaderPlugin from '@pothos/plugin-dataloader'
import PrismaPlugin from '@pothos/plugin-prisma'
import PrismaUtilsPlugin from '@pothos/plugin-prisma-utils'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import type { UserRole } from '@prisma/client'
import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars'

import client from 'prisma/prisma'

import type PrismaTypes from '../prisma/generated'

import type { Context } from './context'

export type TypesWithDefaults =
  PothosSchemaTypes.ExtendDefaultTypes<SchemaTypes>

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Scalars: {
    ID: {
      Output: number | string
      Input: string
    }
    DateTime: {
      Output: Date
      Input: Date
    }
    JSON: {
      Input: unknown
      Output: unknown
    }
  }
  Context: Context
  AuthScopes: {
    public: boolean
    role: UserRole[]
  }
}>({
  plugins: [
    ScopeAuthPlugin,
    PrismaPlugin,
    PrismaUtilsPlugin,
    DataloaderPlugin,
    SimpleObjectsPlugin,
  ],
  prisma: {
    client,
  },
  authScopes: async ctx => ({
    public: isPublic => (isPublic ? true : !!ctx.decoded?.userId), // isPublic=false token valitation
    // role validation
    role: async role => {
      if (!ctx.decoded) {
        return false
      }
      const currentUser = await ctx.prisma.user.findUnique({
        where: { id: ctx.decoded!.userId },
      })
      return !!currentUser?.role && role.includes(currentUser.role)
    },
  }),
})

builder.queryType()
builder.mutationType()

builder.addScalarType('DateTime', DateTimeResolver)
builder.addScalarType('JSON', JSONObjectResolver)
