import { AppLayout, ViewLayout } from '../../components/AppLayout';
import { api, handle401Error } from '../../api';
import { Breadcrumb, Tabs } from 'antd';
import Link from 'next/link';
import { DateFormater, ToLeones } from '../../hooks';
import { AntTable } from '../../components/ui/Table';
import { useItems } from '../../hooks/useSales';
import { Discount } from '../../components/ui/SalesContent';
import { SalesReceipt } from '../../components/receipts/sales';
import { HeadTitle } from '../../components/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/auth';
import { newSale } from '../../interface/sales';
import { AppButton } from '../../components/ui/Button';
import { useWindowSize } from '../../hooks/useWindowSize';
import { PhoneSalesItem } from '../../components/table/sales';
import { PC } from '../../common';
import { SMTab } from '../../components/ui/Tab';
import { Loading } from '../../components/table';

const { TabPane } = Tabs;

const MakeSales = () => {
    const { width } = useWindowSize();
    const [loading, setLoading] = useState(true);
    const [record, setRecord] = useState(newSale());

    const { query } = useRouter();

    const { id } = query;

    const { app } = useAuth();

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        setLoading(true);
        api(`/sales/${id}`)
            .then((res) => res.data)
            .then(({ data }) => {
                setRecord(data);
            })
            .catch(handle401Error)
            .finally(() => setLoading(false));
    }

    const { rows, columns } = useItems(record.items);

    return (
        <AppLayout logo='../app.png'>
            {
                loading ?  <Loading />
                    : record.id ? <><HeadTitle title="View Sales" />
                        <Breadcrumb>
                            <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link href='/sales'><a>Sales</a></Link></Breadcrumb.Item>
                            <Breadcrumb.Item>View Sales</Breadcrumb.Item>
                        </Breadcrumb>
                        <ViewLayout>
                            <>
                                <div className='text-sm'>
                                    <div className='flex justify-between  px-2 py-3 border-b'>
                                        <p>Invoice:</p><p>{record.invoiceNumber}</p>
                                    </div>
                                    <div className='flex justify-between  px-2 py-3 border-b'>
                                        <p>Supply Type:</p><p>{record.salesType}</p>
                                    </div>
                                    <div className='flex justify-between px-2 py-3 border-b'>
                                        <p>Date:</p><p>{DateFormater(record.dateSupplied)}</p>
                                    </div>
                                    <div className='flex justify-between px-2 py-3 border-b'>
                                        <p>Payment Type:</p><p>{record.paymentType}</p>
                                    </div>
                                    <div className='flex justify-between px-2 py-3 border-b'>
                                        <p>Discount:</p><p>{Discount(record.discount)}</p>
                                    </div>
                                    <div className='flex justify-between px-2 py-3 border-b'>
                                        <p>Total Cost:</p><p>{ToLeones(record.totalCost)}</p>
                                    </div>
                                    <div className='w-full px-2 py-3'>
                                        <SalesReceipt className='w-full' record={record} app={app}>
                                            <AppButton className='w-full'>Receipt</AppButton>
                                        </SalesReceipt>
                                    </div>
                                </div>
                            </>
                            <>
                                <SMTab>
                                    <TabPane tab='Items' key='1'>
                                        {
                                            width > PC ? <AntTable
                                                columns={columns}
                                                rows={rows} /> :
                                                <PhoneSalesItem rows={rows} />
                                        }
                                    </TabPane>
                                </SMTab>
                            </>
                        </ViewLayout>
                    </> : <div className='flex items-end justify-center h-96'><p>No Data Found</p></div>
            }
        </AppLayout>
    )
}

export default MakeSales;