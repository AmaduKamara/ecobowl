import { Popconfirm } from "antd";
import { ColumnsType } from "antd/lib/table";
import Router from "next/router";
import { BiTrash } from "react-icons/bi";
import { FaUserShield } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { roleStore } from "../redux/roles/selector";

const Action = ({ record, edit = (e?: any) => { }, remove = (e?: any) => { } }) => {
  return (
    <div className="flex items-center space-x-3 justify-end">
      <button onClick={() => { Router.push(`/role/${record.id}`) }} type="button" className="text-xl text-green-500" ><FaUserShield /></button>
      {
        record.name !== "Owner" ? <button onClick={() => edit(record)} type="button" className="text-xl text-yellow-500"><FiEdit3 /></button> : null
      }
      {
        record.name !== "Owner" ? <Popconfirm
          placement="topRight"
          title="Are you sure to delete this role?"
          onConfirm={() => remove(record)}
          okText="Yes"
          okType="danger"
          cancelText="No"
        >
          <button className="text-xl text-red-500"><BiTrash /></button>
        </Popconfirm> : null
      }
    </div>
  )
}

export const useRole = ({edit = (e?: any) => { }, remove = (e?: any) => { }}) => {
  const items = useSelector((state: any) => roleStore(state));
  const rows = items.map(e => ({ ...e, key: e.id }));

  const columns: ColumnsType<any> = [
    { key: 'name', dataIndex: 'name', title: 'Name' },
    { key: 'description', dataIndex: 'description', title: 'Description', ellipsis: true },
    { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: 'right', render: (_, record) => Action({ record, edit, remove }), width: 70 },
  ];

  return {
    rows,
    columns
  }
}