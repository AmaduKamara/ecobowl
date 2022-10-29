import { AppLayout, ViewLayout } from '../../components/AppLayout';
import { ApiServer } from '../../api';
import { useState } from 'react';
import Router from 'next/router';
import { Breadcrumb, Tabs } from 'antd';
import Link from 'next/link';
import { HeadTitle } from '../../components/head';
import { AppButton } from '../../components/ui/Button';
import { DateFormater } from '../../hooks';
import { SMTab } from '../../components/ui/Tab';
import { newReward } from '../../interface/event';
import { RewardDrawer } from '../../components/drawer/reward';
import { Reward, Trainees } from '../../components/tabs/event';
import { wrapper } from '../../redux';

const { TabPane } = Tabs;

const ViewEvent = ({ record }) => {
    const [reward, setReward] = useState(newReward);
    const [visible, setVisible] = useState(false);

    console.log(record);


    const addReward = () => {
        setReward({
            description: "",
            id: "",
            eventId: record.id,
            name: ""
        })
        setVisible(true);
    }

    const onClose = (refresh) => {
        setVisible(false);
        if (refresh) Router.reload();
    }

    return (
        <AppLayout logo='../app.png'>
            <HeadTitle title="View Event" />
            <div className='flex justify-between items-center'>
                <Breadcrumb>
                    <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link href='/events'><a>Events</a></Link></Breadcrumb.Item>
                    <Breadcrumb.Item>View Event</Breadcrumb.Item>
                </Breadcrumb>
                <AppButton onClick={addReward}>Add Reward</AppButton>
            </div>
            <ViewLayout>
                <div className='flex lg:flex-col pt:flex-row flex-wrap'>
                    <div className='flex justify-between text-sm px-2 py-3 border-b'>
                        <p>Name:</p><p>{record.name}</p>
                    </div>
                    <div className='flex justify-between text-sm px-2 py-3 border-b'>
                        <p>Institution:</p><p>{record.institution.name}</p>
                    </div>
                    <div className='flex justify-between text-sm px-2 py-3 border-b'>
                        <p>Start Date:</p><p>{DateFormater(record.startDate)}</p>
                    </div>
                    <div className='flex justify-between text-sm px-2 py-3 border-b'>
                        <p>End Date:</p><p>{DateFormater(record.endDate)}</p>
                    </div>
                    <div className='flex px-2 py-3'>
                        <p className='text-sm'>{record.description}</p>
                    </div>
                </div>
                <>
                    {
                        record.id ? <SMTab>
                            <TabPane tab='Reward' key='1'>
                                <Reward records={record.rewards} />
                            </TabPane>
                            <TabPane tab='Trainees' key='2'>
                                <Trainees records={record.trainees} />
                            </TabPane>
                            <TabPane tab='Teams' key='3'>
                                {/* <AntTable
                                columns={columns}
                                rows={rows} /> */}
                            </TabPane>
                            <TabPane tab='Solutions' key='4'>
                                {/* <AntTable
                                columns={columns}
                                rows={rows} /> */}
                            </TabPane>
                        </SMTab> : null
                    }
                </>
            </ViewLayout>
            <RewardDrawer record={reward} visible={visible} onClose={onClose} />
        </AppLayout>
    )
}

export default ViewEvent;

export const getServerSideProps = wrapper.getServerSideProps(() => async (ctx: any) => {

    const { req } = ctx;

    const id = ctx.params.id;

    const response: any = await ApiServer.getOneWithAuth(`/event/${id}`, req)

    return response;
})
