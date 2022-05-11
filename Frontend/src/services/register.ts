import * as Request from '../utils/request'
import type { AccountRegisterData, EmailRegisterData } from '../pages/Register'
import type { ResponseData } from './types'


export const sendVerificationEmail = async (data: { email: string }): Promise<ResponseData> => Request.get<ResponseData>('/verify-email', data)

export const registerUser = async (data: AccountRegisterData | EmailRegisterData): Promise<ResponseData> => Request.post<ResponseData>('/register', data)
