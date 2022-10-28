import { BiArchive, BiCollection, BiGridAlt, BiGroup } from "react-icons/bi";
import { ImBook } from "react-icons/im";
import { NavLink } from "./NavLink";
import { useSelector } from "react-redux";
import { menuStore } from "../redux/menu/selector";
import { MdBatchPrediction } from "react-icons/md";
import { FaCashRegister, FaRegIdBadge, FaUserCog, FaUserSecret } from "react-icons/fa";
import { FiTool } from "react-icons/fi";
import { appStore } from "../redux/app/selector";
import { checkPermissions } from "../contexts/permission";
import { BsCashCoin } from "react-icons/bs";

const Menu = ({ logo = "./app.png" }) => {

    const app = useSelector((state: any) => appStore(state));
    const menu = useSelector((state: any) => menuStore(state));

    return (
        <menu className="overflow-y-auto w-full h-full flex flex-col">
            <div className="px-5 md:px-2 lg:px-5 pt-5 overflow-y-auto border-r border-gray-200 bg-white flex-1 h-full md:flex hidden flex-col">
                <ul className="flex-1">
                    <li>
                        <NavLink to='/'>
                            <BiGridAlt className="text-xl" />
                            <p className="whitespace-nowrap">Dashboard</p>
                        </NavLink>
                    </li>
                    {
                        checkPermissions("/product") ?
                            <li>
                                <NavLink to='/product'>
                                    <BiCollection className="text-xl" />
                                    <p className="whitespace-nowrap">Product</p>
                                </NavLink>
                            </li> : null
                    }
                    {
                        checkPermissions("/sales") ? <li>
                            <NavLink to='/sales'>
                                <FaCashRegister className="text-lg" />
                                <p className="whitespace-nowrap">Sales</p>
                            </NavLink>
                        </li> : null
                    }
                    {
                        checkPermissions("/offer") ? <li>
                            <NavLink to='/offer'>
                                <ImBook className="text-lg" />
                                <p className="whitespace-nowrap">Service Offer</p>
                            </NavLink>
                        </li> : null
                    }
                    {
                        checkPermissions("/reward") ? <li>
                            <NavLink to='/reward'>
                                <BsCashCoin className="text-lg" />
                                <p className="whitespace-nowrap">Monthly Reward</p>
                            </NavLink>
                        </li> : null
                    }
                    {
                        checkPermissions("/supply") ?
                            <li>
                                <NavLink to='/supply'>
                                    <BiArchive className="text-xl" />
                                    <p className="whitespace-nowrap">Supply</p>
                                </NavLink>
                            </li> : null
                    }
                    {
                        checkPermissions("/customer") ? <li>
                            <NavLink to='/customer'>
                                <BiGroup className="text-xl" />
                                <p className="whitespace-nowrap">Customer</p>
                            </NavLink>
                        </li> : null
                    }
                    {
                        checkPermissions("/staff") ?
                            <li>
                                <NavLink to='/staff'>
                                    <FaRegIdBadge className="text-xl" />
                                    <p className="whitespace-nowrap">Staff</p>
                                </NavLink>
                            </li> : null
                    }
                    {
                        checkPermissions("/service") ?
                            <li>
                                <NavLink to='/service'>
                                    <MdBatchPrediction className="text-xl" />
                                    <p className="whitespace-nowrap">Service</p>
                                </NavLink>
                            </li> : null
                    }
                </ul>
                <ul className="border-t border-gray-100 py-5">
                    {
                        checkPermissions("/role") ? <li>
                            <NavLink to='/role'>
                                <FaUserCog className="text-xl" />
                                <p className="whitespace-nowrap">Role</p>
                            </NavLink>
                        </li> : null
                    }
                    {
                        checkPermissions("/user") ? <li>
                            <NavLink to='/user'>
                                <FaUserSecret className="text-xl" />
                                <p className="whitespace-nowrap">User</p>
                            </NavLink>
                        </li> : null
                    }
                    {
                        checkPermissions("/setting") ?
                            <li>
                                <NavLink to='/setting'>
                                    <FiTool className="text-xl" />
                                    <p className="whitespace-nowrap">Settings</p>
                                </NavLink>
                            </li>
                            : null
                    }
                </ul>
            </div>

        </menu>
    )
}

export default Menu;