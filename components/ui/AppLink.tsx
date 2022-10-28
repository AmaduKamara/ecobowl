import Link from "next/link"

export const AppLink = ({ href, children }) => {
    return (
        <Link href={href}>
            <a>
                {children}
            </a>
        </Link>
    )
}

export const BreadCrumb = ({ href, children }) => {
    return (
        <AppLink href={href}>{children}</AppLink>
    )
}