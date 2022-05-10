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

export interface Role {
  id: number
  roleName: string
  roleDescription: string
  roleState: boolean
  privileges: Privilege[]
  privilegeTree?: PrivilegeNode[]
}

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
