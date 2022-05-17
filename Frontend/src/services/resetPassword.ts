import * as Request from '../utils/request'
import type { ResetPasswordData } from '../pages/resetPassword/Reset'
import type { VerifyEmailData } from '../pages/resetPassword/Verify'
import type { ResponseData } from './types'


export const verifyEmail = async (data: VerifyEmailData): Promise<ResponseData> => Request.post<ResponseData>('/reset-password/verify-email', data)

export const resetPassword = async (data: ResetPasswordData): Promise<ResponseData> => Request.put<ResponseData>('/reset-password/reset', data)
