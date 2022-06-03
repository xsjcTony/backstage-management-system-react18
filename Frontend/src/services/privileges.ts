import * as Request from '@/utils/request'
import type { ResponseData } from './types'
import type { PrivilegeQueryData } from '@/pages/Admin/Privileges'
import type { PrivilegeQueryResponse } from '@/types'


export const getPrivilegesByQuery = async (data: PrivilegeQueryData): Promise<ResponseData<PrivilegeQueryResponse>> => Request.get<ResponseData<PrivilegeQueryResponse>>(`/api/v1/privileges`, data)
