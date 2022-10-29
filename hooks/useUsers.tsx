import { Popconfirm } from "antd";
import { ColumnsType } from "antd/lib/table";
import { BiTrash } from "react-icons/bi";
import { FiEdit3, FiEye } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Name, Status } from "../components/ui/UsersContent";
import { usersStore } from "../redux/users/selector";

const Action = ({ record, edit = (e?: any) => { }, view = (e?: any) => { }, remove = (e?: any) => { } }) => {
  return (
    <div className="flex items-center space-x-3 justify-end">
      <button type="button" onClick={() => view(record)} className="text-xl text-green-500" ><FiEye /></button>
      <button onClick={() => edit(record)} type="button" className="text-xl text-yellow-500"><FiEdit3 /></button>
      <Popconfirm
        placement="topRight"
        title="Are you sure to delete this user?"
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

export const useUser = ({ edit = (e?: any) => { }, view = (e?: any) => { }, remove = (e?: any) => { } }) => {
  const items = useSelector((state: any) => usersStore(state));
  const rows = items.map(e => ({ ...e, key: e.id }));

  const columns: ColumnsType<any> = [
    { key: 'name', title: 'Name', fixed: 'left', ellipsis: true, render: Name },
    { dataIndex: 'phone', key: 'phone', title: 'Phone' },
    { dataIndex: 'role', key: 'role', title: 'Role' },
    { dataIndex: 'status', key: 'status', title: 'Status', render: Status },
    { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: 'right', render: (_, record) => Action({ record, edit, remove, view }), width: 100 },
  ];

  return {
    columns,
    rows
  }
}