export type Role = {
    id: string
    name: string
    description: string
    permissions: Array<any>
}

export const newRole: Role = {
    id: "",
    name: "",
    description: "",
    permissions: []
}

export type RoleProps = {
    data: Array<Role>
    success: boolean
}