import { useSelector } from "react-redux";
import { ToLeones } from ".";
import { rewardStore } from "../redux/reward/selector";

export const useReward = () => {
    const items = useSelector((state: any) => rewardStore(state));
    const rows = items.map(e => ({ ...e, key: e.id }));

    const columns = [
        { dataIndex: 'staffName', title: 'Staff', flex: 1 },
        { dataIndex: 'phone', title: 'Phone', flex: 1 },
        { dataIndex: 'totalPerformance', title: 'Service Offer', flex: 1 },
        { dataIndex: 'totalReward', title: 'Reward', flex: 1, render: (val) => (ToLeones(val)) },
    ];

    return {
        rows,
        columns
    }
}