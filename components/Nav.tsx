import { useAuth } from "../contexts/auth";
import { CgLogOff } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import Profile from "./drawer/profile";
import { HiOutlineMenu } from "react-icons/hi";
import { Menu } from "./drawer/menu";

import Image from 'next/image'
const ecobowlLogo = "/ecobowl-logo.png"

const Nav = ({ logo = "app.png" }) => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(false);
    const [menu, setMenu] = useState(false);

    const { app } = useAuth();

    const onClose = () => {
        setProfile(false);
    }

    const onMenuClose = () => {
        setMenu(false);
    }

    const onMenuOpen = () => {
        setMenu(true);
    }

    return (
        <nav className='bg-white z-50 pb-6 pt-5 border-b border-t lg:relative w-full'>
            <div className="px-5 flex items-center justify-between">
                <Image src={ecobowlLogo} width={190} height={50} />
                {
                    app ? <div className="flex space-x-3 items-center">
                        <button className="lg:hidden pt:block" onClick={onMenuOpen}><HiOutlineMenu className="text-2xl text-gray-400" /></button>
                        <div className="bg-white flex space-x-2 items-center">
                            <img src={logo} className="w-5 h-6" alt="app" />
                            <p className="font-extrabold text-base lg:text-xl text-prim truncate">{app.name}</p>
                        </div>
                    </div> : null
                }
                <div className="flex space-x-5">
                    <button className='flex space-x-2 items-center rounded-full'>
                        <a className='flex space-x-2 items-center'>
                            <p onClick={() => setProfile(true)}>
                                <span className='block bg-gradient-to-r from-blue-400 to-blue-500 p-2 rounded-full'>
                                    <FiUser className='text-white' />
                                </span>
                            </p>
                            {
                                user ? <p onClick={() => setProfile(true)} className='items-center hidden md:flex text-sm space-x-1'>
                                    {user.firstName} {user.lastName}
                                </p> : null
                            }
                        </a>
                    </button>
                    <button onClick={logout} className="text-gray-500 hover:text-blue-400"><CgLogOff className='text-2xl' /></button>
                </div>
            </div>
            <Menu visible={menu} onClose={onMenuClose} />
            <Profile drawer={profile} onClose={onClose} />
        </nav>
    )
}

export default Nav;