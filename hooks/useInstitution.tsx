import { Popconfirm } from "antd";
import { BiTrash } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { ToLeones } from ".";
import { serviceStore } from "../redux/service/selector";

const Action = ({ record, edit = (e?: any) => { }, remove = (e?: any) => { } }) => {
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

export const useInstitution = ({ edit = (e?) => { }, remove = (e?) => { } }) => {
  const items = useSelector((state: any) => serviceStore(state));
  const rows = items.map(e => ({ ...e, key: e.id }));

  const columns = [
    { dataIndex: 'name', title: 'Name', type: 'string' },
    { dataIndex: 'cost', title: 'Address', render: (data) => ToLeones(data) },
    { title: 'Description', dataIndex: "description", ellipsis: true },
    { dataIndex: 'staffReward', title: 'Contact Person', render: (data) => ToLeones(data) },
    { dataIndex: 'staffReward', title: 'Contact Person Phone', render: (data) => ToLeones(data) },
    { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: "right", render: (_, record) => Action({ record, edit, remove }), width: 100 },
  ];

  return {
    rows,
    columns
  }
}