import { useEffect, useState } from "react";
import { Drawer } from 'antd';
import { api, handle401Error } from '../../api';
import { newUser, User } from "../../interface/user";
import { SpinnerAlt } from "../ui/Spinner";
import { PC, size } from "../../common";
import { useWindowSize } from "../../hooks/useWindowSize";

export type Props = {
    onClose?: () => void
    visible?: boolean,
    record: User
}

const ViewUser = ({ visible, onClose, record = newUser }: Props) => {
    const { width } = useWindowSize();
    const [password, setPassword] = useState("");

    const fetchPassword = () => {
        api.get(`/user/get-password/${record.id}`)
            .then(res => res.data)
            .then(({ password }) => {
                setPassword(password);
            })
            .catch(handle401Error);
    }

    useEffect(() => {
        if (record.id && record.status === "Password Pending") fetchPassword();
    }, [record])

    return (
        <Drawer width={size(width)} title="View User" placement="right" onClose={onClose} visible={visible}>
            <div className="py-3">
                <div className="flex justify-between mb-5 text-sm">
                    <p className="text-gray-400">First Name:</p>
                    <p className="">{record.firstName}</p>
                </div>
                <div className="flex justify-between mb-5 text-sm">
                    <p className="text-gray-400">Last Name:</p>
                    <p className="">{record.lastName}</p>
                </div>
                <div className="flex justify-between mb-5 text-sm">
                    <p className="text-gray-400">Role:</p>
                    <p className="">{record.role.name}</p>
                </div>
                <div className="flex justify-between mb-5 text-sm">
                    <p className="text-gray-400">Phone:</p>
                    <p className="">{record.phone}</p>
                </div>
                <div className="flex justify-between mb-5 text-sm">
                    <p className="text-gray-400">Email:</p>
                    <p className="">{record.email}</p>
                </div>
                <div className="flex justify-between mb-5 text-sm">
                    <p className="text-gray-400">Status:</p>
                    <p className="">{record.status}</p>
                </div>
                {
                    record.status === "Password Pending" ? <div className="flex justify-between mb-5 text-sm">
                        <p className="text-gray-400">Password:</p>
                        <p className="">{password ? password : <SpinnerAlt className="w-6 h-6" />}</p>
                    </div> : null
                }
            </div>
        </Drawer>
    )
}

export default ViewUser;