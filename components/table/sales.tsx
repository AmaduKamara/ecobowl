import { Pagination } from "antd";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { TiPrinter } from "react-icons/ti";
import { Loading, PhoneDetails, preparePages } from ".";
import { PAGE_SIZE } from "../../common";
import { useAuth } from "../../contexts/auth";
import { DateFormater, ToLeones } from "../../hooks";
import { Card } from "../AppLayout";
import { SalesReceipt } from "../receipts/sales";
import { AmountDiscount, ItemsCount } from "../ui/price-content";

export const PhoneTop4 = ({ rows = [] }) => {
    const { app } = useAuth();

    return <>
        {
            rows.length > 0 ? <div className="flex flex-wrap -mx-2">
                {
                    rows.map((row: any, key) =>
                        <PhoneDetails key={key}>
                            <div className="flex flex-1 text-base justify-between items-center">
                                <p className="truncate">{row.invoiceNumber}</p>
                            </div>
                            <ul className="px-2">
                                <li className="flex justify-between text-sm py-2 border-b">
                                    <span>Date:</span>
                                    <span>{DateFormater(row.date)}</span>
                                </li>
                                <li className="flex justify-between text-sm py-2 border-b">
                                    <span>Payment Type:</span>
                                    <span>{row.paymentType}</span>
                                </li>
                                <li className="flex justify-between text-sm py-2 border-b">
                                    <span>Sales Type:</span>
                                    <span>{row.salesType}</span>
                                </li>
                                <li className="flex justify-between text-sm py-2 border-b">
                                    <span>Discount:</span>
                                    <span>{AmountDiscount(row.discount)}</span>
                                </li>
                                <li className="flex justify-between text-sm py-2 border-b">
                                    <span>Total Items:</span>
                                    <span>{ItemsCount(row.items)}</span>
                                </li>
                                <li className="flex justify-between text-sm py-2 border-b">
                                    <span>Amount:</span>
                                    <span>{ToLeones(row.profit)}</span>
                                </li>
                            </ul>
                            <div className="space-x-5 justify-between flex">
                                <button onClick={() => Router.push(`/sales/${row.id}`)} type="button" className="text-xl text-green-500"><FiEye /></button>
                                <p className="text-sm">Amount: {ToLeones(row.profit)}</p>
                                <SalesReceipt record={row} app={app}><TiPrinter className='text-xl text-gray-500' /></SalesReceipt>
                            </div>
                        </PhoneDetails>)
                }
            </div> : <Card className="p-2"><p className="py-8 text-center text-sm">No Data . . .</p></Card>
        }
    </>
}

export const PhoneSalesItem = ({ rows = [] }) => {
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
                items.length > 0 ? <div className="flex flex-wrap -mx-2 mb-3">
                    {items.map((row: any, key) =>
                        <PhoneDetails key={key}>
                            <div className="flex flex-1 text-base justify-between items-center">
                                <p className="truncate">{row.productName}</p>
                            </div>
                            <ul className="px-2 bg-gray-50">
                                <li className="flex justify-between text-sm py-2 border-b">
                                    <span>Quantity:</span>
                                    <span>{row.quantity}</span>
                                </li>
                                <li className="flex justify-between text-sm py-2 border-b">
                                    <span>Discount:</span>
                                    <span>{AmountDiscount(row.discount)}</span>
                                </li>
                                <li className="flex justify-between text-sm py-2">
                                    <span>Amount:</span>
                                    <span>{ToLeones(row.sellingCost)}</span>
                                </li>
                            </ul>
                        </PhoneDetails>)
                    }
                </div> : <Card className="p-2"><p className="py-8 text-center text-sm">No Data . . .</p></Card>
            }
        </div>
    </>
}

export const PhoneSales = ({ rows = [], loading = false }) => {

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const { app } = useAuth();

    const onChange = (e) => {
        setPage(e);
    }

    const filter = () => {
        const list = rows.filter((_, i) => (page <= i + 1 && i + 1 < PAGE_SIZE));
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
            loading ? <Loading /> :
                <div>

                    {
                        items.length > 0 ? <div className="flex flex-wrap -mx-2">
                            {
                                items.map((row: any, key) => <PhoneDetails key={key}>
                                    <div className="flex flex-1  text-base justify-between items-centerr">
                                        <p>{row.invoiceNumber}</p>
                                    </div>
                                    <ul className="px-2 bg-gray-50">
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Payment Type:</span>
                                            <span>{row.paymentType}</span>
                                        </li>
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Date:</span>
                                            <span>{DateFormater(row.date)}</span>
                                        </li>
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Sales Type:</span>
                                            <span>{row.salesType}</span>
                                        </li>
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Discount:</span>
                                            <span>{AmountDiscount(row.discount)}</span>
                                        </li>
                                        <li className="flex justify-between text-sm py-2 border-b">
                                            <span>Total Items:</span>
                                            <span>{ItemsCount(row.items)}</span>
                                        </li>
                                        <li className="flex justify-between text-sm py-2">
                                            <span>Amount:</span>
                                            <span>{ToLeones(row.profit)}</span>
                                        </li>
                                    </ul>
                                    <div className="px-2 pt-2 space-x-5 justify-between flex">
                                        <button onClick={() => Router.push(`/sales/${row.id}`)} type="button" className="text-xl text-green-500"><FiEye /></button>
                                        <p className="text-sm">Amount: {ToLeones(row.profit)}</p>
                                        <SalesReceipt record={row} app={app}><TiPrinter className='text-xl text-gray-500' /></SalesReceipt>
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