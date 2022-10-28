import { ToLeones } from "../../hooks";
import { useSalesItemsColumns } from "../../hooks/useSales";
import { percentage } from "./price-content";
import { AntTableNested } from "./Table";

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

export const SalesItemsTable = (data) => {
    const { items } = data;
    const rows = items.slice(0, 5).map((item, i) => ({ ...item, key: i.toString(), }));

    const { columns } = useSalesItemsColumns();

    return <AntTableNested pagination={false} columns={columns} rows={rows} />;
}