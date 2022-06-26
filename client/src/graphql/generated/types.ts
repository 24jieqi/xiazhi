export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** java.math.BigDecimal */
  BigDecimal: any
  /** An RFC-3339 compliant Full Date Scalar */
  Date: any
  /** An RFC-3339 compliant DateTime Scalar */
  DateTime: any
  /** Long type */
  Long: any
  _FieldSet: any
}

export type AppDevicePayload = {
  __typename?: 'AppDevicePayload'
  /**  0不升级，1升级，2强制升级 */
  upgradeStrategy?: Maybe<Scalars['Int']>
  /**  设备平台 */
  platform?: Maybe<DevicePlatformEnum>
  /**  版本 */
  version?: Maybe<Scalars['Int']>
  /**  版本号 */
  versionCode?: Maybe<Scalars['String']>
  /**  更新信息 */
  updateInfo?: Maybe<Scalars['String']>
  /**  android 包下载地址 */
  downloadUrl?: Maybe<Scalars['String']>
  /**  ios 苹果商店的应用 id */
  appleId?: Maybe<Scalars['String']>
  /**  发布时间 */
  releaseAt?: Maybe<Scalars['Long']>
  /**  创建时间 */
  createAt?: Maybe<Scalars['Long']>
}

/**  基本分页请求参数 */
export type BasePage = {
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
}

/**  黑名单校验入参 */
export type BlacklistCheckInput = {
  /**  可选(编辑必填) */
  id?: Maybe<Scalars['Int']>
  /**  黑名单类型 */
  blacklistType: Scalars['String']
  /**  校验信息 */
  checkInfoStr: Scalars['String']
}

/**  新增黑名单入参 */
export type BlacklistCreateInput = {
  /**  黑名单类型 */
  blacklistType: Scalars['String']
  /**  车牌号 */
  carNo?: Maybe<Scalars['String']>
  /**  司机手机号 */
  driverPhone?: Maybe<Scalars['String']>
  /**  司机姓名 */
  driverName?: Maybe<Scalars['String']>
  /**  拉黑原因 */
  blackReason: Scalars['String']
}

/**  移除黑名单信息入参 */
export type BlacklistDeleteInput = {
  /**  黑名单ID */
  id: Scalars['Int']
  /**  拉黑原因 */
  deleteReason: Scalars['String']
}

/**  编辑黑名单信息入参 */
export type BlacklistEditInput = {
  /**  黑名单ID */
  id: Scalars['Int']
  /**  黑名单类型 */
  blacklistType: Scalars['String']
  /**  车牌号 */
  carNo?: Maybe<Scalars['String']>
  /**  司机手机号 */
  driverPhone?: Maybe<Scalars['String']>
  /**  司机姓名 */
  driverName?: Maybe<Scalars['String']>
  /**  拉黑原因 */
  blackReason: Scalars['String']
}

/**  新增品类入参 */
export type CategoryCreateInput = {
  /**  品类ID */
  id: Scalars['Int']
  /**  品类图片 */
  img: FileInput
}

/**  品类启用禁用接口入参 */
export type CategoryEditEnableInput = {
  /**  品类ID集合 */
  ids: Array<Scalars['Int']>
  /**  状态 1 启用 99 禁用 */
  enable: Scalars['Int']
}

/**  查看未添加商品品类入参 */
export type CategoryNotAddedInput = {
  typeId: Scalars['Int']
}

/**  品类下拉选项入参 */
export type CategorySelectInput = {
  /**  0 查询全部 1 只查询生效的 默认查全部 */
  isQueryDelete?: Maybe<Scalars['Int']>
}

export type ChangePortStatusInput = {
  /**  id */
  id?: Maybe<Scalars['Int']>
  /**  状态 */
  status?: Maybe<Scalars['Int']>
}

export type ChangeResourceStatusInput = {
  /**  资源id */
  id?: Maybe<Scalars['Int']>
  /**  状态 1 可用 99 禁用 */
  status?: Maybe<Scalars['Int']>
}

/**  修改客户状态 */
export type ChangeStatusInput = {
  /**  客户id */
  id?: Maybe<Scalars['Int']>
  /**  状态 */
  status?: Maybe<Scalars['Int']>
}

export type CheckDepositoryNameInput = {
  /**  主键ID */
  id?: Maybe<Scalars['Int']>
  /**  客户id */
  customerId?: Maybe<Scalars['Int']>
  /**  仓库名称 */
  depositoryName: Scalars['String']
}

export type CheckProductRuleInput = {
  /**  id */
  id?: Maybe<Scalars['Int']>
  /**  商品品类ID */
  productId?: Maybe<Scalars['Int']>
  /**  柜次规则名称 */
  name?: Maybe<Scalars['String']>
  /**  柜次规则编码 */
  code?: Maybe<Scalars['String']>
}

/**  根据ID获取商品信息 */
export type CommodityDetailPayload = {
  __typename?: 'CommodityDetailPayload'
  /**  id */
  id?: Maybe<Scalars['Int']>
  /**  spu名称 */
  name?: Maybe<Scalars['String']>
  /**  品类ID */
  categoryId?: Maybe<Scalars['Int']>
  /**  品类名称 */
  categoryName?: Maybe<Scalars['String']>
  /**  名称国际化 */
  nameLocal?: Maybe<Scalars['String']>
  /**  品种 */
  variety?: Maybe<Scalars['String']>
  /**  产地 */
  place?: Maybe<Scalars['String']>
  /**  规格选项 */
  specOptions?: Maybe<Array<Maybe<CommoditySpecPayload>>>
}

/**  规格类型选项值信息 */
export type CommodityOptionPayload = {
  __typename?: 'CommodityOptionPayload'
  /**  规格选项ID */
  id?: Maybe<Scalars['Int']>
  /**  所属规格类型ID */
  specId?: Maybe<Scalars['Int']>
  /**  规格选项名称 */
  name?: Maybe<Scalars['String']>
  /**  规格类型国际化 */
  nameLocale?: Maybe<Scalars['String']>
  /**  规格类型排序 */
  sort?: Maybe<Scalars['Int']>
}

/**  sku详情接口返回信息 */
export type CommoditySkuInfoPayload = {
  __typename?: 'CommoditySkuInfoPayload'
  /**  skuId */
  id?: Maybe<Scalars['Int']>
  /**  所属品类ID */
  categoryId?: Maybe<Scalars['Int']>
  /**  所属商品ID */
  commodityId?: Maybe<Scalars['Int']>
  /**  净重 */
  netWeight?: Maybe<Scalars['BigDecimal']>
  /**  毛重 */
  grossWeight?: Maybe<Scalars['BigDecimal']>
  /**  sku出口单价 */
  exportPrice?: Maybe<Scalars['BigDecimal']>
  /**  sku出口货币 */
  exportCurrency?: Maybe<Scalars['Int']>
  /**  sku进口单价 */
  import_price?: Maybe<Scalars['BigDecimal']>
  /**  sku进口货币 */
  importCurrency?: Maybe<Scalars['Int']>
  /**  状态 */
  status?: Maybe<Scalars['Int']>
}

/**  商品规格选项 */
export type CommoditySpecPayload = {
  __typename?: 'CommoditySpecPayload'
  /**  规格类型ID */
  id?: Maybe<Scalars['Int']>
  /**  规格类型名称 */
  name?: Maybe<Scalars['String']>
  /**  规格类型国际化 */
  nameLocale?: Maybe<Scalars['String']>
  /**  规格类型排序 */
  sort?: Maybe<Scalars['Int']>
}

export type CommodityUpdateBatchInput = {
  /**  sku ID 数组 */
  skuIds?: Maybe<Array<Scalars['Int']>>
  /**  净重 */
  netWeight?: Maybe<Scalars['BigDecimal']>
  /**  毛重 */
  grossWeight?: Maybe<Scalars['BigDecimal']>
  /**  sku出口单价 */
  exportPrice?: Maybe<Scalars['BigDecimal']>
  /**  sku出口货币 */
  exportCurrency?: Maybe<Scalars['Int']>
  /**  sku进口单价 */
  import_price?: Maybe<Scalars['BigDecimal']>
  /**  sku进口货币 */
  importCurrency?: Maybe<Scalars['Int']>
}

