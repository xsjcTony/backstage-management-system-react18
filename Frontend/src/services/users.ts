import * as Request from '../utils/request'
import type { UserQueryData } from '../pages/Admin/Users'
import type { User, UserQueryResponse } from '../types'
import type { ResponseData } from './types'


export const getUserById = async (id: number): Promise<ResponseData<User>> => Request.get<ResponseData<User>>(`/api/v1/users/${id}`)

export const getUsersByQuery = async (data: UserQueryData): Promise<ResponseData<UserQueryResponse>> => Request.get<ResponseData<UserQueryResponse>>(`/api/v1/users`, data)
