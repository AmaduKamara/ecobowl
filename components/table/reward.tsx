import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { Loading, PhoneDetails, preparePages } from ".";
import { PAGE_SIZE } from "../../common";
import { ToLeones } from "../../hooks";
import { Card } from "../AppLayout";

export const PhoneReward = ({ rows = [], loading = false }) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);

    const onChange = (e) => {
        setPage(e);
    }

    const filter = () => {
        const items = preparePages(page, PAGE_SIZE, rows);
        setItems(items);
    }

    useEffect(() => {
        filter()
    }, [rows]);

    useEffect(() => {
        filter();
    }, [page]);

    return <>
        {loading ? <Loading /> :
            <div>
                {
                    items.length > 0 ? <div className="flex flex-wrap -mx-2">
                        {
                            items.map((row: any, key) => <PhoneDetails key={key}>
                                <div className="flex flex-1 text-base justify-between items-center">
                                    <p className="truncate">{row.staffName}</p>
                                </div>
                                <ul className="px-2 bg-gray-50">
                                    <li className="flex justify-between text-sm py-2 border-b">
                                        <span>Phone:</span>
                                        <span>{row.phone}</span>
                                    </li>
                                    <li className="flex justify-between text-sm py-2">
                                        <span>Total Offer:</span>
                                        <span>{row.totalPerformance}</span>
                                    </li>
                                </ul>
                                <div className="px-2 pt-2 space-x-5 flex justify-between">
                                    <p className="text-sm">Reward: {ToLeones(row.totalReward)}</p>
                                </div>
                            </PhoneDetails>)
                        }
                    </div>
                        : <Card className="p-2"><p className="py-8 text-center text-sm">No Data . . .</p></Card>
                }
                <div className="mt-5">
                    <Pagination onChange={onChange} pageSize={PAGE_SIZE} total={rows.length} />
                </div>
            </div>
        }
    </>
}