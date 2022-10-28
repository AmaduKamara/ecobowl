import { ColumnsType } from "antd/lib/table";
import { useSelector } from "react-redux";
import { ToLeones } from ".";
import { Cost, Discount, Total } from "../components/ui/price-content";
import { Action } from "../components/ui/Table";
import { productStore } from "../redux/product/selector";
import { itemsStore } from "../redux/sale/selector";

export const useProducts = () => {
    const items = useSelector((state: any) => productStore(state));
    const rows = items.map(e => ({ ...e, key: e.id }));

    const columns: ColumnsType<any> = [
        { title: 'Name', dataIndex: 'itemName', key: 'itemName', fixed: 'left', width: 200, ellipsis: true },
        { title: 'Description', dataIndex: 'description', key: 'description', width: 200, ellipsis: true },
        { title: 'Quantity', key: 'inStock', dataIndex: 'inStock', align: "center", sorter: (a, b) => a.inStock - b.inStock, width: 150 },
        { title: 'Unit Cost', key: 'normalCost', dataIndex: 'normalCost', sorter: (a, b) => a.normalCost - b.normalCost, render: (data) => ToLeones(data), width: 200 },
        { title: 'Wholesale Cost', key: 'wholesaleCost', dataIndex: 'wholesaleCost', sorter: (a, b) => a.wholesaleCost - b.wholesaleCost, render: (DateFormater) => ToLeones(DateFormater), width: 200 },
        { title: 'Retail Cost', key: 'retailCost', dataIndex: 'retailCost', sorter: (a, b) => a.retailCost - b.retailCost, render: (data) => ToLeones(data), width: 200 },
    ];

    return {
        rows,
        columns
    }
}

export const useSaleProducts = (edit, remove, removeMessage) => {
    const items = useSelector((state: any) => itemsStore(state));
    const rows = items.map(e => ({ ...e, key: e.id }));

    const columns: ColumnsType<any> = [
        { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left', width: 250, ellipsis: true },
        { title: 'Quantity', key: 'quantity', dataIndex: 'quantity', align: "center", sorter: (a, b) => a.inStock - b.inStock, width: 100 },
        { title: 'Cost', key: 'cost', align: 'right', render: Cost, width: 200 },
        { title: 'Discount', key: 'discount', align: 'center', render: Discount, width: 80 },
        { title: 'Total', key: 'total', align: 'right', render: Total, width: 200 },
        { title: 'Action', dataIndex: '', key: 'x', align: "right", fixed: 'right', width: 80, render: (_, record) => Action({ record, edit, remove, removeMessage, show: false }) },
    ];

    return {
        rows,
        columns
    }
}