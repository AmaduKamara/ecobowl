import { AppLayout, ViewLayout } from '../../components/AppLayout';
import { api, handle401Error } from '../../api';
import { Breadcrumb, Tabs } from 'antd';
import Link from 'next/link';
import { SMTab } from '../../components/ui/Tab';
import { Purchases } from '../../components/tabs/event';
import { HeadTitle } from '../../components/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { newCustomer } from '../../interface/customer';
import { SpinnerAlt } from '../../components/ui/Spinner';

const { TabPane } = Tabs;

const ViewCustomer = () => {

    const [loading, setLoading] = useState(true);
    const [record, setRecord] = useState(newCustomer);

    const { query } = useRouter();

    const { id } = query;

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        setLoading(true);
        api.get(`/customer/${id}`)
            .then((res) => res.data)
            .then(({ data }) => {
                setRecord(data);
            })
            .catch(handle401Error)
            .finally(() => setLoading(false));
    }

    return (
        <AppLayout logo='../app.png'>
            {loading ? <div className='flex items-end justify-center h-96'><SpinnerAlt className='w-24 h-24' /></div>
                : record.id ? <>
                    <HeadTitle title="View Customer" />
                    <Breadcrumb>
                        <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link href='/customer'><a>Customer</a></Link></Breadcrumb.Item>
                        <Breadcrumb.Item>View Customer</Breadcrumb.Item>
                    </Breadcrumb>
                    <ViewLayout>
                        <>
                            <p className="text-base font-semibold pb-2">{`${record.givenNames} ${record.familyName}`}</p>
                            <div className='text-sm border-t'>
                                <div className='flex justify-between  px-2 py-3 border-b'>
                                    <p>Gender:</p><p>{record.gender}</p>
                                </div>
                                <div className='flex justify-between border-b  px-2 py-3'>
                                    <p>Address:</p><p>{record.address}</p>
                                </div>
                                <div className='flex justify-between  px-2 py-3 border-b'>
                                    <p>Email:</p><p>{record.email}</p>
                                </div>
                                <div className='flex justify-between px-2 pt-3 pb-1'>
                                    <p>Phone:</p><p>{record.phone}</p>
                                </div>
                            </div>
                        </>
                        <>
                            <SMTab>
                                <TabPane tab='Purchases' key='1'>
                                    <Purchases data={record.purchases} />
                                </TabPane>
                            </SMTab>
                        </>
                    </ViewLayout>
                </> : <div className='flex items-end justify-center h-96'><p>No Data Found</p></div>
            }
        </AppLayout>
    )
}

export default ViewCustomer;