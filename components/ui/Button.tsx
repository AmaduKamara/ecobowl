import { HTMLAttributes, ReactNode } from "react"
import { Spinner, SpinnerAlt } from "./Spinner";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    type?: "button" | "submit" | "reset" | undefined;
    loading?: boolean;
    outline?: boolean;
}

export const AppButton = ({ children, className, onClick, style, type = "button", loading = false, outline = false }: Props) => {

    let btnStyle = "";

    if (outline) btnStyle = "border-gray-300";
    else btnStyle = "bg-gradient-to-r from-blue-400 to-blue-500 text-white border-blue-400";

    if (loading && outline) btnStyle += "cursor-not-allowed border-gray-400";
    if (loading && !outline) btnStyle += "from-blue-300 to-blue-400 cursor-not-allowed text-white border-blue-300";

    return <button onClick={onClick} style={style} type={type} className={`border rounded-md flex items-center justify-center ${className} ${btnStyle} text-base px-4 py-2`}>
        {loading ? outline ? <SpinnerAlt className="w-6 h-6 mr-1" /> : <Spinner className="w-6 h-6 mr-1" /> : null}{children}
    </button>
}