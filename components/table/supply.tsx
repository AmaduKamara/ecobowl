import { Pagination, Popconfirm } from "antd";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FiEdit3, FiEye, FiTrash2 } from "react-icons/fi";
import { Loading, PhoneDetails, PhoneRow, preparePages } from ".";
import { PAGE_SIZE } from "../../common";
import { DateFormater, ToLeones } from "../../hooks";
import { Card } from "../AppLayout";

export const PhoneSupply = ({ rows = [], loading = false }) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const size = 5;

    const onChange = (e) => {
        setPage(e);
    }

    const filter = () => {
        const items = preparePages(page, size, rows);
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
                    {items.length > 0 ? <div className="flex flex-wrap -mx-2">
                        {
                            items.map((row: any, key) =>
                                <PhoneDetails key={key}>
                                    <div className="flex flex-1 pb-1 text-base justify-between items-center">
                                        <p className="truncate">{row.invoiceNumber}</p>
                                    </div>
                                    <ul className="px-2 bg-gray-50">
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Date</span>
                                            <span>{DateFormater(row.dateSupplied)}</span>
                                        </li>
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Supply Invoice</span>
                                            <span>{row.supplyInvoice}</span>
                                        </li>
                                    </ul>
                                    <div className="px-2 pt-2 space-x-5 flex justify-between">
                                        <button onClick={() => Router.push(`/supply/${row.id}`)} type="button" className="text-xl text-green-500"><FiEye /></button>
                                        <p className="text-sm">Total Cost: {ToLeones(row.totalCost)}</p>

                                    </div>
                                </PhoneDetails>)
                        }
                    </div>
                        : <Card className="p-2"><p className="py-8 text-center text-sm">No Data . . .</p></Card>
                    }
                    <div className="flex justify-center mt-10">
                        <Pagination onChange={onChange} pageSize={size} total={rows.length} />
                    </div>
                </div>
        }
    </>
}

export const PhoneSupplyItem = ({ rows = [] }) => {
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
        <div>
            <div className="mb-5">
                <Pagination onChange={onChange} pageSize={PAGE_SIZE} total={rows.length} />
            </div>
            {
                items.length ? <div className="flex flex-wrap -mx-2">
                    {
                        items.map((row: any, key) => <PhoneDetails key={key}>
                            <div className="flex flex-1 pb-1 text-base justify-between items-center">
                                <p className="truncate">{row.itemName}</p>
                            </div>
                            <ul className="px-2 bg-gray-50">
                                <li className="flex justify-between text-sm py-2 border-b">
                                    <span>Quantity:</span>
                                    <span>{row.quantity}</span>
                                </li>
                                <li className="flex justify-between text-sm py-2 border-b">
                                    <span>Cost:</span>
                                    <span>{ToLeones(row.normalCost)}</span>
                                </li>
                                <li className="flex justify-between text-sm py-2 border-b">
                                    <span>Wholesale:</span>
                                    <span>{ToLeones(row.wholesaleCost)}</span>
                                </li>
                                <li className="flex justify-between text-sm py-2 border-b">
                                    <span>Retail:</span>
                                    <span>{ToLeones(row.retailCost)}</span>
                                </li>
                                <li className="flex justify-between text-sm py-2">
                                    <span>Expiry Date:</span>
                                    <span>{ToLeones(row.expiryDate)}</span>
                                </li>
                            </ul>
                        </PhoneDetails>)
                    }
                </div> : <Card className="p-2"><p className="py-8 text-center text-sm">No Data . . .</p></Card>
            }
        </div>
    </>
}

export const PhoneSupplyEditItem = ({ rows = [], edit = (e?) => { }, remove = (e?) => { } }) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const size = 5;

    const onChange = (e) => {
        setPage(e);
    }

    const filter = () => {
        const list = rows.filter((_, i) => (page <= i + 1 && i + 1 < size));
        setItems(list);
    }

    useEffect(() => {
        filter()
    }, [rows]);

    useEffect(() => {
        filter();
    }, [page]);

    return <>
        {
            items.length > 0 ?
                <div className="mb-3">
                    <div className="mb-5">
                        <Pagination onChange={onChange} pageSize={size} total={rows.length} />
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        {
                            items.map((row: any, key) => <PhoneDetails key={key}>
                                <div className="flex flex-1 pb-1 justify-between items-center">
                                    <p className="truncate">{row.itemName}</p>
                                </div>
                                <ul className="px-2 bg-gray-50">
                                    <li className="flex justify-between text-sm py-2 border-b">
                                        <span>Cost</span>
                                        <span>{ToLeones(row.normalCost)}</span>
                                    </li>
                                    <li className="flex justify-between text-sm py-2 border-b">
                                        <span>Wholesale</span>
                                        <span>{ToLeones(row.wholesaleCost)}</span>
                                    </li>
                                    <li className="flex justify-between text-sm py-2 border-b">
                                        <span>Total Items</span>
                                        <span>{ToLeones(row.retailCost)}</span>
                                    </li>
                                    <li className="flex justify-between text-sm py-2 border-b">
                                        <span>Expiry Date</span>
                                        <span>{DateFormater(row.expiryDate)}</span>
                                    </li>
                                </ul>
                                <div className="px-2 pt-2 space-x-5 flex justify-between">
                                    <button onClick={() => edit(row)} type="button" className="text-xl text-yellow-500"><FiEdit3 /></button>
                                    <p className="text-sm">Qty: {row.quantity}</p>
                                    <Popconfirm
                                        placement="topRight"
                                        title="Are you sure to delete this item?"
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
                </div> : <Card className="p-2 mb-3"><p className="py-8 text-center text-sm">No Data . . .</p></Card>
        }
    </>
}

