import * as Request from '../utils/request'
import type { User } from '../types'
import type { ResponseData } from './types'


export const getUserById = async (id: number): Promise<ResponseData<User>> => Request.get(`/api/v1/users/${id}`)
