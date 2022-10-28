import { Pagination, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { Loading, PhoneDetails, preparePages } from ".";
import { PAGE_SIZE } from "../../common";
import { ToLeones } from "../../hooks";
import { Card } from "../AppLayout";

export const PhoneOffer = ({ rows = [], remove = (e?) => { }, edit = (e?) => { }, loading = false }) => {
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
        {
            loading ? <Loading /> :
                <div>

                    {
                        items.length > 0 ? <div className="flex flex-wrap -mx-2">
                            {
                                items.map((row: any, key) => <PhoneDetails key={key}>
                                    <div className="flex flex-1 text-base justify-between items-center">
                                        <p className="truncate">{row.service.name}</p>
                                    </div>
                                    <ul className="px-2 bg-gray-50">
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Cost:</span>
                                            <span>{ToLeones(row.service.cost)}</span>
                                        </li>
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Staff:</span>
                                            <span>{row.staff.givenNames} {row.staff.familyName}</span>
                                        </li>
                                        <li className="flex justify-between text-sm py-2">
                                            <span>Phone:</span>
                                            <span>{row.staff.phone}</span>
                                        </li>
                                    </ul>
                                    <div className="px-2 pt-2 space-x-5 flex justify-between">
                                        <button onClick={() => edit(row)} type="button" className="text-xl text-yellow-500"><FiEdit3 /></button>
                                        <p className="text-sm">Reward: {ToLeones(row.service.staffReward)}</p>
                                        <Popconfirm
                                            placement="topRight"
                                            title="Are you sure to delete this offer?"
                                            onConfirm={() => remove(row)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <button className="text-xl text-red-500"><FiTrash2 /></button>
                                        </Popconfirm>
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