import * as Request from '@/utils/request'
import type { ResponseData } from './types'
import type { AccountLoginData, EmailLoginData } from '@/pages/Login'
import type { UserWithJWT } from '@/types'


export const loginUser = async (data: AccountLoginData | EmailLoginData): Promise<ResponseData<UserWithJWT>> => Request.post<ResponseData<UserWithJWT>>('/login', data)

export const isLoggedIn = async (): Promise<ResponseData> => Request.get<ResponseData>('/is-logged-in')
