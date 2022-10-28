import { Popconfirm } from "antd";
import { BiTrash } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { DateFormater, ToLeones } from ".";
import { offerStore } from "../redux/offer/selector";

const Action = ({ record, edit = (e?: any) => { }, remove = (e?: any) => { } }) => {
  return (
    <div className="flex items-center space-x-3 justify-end">
      <button onClick={() => edit(record)} type="button" className="text-xl text-yellow-500"><FiEdit3 /></button>
      <Popconfirm
        placement="topRight"
        title="Are you sure to delete this role?"
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

export const useOffer = ({ edit = (e?) => { }, remove = (e?) => { } }) => {
  const items = useSelector((state: any) => offerStore(state));
  const rows = items.map(e => ({ ...e, key: e.id }));

  const columns = [
    { dataIndex: 'date', title: 'Date', flex: 1, fixed: 'left', render: DateFormater },
    { dataIndex: 'service', title: 'Service', flex: 1, render: (service) => (service.name) },
    { dataIndex: 'service', title: 'Cost', flex: 1, render: (service) => (ToLeones(service.cost)) },
    { dataIndex: 'service', title: 'Reward', flex: 1, render: (service) => (ToLeones(service.staffReward)) },
    { dataIndex: 'staff', title: 'Staff', flex: 1, render: (staff) => (`${staff.givenNames} ${staff.familyName}`) },
    { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: 'right', render: (_, record) => Action({ record, edit, remove }), width: 100 },
  ];

  return {
    rows,
    columns
  }
}