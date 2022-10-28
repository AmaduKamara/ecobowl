export const GlobalLoad = () => {
    return (
        <div className="flex items-center z-index justify-center  bg-gradient-to-r from-blue-400 to-blue-500 fixed w-full h-screen top-0 left-0">
            <div className="cubeLoader">
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
            </div>
        </div>
    )
}

export const RouteLoader = ({ loading }) => {
    return (
        <div className={` bg-gradient-to-r from-blue-400 to-blue-500 items-center z-index justify-center fixed w-full h-screen top-0 left-0 ${loading ? 'flex' : 'hidden'}`}>
            <div className="cubeLoader">
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
                <div className="cube"></div>
            </div>
        </div>
    )
}