export type CommodityUpdateBatchStatusInput = {
  /**  sku ID 数组 */
  skuIds?: Maybe<Array<Scalars['Int']>>
  /**  状态 1:启用 99:禁用 */
  status: Scalars['Int']
}

/** 添加商品 */
export type CreateCommodityInput = {
  /** 商品id */
  commodityId: Scalars['Int']
  /** 商品类型id */
  commodityTypeId: Scalars['Int']
  /**  商品品类ID */
  commodityCategoryId: Scalars['Int']
}

/**  新增客户 */
export type CreateCustomerInput = {
  /**  客户简称（中文） */
  name: Scalars['String']
  /**  客户简称（多语言） */
  nameLocal?: Maybe<Scalars['String']>
  /**  客户编码 */
  code?: Maybe<Scalars['String']>
  /**  关联区域Ids */
  departIds?: Maybe<Array<Scalars['Int']>>
  /**  收货人 */
  receiver?: Maybe<Scalars['String']>
  /**  收货地址 */
  receiveAddress?: Maybe<Scalars['String']>
  /**  收货人手机号码 */
  phone?: Maybe<Scalars['String']>
  /**  工商信息 */
  businessInfo?: Maybe<CustomerBusinessInput>
  /**  "状态 99 停用 1 启用 */
  status?: Maybe<Scalars['Int']>
}

export type CreateDepositoryInput = {
  /**  客户id */
  customerId?: Maybe<Scalars['Int']>
  /**  仓库名称 */
  depositoryName: Scalars['String']
  /**  联系人 */
  contacts?: Maybe<Scalars['String']>
  /**  联系电话 */
  phone?: Maybe<Scalars['String']>
  /**  地址 */
  address: Scalars['String']
  /**  启用状态 1启用 99禁用 */
  enabled?: Maybe<Scalars['Int']>
  /**  经度 */
  lng?: Maybe<Scalars['String']>
  /**  纬度 */
  lat?: Maybe<Scalars['String']>
}

export type CreatePortInput = {
  /**  口岸简称(中文) */
  name: Scalars['String']
  /**  口岸简称(多语言) */
  nameLocale?: Maybe<Scalars['String']>
  /**  国家(1 中国 2 越南 3 泰国) */
  country: Scalars['Int']
  /**  口岸运输方式(1 陆运 2 海运 3 海铁) */
  transportMode: Scalars['Int']
  /**  报关口岸id数组 */
  declarePortIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  运输公司id数组 */
  transportCompanyIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  报关公司id数组 */
  declareCompanyIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  堆场id数组 */
  storageYardIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  口岸地址 */
  address?: Maybe<Scalars['String']>
  /**  latitude 纬度 */
  lat?: Maybe<Scalars['String']>
  /**  longitude 经度 */
  lng?: Maybe<Scalars['String']>
}

export type CreateProductRuleInput = {
  /**  商品品类ID */
  productId?: Maybe<Scalars['Int']>
  /**  柜次规则名称 */
  name?: Maybe<Scalars['String']>
  /**  柜次规则名称 多语言 */
  nameLocale?: Maybe<Scalars['String']>
  /**  柜次规则编码 */
  code?: Maybe<Scalars['String']>
  /**  月偏移量 */
  monthOffset?: Maybe<Scalars['Int']>
  /**  状态 1 启用  99 禁用 */
  enabled?: Maybe<Scalars['Int']>
}

export type CreateRoleInput = {
  /** 角色名称 */
  roleName: Scalars['String']
}

/**  客户工商信息 */
export type CustomerBusinessInput = {
  /**  企业名 */
  name?: Maybe<Scalars['String']>
  /**  法定代表人 */
  legalRep?: Maybe<Scalars['String']>
  /**  社会信用代码 */
  socialCreditCode?: Maybe<Scalars['String']>
  /**  企业地址 */
  address?: Maybe<Scalars['String']>
  /**  营业执照 */
  bizLicense?: Maybe<Scalars['String']>
}

export type CustomerBusinessPayload = {
  __typename?: 'CustomerBusinessPayload'
  /**  企业名 */
  name?: Maybe<Scalars['String']>
  /**  法定代表人 */
  legalRep?: Maybe<Scalars['String']>
  /**  社会信用代码 */
  socialCreditCode?: Maybe<Scalars['String']>
  /**  企业地址 */
  address?: Maybe<Scalars['String']>
  /**  营业执照 */
  bizLicense?: Maybe<Scalars['String']>
}

export type CustomerDepositoryInput = {
  /**  客户id */
  customerId?: Maybe<Scalars['Int']>
  /**  0:查询全部 1:只查询生效的,默认查询全部 */
  isEnabled?: Maybe<Scalars['Int']>
}

export type CustomerDepositoryPayload = {
  __typename?: 'CustomerDepositoryPayload'
  /**  id */
  id?: Maybe<Scalars['Int']>
  /**  客户id */
  customerId?: Maybe<Scalars['Int']>
  /**  仓库名称 */
  depositoryName?: Maybe<Scalars['String']>
  /**  启用状态 1启用 99禁用 */
  enabled?: Maybe<Scalars['Int']>
  /**  联系人 */
  contacts?: Maybe<Scalars['String']>
  /**  地址 */
  address?: Maybe<Scalars['String']>
  /**  联系电话 */
  phone?: Maybe<Scalars['String']>
  /**  经度 */
  lng?: Maybe<Scalars['String']>
  /**  纬度 */
  lat?: Maybe<Scalars['String']>
}

/**  编辑客户 */
export type CustomerDetailPayload = {
  __typename?: 'CustomerDetailPayload'
  id?: Maybe<Scalars['Int']>
  /**  客户简称（中文） */
  name: Scalars['String']
  /**  客户简称（多语言） */
  nameLocal?: Maybe<Scalars['String']>
  /**  客户编码 */
  code?: Maybe<Scalars['String']>
  /**  关联区域Ids */
  departIds?: Maybe<Array<Scalars['Int']>>
  /**  收货人 */
  receiver?: Maybe<Scalars['String']>
  /**  收货地址 */
  receiveAddress?: Maybe<Scalars['String']>
  /**  收货人手机号码 */
  phone?: Maybe<Scalars['String']>
  /**  工商信息 */
  businessInfo?: Maybe<CustomerBusinessPayload>
  /**  "状态 99 停用 1 启用 */
  status?: Maybe<Scalars['Int']>
}

export type CustomerIdInput = {
  /**  客户id */
  id?: Maybe<Scalars['Int']>
}

export type CustomerPayload = {
  __typename?: 'CustomerPayload'
  /**  id */
  id?: Maybe<Scalars['Int']>
  /**  客户名称 */
  name?: Maybe<Scalars['String']>
  /**  服务区域 */
  departNames?: Maybe<Scalars['String']>
  /**  状态 0 停用 1 启用 */
  status?: Maybe<Scalars['Int']>
  /**  客户编码 */
  code?: Maybe<Scalars['String']>
}

export type DepositoryIdInput = {
  /**  主键ID */
  id?: Maybe<Scalars['Int']>
}

export enum DevicePlatformEnum {
  /**  web */
  Web = 'WEB',
  /**  android */
  Android = 'ANDROID',
  /**  ios */
  Ios = 'IOS',
}

/**  校验司机信息是否存在黑名单 */
export type DriverInfoCheckInput = {
  /**  校验信息 */
  keywords: Scalars['String']
}

