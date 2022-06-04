import * as Request from '@/utils/request'
import type { ResponseData } from './types'
import type { PrivilegeQueryData } from '@/pages/Admin/Privileges'
import type { Privilege, PrivilegeQueryResponse } from '@/types'
import type { AddPrivilegeData } from '@/pages/Admin/Privileges/components/AddPrivilegeModalForm'


export const getPrivilegesByQuery = async (data: PrivilegeQueryData): Promise<ResponseData<PrivilegeQueryResponse>> => Request.get<ResponseData<PrivilegeQueryResponse>>(`/api/v1/privileges`, data)

export const updatePrivilegeState = async (id: number, privilegeState: boolean): Promise<ResponseData<Privilege>> => Request.put<ResponseData<Privilege>>(`/api/v1/privileges/${id}`, { privilegeState })

export const deletePrivilege = async (id: number): Promise<ResponseData<Privilege>> => Request.deleteRequest<ResponseData<Privilege>>(`/api/v1/privileges/${id}`)

export const addPrivilege = async (data: AddPrivilegeData): Promise<ResponseData> => Request.post<ResponseData>('/api/v1/privileges', data)
