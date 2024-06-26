export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: number;
  JSON: any;
};

export type App = {
  __typename?: 'App';
  access: Scalars['Boolean'];
  accessKey?: Maybe<Scalars['String']>;
  appId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  entries: Array<Entry>;
  languages: Array<Scalars['String']>;
  name: Scalars['String'];
  pictures: Array<Scalars['String']>;
  push: Scalars['Boolean'];
};

export type CreateAppInput = {
  description?: InputMaybe<Scalars['String']>;
  languages: Array<Scalars['String']>;
  name: Scalars['String'];
  pictures?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateEntryInput = {
  appId: Scalars['Int'];
  key: Scalars['String'];
  langs: Scalars['JSON'];
};

export type Entry = {
  __typename?: 'Entry';
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  key?: Maybe<Scalars['String']>;
  langs: Scalars['JSON'];
  mainLang: Scalars['String'];
  mainLangText?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type EntryPaging = {
  __typename?: 'EntryPaging';
  current: Scalars['Int'];
  pageSize: Scalars['Int'];
  records: Array<Entry>;
  total: Scalars['Int'];
};

export type ExtractEntryItem = {
  key?: InputMaybe<Scalars['String']>;
  langs: Scalars['JSON'];
  mainLang: Scalars['String'];
  mainLangText: Scalars['String'];
};

export type ExtractEntryResult = {
  __typename?: 'ExtractEntryResult';
  add: Scalars['Int'];
  ignore: Scalars['Int'];
  modify: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 应用: 创建应用 */
  createApp: Scalars['Int'];
  /** 词条: 创建词条 */
  createEntry: Scalars['Int'];
  createPost: Scalars['Int'];
  /** 词条: 删除词条 */
  deleteEntry: Scalars['Boolean'];
  /** 词条: 词条更新 */
  editEntry: Scalars['Boolean'];
  login: Scalars['String'];
  /** 应用: 生成访问key */
  refreshAccessKey: Scalars['String'];
  regist: User;
  /** 词条: 词条上报 */
  uploadEntries: ExtractEntryResult;
};


export type MutationCreateAppArgs = {
  input: CreateAppInput;
};


export type MutationCreateEntryArgs = {
  input: CreateEntryInput;
};


export type MutationCreatePostArgs = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationDeleteEntryArgs = {
  id: Scalars['Int'];
};


export type MutationEditEntryArgs = {
  entryId: Scalars['Int'];
  key?: InputMaybe<Scalars['String']>;
  langs?: InputMaybe<Scalars['JSON']>;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
};


export type MutationRefreshAccessKeyArgs = {
  appId: Scalars['Int'];
};


export type MutationRegistArgs = {
  input: UserUniqueInput;
};


export type MutationUploadEntriesArgs = {
  ak: Scalars['String'];
  entries: Array<ExtractEntryItem>;
};

/** 用户发帖信息 */
export type Post = {
  __typename?: 'Post';
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  allPosts: Array<Post>;
  allUsers?: Maybe<Array<User>>;
  /** 应用: 获取目标应用 */
  getAppById: App;
  /** 应用: 应用列表 */
  getApps: Array<App>;
  /** 词条: 获取应用所有词条 */
  getEntries: Array<Entry>;
  /** 词条: 应用词条分页 */
  pageAppEntries: EntryPaging;
  user?: Maybe<User>;
  userPosts: Array<Post>;
};


export type QueryGetAppByIdArgs = {
  appId: Scalars['Int'];
};


export type QueryGetEntriesArgs = {
  ak: Scalars['String'];
};


export type QueryPageAppEntriesArgs = {
  appId: Scalars['Int'];
  key?: InputMaybe<Scalars['String']>;
  mainLangText?: InputMaybe<Scalars['String']>;
  pageNo: Scalars['Int'];
  pageSize: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  /** 用户角色 */
  role: UserRoleEnum;
};

/** 用户角色枚举 */
export const enum UserRoleEnum {
  Developer = 'DEVELOPER',
  Guest = 'GUEST',
  Maintainer = 'MAINTAINER',
  Test = 'TEST'
};

export type UserUniqueInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  role: UserRoleEnum;
};
