import Router from "next/router";
import { FiEye } from "react-icons/fi";
import { TiPrinter } from "react-icons/ti";
import { useSelector } from "react-redux";
import { DateFormater, ToLeones } from ".";
import { SalesReceipt } from "../components/receipts/sales";
import { Discount, Total } from "./useEvent";
import { ItemsCount } from "./useEvent";
import { Action } from "../components/ui/Table";
import { useAuth } from "../contexts/auth";
import { sales5Store, salesStore } from "../redux/sales/selector";

export const SAction = ({ record }) => {
    const { app } = useAuth();

    return (
        <div className="flex items-center space-x-3 justify-end">
            <button onClick={() => Router.push(`/sales/${record.id}`)} type="button" className="text-xl text-green-500"><FiEye /></button>
            <SalesReceipt record={record} app={app}><TiPrinter className='text-xl text-gray-500' /></SalesReceipt>
        </div>
    )
}

export const useSales = () => {
    const items = useSelector((state: any) => salesStore(state));
    const rows = items.map(e => ({ ...e, key: e.id }));

    const columns = [
        { dataIndex: 'invoiceNumber', title: 'Invoice Number', flex: 1, type: 'string' },
        { dataIndex: 'date', title: 'Date', flex: 1, render: DateFormater, type: 'date' },
        { dataIndex: 'paymentType', title: 'Payment Type', flex: 1, type: 'string' },
        { dataIndex: 'salesType', title: 'Sales Type', flex: 1, type: 'string' },
        { dataIndex: 'discount', title: 'Discount', flex: 1, align: "center", type: 'number', render: Discount },
        { dataIndex: 'profit', title: 'Profit', flex: 1, align: "right", render: ToLeones, type: 'number' },
        { dataIndex: 'items', key: 'items', title: 'Items', align: "center", flex: 1, render: ItemsCount, type: 'number' },
        { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: "right", render: (_, record) => SAction({ record }), width: 35 },
    ];

    return {
        rows,
        columns
    }
}

export const usePurchases = (view, records = []) => {
    const rows = records.map((e: any) => ({ ...e, key: e.id }));
    const { app } = useAuth();

    const del = false;
    const update = false;

    const columns = [
        { dataIndex: 'invoiceNumber', title: 'Invoice Number', fixed: 'left', width: 200 },
        { dataIndex: 'date', title: 'Date', render: DateFormater, type: 'date' },
        { dataIndex: 'paymentType', title: 'Payment Type', type: 'string' },
        { dataIndex: 'salesType', title: 'Sales Type', type: 'string' },
        { dataIndex: 'discount', title: 'Discount', align: "center", type: 'number', render: Discount },
        { dataIndex: 'items', key: 'items', title: 'Items', align: "center", render: ItemsCount, type: 'number' },
        { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: 'right', render: (_, record) => Action({ record, del, update, view, print: true, app }), width: 70 },
    ];

    return {
        rows,
        columns
    }
}

export const useSale4 = () => {
    const sales = useSelector((state: any) => sales5Store(state));
    const rows = sales && sales.length > 0 ? sales.slice(0, 4).map(e => ({ ...e, key: e.id })) : [];

    const columns = [
        { dataIndex: 'invoiceNumber', title: 'Invoice Number', flex: 1, type: 'string' },
        { dataIndex: 'date', title: 'Date', flex: 1, render: DateFormater, type: 'date' },
        { dataIndex: 'paymentType', title: 'Payment Type', flex: 1, type: 'string' },
        { dataIndex: 'salesType', title: 'Sales Type', flex: 1, type: 'string' },
        { dataIndex: 'discount', title: 'Discount', flex: 1, align: "center", type: 'number', render: Discount },
        { dataIndex: 'profit', title: 'Amount', flex: 1, align: "right", render: ToLeones, type: 'number' },
        { dataIndex: 'items', key: 'items', title: 'Items', align: "center", flex: 1, render: ItemsCount, type: 'number' },
    ];

    return {
        rows,
        columns
    }
}

export const useItems = (record) => {
    const columns = [
        { title: 'Name', dataIndex: 'productName', key: 'productName', ellipsis: true },
        { title: 'Quantity', key: 'quantity', dataIndex: 'quantity', align: "center", sorter: (a, b) => a.quantity - b.quantity },
        { title: 'Discount', key: 'discount', dataIndex: 'discount', align: "center", sorter: (a, b) => a.discount - b.discount, render: Discount },
        { title: 'Selling Cost', key: 'sellingCost', align: "right", dataIndex: 'sellingCost', sorter: (a, b) => a.sellingCost - b.sellingCost, render: (data) => ToLeones(data) }
    ];

    return {
        columns,
        rows: record
    }
}

export const useEventsTeams = () => {
    const columns = [
        { title: 'Name', dataIndex: 'productName', key: 'productName', ellipsis: true },
        { title: 'Description', key: 'sellingCost', dataIndex: 'sellingCost', render: ToLeones, align: "right" },
        { title: 'Solution', key: 'quantity' },
        { title: 'Solution Description', key: 'quantity' }
    ];

    return {
        columns
    }
}