import Menu from './Menu';
import Nav from './Nav';

export const AppLayout = ({ children, logo = "app.png" }) => {
    return (
        <div className='flex h-screen flex-col'>
            <div className='h-20'>
                <Nav logo={logo} />
            </div>
            <div className='flex-1 flex h-full'>
                <div className='hidden pt:hidden lg:block pc:w-48 w-64 h-full'>
                    <Menu logo={logo} />
                </div>
                <div className='lg:p-12 pt:p-5 h-full flex-1 overflow-y-auto'>
                    <div className='p-5 container mx-auto'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export const ViewLayout = ({ children }) => {
    const [First, Second] = children;
    return (
        <div className='mt-10 flex lg:space-x-5 space-y-5 lg:space-y-0 flex-col lg:flex-row'>
            <div className='lg:w-1/4 w-full'>
                <Card className='bg-white p-3 rounded-lg shadow-md'>{First}</Card>
            </div>
            <div className="lg:w-3/4 w-full">
                {Second}
            </div>
        </div>
    );
}

export const TabLayout = ({ children }) => {
    const [First, Second] = children;
    return (
        <div className='mt-8 flex lg:space-x-5 lg:space-y-0 pt:space-x-0 flex-col-reverse pt:flex-col-reverse lg:flex-row'>
            <div className='lg:w-1/4 pt:w-full w-full'>
                <Card className='bg-white p-2 rounded-lg shadow-md'>{First}</Card>
            </div>
            <div className="lg:w-3/4 pt:w-full w-full">
                {Second}
            </div>
        </div>
    );
}

export const Card = ({ children, className = "", onClick = () => { } }) => {
    return <div onClick={onClick} className={`bg-white rounded-lg shadow border border-gray-100 ${className}`}>{children}</div>;
}