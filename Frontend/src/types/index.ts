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
  privilegeTree?: PrivilegeNode[]
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
  privilegeTree?: PrivilegeNode[]
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
  type: 'menu' | 'request' | 'route'
  requestMethod: 'all' | 'delete' | 'get' | 'post' | 'put' | null
  privilegeUrl: string | null
  parentId: number | null
  level: 1 | 2 | 3
}

export interface PrivilegeNode extends Privilege {
  children?: PrivilegeNode[]
}
