import { Pagination, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { Loading, PhoneDetails, preparePages } from ".";
import { PAGE_SIZE } from "../../common";
import { ToLeones } from "../../hooks";
import { Card } from "../AppLayout";
import { AmountDiscount } from "../ui/price-content";

const PhoneProduct = ({ rows = [], loading = false }) => {
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
                                        <p className="truncate">{row.itemName}</p>
                                    </div>
                                    <ul className="px-2">
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Quantity</span>
                                            <span>{row.inStock}</span>
                                        </li>
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Cost</span>
                                            <span>{ToLeones(row.normalCost)}</span>
                                        </li>
                                        <li className="flex justify-between text-sm py-2">
                                            <span>Wholesale</span>
                                            <span>{ToLeones(row.wholesaleCost)}</span>
                                        </li>
                                    </ul>
                                    <div className="space-x-5 justify-center flex">
                                        <p className="text-sm">Retail Cost: {ToLeones(row.wholesaleCost)}</p>
                                    </div>
                                </PhoneDetails>)
                            }
                        </div> : <Card className="p-2"><p className="py-8 text-center text-sm">No Data . . .</p></Card>
                    }
                    <div className="mt-5">
                        <Pagination onChange={onChange} pageSize={PAGE_SIZE} total={rows.length} />
                    </div>
                </div>
        }
    </>
}

export default PhoneProduct;



export const PhoneProductItem = ({ rows = [], remove = (e?) => { }, edit = (e?) => { } }) => {
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
            <div className="mb-3">
                <div className="mb-5">
                    <Pagination onChange={onChange} pageSize={PAGE_SIZE} total={rows.length} />
                </div>
                {
                    items.length > 0 ? <div className="flex flex-wrap -mx-2">
                        {
                            items.map((row: any, key) =>
                                <PhoneDetails key={key}>
                                    <div className="flex flex-1 justify-between text-base items-center">
                                        <p className="truncate">{row.name}</p>
                                    </div>
                                    <ul className="px-2">
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Discount:</span>
                                            <span>{AmountDiscount(row.discount)}</span>
                                        </li>
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Wholesale:</span>
                                            <span>{ToLeones(row.wholesaleCost)}</span>
                                        </li>
                                        <li className="flex justify-between text-sm py-2">
                                            <span>Retail:</span>
                                            <span>{ToLeones(row.wholesaleCost)}</span>
                                        </li>
                                    </ul>
                                    <div className="space-x-5 flex justify-between">
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
                        }</div>
                        : <Card className="p-2"><p className="py-8 text-center text-sm">No Data . . .</p></Card>
                }
            </div>
        }
    </>
}