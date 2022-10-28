import { Drawer } from 'antd';
import { PC, size } from '../../common';
import { useAuth } from "../../contexts/auth";
import { useWindowSize } from '../../hooks/useWindowSize';

export type Props = {
    onClose?: (e?: React.MouseEvent | React.KeyboardEvent) => void
    drawer?: boolean
}

const Profile = ({ drawer, onClose }: Props) => {
    const { user } = useAuth();
    const record = user;
    const { width } = useWindowSize();

    return (
        <Drawer width={size(width)} title="Profile" placement="right" onClose={onClose} visible={drawer}>
            {record ? <div className='py-3'>
                <div className="flex justify-between text-sm mb-5">
                    <p className="text-gray-400">First Name:</p>
                    <p className="">{record.firstName}</p>
                </div>
                <div className="flex justify-between text-sm mb-5">
                    <p className="text-gray-400">Last Name:</p>
                    <p className="">{record.lastName}</p>
                </div>
                <div className="flex justify-between text-sm mb-5">
                    <p className="text-gray-400">Email:</p>
                    <p className="">{record.email}</p>
                </div>
                <div className="flex justify-between text-sm mb-5">
                    <p className="text-gray-400">Role:</p>
                    <p className="">{record.role}</p>
                </div>
                <div className="flex justify-between text-sm mb-5">
                    <p className="text-gray-400">Phone:</p>
                    <p className="">{record.phone}</p>
                </div>
                <div className="flex justify-between text-sm mb-5">
                    <p className="text-gray-400">Status:</p>
                    <p className="">{record.status}</p>
                </div>
            </div> : null}

        </Drawer>
    )
}

export default Profile;