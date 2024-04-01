import type { Resolver, NormalizeArgs } from '@pothos/core'
import type { GraphQLResolveInfo } from 'graphql'

import type { Context } from '../../src/context'

export interface Parent {}

/**
 * custom resolver
 */
export type ResolverHandler<ReturnType = any, ArgsType = any> = (
  parent: Parent,
  args: ArgsType,
  context: Context,
  info: GraphQLResolveInfo,
) => ReturnType

/**
 * query resolver by nexus
 */
export type QueryResolver<FieldName extends string> = Resolver<
  Parent,
  NormalizeArgs<string[]>,
  Context,
  FieldName
>

// /**
//  * mutation resolver by nexus
//  */
// export type MutationResolver<FieldName extends string> = FieldResolver<
//   'Mutation',
//   FieldName
// >

export interface OK {
  ok: boolean
}

// restful api types

export enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface Route {
  method: Methods
  url: string
  handlers: any | any[]
}

export interface Response {
  code?: number
  msg?: string
  data?: any
}
