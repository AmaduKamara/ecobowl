import { ColumnsType } from "antd/lib/table";
import Router from "next/router";
import { FiEye } from "react-icons/fi";
import { useSelector } from "react-redux";
import { DateFormater, ToLeones } from ".";
import { Action } from "../components/ui/Table";
import { supplyItems, supplyStore } from "../redux/supply/selector";

const SAction = ({ record }) => {
    return (
      <div className="flex items-center space-x-3 justify-end">
        <button onClick={() => { Router.push(`/supply/${record.id}`) }} type="button" className="text-xl text-green-500" ><FiEye /></button>
      </div>
    )
  }
  
export const useSupply = () => {
    const items = useSelector((state: any) => supplyStore(state));
    const rows = items.map(e => ({ ...e, key: e.id }));

    const columns: ColumnsType<any> = [
        { title: 'Invoice Number', dataIndex: 'invoiceNumber', key: 'invoiceNumber', fixed: 'left', width: 100 },
        { title: 'Date Supplied', dataIndex: 'dateSupplied', key: 'dateSupplied', width: 100, render: DateFormater },
        { title: 'Supply Invoice', dataIndex: 'supplyInvoice', key: 'supplyInvoice', width: 100 },
        { title: 'Total Cost', key: 'totalCost', dataIndex: 'totalCost', sorter: (a, b) => a.totalCost - b.totalCost, render: (data) => ToLeones(data), width: 100 },
        { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: "right", render: (_, record) => SAction({ record }), width: 35 },
    ];

    return {
        rows,
        columns
    }
}

export const useItems = () => {

    const columns: ColumnsType<any> = [
        { title: 'Name', dataIndex: 'itemName', key: 'itemName', ellipsis: true },
        { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
        { title: 'Quantity', key: 'quantity', dataIndex: 'quantity', align: "center", sorter: (a, b) => a.quantity - b.quantity },
        { title: 'Normal Cost', key: 'normalCost', dataIndex: 'normalCost', align: "right", sorter: (a, b) => a.normalCost - b.normalCost, render: (data) => ToLeones(data) },
        { title: 'Wholesale Cost', key: 'wholesaleCost', dataIndex: 'wholesaleCost', align: "right", sorter: (a, b) => a.wholesaleCost - b.wholesaleCost, render: (DateFormater) => ToLeones(DateFormater) },
        { title: 'Retail Cost', key: 'retailCost', dataIndex: 'retailCost', align: "right", sorter: (a, b) => a.retailCost - b.retailCost, render: (data) => ToLeones(data) },
        { title: 'Expiry Date', key: 'expiryDate', dataIndex: 'expiryDate', render: DateFormater },
    ];

    return {
        columns
    }
}

export const useSupplies = (records) => {
    const rows = records.map(e => ({ ...e, key: e.id }));

    const del = false;
    const update = false;

    const columns = [
        { title: 'Invoice Number', dataIndex: 'invoiceNumber', key: 'invoiceNumber' },
        { title: 'Date Supplied', dataIndex: 'dateSupplied', key: 'dateSupplied', render: DateFormater },
        { title: 'Supply Invoice', dataIndex: 'supplyInvoice', key: 'supplyInvoice' },
        { title: 'Action', dataIndex: '', key: 'x', align: "right", render: (_, record) => Action({ record, del, update }) },
    ];

    return {
        rows,
        columns
    }
}

export const useSupplyItems = () => {
    const items = useSelector((state: any) => supplyItems(state));
    const rows = items.map(e => ({ ...e, key: e.id }));

    const columns: ColumnsType<any> = [
        { title: 'Name', dataIndex: 'itemName', key: 'itemName', fixed: 'left', width: 250, ellipsis: true },
        { title: 'Description', dataIndex: 'description', key: 'description', width: 300, ellipsis: true },
        { title: 'Quantity', key: 'quantity', dataIndex: 'quantity', align: "center", sorter: (a, b) => a.quantity - b.quantity, width: 150 },
        { title: 'Normal Cost', key: 'normalCost', dataIndex: 'normalCost', sorter: (a, b) => a.normalCost - b.normalCost, render: (data) => ToLeones(data), width: 200 },
        { title: 'Wholesale Cost', key: 'wholesaleCost', dataIndex: 'wholesaleCost', sorter: (a, b) => a.wholesaleCost - b.wholesaleCost, render: (DateFormater) => ToLeones(DateFormater), width: 200 },
        { title: 'Retail Cost', key: 'retailCost', dataIndex: 'retailCost', sorter: (a, b) => a.retailCost - b.retailCost, render: (data) => ToLeones(data), width: 200 },
        { title: 'Expiry Date', key: 'expiryDate', dataIndex: 'expiryDate', render: DateFormater, width: 150 },
    ];

    return {
        rows,
        columns
    }
}

export const useSupplyItemsColumns = () => {
    const columns: ColumnsType<any> = [
        { title: 'Name', dataIndex: 'itemName', key: 'itemName', ellipsis: true },
        { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true },
        { title: 'Quantity', key: 'quantity', dataIndex: 'quantity', align: "center", sorter: (a, b) => a.quantity - b.quantity },
        { title: 'Normal Cost', key: 'normalCost', dataIndex: 'normalCost', sorter: (a, b) => a.normalCost - b.normalCost, render: (data) => ToLeones(data) },
        { title: 'Wholesale Cost', key: 'wholesaleCost', dataIndex: 'wholesaleCost', sorter: (a, b) => a.wholesaleCost - b.wholesaleCost, render: (DateFormater) => ToLeones(DateFormater) },
        { title: 'Retail Cost', key: 'retailCost', dataIndex: 'retailCost', sorter: (a, b) => a.retailCost - b.retailCost, render: (data) => ToLeones(data) },
        { title: 'Expiry Date', key: 'expiryDate', dataIndex: 'expiryDate', render: DateFormater },
    ];

    return {
        columns
    }
}

export const useSuppliesItems = (edit = (e?: any) => { }, remove = (e?: any) => { }, removeMessage = "") => {
    const items = useSelector((state: any) => supplyItems(state));
    const rows = items.map(e => ({ ...e, key: e.id }));

    const columns = [
        { title: 'Name', dataIndex: 'itemName', key: 'itemName', ellipsis: true, editable: true },
        { title: 'Description', dataIndex: 'description', key: 'description', ellipsis: true, editable: true },
        { title: 'Quantity', key: 'quantity', dataIndex: 'quantity', align: "center", editable: true, sorter: (a, b) => a.quantity - b.quantity },
        { title: 'Normal', key: 'normalCost', dataIndex: 'normalCost', editable: true, sorter: (a, b) => a.normalCost - b.normalCost, render: (data) => ToLeones(data) },
        { title: 'Wholesale', key: 'wholesaleCost', dataIndex: 'wholesaleCost', editable: true, sorter: (a, b) => a.wholesaleCost - b.wholesaleCost, render: (DateFormater) => ToLeones(DateFormater) },
        { title: 'Retail', key: 'retailCost', dataIndex: 'retailCost', editable: true, sorter: (a, b) => a.retailCost - b.retailCost, render: (data) => ToLeones(data) },
        { title: 'Expiry Date', key: 'expiryDate', dataIndex: 'expiryDate', editable: true, render: DateFormater },
        { title: 'Action', fixed: 'right', dataIndex: 'action', align: 'right', render: (_, record) => Action({ record, edit, show: false, remove, removeMessage }) }
    ];

    return {
        rows,
        columns
    }
}