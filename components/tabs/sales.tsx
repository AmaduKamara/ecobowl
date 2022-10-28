export const Customer = ({ data }) => {
    return (
        <div className="bg-white flex flex-wrap shadow py-3">
            <div className="w-1/2 flex justify-between px-5 py-2">
                <p className="text-gray-400">Given Names:</p>
                <p>{data.givenNames}</p>
            </div>
            <div className="w-1/2 flex justify-between px-5 py-2">
                <p className="text-gray-400">Family Name:</p>
                <p>{data.familyName}</p>
            </div>
            <div className="w-1/2 flex justify-between px-5 py-2">
                <p className="text-gray-400">Gender:</p>
                <p>{data.gender}</p>
            </div>
            <div className="w-1/2 flex justify-between px-5 py-2">
                <p className="text-gray-400">Company:</p>
                <p>{data.company}</p>
            </div>
            <div className="w-1/2 flex justify-between px-5 py-2">
                <p className="text-gray-400">Address:</p>
                <p>{data.address}</p>
            </div>
            <div className="w-1/2 flex justify-between px-5 py-2">
                <p className="text-gray-400">Phone:</p>
                <p>{data.phone}</p>
            </div>
            <div className="w-1/2 flex justify-between px-5 py-2">
                <p className="text-gray-400">Email:</p>
                <p>{data.email}</p>
            </div>
        </div>
    )
}