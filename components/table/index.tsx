import { useState } from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { Card } from "../AppLayout";
import { SpinnerAlt } from "../ui/Spinner";

export const PhoneRow = ({ children }) => {
    const [state, setState] = useState(false);

    const [first, second, footer] = children;

    return <div>
        <div onClick={() => setState(!state)} className="flex space-x-2 p-2 border-b py-2.5 text-sm items-center">
            <div className="flex justify-center text-center">
                <button type="button" className="text-lg text-blue-500">
                    {!state ? <CiCirclePlus className="text-xl" /> : <CiCircleMinus className="text-xl" />}
                </button>
            </div>
            {
                first
            }
        </div>
        {
            state ? second : null
        }
        {
            footer
        }
    </div>
}

export const PhoneDetails = ({ children, className = "" }) => {
    const [header, body, footer] = children;

    return <div className="p-2 w-full md:w-1/2">
        <Card className={`p-2 ${className}`}>
            <div className="py-1">
                {header}
            </div>
            <div className="border-y bg-gray-50">
                {body}
            </div>
            <div className="py-2">
                {footer}
            </div>
        </Card>
    </div>
}

export const preparePages = (page, perPage, items = []) => {
    let start = ((page - 1) * perPage);
    let end = start + perPage;
    return items.slice(start, end);
}


export const Loading = () => {
    return <div className="h-96 flex items-center justify-center">
        <SpinnerAlt className="w-10 h-10" />
    </div>
}