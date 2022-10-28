import { Pagination, Popconfirm } from "antd";
import Router from "next/router";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { FaUserShield } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { Loading, PhoneDetails, preparePages } from ".";
import { PAGE_SIZE } from "../../common";
import { Card } from "../AppLayout";

export const PhoneRole = ({ rows = [], remove = (e?) => { }, edit = (e?) => { }, loading = false }) => {
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
                                    <div className="flex flex-1 pb-1 text-base justify-between items-center">
                                        <p className="truncate">{row.name}</p>
                                    </div>
                                    <ul className="px-2 bg-gray-50">
                                        <li className="flex justify-between text-sm py-2">
                                            <span className="truncate">{row.description}</span>
                                        </li>
                                    </ul>
                                    <div className="px-2 pt-2 space-x-5 flex justify-between">
                                        <button onClick={() => { Router.push(`/role/${row.id}`) }} type="button" className="text-xl text-green-500" ><FaUserShield /></button>
                                        {
                                            row.name !== "Owner" ? <button onClick={() => edit(row)} type="button" className="text-xl text-yellow-500"><FiEdit3 /></button> : null
                                        }
                                        {
                                            row.name !== "Owner" ? <Popconfirm
                                                placement="topRight"
                                                title="Are you sure to delete this role?"
                                                onConfirm={() => remove(row)}
                                                okText="Yes"
                                                okType="danger"
                                                cancelText="No"
                                            >
                                                <button className="text-xl text-red-500"><BiTrash /></button>
                                            </Popconfirm> : null
                                        }
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