import { DateFormater } from ".";
import { AntTableNested } from "../components/ui/Table";
import Router from "next/router";
import { FiEdit3, FiEye, FiMail } from "react-icons/fi";
import { eventStore } from "../redux/event/selector";
import { useSelector } from "react-redux";
import { Popconfirm } from "antd";
import { BiTrash } from "react-icons/bi";

export const useEventReward = ({ records = [], edit = () => { }, remove = () => { } }) => {
    const rows = records.map((e: any) => ({ ...e, key: e.id }));

    const Action = ({ record, edit, remove }) => {
        return (
            <div className="flex items-center space-x-3 justify-end">
                <button onClick={() => edit(record)} type="button" className="text-xl text-yellow-500"><FiEdit3 /></button>
                <Popconfirm
                    placement="topRight"
                    title="Are you sure to delete this institutions?"
                    onConfirm={() => remove(record)}
                    okText="Yes"
                    okType="danger"
                    cancelText="No"
                >
                    <button className="text-xl text-red-500"><BiTrash /></button>
                </Popconfirm>
            </div>
        )
    }

    const columns = [
        { dataIndex: 'position', title: 'Position' },
        { dataIndex: 'name', title: 'Name' },
        { dataIndex: 'description', title: 'Description' },
        { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: 'right', render: (_, record) => Action({ record, edit, remove }), width: 70 },
    ];

    return {
        rows,
        columns
    }
}

export const useEventTeam = ({ records = [], edit = () => { }, remove = () => { } }) => {
    const rows = records.map((e: any) => ({ ...e, key: e.id }));

    const Action = ({ record, edit = (e?: any) => {}, remove = (e?: any) => {} }) => {
        return (
            <div className="flex items-center space-x-3 justify-end">
                <button onClick={() => edit(record)} type="button" className="text-xl text-yellow-500"><FiEdit3 /></button>
                <Popconfirm
                    placement="topRight"
                    title="Are you sure to delete this institutions?"
                    onConfirm={() => remove(record)}
                    okText="Yes"
                    okType="danger"
                    cancelText="No"
                >
                    <button className="text-xl text-red-500"><BiTrash /></button>
                </Popconfirm>
            </div>
        )
    }

    const columns = [
        { dataIndex: 'name', title: 'Name', fixed: "left", width: 250, ellipsis: true },
        { dataIndex: 'description', title: 'Description', ellipsis: true },
        { title: 'Members', dataIndex: "trainees", width: 100, render: (value) => value ? value.length : 0 },
        { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: 'right', render: (_, record) => Action({ record, edit }), width: 70 },
    ];

    return {
        rows,
        columns
    }
}


export const useEventTrainee = ({ records = [], edit = () => { }, remove = () => { } }) => {
    const rows = records.map((e: any) => ({ ...e, key: e.id }));

    const Action = ({ record, edit }) => {
        return (
            <div className="flex items-center space-x-3 justify-end">
                <button onClick={() => edit(record)} type="button" className="text-xl text-blue-500"><FiMail /></button>
            </div>
        )
    }

    const columns = [
        { dataIndex: 'forename', title: 'Forename', fixed: "left" },
        { dataIndex: 'surname', title: 'Surname' },
        { dataIndex: 'birthDate', title: 'Date of Birth', render: (date) => DateFormater(date), width: 150 },
        { dataIndex: 'gender', title: 'Gender', width: 100 },
        { dataIndex: 'phone', title: 'Phone', width: 150 },
        { dataIndex: 'email', title: 'Email', ellipsis: true },
        { dataIndex: 'qualification', title: 'Qualification', ellipsis: true },
        { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: 'right', render: (_, record) => Action({ record, edit }), width: 70 },
    ];

    return {
        rows,
        columns
    }
}

export const useEventsTeams = () => {
    const columns = [
        { dataIndex: 'position', title: 'Position' },
        { dataIndex: 'name', title: 'Name' },
        { dataIndex: 'description', title: 'Description' },
    ];

    return {
        columns
    }
}

export const useEventsSolutions = () => {
    const columns = [
        { dataIndex: 'title', title: 'Name' },
        { dataIndex: 'team', title: 'Team', render: (value) => value.name, ellipsis: true },
        { dataIndex: 'description', title: 'Description', ellipsis: true },
    ];

    return {
        columns
    }
}

export const useEvent = ({ edit = () => { }, remove = () => { } }) => {
    const items = useSelector((state: any) => eventStore(state));
    const rows = items.map(e => ({ ...e, key: e.id }));

    const Action = ({ record, edit, remove }) => {
        return (
            <div className="flex items-center space-x-3 justify-end">
                <button onClick={() => Router.push(`/events/${record.id}`)} type="button" className="text-xl text-green-500"><FiEye /></button>
            </div>
        )
    }

    const columns = [
        { dataIndex: 'name', title: 'Name' },
        { title: 'Description', dataIndex: "description", ellipsis: true },
        { title: 'Institution', dataIndex: "institution", ellipsis: true, render: (institute) => institute.name },
        { title: 'Start Date', dataIndex: "startDate", render: (date) => DateFormater(date) },
        { title: 'End Date', dataIndex: "endDate", render: (date) => DateFormater(date) },
        { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: "right", render: (_, record) => Action({ record, edit, remove }), width: 100 },
    ];

    return {
        rows,
        columns
    }
}

export const EventTeams = (data) => {

    const { rewards = [] } = data;
    const rows = rewards.slice(0, 5).map((item, i) => ({ ...item, key: i.toString(), }));

    const { columns } = useEventsTeams();

    return <AntTableNested pagination={false} columns={columns} rows={rows} />;
}

export const TeamsMembers = (data) => {

    const { trainees = [] } = data;
    const rows = trainees.slice(0, 5).map((item, i) => ({ ...item, key: i.toString(), }));

    const { columns } = useEventTrainee(rows);

    return <AntTableNested pagination={false} columns={columns} rows={rows} />;
}