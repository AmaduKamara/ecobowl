import { Popconfirm } from "antd";
import Router from "next/router";
import { BiTrash } from "react-icons/bi";
import { FiEdit3, FiEye } from "react-icons/fi";
import { useSelector } from "react-redux";
import { customerStore } from "../redux/customer/selector";

const Action = ({ record, edit = (e?: any) => { }, remove = (e?: any) => { } }) => {
  return (
    <div className="flex items-center space-x-3 justify-end">
      <button onClick={() => { Router.push(`/customer/${record.id}`) }} type="button" className="text-xl text-green-500" ><FiEye /></button>
      {
        record.name !== "Owner" ? <button onClick={() => edit(record)} type="button" className="text-xl text-yellow-500"><FiEdit3 /></button> : null
      }
      {
        record.name !== "Owner" ? <Popconfirm
          placement="topRight"
          title="Are you sure to delete this customer?"
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

export const useCustomer = ({edit = (e?) => { }, remove = (e?) => { }}) => {
  const items = useSelector((state: any) => customerStore(state));
  const rows = items.map(e => ({ ...e, key: e.id }));

  const columns = [
    { dataIndex: 'givenNames', title: 'Given Names', fixed: 'left', width: 250, ellipsis: true, type: 'string' },
    { dataIndex: 'familyName', title: 'Family Name', width: 250, type: 'string' },
    { dataIndex: 'gender', title: 'Gender', width: 100, type: 'string' },
    { dataIndex: 'address', title: 'Address', width: 300, ellipsis: true, type: 'string' },
    { dataIndex: 'phone', title: 'Phone', width: 250, type: 'string' },
    { dataIndex: 'email', title: 'Email', width: 250, ellipsis: true, type: 'string' },
    { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: 'right', render: (_, record) => Action({ record, edit, remove }), width: 100 },
  ];

  return {
    rows,
    columns
  }
}