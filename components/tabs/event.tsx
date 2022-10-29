import { useEventReward, useEventTrainee } from "../../hooks/useEvent";
import { AntTable } from "../ui/Table";

export const Reward = ({records}) => {
    const record = useEventReward({ records });
    return <AntTable columns={record.columns} rows={record.rows} />
}

export const Trainees = ({records}) => {
    const record = useEventTrainee({ records });
    return <AntTable scroll={{ x: 1500 }} columns={record.columns} rows={record.rows} />
}
