import User from "../pages/user"
import { newRole, Role } from "./role"

export type User = {
    id: string
    firstName: string
    lastName: string
    phone: string
    status: string
    email?: string
    basePassword: string
    role: Role
}

export const newUser: User = {
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    status: "",
    email: "",
    basePassword: "",
    role: newRole
}

export type UserProps = {
    data: Array<User>
    success: boolean
}