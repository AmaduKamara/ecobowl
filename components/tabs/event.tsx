import { EventTeams, TeamsMembers, useEventReward, useEventsSolutions, useEventTeam, useEventTrainee } from "../../hooks/useEvent";
import { AntTable, AntTableExpanded } from "../ui/Table";

export const Reward = ({records, loading = false}) => {
    const record = useEventReward({ records });
    return <AntTable columns={record.columns} loading={loading} rows={record.rows} />
}

export const Trainees = ({records, loading = false}) => {
    const record = useEventTrainee({ records });
    return <AntTable scroll={{ x: 1500 }} loading={loading} columns={record.columns} rows={record.rows} />
}

export const Teams = ({records, loading = false}) => {
    const record = useEventTeam({ records });
    return <AntTableExpanded  expandable={TeamsMembers} columns={record.columns} loading={loading} rows={record.rows} />
}

export const Solutions = ({records, loading = false}) => {
    const record = useEventsSolutions();
    return <AntTable columns={record.columns} loading={loading} rows={records} />
}