export enum ErrorDetail {
  /**
   * Unknown error.
   *
   * This error should only be returned when no other error detail applies.
   * If a client sees an unknown errorDetail, it will be interpreted as UNKNOWN.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Unknown = 'UNKNOWN',
  /**
   * The requested field is not found in the schema.
   *
   * This differs from `NOT_FOUND` in that `NOT_FOUND` should be used when a
   * query is valid, but is unable to return a result (if, for example, a
   * specific video id doesn't exist). `FIELD_NOT_FOUND` is intended to be
   * returned by the server to signify that the requested field is not known to exist.
   * This may be returned in lieu of failing the entire query.
   * See also `PERMISSION_DENIED` for cases where the
   * requested field is invalid only for the given user or class of users.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: BAD_REQUEST
   */
  FieldNotFound = 'FIELD_NOT_FOUND',
  /**
   * The provided cursor is not valid.
   *
   * The most common usage for this error is when a client is paginating
   * through a list that uses stateful cursors. In that case, the provided
   * cursor may be expired.
   *
   * HTTP Mapping: 404 Not Found
   * Error Type: NOT_FOUND
   */
  InvalidCursor = 'INVALID_CURSOR',
  /**
   * The operation is not implemented or is not currently supported/enabled.
   *
   * HTTP Mapping: 501 Not Implemented
   * Error Type: BAD_REQUEST
   */
  Unimplemented = 'UNIMPLEMENTED',
  /**
   * The client specified an invalid argument.
   *
   * Note that this differs from `FAILED_PRECONDITION`.
   * `INVALID_ARGUMENT` indicates arguments that are problematic
   * regardless of the state of the system (e.g., a malformed file name).
   *
   * HTTP Mapping: 400 Bad Request
   * Error Type: BAD_REQUEST
   */
  InvalidArgument = 'INVALID_ARGUMENT',
  /**
   * The deadline expired before the operation could complete.
   *
   * For operations that change the state of the system, this error
   * may be returned even if the operation has completed successfully.
   * For example, a successful response from a server could have been
   * delayed long enough for the deadline to expire.
   *
   * HTTP Mapping: 504 Gateway Timeout
   * Error Type: UNAVAILABLE
   */
  DeadlineExceeded = 'DEADLINE_EXCEEDED',
  /**
   * Service Error.
   *
   * There is a problem with an upstream service.
   *
   * This may be returned if a gateway receives an unknown error from a service
   * or if a service is unreachable.
   * If a request times out which waiting on a response from a service,
   * `DEADLINE_EXCEEDED` may be returned instead.
   * If a service returns a more specific error Type, the specific error Type may
   * be returned instead.
   *
   * HTTP Mapping: 502 Bad Gateway
   * Error Type: UNAVAILABLE
   */
  ServiceError = 'SERVICE_ERROR',
  /**
   * Request throttled based on server CPU limits
   *
   * HTTP Mapping: 503 Unavailable.
   * Error Type: UNAVAILABLE
   */
  ThrottledCpu = 'THROTTLED_CPU',
  /**
   * Request throttled based on server concurrency limits.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  ThrottledConcurrency = 'THROTTLED_CONCURRENCY',
  /**
   * The server detected that the client is exhibiting a behavior that
   * might be generating excessive load.
   *
   * HTTP Mapping: 429 Too Many Requests or 420 Enhance Your Calm
   * Error Type: UNAVAILABLE
   */
  EnhanceYourCalm = 'ENHANCE_YOUR_CALM',
  /**
   * Request failed due to network errors.
   *
   * HTTP Mapping: 503 Unavailable
   * Error Type: UNAVAILABLE
   */
  TcpFailure = 'TCP_FAILURE',
  /**
   * Unable to perform operation because a required resource is missing.
   *
   * Example: Client is attempting to refresh a list, but the specified
   * list is expired. This requires an action by the client to get a new list.
   *
   * If the user is simply trying GET a resource that is not found,
   * use the NOT_FOUND error type. FAILED_PRECONDITION.MISSING_RESOURCE
   * is to be used particularly when the user is performing an operation
   * that requires a particular resource to exist.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   * Error Type: FAILED_PRECONDITION
   */
  MissingResource = 'MISSING_RESOURCE',
}

export enum ErrorType {
  /**
   * Unknown error.
   *
   * For example, this error may be returned when
   * an error code received from another address space belongs to
   * an error space that is not known in this address space.  Also
   * errors raised by APIs that do not return enough error information
   * may be converted to this error.
   *
   * If a client sees an unknown errorType, it will be interpreted as UNKNOWN.
   * Unknown errors MUST NOT trigger any special behavior. These MAY be treated
   * by an implementation as being equivalent to INTERNAL.
   *
   * When possible, a more specific error should be provided.
   *
   * HTTP Mapping: 520 Unknown Error
   */
  Unknown = 'UNKNOWN',
  /**
   * Internal error.
   *
   * An unexpected internal error was encountered. This means that some
   * invariants expected by the underlying system have been broken.
   * This error code is reserved for serious errors.
   *
   * HTTP Mapping: 500 Internal Server Error
   */
  Internal = 'INTERNAL',
  /**
   * The requested entity was not found.
   *
   * This could apply to a resource that has never existed (e.g. bad resource id),
   * or a resource that no longer exists (e.g. cache expired.)
   *
   * Note to server developers: if a request is denied for an entire class
   * of users, such as gradual feature rollout or undocumented allowlist,
   * `NOT_FOUND` may be used. If a request is denied for some users within
   * a class of users, such as user-based access control, `PERMISSION_DENIED`
   * must be used.
   *
   * HTTP Mapping: 404 Not Found
   */
  NotFound = 'NOT_FOUND',
  /**
   * The request does not have valid authentication credentials.
   *
   * This is intended to be returned only for routes that require
   * authentication.
   *
   * HTTP Mapping: 401 Unauthorized
   */
  Unauthenticated = 'UNAUTHENTICATED',
  /**
   * The caller does not have permission to execute the specified
   * operation.
   *
   * `PERMISSION_DENIED` must not be used for rejections
   * caused by exhausting some resource or quota.
   * `PERMISSION_DENIED` must not be used if the caller
   * cannot be identified (use `UNAUTHENTICATED`
   * instead for those errors).
   *
   * This error Type does not imply the
   * request is valid or the requested entity exists or satisfies
   * other pre-conditions.
   *
   * HTTP Mapping: 403 Forbidden
   */
  PermissionDenied = 'PERMISSION_DENIED',
  /**
   * Bad Request.
   *
   * There is a problem with the request.
   * Retrying the same request is not likely to succeed.
   * An example would be a query or argument that cannot be deserialized.
   *
   * HTTP Mapping: 400 Bad Request
   */
  BadRequest = 'BAD_REQUEST',
  /**
   * Currently Unavailable.
   *
   * The service is currently unavailable.  This is most likely a
   * transient condition, which can be corrected by retrying with
   * a backoff.
   *
   * HTTP Mapping: 503 Unavailable
   */
  Unavailable = 'UNAVAILABLE',
  /**
   * The operation was rejected because the system is not in a state
   * required for the operation's execution.  For example, the directory
   * to be deleted is non-empty, an rmdir operation is applied to
   * a non-directory, etc.
   *
   * Service implementers can use the following guidelines to decide
   * between `FAILED_PRECONDITION` and `UNAVAILABLE`:
   *
   * - Use `UNAVAILABLE` if the client can retry just the failing call.
   * - Use `FAILED_PRECONDITION` if the client should not retry until
   * the system state has been explicitly fixed.  E.g., if an "rmdir"
   *      fails because the directory is non-empty, `FAILED_PRECONDITION`
   * should be returned since the client should not retry unless
   * the files are deleted from the directory.
   *
   * HTTP Mapping: 400 Bad Request or 500 Internal Server Error
   */
  FailedPrecondition = 'FAILED_PRECONDITION',
}

/**  文件入参 */
export type FileInput = {
  /**  文件ID */
  fileId?: Maybe<Scalars['String']>
  /**  文件名称 */
  fileName?: Maybe<Scalars['String']>
  /**  文件url */
  fileUrl?: Maybe<Scalars['String']>
  /**  文件上传时间 */
  fileUploadTime?: Maybe<Scalars['Long']>
}

/**  文件信息体 */
export type FilePayLoad = {
  __typename?: 'FilePayLoad'
  /**  文件ID */
  fileId?: Maybe<Scalars['String']>
  /**  文件名称 */
  fileName?: Maybe<Scalars['String']>
  /**  文件url */
  fileUrl?: Maybe<Scalars['String']>
  /**  文件上传时间 */
  fileUploadTime?: Maybe<Scalars['Long']>
}

