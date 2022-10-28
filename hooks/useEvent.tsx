import { ToLeones } from ".";
import { useEventsTeams } from "./useSales";
import { percentage } from "../components/ui/price-content";
import { AntTableNested } from "../components/ui/Table";
import Router from "next/router";
import { FiEye } from "react-icons/fi";
import { salesStore } from "../redux/sales/selector";
import { useSelector } from "react-redux";

export const ItemsCount = (items) => {
    return <p>{items.length}</p>
}

export const Discount = (discount) => {
    return discount ? <p>{discount}%</p> : <p>{discount}</p>
}

export const TotalCost = (row) => {
    const price = row.quantity * row.sellingCost;

    console.log(price);


    return <p>{price}</p>
}

export const Total = (row) => {
    const total = row.quantity * row.sellingCost;
    const discount = total * row.discount / percentage;
    const amount = total - discount;

    return ToLeones(amount);
}


export const Action = ({ record, edit, remove }) => {
    return (
        <div className="flex items-center space-x-3 justify-end">
            <button onClick={() => Router.push(`/event/${record.id}`)} type="button" className="text-xl text-green-500"><FiEye /></button>
        </div>
    )
}

export const useEvent = ({ edit = () => { }, remove = () => { } }) => {
    const items = useSelector((state: any) => salesStore(state));
    const rows = items.map(e => ({ ...e, key: e.id }));

    const columns = [
        { dataIndex: 'name', title: 'Name', type: 'string' },
        { title: 'Description', dataIndex: "description", ellipsis: true },
        { title: 'Solution', dataIndex: "description", ellipsis: true },
        { title: 'Solution Description', dataIndex: "description", ellipsis: true },
        { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: "right", render: (_, record) => Action({ record, edit, remove }), width: 100 },
    ];

    return {
        rows,
        columns
    }
}

export const EventTeams = (data) => {
    const { items } = data;
    const rows = items.slice(0, 5).map((item, i) => ({ ...item, key: i.toString(), }));

    const { columns } = useEventsTeams();

    return <AntTableNested pagination={false} columns={columns} rows={rows} />;
}