import { Drawer } from "antd"
import { BiArchive, BiCollection, BiGridAlt, BiGroup } from "react-icons/bi"
import { BsCashCoin } from "react-icons/bs"
import { FaCashRegister, FaRegIdBadge, FaUserCog, FaUserSecret } from "react-icons/fa"
import { FiTool } from "react-icons/fi"
import { ImBook } from "react-icons/im"
import { MdBatchPrediction } from "react-icons/md"
import { size } from "../../common"
import { checkPermissions } from "../../contexts/permission"
import { useWindowSize } from "../../hooks/useWindowSize"
import { NavLink } from "../NavLink"

export const Menu = ({ onClose = () => { }, visible = true }) => {

    const { width } = useWindowSize();

    return <Drawer width={size(width)} title="Menu" visible={visible} onClose={onClose} placement="left">
        <menu>
            <ul className="flex-1">
                <li>
                    <NavLink to='/'>
                        <BiGridAlt className="text-xl" />
                        <p>Dashboard</p>
                    </NavLink>
                </li>
                {
                    checkPermissions("/product") ?
                        <li>
                            <NavLink to='/product'>
                                <BiCollection className="text-xl" />
                                <p>Product</p>
                            </NavLink>
                        </li> : null
                }
                {
                    checkPermissions("/sales") ? <li>
                        <NavLink to='/sales'>
                            <FaCashRegister className="text-lg" />
                            <p>Sales</p>
                        </NavLink>
                    </li> : null
                }
                {
                    checkPermissions("/offer") ? <li>
                        <NavLink to='/offer'>
                            <ImBook className="text-lg" />
                            <p>Service Offer</p>
                        </NavLink>
                    </li> : null
                }
                {
                    checkPermissions("/reward") ? <li>
                        <NavLink to='/reward'>
                            <BsCashCoin className="text-lg" />
                            <p>Monthly Reward</p>
                        </NavLink>
                    </li> : null
                }
                {
                    checkPermissions("/supply") ?
                        <li>
                            <NavLink to='/supply'>
                                <BiArchive className="text-xl" />
                                <p>Supply</p>
                            </NavLink>
                        </li> : null
                }
                {
                    checkPermissions("/customer") ? <li>
                        <NavLink to='/customer'>
                            <BiGroup className="text-xl" />
                            <p>Customer</p>
                        </NavLink>
                    </li> : null
                }
                {
                    checkPermissions("/staff") ?
                        <li>
                            <NavLink to='/staff'>
                                <FaRegIdBadge className="text-xl" />
                                <p>Staff</p>
                            </NavLink>
                        </li> : null
                }
                {
                    checkPermissions("/service") ?
                        <li>
                            <NavLink to='/service'>
                                <MdBatchPrediction className="text-xl" />
                                <p>Service</p>
                            </NavLink>
                        </li> : null
                }
            </ul>
            <ul className="border-t border-gray-100 pt-5">
                {
                    checkPermissions("/role") ? <li>
                        <NavLink to='/role'>
                            <FaUserCog className="text-xl" />
                            <p>Role</p>
                        </NavLink>
                    </li> : null
                }
                {
                    checkPermissions("/user") ? <li>
                        <NavLink to='/user'>
                            <FaUserSecret className="text-xl" />
                            <p>User</p>
                        </NavLink>
                    </li> : null
                }
                {
                    checkPermissions("/setting") ?
                        <li>
                            <NavLink to='/setting'>
                                <FiTool className="text-xl" />
                                <p>Settings</p>
                            </NavLink>
                        </li>
                        : null
                }
            </ul>
        </menu>
    </Drawer>
}