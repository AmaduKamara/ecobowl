import { Badge } from "antd"

export const Name = (row) => {
    return <p>{row.firstName} {row.lastName}</p>
}

export const Role = ({name}) => {
    return <p>{name}</p>
}

export const Status = (status) => {
    const type = status === "Active" ? 'success' : status === "In Active" ? "error" : status === "Unverified" ? 'default' : status === "Password Pending" ? 'processing' : 'warning';
    return <Badge status={type} text={status} />
}