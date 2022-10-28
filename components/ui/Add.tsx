import { useRouter } from "next/router";
import { BiPlus } from "react-icons/bi";
import { usePageTitle } from "../../hooks/usePageTitle"

export const Add = () => {
    const page = usePageTitle();
    const route = useRouter();

    const add = () => {
        route.push(`${page.path}/new`)
    }

    return <button onClick={add} className="flex items-center space-x-1 text-sm button bg-gray-50 px-3 rounded hover:text-blue-500 hover:shadow-sm active:shadow"><BiPlus className="text-lg" /><span> New {page.title}</span></button>
}