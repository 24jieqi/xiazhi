/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JSONObject";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSONObject";
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  UploadEntryItem: { // input type
    key?: string | null; // String
    langs?: NexusGenScalars['JSONObject'] | null; // JSONObject
  }
}

export interface NexusGenEnums {
  AppTypeEnum: "CONTACT" | "EDUCATION" | "EFFICIENCY" | "FINANCE" | "GAME" | "MUSIC" | "OTHER" | "TOOL"
  LanguageTypeEnum: "CHINESE" | "ENGLISH" | "THAI" | "VIETNAMESE"
  UserRoleEnum: "DEVELOPER" | "MANAGER" | "OTHER" | "TRANSLATOR"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
  JSONObject: any
}

export interface NexusGenObjects {
  AppAccessInfo: { // root type
    access?: boolean | null; // Boolean
    accessKey?: string | null; // String
    app_id: number; // Int!
    archived?: boolean | null; // Boolean
    deleted?: boolean | null; // Boolean
    name?: string | null; // String
    push?: boolean | null; // Boolean
  }
  AppItem: { // root type
    access?: boolean | null; // Boolean
    accessKey?: string | null; // String
    app_id?: number | null; // Int
    creatorId?: number | null; // Int
    description?: string | null; // String
    languages?: Array<NexusGenEnums['LanguageTypeEnum'] | null> | null; // [LanguageTypeEnum]
    name?: string | null; // String
    pictures?: Array<string | null> | null; // [String]
    push?: boolean | null; // Boolean
    type?: NexusGenEnums['AppTypeEnum'] | null; // AppTypeEnum
  }
  AppPaging: { // root type
    current: number; // Int!
    pageSize: number; // Int!
    records?: Array<NexusGenRootTypes['AppItem'] | null> | null; // [AppItem]
    total: number; // Int!
  }
  EntryItem: { // root type
    archive?: boolean | null; // Boolean
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    deleted?: boolean | null; // Boolean
    entry_id?: number | null; // Int
    key?: string | null; // String
    langs?: NexusGenScalars['JSONObject'] | null; // JSONObject
    mainLang?: NexusGenEnums['LanguageTypeEnum'] | null; // LanguageTypeEnum
    mainLangText?: string | null; // String
    public?: boolean | null; // Boolean
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  EntryPaging: { // root type
    current: number; // Int!
    pageSize: number; // Int!
    records?: Array<NexusGenRootTypes['EntryItem'] | null> | null; // [EntryItem]
    total: number; // Int!
  }
  FeedbackItem: { // root type
    feedback_id: number; // Int!
    message?: string | null; // String
    result: boolean; // Boolean!
    user?: NexusGenRootTypes['UserInfo'] | null; // UserInfo
  }
  FeedbackPaging: { // root type
    current: number; // Int!
    pageSize: number; // Int!
    records?: Array<NexusGenRootTypes['FeedbackItem'] | null> | null; // [FeedbackItem]
    total: number; // Int!
  }
  LangageTypeOption: { // root type
    label: string; // String!
    value?: NexusGenEnums['LanguageTypeEnum'] | null; // LanguageTypeEnum
  }
  Mutation: {};
  Query: {};
  RecordItem: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    creator?: number | null; // Int
    currKey?: string | null; // String
    currLangs?: NexusGenScalars['JSONObject'] | null; // JSONObject
    entryEntry_id?: number | null; // Int
    prevKey?: string | null; // String
    prevLangs?: NexusGenScalars['JSONObject'] | null; // JSONObject
    record_id: number; // Int!
  }
  UserInfo: { // root type
    avatar?: string | null; // String
    email?: string | null; // String
    name?: string | null; // String
    nickName?: string | null; // String
    phone?: string | null; // String
    role?: NexusGenEnums['UserRoleEnum'] | null; // UserRoleEnum
    user_id?: number | null; // Int
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AppAccessInfo: { // field return type
    access: boolean | null; // Boolean
    accessKey: string | null; // String
    app_id: number; // Int!
    archived: boolean | null; // Boolean
    deleted: boolean | null; // Boolean
    name: string | null; // String
    push: boolean | null; // Boolean
  }
  AppItem: { // field return type
    access: boolean | null; // Boolean
    accessKey: string | null; // String
    app_id: number | null; // Int
    creator: NexusGenRootTypes['UserInfo'] | null; // UserInfo
    creatorId: number | null; // Int
    description: string | null; // String
    entryCount: number | null; // Int
    languages: Array<NexusGenEnums['LanguageTypeEnum'] | null> | null; // [LanguageTypeEnum]
    name: string | null; // String
    pictures: Array<string | null> | null; // [String]
    push: boolean | null; // Boolean
    type: NexusGenEnums['AppTypeEnum'] | null; // AppTypeEnum
  }
  AppPaging: { // field return type
    current: number; // Int!
    pageSize: number; // Int!
    records: Array<NexusGenRootTypes['AppItem'] | null> | null; // [AppItem]
    total: number; // Int!
  }
  EntryItem: { // field return type
    archive: boolean | null; // Boolean
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    deleted: boolean | null; // Boolean
    entry_id: number | null; // Int
    key: string | null; // String
    langs: NexusGenScalars['JSONObject'] | null; // JSONObject
    mainLang: NexusGenEnums['LanguageTypeEnum'] | null; // LanguageTypeEnum
    mainLangText: string | null; // String
    modifyRecords: Array<NexusGenRootTypes['RecordItem'] | null> | null; // [RecordItem]
    public: boolean | null; // Boolean
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  EntryPaging: { // field return type
    current: number; // Int!
    pageSize: number; // Int!
    records: Array<NexusGenRootTypes['EntryItem'] | null> | null; // [EntryItem]
    total: number; // Int!
  }
  FeedbackItem: { // field return type
    feedback_id: number; // Int!
    message: string | null; // String
    result: boolean; // Boolean!
    user: NexusGenRootTypes['UserInfo'] | null; // UserInfo
  }
  FeedbackPaging: { // field return type
    current: number; // Int!
    pageSize: number; // Int!
    records: Array<NexusGenRootTypes['FeedbackItem'] | null> | null; // [FeedbackItem]
    total: number; // Int!
  }
  LangageTypeOption: { // field return type
    label: string; // String!
    value: NexusGenEnums['LanguageTypeEnum'] | null; // LanguageTypeEnum
  }
  Mutation: { // field return type
    addLangage: number | null; // Int
    archivedApp: boolean | null; // Boolean
    changeAccessStatus: boolean | null; // Boolean
    changeEntryAccessStatus: boolean | null; // Boolean
    checkEmailValidation: boolean | null; // Boolean
    createApp: number | null; // Int
    createEntry: number | null; // Int
    deleteApp: boolean | null; // Boolean
    deleteEntries: boolean | null; // Boolean
    feedback: number | null; // Int
    login: string | null; // String
    refreshAccessKey: string | null; // String
    register: string | null; // String
    resetPassword: boolean | null; // Boolean
    sendResetPasswordEmail: boolean | null; // Boolean
    updateAppBasicInfo: number | null; // Int
    updateEntry: boolean | null; // Boolean
    updateUserInfo: boolean | null; // Boolean
    uploadEntries: boolean | null; // Boolean
  }
  Query: { // field return type
    countPositive: number | null; // Int
    getAccessKeyByAppId: NexusGenRootTypes['AppAccessInfo'] | null; // AppAccessInfo
    getAllEntries: Array<NexusGenRootTypes['EntryItem'] | null> | null; // [EntryItem]
    getAppInfoById: NexusGenRootTypes['AppItem'] | null; // AppItem
    getCurrentApps: NexusGenRootTypes['AppPaging'] | null; // AppPaging
    getCurrentUser: NexusGenRootTypes['UserInfo'] | null; // UserInfo
    listSupportLanguage: Array<NexusGenRootTypes['LangageTypeOption'] | null> | null; // [LangageTypeOption]
    pageAllPublicEntries: NexusGenRootTypes['EntryPaging'] | null; // EntryPaging
    pageAppEntries: NexusGenRootTypes['EntryPaging'] | null; // EntryPaging
    pageFeedbackNegative: NexusGenRootTypes['FeedbackPaging'] | null; // FeedbackPaging
  }
  RecordItem: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    creator: number | null; // Int
    creatorInfo: NexusGenRootTypes['UserInfo'] | null; // UserInfo
    currKey: string | null; // String
    currLangs: NexusGenScalars['JSONObject'] | null; // JSONObject
    entryEntry_id: number | null; // Int
    prevKey: string | null; // String
    prevLangs: NexusGenScalars['JSONObject'] | null; // JSONObject
    record_id: number; // Int!
  }
  UserInfo: { // field return type
    avatar: string | null; // String
    email: string | null; // String
    name: string | null; // String
    nickName: string | null; // String
    phone: string | null; // String
    role: NexusGenEnums['UserRoleEnum'] | null; // UserRoleEnum
    user_id: number | null; // Int
  }
}

export interface NexusGenFieldTypeNames {
  AppAccessInfo: { // field return type name
    access: 'Boolean'
    accessKey: 'String'
    app_id: 'Int'
    archived: 'Boolean'
    deleted: 'Boolean'
    name: 'String'
    push: 'Boolean'
  }
  AppItem: { // field return type name
    access: 'Boolean'
    accessKey: 'String'
    app_id: 'Int'
    creator: 'UserInfo'
    creatorId: 'Int'
    description: 'String'
    entryCount: 'Int'
    languages: 'LanguageTypeEnum'
    name: 'String'
    pictures: 'String'
    push: 'Boolean'
    type: 'AppTypeEnum'
  }
  AppPaging: { // field return type name
    current: 'Int'
    pageSize: 'Int'
    records: 'AppItem'
    total: 'Int'
  }
  EntryItem: { // field return type name
    archive: 'Boolean'
    createdAt: 'DateTime'
    deleted: 'Boolean'
    entry_id: 'Int'
    key: 'String'
    langs: 'JSONObject'
    mainLang: 'LanguageTypeEnum'
    mainLangText: 'String'
    modifyRecords: 'RecordItem'
    public: 'Boolean'
    updatedAt: 'DateTime'
  }
  EntryPaging: { // field return type name
    current: 'Int'
    pageSize: 'Int'
    records: 'EntryItem'
    total: 'Int'
  }
  FeedbackItem: { // field return type name
    feedback_id: 'Int'
    message: 'String'
    result: 'Boolean'
    user: 'UserInfo'
  }
  FeedbackPaging: { // field return type name
    current: 'Int'
    pageSize: 'Int'
    records: 'FeedbackItem'
    total: 'Int'
  }
  LangageTypeOption: { // field return type name
    label: 'String'
    value: 'LanguageTypeEnum'
  }
  Mutation: { // field return type name
    addLangage: 'Int'
    archivedApp: 'Boolean'
    changeAccessStatus: 'Boolean'
    changeEntryAccessStatus: 'Boolean'
    checkEmailValidation: 'Boolean'
    createApp: 'Int'
    createEntry: 'Int'
    deleteApp: 'Boolean'
    deleteEntries: 'Boolean'
    feedback: 'Int'
    login: 'String'
    refreshAccessKey: 'String'
    register: 'String'
    resetPassword: 'Boolean'
    sendResetPasswordEmail: 'Boolean'
    updateAppBasicInfo: 'Int'
    updateEntry: 'Boolean'
    updateUserInfo: 'Boolean'
    uploadEntries: 'Boolean'
  }
  Query: { // field return type name
    countPositive: 'Int'
    getAccessKeyByAppId: 'AppAccessInfo'
    getAllEntries: 'EntryItem'
    getAppInfoById: 'AppItem'
    getCurrentApps: 'AppPaging'
    getCurrentUser: 'UserInfo'
    listSupportLanguage: 'LangageTypeOption'
    pageAllPublicEntries: 'EntryPaging'
    pageAppEntries: 'EntryPaging'
    pageFeedbackNegative: 'FeedbackPaging'
  }
  RecordItem: { // field return type name
    createdAt: 'DateTime'
    creator: 'Int'
    creatorInfo: 'UserInfo'
    currKey: 'String'
    currLangs: 'JSONObject'
    entryEntry_id: 'Int'
    prevKey: 'String'
    prevLangs: 'JSONObject'
    record_id: 'Int'
  }
  UserInfo: { // field return type name
    avatar: 'String'
    email: 'String'
    name: 'String'
    nickName: 'String'
    phone: 'String'
    role: 'UserRoleEnum'
    user_id: 'Int'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addLangage: { // args
      label: string; // String!
      value: NexusGenEnums['LanguageTypeEnum']; // LanguageTypeEnum!
    }
    archivedApp: { // args
      id: number; // Int!
    }
    changeAccessStatus: { // args
      access?: boolean | null; // Boolean
      appId: number; // Int!
      push?: boolean | null; // Boolean
    }
    changeEntryAccessStatus: { // args
      appId: number; // Int!
      archive?: boolean | null; // Boolean
      deleted?: boolean | null; // Boolean
      entryId: number; // Int!
    }
    checkEmailValidation: { // args
      email: string; // String!
    }
    createApp: { // args
      description?: string | null; // String
      languages: NexusGenEnums['LanguageTypeEnum'][]; // [LanguageTypeEnum!]!
      name: string; // String!
      pictures: string[]; // [String!]!
      type: NexusGenEnums['AppTypeEnum']; // AppTypeEnum!
    }
    createEntry: { // args
      appId?: number | null; // Int
      key?: string | null; // String
      langs?: NexusGenScalars['JSONObject'] | null; // JSONObject
    }
    deleteApp: { // args
      id: number; // Int!
    }
    deleteEntries: { // args
      appId: number; // Int!
      entryIds: number[]; // [Int!]!
    }
    feedback: { // args
      feedbackId?: number | null; // Int
      message?: string | null; // String
      result: boolean; // Boolean!
      userId?: number | null; // Int
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    refreshAccessKey: { // args
      id: number; // Int!
    }
    register: { // args
      email: string; // String!
      password: string; // String!
    }
    resetPassword: { // args
      oldPassword: string; // String!
      password: string; // String!
    }
    sendResetPasswordEmail: { // args
      email: string; // String!
    }
    updateAppBasicInfo: { // args
      appId: number; // Int!
      description?: string | null; // String
      pictures: string[]; // [String!]!
      type: NexusGenEnums['AppTypeEnum']; // AppTypeEnum!
    }
    updateEntry: { // args
      entryId: number; // Int!
      key?: string | null; // String
      langs?: NexusGenScalars['JSONObject'] | null; // JSONObject
    }
    updateUserInfo: { // args
      avatar?: string | null; // String
      name?: string | null; // String
      nickName?: string | null; // String
      phone?: string | null; // String
      role?: NexusGenEnums['UserRoleEnum'] | null; // UserRoleEnum
    }
    uploadEntries: { // args
      accessKey?: string | null; // String
      entries: Array<NexusGenInputs['UploadEntryItem'] | null>; // [UploadEntryItem]!
    }
  }
  Query: {
    getAccessKeyByAppId: { // args
      id: number; // Int!
    }
    getAllEntries: { // args
      accessKey: string; // String!
    }
    getAppInfoById: { // args
      id: number; // Int!
    }
    getCurrentApps: { // args
      access?: boolean | null; // Boolean
      languages?: NexusGenEnums['LanguageTypeEnum'][] | null; // [LanguageTypeEnum!]
      name?: string | null; // String
      push?: boolean | null; // Boolean
      type?: NexusGenEnums['AppTypeEnum'] | null; // AppTypeEnum
    }
    pageAllPublicEntries: { // args
      pageNo: number; // Int!
      pageSize: number; // Int!
    }
    pageAppEntries: { // args
      appId: number; // Int!
      archive?: boolean | null; // Boolean
      endTime?: number | null; // Float
      key?: string | null; // String
      latest?: boolean | null; // Boolean
      mainLangText?: string | null; // String
      pageNo: number; // Int!
      pageSize: number; // Int!
      startTime?: number | null; // Float
    }
    pageFeedbackNegative: { // args
      pageNo: number; // Int!
      pageSize: number; // Int!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}