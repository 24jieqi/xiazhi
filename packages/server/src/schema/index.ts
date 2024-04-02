import './user/index'
import './posts/index'
import './app/index'
import './entry/index'

import { builder } from '../builder'

export const schema = builder.toSchema()
