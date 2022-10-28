import { BiArchive, BiCollection, BiGridAlt, BiGroup } from "react-icons/bi";
import { ImBook } from "react-icons/im";
import { NavLink } from "./NavLink";
import { useSelector } from "react-redux";
import { menuStore } from "../redux/menu/selector";
import { MdBatchPrediction } from "react-icons/md";
import { FaCashRegister, FaRegIdBadge, FaSchool, FaUserCog, FaUserSecret } from "react-icons/fa";
import { FiTool } from "react-icons/fi";
import { appStore } from "../redux/app/selector";
import { checkPermissions } from "../contexts/permission";
import { BsCalendar2Event, BsCashCoin } from "react-icons/bs";

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
                        checkPermissions("/business") ?
                            <li>
                                <NavLink to='/business'>
                                    <BiCollection className="text-xl" />
                                    <p className="whitespace-nowrap">Business</p>
                                </NavLink>
                            </li> : null
                    }
                    {
                        checkPermissions("/entrepreneurs") ? <li>
                            <NavLink to='/entrepreneurs'>
                                <BsCashCoin className="text-lg" />
                                <p className="whitespace-nowrap">Entrepreneurs</p>
                            </NavLink>
                        </li> : null
                    }
                    {
                        checkPermissions("/events") ? <li>
                            <NavLink to='/events'>
                                <BsCalendar2Event className="text-lg" />
                                <p className="whitespace-nowrap">Events</p>
                            </NavLink>
                        </li> : null
                    }
                    {
                        checkPermissions("/institutions") ? <li>
                            <NavLink to='/institutions'>
                                <FaSchool className="text-xl" />
                                <p className="whitespace-nowrap">Institutions</p>
                            </NavLink>
                        </li> : null
                    }
                </ul>
                <ul className="border-t border-gray-100 py-5">
                    {
                        checkPermissions("/user") ? <li>
                            <NavLink to='/user'>
                                <FaUserSecret className="text-xl" />
                                <p className="whitespace-nowrap">User</p>
                            </NavLink>
                        </li> : null
                    }
                </ul>
            </div>

        </menu>
    )
}

export default Menu;