/**  冻结用户入参 */
export type FrozenUserInput = {
  /**  用户ID */
  id: Scalars['Int']
  /**  状态(1-正常,99-冻结) */
  status?: Maybe<Scalars['Int']>
}

/**  获取权限列表入参 */
export type GetPermissionInput = {
  /**  权限类型 1 后台管理 2 app 3消息,不传默认查全部 */
  menuType?: Maybe<Scalars['Int']>
}

export type HeadOther = {
  __typename?: 'HeadOther'
  key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type HeadSpec = {
  __typename?: 'HeadSpec'
  /** 选项id */
  specId?: Maybe<Scalars['Int']>
  /** 选项名称 */
  specName?: Maybe<Scalars['String']>
}

export type IFrameUrlInput = {
  /**  发货计划id */
  id?: Maybe<Scalars['Int']>
  /**  运输方式 1_陆运  2_海运 3_铁运 */
  deliveryMethod?: Maybe<Scalars['Int']>
  /**  车牌号 */
  carNo?: Maybe<Scalars['String']>
  /**  船公司代码(海运必填) */
  carrierCode?: Maybe<Scalars['String']>
  /**  提单号(海运必填) */
  billCode?: Maybe<Scalars['String']>
  /**  进口港代码(海运必填) */
  portCode?: Maybe<Scalars['String']>
}

export type ListCommodityPayLoad = {
  __typename?: 'ListCommodityPayLoad'
  /** 商品id */
  commodityId?: Maybe<Scalars['Int']>
  /** 商品名称 */
  commodityName?: Maybe<Scalars['String']>
  /** 商品类型 */
  commodityTypeId?: Maybe<Scalars['Int']>
  /** 商品类型名称 */
  commodityTypeName?: Maybe<Scalars['String']>
  /** 品类id */
  categoryId?: Maybe<Scalars['Int']>
  /** 品类名称 */
  categoryName?: Maybe<Scalars['String']>
  /** 品种id */
  varietyId?: Maybe<Scalars['Int']>
  /** 品种名称 */
  varietyName?: Maybe<Scalars['String']>
  /** 产地id */
  originId?: Maybe<Scalars['Int']>
  /** 产地名称 */
  originName?: Maybe<Scalars['String']>
  /** sku数量 */
  skuQuantity?: Maybe<Scalars['Int']>
  /** 状态 */
  status?: Maybe<Scalars['Int']>
}

/** 添加商品 */
export type ListCreateCommodityInput = {
  createCommodityInput: Array<Maybe<CreateCommodityInput>>
}

export type ListSku = {
  __typename?: 'ListSku'
  /** sku Id */
  commoditySkuId?: Maybe<Scalars['Int']>
  /** 规格选项 */
  skuOption?: Maybe<Array<Maybe<SkuOption>>>
  /** 状态 */
  status?: Maybe<Scalars['Int']>
}

/**  登陆入参 */
export type LoginInput = {
  /**  账号 */
  userAccount: Scalars['String']
  /**  密码 */
  password: Scalars['String']
}

/**  登陆返回体 */
export type LoginPayload = {
  __typename?: 'LoginPayload'
  /**  是否需要更新密码 */
  needUpdatePassword?: Maybe<Scalars['Boolean']>
  /**  token */
  token?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  /**  新增柜次规则 */
  createProductRule?: Maybe<Scalars['Boolean']>
  /**  新增柜次规则 */
  updateProductRule?: Maybe<Scalars['Boolean']>
  /**  柜次启用禁用 */
  changeProductRuleStatus?: Maybe<Scalars['Boolean']>
  /**  校验柜次规则名称 */
  checkProductRule?: Maybe<Scalars['Boolean']>
  /**  新增口岸 */
  createPort?: Maybe<Scalars['Boolean']>
  /**  编辑口岸 */
  updatePort?: Maybe<Scalars['Boolean']>
  /**  修改口岸状态 */
  changePortStatus?: Maybe<Scalars['Boolean']>
  /**  新增黑名单信息 */
  saveBlacklist?: Maybe<Scalars['Boolean']>
  /**  编辑黑名单信息 */
  editBlacklist?: Maybe<Scalars['Boolean']>
  /**  移除黑名单信息 */
  deleteBlacklist?: Maybe<Scalars['Boolean']>
  /** 添加商品 */
  createCommodity?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** 商品状态变更 */
  updateCommodityStatus?: Maybe<Array<Maybe<Scalars['Int']>>>
  createCategory?: Maybe<Scalars['Boolean']>
  editCategoryEnable?: Maybe<Scalars['Boolean']>
  /** 添加sku */
  createCommoditySku?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** 编辑sku状态 */
  updateSkuStatus?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** 批量修改SKU */
  updateBatchInfo?: Maybe<Array<Maybe<Scalars['Int']>>>
  /** 批量修改SKU状态 */
  updateBatchStatus?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  同步用户客户端类型 */
  postAppPlatform?: Maybe<Scalars['Boolean']>
  /**  创建客户 */
  createCustomer?: Maybe<Scalars['Boolean']>
  /**  编辑客户 */
  updateCustomer?: Maybe<Scalars['Boolean']>
  /**  修改客户状态 */
  changeStatus?: Maybe<Scalars['Boolean']>
  /**  创建仓库 */
  createDepository?: Maybe<Scalars['Boolean']>
  /**  编辑仓库 */
  updateDepository?: Maybe<Scalars['Boolean']>
  /**  更改仓库状态 */
  changeDepositoryStatus?: Maybe<Scalars['Boolean']>
  /**  删除资源 */
  deleteResource?: Maybe<Scalars['Boolean']>
  /**  创建资源信息 */
  createResource?: Maybe<Scalars['Boolean']>
  /**  资源信息上下架 */
  changeResourceStatus?: Maybe<Scalars['Boolean']>
  /**  用户登陆 */
  login?: Maybe<LoginPayload>
  /**  刷新token */
  refreshToken?: Maybe<Scalars['String']>
  /**  添加角色 */
  createRole?: Maybe<Scalars['Boolean']>
  /**  重置密码 */
  resetPassword?: Maybe<Scalars['Boolean']>
  /**  修改密码 */
  updatePassword?: Maybe<Scalars['Boolean']>
  /**  添加用户 */
  createUser?: Maybe<Scalars['Boolean']>
  /**  修改用户 */
  updateUser?: Maybe<Scalars['Boolean']>
  /**  冻结用户 */
  frozenUser?: Maybe<Scalars['Boolean']>
}

export type MutationCreateProductRuleArgs = {
  input?: Maybe<CreateProductRuleInput>
}

export type MutationUpdateProductRuleArgs = {
  input?: Maybe<UpdateProductRuleInput>
}

export type MutationChangeProductRuleStatusArgs = {
  input?: Maybe<Scalars['Int']>
}

export type MutationCheckProductRuleArgs = {
  input?: Maybe<CheckProductRuleInput>
}

export type MutationCreatePortArgs = {
  input?: Maybe<CreatePortInput>
}

export type MutationUpdatePortArgs = {
  input?: Maybe<UpdatePortInput>
}

export type MutationChangePortStatusArgs = {
  input?: Maybe<ChangePortStatusInput>
}

export type MutationSaveBlacklistArgs = {
  input?: Maybe<BlacklistCreateInput>
}

export type MutationEditBlacklistArgs = {
  input?: Maybe<BlacklistEditInput>
}

export type MutationDeleteBlacklistArgs = {
  input?: Maybe<BlacklistDeleteInput>
}

export type MutationCreateCommodityArgs = {
  createCommodityInput?: Maybe<ListCreateCommodityInput>
}

export type MutationUpdateCommodityStatusArgs = {
  updateCommodityStatusInput?: Maybe<UpdateCommodityStatusInput>
}

export type MutationCreateCategoryArgs = {
  input?: Maybe<CategoryCreateInput>
}

export type MutationEditCategoryEnableArgs = {
  input?: Maybe<CategoryEditEnableInput>
}

export type MutationCreateCommoditySkuArgs = {
  commoditySkuId?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type MutationUpdateSkuStatusArgs = {
  updateStatusInput?: Maybe<UpdateStatusInput>
}

export type MutationUpdateBatchInfoArgs = {
  input?: Maybe<CommodityUpdateBatchInput>
}

export type MutationUpdateBatchStatusArgs = {
  input?: Maybe<CommodityUpdateBatchStatusInput>
}

export type MutationPostAppPlatformArgs = {
  input?: Maybe<UserDevicePlatformInput>
}

export type MutationCreateCustomerArgs = {
  input?: Maybe<CreateCustomerInput>
}

export type MutationUpdateCustomerArgs = {
  input?: Maybe<UpdateCustomerInput>
}

export type MutationChangeStatusArgs = {
  input?: Maybe<ChangeStatusInput>
}

export type MutationCreateDepositoryArgs = {
  input?: Maybe<CreateDepositoryInput>
}

export type MutationUpdateDepositoryArgs = {
  input?: Maybe<UpdateDepositoryInput>
}

export type MutationChangeDepositoryStatusArgs = {
  input?: Maybe<DepositoryIdInput>
}

export type MutationDeleteResourceArgs = {
  input?: Maybe<Scalars['Int']>
}

export type MutationCreateResourceArgs = {
  input?: Maybe<FileInput>
}

export type MutationChangeResourceStatusArgs = {
  input?: Maybe<ChangeResourceStatusInput>
}

export type MutationLoginArgs = {
  input?: Maybe<LoginInput>
}

export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>
}

export type MutationResetPasswordArgs = {
  input?: Maybe<ResetPasswordInput>
}

export type MutationUpdatePasswordArgs = {
  input?: Maybe<UpdatePasswordInput>
}

export type MutationCreateUserArgs = {
  input?: Maybe<SaveUserInput>
}

export type MutationUpdateUserArgs = {
  input?: Maybe<SaveUserInput>
}

export type MutationFrozenUserArgs = {
  input?: Maybe<FrozenUserInput>
}

/** 未添加商品列表 */
export type NoCommodityPayload = {
  __typename?: 'NoCommodityPayload'
  /** 商品id */
  commodityId?: Maybe<Scalars['Int']>
  /** 商品名称 */
  commodityName?: Maybe<Scalars['String']>
  /** 商品类型名称 */
  commodityTypeName?: Maybe<Scalars['String']>
  /** 商品类型id */
  commodityTypeId?: Maybe<Scalars['Int']>
  /** 商品品类名称 */
  commodityCategoryName?: Maybe<Scalars['String']>
  /** 商品品种名称 */
  commodityVarietyName?: Maybe<Scalars['String']>
  /** 商品产地名称 */
  commodityPlaceOriginName?: Maybe<Scalars['String']>
  /**  商品品类ID */
  commodityCategoryId?: Maybe<Scalars['Int']>
}

/** 可选sku */
export type NotChosenSkuOption = {
  __typename?: 'NotChosenSkuOption'
  /** sku id */
  commoditySkuId?: Maybe<Scalars['Int']>
  /** 规格选项 */
  optionId?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type OrchardPayload = {
  __typename?: 'OrchardPayload'
  /**  果园编号 */
  orchardNo?: Maybe<Scalars['String']>
  /**  包装厂编号 */
  packingHouseNo?: Maybe<Scalars['String']>
}

/**  分页查询黑名单信息入参 */
export type PageBlacklistInput = {
  /**  司机手机号 */
  driverPhone?: Maybe<Scalars['String']>
  /**  司机姓名 */
  driverName?: Maybe<Scalars['String']>
  /**  车牌号 */
  carNo?: Maybe<Scalars['String']>
  pageCurrent?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
}

/**  分页查询黑名单信息返回信息 */
export type PageBlacklistPagePayload = {
  __typename?: 'PageBlacklistPagePayload'
  records?: Maybe<Array<Maybe<PageBlacklistPayload>>>
  pageCurrent?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  totalRecords?: Maybe<Scalars['Int']>
}

/**  分页查询黑名单信息返回信息 */
export type PageBlacklistPayload = {
  __typename?: 'PageBlacklistPayload'
  /**  黑名单ID */
  id?: Maybe<Scalars['Int']>
  /**  黑名单类型 */
  blacklistType?: Maybe<Scalars['String']>
  /**  黑名单类型描述 */
  blacklistTypeDesc?: Maybe<Scalars['String']>
  /**  车牌号 */
  carNo?: Maybe<Scalars['String']>
  /**  司机手机号 */
  driverPhone?: Maybe<Scalars['String']>
  /**  司机姓名 */
  driverName?: Maybe<Scalars['String']>
  /**  拉黑原因 */
  blackReason?: Maybe<Scalars['String']>
  /**  加入黑名单时间 */
  blackTime?: Maybe<Scalars['Long']>
}

/**  分页查询商品品类入参 */
export type PageCategoryInput = {
  /**  品类名称 */
  name?: Maybe<Scalars['String']>
  /**  启用状态 1 启用 99 禁用 */
  enabled?: Maybe<Scalars['Int']>
  pageCurrent?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
}

/**  分页查询品类返回信息 */
export type PageCategoryListPayload = {
  __typename?: 'PageCategoryListPayload'
  /**  品类ID */
  id?: Maybe<Scalars['Int']>
  /**  品类名称 */
  name?: Maybe<Scalars['String']>
  /**  商品类型ID */
  typeId?: Maybe<Scalars['Int']>
  /**  商品类型名称 */
  typeName?: Maybe<Scalars['String']>
  /**  状态 1 启用 99 禁用 */
  enable?: Maybe<Scalars['Int']>
  /**  多语言 */
  nameLocale?: Maybe<Scalars['String']>
  /**  文件 */
  img?: Maybe<FilePayLoad>
}

/**  分页查询黑名单信息返回信息 */
export type PageCategoryPagePayload = {
  __typename?: 'PageCategoryPagePayload'
  records?: Maybe<Array<Maybe<PageCategoryListPayload>>>
  pageCurrent?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  totalRecords?: Maybe<Scalars['Int']>
}

/** 商品管理列表 */
export type PageCommodityInput = {
  /** 商品类型 */
  typeId?: Maybe<Scalars['Int']>
  /** 品类id */
  categoryId?: Maybe<Scalars['Int']>
  /** spu名称 */
  commodityName?: Maybe<Scalars['String']>
  pageCurrent?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
}

/**  分页商品返回信息 */
export type PageCommodityPayload = {
  __typename?: 'PageCommodityPayload'
  pageCurrent?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  totalRecords?: Maybe<Scalars['Long']>
  records?: Maybe<Array<Maybe<ListCommodityPayLoad>>>
}

export type PageCustomerDepositoryPayload = {
  __typename?: 'PageCustomerDepositoryPayload'
  /**  分页数据 */
  records?: Maybe<Array<Maybe<CustomerDepositoryPayload>>>
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
  /**  总条数 */
  totalRecords?: Maybe<Scalars['Int']>
}

export type PageCustomerInput = {
  /**  客户名称 */
  name?: Maybe<Scalars['String']>
  /**  服务区域名称 */
  departName?: Maybe<Scalars['String']>
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
}

export type PageCustomerPayload = {
  __typename?: 'PageCustomerPayload'
  /**  分页数据 */
  records?: Maybe<Array<Maybe<CustomerPayload>>>
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
  /**  总条数 */
  totalRecords?: Maybe<Scalars['Int']>
}

/** 未添加商品列表 */
export type PageNoCommodityInput = {
  /** 商品类型 */
  typeId?: Maybe<Scalars['Int']>
  /** 品类 */
  categoryId?: Maybe<Scalars['Int']>
  /** 品种 */
  varietyId?: Maybe<Scalars['Int']>
  /** 产地 */
  originId?: Maybe<Scalars['Int']>
  pageCurrent?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
}

/** 未添加商品类表返回信息 */
export type PageNoCommodityPayload = {
  __typename?: 'PageNoCommodityPayload'
  pageCurrent?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  totalRecords?: Maybe<Scalars['Long']>
  records?: Maybe<Array<Maybe<NoCommodityPayload>>>
}

export type PagePortInput = {
  /**  客户名称 */
  name?: Maybe<Scalars['String']>
  /**  国家(1 中国 2 越南 3 泰国) */
  country?: Maybe<Scalars['Int']>
  /**  口岸运输方式(1 陆运 2 海运 3 海铁) */
  transportMode?: Maybe<Scalars['Int']>
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
}

export type PagePortPayload = {
  __typename?: 'PagePortPayload'
  /**  分页数据 */
  records?: Maybe<Array<Maybe<PortPayload>>>
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
  /**  总条数 */
  totalRecords?: Maybe<Scalars['Int']>
}

export type PageProductRuleInput = {
  /**  商品品类ID */
  productId: Scalars['Int']
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
}

export type PageProductRulePayload = {
  __typename?: 'PageProductRulePayload'
  /**  分页数据 */
  records?: Maybe<Array<Maybe<ProductRulePayload>>>
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
  /**  总条数 */
  totalRecords?: Maybe<Scalars['Int']>
}

export type PageResourceInput = {
  /**  资料名称 */
  name?: Maybe<Scalars['String']>
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
}

export type PageResourcePayload = {
  __typename?: 'PageResourcePayload'
  /**  分页数据 */
  records?: Maybe<Array<Maybe<ResourcePayload>>>
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
  /**  总条数 */
  totalRecords?: Maybe<Scalars['Int']>
}

export type PageRoleInput = {
  /**  状态（1：正常 99：禁用） */
  status?: Maybe<Scalars['Int']>
  /**  角色名 */
  roleName?: Maybe<Scalars['String']>
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
}

export type PageRolePayload = {
  __typename?: 'PageRolePayload'
  /**  分页数据 */
  records?: Maybe<Array<Maybe<RolePayload>>>
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
  /**  总条数 */
  totalRecords?: Maybe<Scalars['Int']>
}

/** sku列表 */
export type PageSkuInput = {
  /** 商品id */
  commodityId?: Maybe<Scalars['Int']>
  /** 规格筛选 */
  skuCondition?: Maybe<Array<Maybe<SkuCondition>>>
  pageCurrent?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
}

export type PageSkuPayload = {
  __typename?: 'PageSkuPayload'
  pageCurrent?: Maybe<Scalars['Int']>
  pageSize?: Maybe<Scalars['Int']>
  totalRecords?: Maybe<Scalars['Long']>
  records?: Maybe<Array<Maybe<ListSku>>>
}

/**  分页查询用户入参 */
export type PageUserInput = {
  /**  登陆账号 */
  userAccount?: Maybe<Scalars['String']>
  /**  姓名 */
  userName?: Maybe<Scalars['String']>
  /**  状态(1-正常,99-冻结) */
  status?: Maybe<Scalars['Int']>
  /**  角色ID */
  roleId?: Maybe<Scalars['Int']>
  /**  部门IDS */
  departIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
}

/**  分页查询用户返回体 */
export type PageUserPayload = {
  __typename?: 'PageUserPayload'
  /**  分页数据 */
  records?: Maybe<Array<Maybe<UserPayload>>>
  /**  当前页码 */
  pageCurrent?: Maybe<Scalars['Int']>
  /**  分页条数 */
  pageSize?: Maybe<Scalars['Int']>
  /**  总条数 */
  totalRecords?: Maybe<Scalars['Int']>
}

export type PortDetailPayload = {
  __typename?: 'PortDetailPayload'
  /**  主键 */
  id?: Maybe<Scalars['Int']>
  /**  名称 */
  name?: Maybe<Scalars['String']>
  /**  名称 多语言 */
  nameLocale?: Maybe<Scalars['String']>
  /**  所属国家 */
  country?: Maybe<Scalars['Int']>
  /**  所属公司 */
  subCompany?: Maybe<Scalars['Int']>
  /**  所属公司类型 1-总部，2-海外分公司 */
  subCompanyType?: Maybe<Scalars['Int']>
  /**  口岸编号 */
  code?: Maybe<Scalars['String']>
  /**  口岸运输方式(1陆运 2海运 3海铁) */
  transportMode?: Maybe<Scalars['Int']>
  /**  口岸类型(1-到达口岸，2-报关口岸) */
  portType?: Maybe<Scalars['String']>
  /**  报关口岸id数组 */
  declarePortIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  运输公司id数组 */
  transportCompanyIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  报关公司id数组 */
  declareCompanyIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  堆场id数组 */
  storageYardIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  地址 */
  address?: Maybe<Scalars['String']>
  /**  状态 */
  status?: Maybe<Scalars['Int']>
}

export type PortPayload = {
  __typename?: 'PortPayload'
  /**  主键id */
  id?: Maybe<Scalars['Int']>
  /**  名称 */
  name?: Maybe<Scalars['String']>
  /**  国家 */
  country?: Maybe<Scalars['String']>
  /**  口岸运输方式 */
  transportMode?: Maybe<Scalars['String']>
  /**  报关口岸 */
  declarePort?: Maybe<Scalars['String']>
  /**  状态 0 禁用 1 开启 */
  status?: Maybe<Scalars['Int']>
}

export type ProductRuleOptionInput = {
  /**  商品品类ID */
  productId?: Maybe<Scalars['Int']>
  /**  0：查询全部 1：只查询生效的，默认查询全部 */
  enabled?: Maybe<Scalars['Int']>
}

export type ProductRulePayload = {
  __typename?: 'ProductRulePayload'
  /**  柜次规则ID */
  id?: Maybe<Scalars['Int']>
  /**  柜次规则名称 */
  name?: Maybe<Scalars['String']>
  /**  多语言 */
  nameLocale?: Maybe<Scalars['String']>
  /**  柜次规则编码 */
  code?: Maybe<Scalars['String']>
  /**  月偏移量 */
  monthOffset?: Maybe<Scalars['Int']>
  /**  状态 1 启用  99 禁用 */
  enabled?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  /**  分页查询柜次规则 */
  pageProductRule?: Maybe<PageProductRulePayload>
  /**  根据ID查询柜次规则详情 */
  getProductRuleDetail?: Maybe<ProductRulePayload>
  /**  柜次规则下拉选项 */
  productRuleOption?: Maybe<Array<Maybe<SelectOption>>>
  /**  分页查询口岸 */
  pagePort?: Maybe<PagePortPayload>
  /**  口岸下拉选择列表 */
  portSelectOption?: Maybe<Array<Maybe<SelectOption>>>
  /**  根据id获取口岸详情 */
  getPortDetail?: Maybe<PortDetailPayload>
  /**  进口港下拉列表 */
  entryPortOption?: Maybe<Array<Maybe<SelectOption>>>
  /**  报关口岸下拉列表 */
  declarePortOption?: Maybe<Array<Maybe<SelectOption>>>
  /**  出口港下拉列表 */
  exportPortOption?: Maybe<Array<Maybe<SelectOption>>>
  /**  口岸运输公司下拉列表 */
  transportCompanyOption?: Maybe<Array<Maybe<SelectOption>>>
  /**  分页查询黑名单信息 */
  pageBlacklist?: Maybe<PageBlacklistPagePayload>
  /**  黑名单信息校验 true为可用 false为不可用 */
  checkBlacklist?: Maybe<Scalars['Boolean']>
  /**  校验司机信息 true为可用 false为不可用 */
  checkDriverInfo?: Maybe<Scalars['Boolean']>
  /** 商品管理列表 */
  pageCommodityManage?: Maybe<PageCommodityPayload>
  /** 工厂下商品下拉 */
  factoryListOptions?: Maybe<Array<Maybe<SelectOption>>>
  /** 商品品种下拉列表 */
  varietyOption?: Maybe<Array<Maybe<SelectOption>>>
  /** 商品产地下拉列表 */
  originOption?: Maybe<Array<Maybe<SelectOption>>>
  /** 商品下拉 */
  commodityOption?: Maybe<Array<Maybe<SelectOption>>>
  /** 未添加商品列表 */
  pageNoCommodity?: Maybe<PageNoCommodityPayload>
  /** 商品详情 */
  queryDetailInfo?: Maybe<CommodityDetailPayload>
  /**  分页查询品类信息 */
  queryPageList?: Maybe<PageCategoryPagePayload>
  /**  查询未添加品类信息 */
  queryNotAdded?: Maybe<Array<Maybe<SelectOption>>>
  /**  品类下拉 */
  querySelectList?: Maybe<Array<Maybe<SelectOption>>>
  /**  品类类型下拉 */
  queryTypeSelectList?: Maybe<Array<Maybe<SelectOption>>>
  /**  根据sku选项检查是否有已生成sku,如果已生成返回sku信息 */
  checkSku?: Maybe<CommoditySkuInfoPayload>
  /**  根据sku选项检查是否有已生成sku,如果已生成返回sku信息 */
  commoditySkuDetail?: Maybe<CommoditySkuInfoPayload>
  /** sku列表 */
  pageSku?: Maybe<PageSkuPayload>
  /** 未选择sku选项id集合 */
  notChosenSkuOption?: Maybe<Array<Maybe<NotChosenSkuOption>>>
  /**  查询当前最新 APP 版本信息。platform 需要传：ANDROID 或 IOS 以查询特定的 APP 版本 */
  getVersion?: Maybe<AppDevicePayload>
  /**  APP 错误日志记录 */
  appError?: Maybe<Scalars['Int']>
  /**  APP 资料文件 */
  getAppData?: Maybe<Array<Maybe<FilePayLoad>>>
  /**  APP 获取操作手册 OPERATION_MANUAL_RECEIVER_SOP(销地收货)/OPERATION_MANUAL_RETURN_CAR(还箱) */
  operationManual?: Maybe<Scalars['String']>
  /**  获取文件的果园信息 */
  getOrchardInfo?: Maybe<Array<Maybe<OrchardPayload>>>
  /**  获取鲸准网内嵌iFrame路径 */
  getIFrameUrl?: Maybe<Scalars['String']>
  /**  所属国际下拉列表 */
  countrySelectOption?: Maybe<Array<Maybe<SelectOption>>>
  /**  口岸运输方式下拉列表 */
  transportModeSelectOption?: Maybe<Array<Maybe<SelectOption>>>
  /**  收货方类型下拉列表 */
  receiverTypeSelectOption?: Maybe<Array<Maybe<SelectOption>>>
  /**  货币类型下拉列表 */
  currencySelectOption?: Maybe<Array<Maybe<SelectTextOption>>>
  /**  客户关联组织下拉列表 */
  customerOrgSelectList?: Maybe<Array<Maybe<SelectOption>>>
  /**  客户关联仓库下拉列表 */
  customerDepositorySelectList?: Maybe<Array<Maybe<SelectOption>>>
  /**  客户信息分页查询 */
  pageCustomer?: Maybe<PageCustomerPayload>
  /**  根据id查询客户详情 */
  getCustomerDetail?: Maybe<CustomerDetailPayload>
  /**  分页查询客户仓库 */
  pageCustomerDepository?: Maybe<PageCustomerDepositoryPayload>
  /**  校验名称 */
  checkDepositoryName?: Maybe<Scalars['Boolean']>
  /**  资源信息分页查询 */
  pageResource?: Maybe<PageResourcePayload>
  /**  分页查询角色列表 */
  pageRole?: Maybe<RolePayload>
  /**  获取权限列表 */
  getPermission?: Maybe<Array<Maybe<Scalars['String']>>>
  /**  分页获取用户 */
  pageUser?: Maybe<PageUserPayload>
  /**  查询用户根据ID,不传ID默认查询当前用户 */
  getUser?: Maybe<UserPayload>
  /**  根据关键词搜索用户 */
  searchUser?: Maybe<Array<Maybe<UserPayload>>>
  /**  根据真实名称查询用户下拉，可能已经没用了 */
  optionsUser?: Maybe<Array<Maybe<SelectOption>>>
  _service?: Maybe<_Service>
}

export type QueryPageProductRuleArgs = {
  input?: Maybe<PageProductRuleInput>
}

export type QueryGetProductRuleDetailArgs = {
  input?: Maybe<Scalars['Int']>
}

export type QueryProductRuleOptionArgs = {
  input?: Maybe<ProductRuleOptionInput>
}

export type QueryPagePortArgs = {
  input?: Maybe<PagePortInput>
}

export type QueryGetPortDetailArgs = {
  input?: Maybe<Scalars['Int']>
}

export type QueryEntryPortOptionArgs = {
  input?: Maybe<Scalars['Int']>
}

export type QueryDeclarePortOptionArgs = {
  input?: Maybe<Scalars['Int']>
}

export type QueryExportPortOptionArgs = {
  input?: Maybe<Scalars['Int']>
}

export type QueryTransportCompanyOptionArgs = {
  input?: Maybe<Scalars['Int']>
}

export type QueryPageBlacklistArgs = {
  input?: Maybe<PageBlacklistInput>
}

export type QueryCheckBlacklistArgs = {
  input?: Maybe<BlacklistCheckInput>
}

export type QueryCheckDriverInfoArgs = {
  input?: Maybe<DriverInfoCheckInput>
}

export type QueryPageCommodityManageArgs = {
  pageCommodityInput?: Maybe<PageCommodityInput>
}

export type QueryFactoryListOptionsArgs = {
  factoryId: Scalars['Int']
}

export type QueryVarietyOptionArgs = {
  categoryId: Scalars['Int']
}

export type QueryOriginOptionArgs = {
  categoryId: Scalars['Int']
}

export type QueryCommodityOptionArgs = {
  categoryId: Scalars['Int']
}

export type QueryPageNoCommodityArgs = {
  pageNoCommodityInput?: Maybe<PageNoCommodityInput>
}

export type QueryQueryDetailInfoArgs = {
  commodityId: Scalars['Int']
}

export type QueryQueryPageListArgs = {
  input?: Maybe<PageCategoryInput>
}

export type QueryQueryNotAddedArgs = {
  input?: Maybe<CategoryNotAddedInput>
}

export type QueryQuerySelectListArgs = {
  input?: Maybe<CategorySelectInput>
}

export type QueryCheckSkuArgs = {
  skuOptionIds: Array<Scalars['Int']>
}

export type QueryCommoditySkuDetailArgs = {
  skuId: Scalars['Int']
}

export type QueryPageSkuArgs = {
  pageSku?: Maybe<PageSkuInput>
}

export type QueryNotChosenSkuOptionArgs = {
  commodityId: Scalars['Int']
}

export type QueryGetVersionArgs = {
  input?: Maybe<DevicePlatformEnum>
}

export type QueryAppErrorArgs = {
  input?: Maybe<Scalars['String']>
}

export type QueryOperationManualArgs = {
  input?: Maybe<Scalars['String']>
}

export type QueryGetOrchardInfoArgs = {
  input?: Maybe<FileInput>
}

export type QueryGetIFrameUrlArgs = {
  input?: Maybe<IFrameUrlInput>
}

export type QueryCustomerOrgSelectListArgs = {
  input?: Maybe<CustomerIdInput>
}

export type QueryCustomerDepositorySelectListArgs = {
  input?: Maybe<CustomerDepositoryInput>
}

export type QueryPageCustomerArgs = {
  input?: Maybe<PageCustomerInput>
}

export type QueryGetCustomerDetailArgs = {
  input?: Maybe<CustomerIdInput>
}

export type QueryPageCustomerDepositoryArgs = {
  input?: Maybe<CustomerIdInput>
}

export type QueryCheckDepositoryNameArgs = {
  input?: Maybe<CheckDepositoryNameInput>
}

export type QueryPageResourceArgs = {
  input?: Maybe<PageResourceInput>
}

export type QueryPageRoleArgs = {
  input?: Maybe<PageRoleInput>
}

export type QueryGetPermissionArgs = {
  input?: Maybe<GetPermissionInput>
}

export type QueryPageUserArgs = {
  input?: Maybe<PageUserInput>
}

export type QueryGetUserArgs = {
  id?: Maybe<Scalars['Int']>
}

export type QuerySearchUserArgs = {
  input?: Maybe<SearchUserInput>
}

export type QueryOptionsUserArgs = {
  realname?: Maybe<Scalars['String']>
}

/**  重置密码入参 */
export type ResetPasswordInput = {
  /**  密码 */
  password: Scalars['String']
}

export type ResourcePayload = {
  __typename?: 'ResourcePayload'
  /**  主键id */
  id?: Maybe<Scalars['Int']>
  /**  名称 */
  name?: Maybe<Scalars['String']>
  /**  资源路径 */
  fileVO?: Maybe<FilePayLoad>
  /**  状态 1_上架 99_下架 */
  status?: Maybe<Scalars['Int']>
  /**  上传时间 */
  createTime?: Maybe<Scalars['Long']>
}

export type RolePayload = {
  __typename?: 'RolePayload'
  /**  主键ID */
  id?: Maybe<Scalars['Int']>
  /**  角色名称 */
  roleName?: Maybe<Scalars['String']>
  /**  状态（1：正常 99：禁用） */
  status?: Maybe<Scalars['Int']>
  /**  是否是管理员（1：是 2：否） */
  isAdmin?: Maybe<Scalars['Int']>
}

/**  保存用户入参 */
export type SaveUserInput = {
  /**  用户ID */
  id: Scalars['Int']
  /**  角色IDs */
  roleIds: Array<Maybe<Scalars['Int']>>
  /**  组织IDs */
  departIds: Array<Maybe<Scalars['Int']>>
  /**  接收短信:(0：否，1：是) */
  receiveMsg: Scalars['Int']
}

/**  搜索用户入参 */
export type SearchUserInput = {
  /**  关键词搜索，目前支持：名称和手机号 */
  keyword?: Maybe<Scalars['String']>
}

/**  下拉信息体 */
export type SelectOption = {
  __typename?: 'SelectOption'
  /**  选项名称 */
  label?: Maybe<Scalars['String']>
  /**  选项值 */
  value?: Maybe<Scalars['Int']>
  /**  是否禁用 */
  disabled?: Maybe<Scalars['Boolean']>
  /**  子下拉项 */
  children?: Maybe<Array<Maybe<SelectOption>>>
}

/**  下拉信息体 */
export type SelectTextOption = {
  __typename?: 'SelectTextOption'
  /**  选项名称 */
  label?: Maybe<Scalars['String']>
  /**  选项值 */
  value?: Maybe<Scalars['String']>
  /**  是否禁用 */
  disabled?: Maybe<Scalars['Boolean']>
  /**  描述 */
  description?: Maybe<Scalars['String']>
  /**  子下拉项 */
  children?: Maybe<Array<Maybe<SelectTextOption>>>
}

export type SkuCondition = {
  /** 规格id */
  specId?: Maybe<Scalars['Int']>
  /** 规格选项id */
  optionId?: Maybe<Scalars['Int']>
}

export type SkuOption = {
  __typename?: 'SkuOption'
  /** 规格id */
  specId?: Maybe<Scalars['Int']>
  /** 规格选项名称 */
  optionName?: Maybe<Scalars['String']>
}

/** sku列表表头 */
export type TableHeadPayload = {
  __typename?: 'TableHeadPayload'
  spec?: Maybe<Array<Maybe<HeadSpec>>>
  other?: Maybe<Array<Maybe<HeadOther>>>
}

/** 商品状态变更 */
export type UpdateCommodityStatusInput = {
  status?: Maybe<Scalars['Int']>
  commodityId?: Maybe<Array<Maybe<Scalars['Int']>>>
}

/**  编辑客户 */
export type UpdateCustomerInput = {
  id?: Maybe<Scalars['Int']>
  /**  客户简称（中文） */
  name: Scalars['String']
  /**  客户简称（多语言） */
  nameLocal?: Maybe<Scalars['String']>
  /**  客户编码 */
  code?: Maybe<Scalars['String']>
  /**  关联区域Ids */
  departIds?: Maybe<Array<Scalars['Int']>>
  /**  收货人 */
  receiver?: Maybe<Scalars['String']>
  /**  收货地址 */
  receiveAddress?: Maybe<Scalars['String']>
  /**  收货人手机号码 */
  phone?: Maybe<Scalars['String']>
  /**  工商信息 */
  businessInfo?: Maybe<CustomerBusinessInput>
  /**  "状态 99 停用 1 启用 */
  status?: Maybe<Scalars['Int']>
}

export type UpdateDepositoryInput = {
  /**  主键ID */
  id?: Maybe<Scalars['Int']>
  /**  客户id */
  customerId?: Maybe<Scalars['Int']>
  /**  仓库名称 */
  depositoryName: Scalars['String']
  /**  联系人 */
  contacts?: Maybe<Scalars['String']>
  /**  联系电话 */
  phone?: Maybe<Scalars['String']>
  /**  地址 */
  address: Scalars['String']
  /**  启用状态 1启用 99禁用 */
  enabled?: Maybe<Scalars['Int']>
  /**  经度 */
  lng?: Maybe<Scalars['String']>
  /**  纬度 */
  lat?: Maybe<Scalars['String']>
}

/**  修改密码入参 */
export type UpdatePasswordInput = {
  /**  旧密码 */
  oldPwd?: Maybe<Scalars['String']>
  /**  新密码 */
  password?: Maybe<Scalars['String']>
}

export type UpdatePortInput = {
  /**  id */
  id?: Maybe<Scalars['Int']>
  /**  口岸简称(中文) */
  name: Scalars['String']
  /**  口岸简称(多语言) */
  nameLocale?: Maybe<Scalars['String']>
  /**  国家(1 中国 2 越南 3 泰国) */
  country: Scalars['Int']
  /**  口岸运输方式(1 陆运 2 海运 3 海铁) */
  transportMode: Scalars['Int']
  /**  报关口岸id数组 */
  declarePortIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  运输公司id数组 */
  transportCompanyIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  报关公司id数组 */
  declareCompanyIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  堆场id数组 */
  storageYardIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  口岸地址 */
  address?: Maybe<Scalars['String']>
  /**  latitude 纬度 */
  lat?: Maybe<Scalars['String']>
  /**  longitude 经度 */
  lng?: Maybe<Scalars['String']>
}

export type UpdateProductRuleInput = {
  /**  id */
  id?: Maybe<Scalars['Int']>
  /**  商品品类ID */
  productId?: Maybe<Scalars['Int']>
  /**  柜次规则名称 */
  name?: Maybe<Scalars['String']>
  /**  柜次规则名称 多语言 */
  nameLocale?: Maybe<Scalars['String']>
  /**  柜次规则编码 */
  code?: Maybe<Scalars['String']>
  /**  月偏移量 */
  monthOffset?: Maybe<Scalars['Int']>
  /**  状态 1 启用  99 禁用 */
  enabled?: Maybe<Scalars['Int']>
}

/** 编辑sku状态 */
export type UpdateStatusInput = {
  /** 状态 */
  status?: Maybe<Scalars['Int']>
  /** sku id */
  commoditySkuId?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export type UserDevicePlatformInput = {
  /**  用户id */
  userId?: Maybe<Scalars['Int']>
  /**  终端类型 */
  type?: Maybe<DevicePlatformEnum>
}

/**  用户信息体 */
export type UserPayload = {
  __typename?: 'UserPayload'
  /**  主键ID */
  id?: Maybe<Scalars['Int']>
  /**  登陆账号 */
  userAccount?: Maybe<Scalars['String']>
  /**  用户名称 */
  userName?: Maybe<Scalars['String']>
  /**  手机号 */
  phone?: Maybe<Scalars['String']>
  /**  状态(1-正常,99-冻结) */
  status?: Maybe<Scalars['Int']>
  /**  是否是管理员（1：是 2：否） */
  isAdmin?: Maybe<Scalars['Int']>
  /**  接收短信:(0：否，1：是) */
  receiveMsg?: Maybe<Scalars['Int']>
  /**  角色IDs */
  roleIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  角色名称数组 */
  roleNames?: Maybe<Array<Maybe<Scalars['String']>>>
  /**  组织IDs */
  departIds?: Maybe<Array<Maybe<Scalars['Int']>>>
  /**  组织名称数组 */
  orgNames?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type _Service = {
  __typename?: '_Service'
  sdl: Scalars['String']
}
