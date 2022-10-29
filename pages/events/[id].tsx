import { AppLayout, ViewLayout } from '../../components/AppLayout';
import { api, ApiServer, handle401Error } from '../../api';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { Breadcrumb, Tabs } from 'antd';
import Link from 'next/link';
import { HeadTitle } from '../../components/head';
import { AppButton } from '../../components/ui/Button';
import { DateFormater } from '../../hooks';
import { SMTab } from '../../components/ui/Tab';
import { newReward } from '../../interface/event';
import { RewardDrawer } from '../../components/drawer/reward';
import { Reward, Solutions, Teams, Trainees } from '../../components/tabs/event';
import { wrapper } from '../../redux';

const { TabPane } = Tabs;

const ViewEvent = ({ record }) => {
    const [reward, setReward] = useState(newReward);
    const [rewards, setRewards] = useState([]);
    const [trainees, setTrainees] = useState([]);
    const [teams, setTeams] = useState([]);
    const [solutions, setSolutions] = useState([]);
    const [visible, setVisible] = useState(false);
    const [RLoading, setRLoading] = useState(true);
    const [SLoading, setSLoading] = useState(true);
    const [TMLoading, setTMLoading] = useState(true);
    const [TLoading, setTLoading] = useState(true);

    useEffect(() => {
        rewardsFN();
        teamsFN();
        solutionsFN();
        traineesFN();
    }, [])

    const rewardsFN = () => {
        setRLoading(true);

        api(`/reward/event/${record.id}`)
            .then((res) => res.data)
            .then(({ data }) => {
                setRewards(data);
            })
            .catch(handle401Error)
            .finally(() => setRLoading(false));
    }

    const teamsFN = () => {
        setTMLoading(true);

        api(`/team/event/${record.id}`)
            .then((res) => res.data)
            .then(({ data }) => {
                setTeams(data);
            })
            .catch(handle401Error)
            .finally(() => setTMLoading(false));
    }

    const solutionsFN = () => {
        api(`/solution/event/${record.id}`)
            .then((res) => res.data)
            .then(({ data }) => {
                setSolutions(data);
            })
            .catch(handle401Error)
            .finally(() => setSLoading(false));
    }

    const traineesFN = () => {
        api(`/trainee/event/${record.id}`)
            .then((res) => res.data)
            .then(({ data }) => {
                setTrainees(data);
            })
            .catch(handle401Error)
            .finally(() => setTLoading(false));
    }

    const addReward = () => {
        setReward({
            description: "",
            id: "",
            eventId: record.id,
            position: "",
            name: ""
        })
        setVisible(true);
    }

    const onClose = (refresh) => {
        setVisible(false);
        if (refresh) rewardsFN();
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
                                <Reward records={rewards} loading={RLoading} />
                            </TabPane>
                            <TabPane tab='Trainees' key='2'>
                                <Trainees records={trainees} loading={TLoading} />
                            </TabPane>
                            <TabPane tab='Teams' key='3'>
                                <Teams records={teams} loading={TMLoading} />
                            </TabPane>
                            <TabPane tab='Solutions' key='4'>
                                <Solutions records={solutions} loading={SLoading} />
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
