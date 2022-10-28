import { AppLayout, ViewLayout } from '../../components/AppLayout';
import { api, handle401Error } from '../../api';
import { Breadcrumb, Tabs } from 'antd';
import Link from 'next/link';
import { SMTab } from '../../components/ui/Tab';
import { HeadTitle } from '../../components/head';
import { Performance } from '../../components/tabs/performance';
import { useEffect, useState } from 'react';
import { newStaff } from '../../interface/staff';
import { useRouter } from 'next/router';
import { Loading } from '../../components/table';

const { TabPane } = Tabs;

const ViewCustomer = () => {
    const [loading, setLoading] = useState(true);
    const [record, setRecord] = useState(newStaff());

    const { query } = useRouter();

    const { id } = query;

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        setLoading(true);
        api(`/staff/${id}`)
            .then((res) => res.data)
            .then(({ data }) => {
                setRecord(data);
            })
            .catch(handle401Error)
            .finally(() => setLoading(false));
    }

    return (
        <AppLayout logo='../app.png'>
            {
                loading ?  <Loading />
                    : record.id ? <>
                        <HeadTitle title="View Staff" />
                        <Breadcrumb>
                            <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link href='/staff'><a>Staff</a></Link></Breadcrumb.Item>
                            <Breadcrumb.Item>View Staff</Breadcrumb.Item>
                        </Breadcrumb>
                        <ViewLayout>
                            <>
                                <p className="text-base pb-2 font-semibold">{`${record.givenNames} ${record.familyName}`}</p>
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
                                    <TabPane tab='Performance' key='1'>
                                        <Performance data={record.performances} />
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