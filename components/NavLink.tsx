import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { menuStore } from "../redux/menu/selector";

export const NavLink = ({ children, to }) => {
    const { pathname } = useRouter();
    const subRoute = pathname.split("/")[1];

    const menu = useSelector((state: any) => menuStore(state));

    const active = "bg-gradient-to-r from-blue-400 to-blue-500 rounded-md text-white";

    const isActive = () => {
        const hasId = pathname.indexOf("[id]") !== -1;

        if (hasId && pathname.indexOf(to) !== -1 && to !== "/") return true;
        if (to !== "/" && pathname.startsWith(to)) return true;
        if (to === pathname) return true;
        return false;
    }

    return (
        <Link href={to}>
            <div className={`${isActive() ? active : ''} px-4 md:px-3 lg:px-4 space-x-4 py-3 flex mb-3 text-sm cursor-pointer`}>
                {children}
            </div>
        </Link>
    )
}

export const ButtonMenu = ({ children, onClick }) => {
    const { pathname } = useRouter();

    const menu = useSelector((state: any) => menuStore(state));

    return (
        <div onClick={onClick} className={`${menu.state ? 'px-4 space-x-4 py-3' : 'px-2 space-x-0 justify-center py-3'} flex mb-3 text-sm cursor-pointer`}>
            {children}
        </div>
    )
}