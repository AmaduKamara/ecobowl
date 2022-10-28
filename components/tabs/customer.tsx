import Router from "next/router";
import { PC } from "../../common";
import { usePurchases } from "../../hooks/useSales";
import { useWindowSize } from "../../hooks/useWindowSize";
import { PhonePurchase } from "../table/customer";
import { AntTable } from "../ui/Table";

export const Purchases = ({ data }) => {
    const {width} = useWindowSize();

    const view = (e) => {
        Router.push(`/sales/${e.id}`);
    }

    const record = usePurchases(view, data);
    if (width > PC)
    return <AntTable columns={record.columns} rows={record.rows} />
    else return <PhonePurchase rows={data} />
}
