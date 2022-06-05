/**
 * User
 */
export interface User {
  id: number
  username: string | null
  email: string | null
  github: boolean
  userState: boolean
  avatarUrl: string
  roles: Role[]
  privilegeTree?: Privilege[]
}

export type UserWithJWT = User & { token: string }

export interface UserQueryResponse {
  rows: User[]
  count: number
}

/**
 * Role
 */
export interface Role {
  id: number
  roleName: string
  roleDescription: string
  roleState: boolean
  privileges: Privilege[]
  privilegeTree?: Privilege[]
}

export interface RoleQueryResponse {
  rows: Role[]
  count: number
}


/**
 * Privilege
 */
export interface Privilege {
  id: number
  privilegeName: string
  privilegeDescription: string
  privilegeState: boolean
  requestMethod: 'delete' | 'get' | 'post' | 'put' | null
  privilegeUrl: string | null
  parentId: number
  level: 1 | 2
  children?: Privilege[]
}

export interface PrivilegeQueryResponse {
  rows: Privilege[]
  count: number
}
