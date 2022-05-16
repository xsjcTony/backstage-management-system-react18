import * as Request from '../utils/request'
import type { OAuthRegisterData } from '../pages/OAuth/Github'
import type { UserWithJWT } from '../types'
import type { ResponseData } from './types'


export const bindAccount = async (data: OAuthRegisterData): Promise<ResponseData<UserWithJWT>> => Request.post<ResponseData<UserWithJWT>>('/oauth/bind', data)
