import { AppLayout, ViewLayout } from '../../components/AppLayout';
import { api, handle401Error } from '../../api';
import { Breadcrumb, Tabs } from 'antd';
import Link from 'next/link';
import { DateFormater, ToLeones } from '../../hooks';
import { AntTable } from '../../components/ui/Table';
import { useItems } from '../../hooks/useSupply';
import { HeadTitle } from '../../components/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { newSupply } from '../../interface/supply';
import { PhoneSupplyItem } from '../../components/table/supply';
import { PC } from '../../common';
import { useWindowSize } from '../../hooks/useWindowSize';
import { SMTab } from '../../components/ui/Tab';
import { Loading } from '../../components/table';

const { TabPane } = Tabs;

const MakeSales = () => {
    const [loading, setLoading] = useState(true);
    const [record, setRecord] = useState(newSupply());
    const { width } = useWindowSize();

    const { query } = useRouter();

    const { id } = query;

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        setLoading(true);
        api(`/supply/${id}`)
            .then((res) => res.data)
            .then(({ data }) => {
                setRecord(data);
            })
            .catch(handle401Error)
            .finally(() => setLoading(false));
    }

    const { columns } = useItems();
    const rows = record.items;

    return (
        <AppLayout logo='../app.png'>
            {
                loading ? <Loading />
                    : record.id ? <><HeadTitle title="View Supply" />
                        <Breadcrumb>
                            <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link href='/supply'><a>Supply</a></Link></Breadcrumb.Item>
                            <Breadcrumb.Item>View Supply</Breadcrumb.Item>
                        </Breadcrumb>
                        <ViewLayout>
                            <>
                                <div className='text-sm'>
                                    <div className='flex justify-between  px-2 py-3 border-b'>
                                        <p>Invoice:</p><p>{record.invoiceNumber}</p>
                                    </div>
                                    <div className='flex justify-between  px-2 py-3 border-b'>
                                        <p>Supply Invoice::</p><p>{record.supplyInvoice}</p>
                                    </div>
                                    <div className='flex justify-between px-2 py-3 border-b'>
                                        <p>Date:</p><p>{DateFormater(record.dateSupplied)}</p>
                                    </div>
                                    <div className='flex justify-between px-2 py-3'>
                                        <p>Supplier:</p><p>{ToLeones(record.totalCost)}</p>
                                    </div>
                                </div>
                            </>
                            <>
                                <SMTab>
                                    <TabPane tab='Items' key='1'>
                                        {
                                            width > PC ? <AntTable
                                                columns={columns}
                                                rows={record.items} /> : 
                                                <PhoneSupplyItem rows={rows} />
                                        }
                                    </TabPane>
                                </SMTab>
                            </>
                        </ViewLayout></> : <div className='flex items-end justify-center h-96'><p>No Data Found</p></div>
            }
        </AppLayout>
    )
}

export default MakeSales;