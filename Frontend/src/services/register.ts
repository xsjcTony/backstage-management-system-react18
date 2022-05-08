import * as Request from '../utils/request'
import type { ResponseData } from './types'


export const sendVerificationEmail = async (data: { email: string }): Promise<ResponseData> => Request.get<ResponseData>('/verify-email', data)
