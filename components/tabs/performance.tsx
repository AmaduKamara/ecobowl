import { PC } from "../../common";
import { usePerformance } from "../../hooks/useStaff";
import { useWindowSize } from "../../hooks/useWindowSize";
import { PhonePerformance } from "../table/staff";
import { AntTable } from "../ui/Table";

export const Performance = ({ data }) => {

    const { width } = useWindowSize();

    const { columns, rows } = usePerformance(data);

    if (width > PC)
        return <AntTable columns={columns} rows={rows} />
    else return <PhonePerformance rows={data} />
}
