import { useSupplyItemsColumns } from "../../hooks/useSupply";
import { AntTableNested } from "./Table";

export const SupplyItemsTable = (data) => {
    const { items } = data;
    const rows = items.slice(0, 5).map((item, i) => ({ ...item, key: i.toString(), }));

    const { columns } = useSupplyItemsColumns();

    return <AntTableNested pagination={false} columns={columns} rows={rows} />;
}