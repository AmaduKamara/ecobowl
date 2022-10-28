import { DateFormater, MonthFormater, ToLeones } from ".";
import Router from "next/router";
import { BiTrash } from "react-icons/bi";
import { FiEdit3, FiEye } from "react-icons/fi";
import { Popconfirm } from "antd";
import { useSelector } from "react-redux";
import { staffStore } from "../redux/staff/selector";

const Action = ({ record, edit = (e?: any) => { }, loading = false, remove = (e?: any) => { } }) => {
  return (
    <div className="flex items-center space-x-3 justify-end">
      <button onClick={() => { Router.push(`/staff/${record.id}`) }} type="button" className="text-xl text-green-500" ><FiEye /></button>
      <button onClick={() => edit(record)} type="button" className="text-xl text-yellow-500"><FiEdit3 /></button>
      <Popconfirm
        placement="topRight"
        title="Are you sure to delete this staff?"
        onConfirm={() => remove(record)}
        okText="Yes"
        okType="danger"
        okButtonProps={{ loading }}
        cancelText="No"
      >
        <button className="text-xl text-red-500"><BiTrash /></button>
      </Popconfirm>
    </div>
  )
}

export const useStaff = ({ edit = (e?) => { }, remove = (e?) => { } }) => {
  const items = useSelector((state: any) => staffStore(state));
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

export const usePerformance = (rows) => {
  const columns = [
    { dataIndex: 'date', title: 'Date', flex: 1, fixed: 'left', render: (date) => (DateFormater(date)) },
    { dataIndex: 'service', title: 'Service', flex: 1, render: (service) => (service.name) },
    { dataIndex: 'service', title: 'Cost', flex: 1, render: (service) => (ToLeones(service.cost)) },
    { dataIndex: 'service', title: 'Reward', flex: 1, render: (service) => (ToLeones(service.staffReward)) }
  ];

  return {
    columns,
    rows
  }
}