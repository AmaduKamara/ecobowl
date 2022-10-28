import { Breadcrumb } from 'antd';
import type { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, handle401Error } from '../api';
import { AppLayout, Card } from '../components/AppLayout';
import { HeadTitle } from '../components/head';
import { AntTable } from '../components/ui/Table';
import { useDispatch } from 'react-redux';
import { setReward } from '../redux/reward/slice';
import { useReward } from '../hooks/useReward';
import { DateField } from '../components/ui/DateField';
import { MonthFormater } from '../hooks';
import { PhoneReward } from '../components/table/reward';
import { PC } from '../common';
import { useWindowSize } from '../hooks/useWindowSize';

const Offer: NextPage = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(MonthFormater(new Date()));

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    fetch();
  }, [value]);

  const fetch = () => {
    const year = value.split("-")[0];
    const month = value.split("-")[1];

    setLoading(true);
    api.get(`/performance/staff/monthly?year=${year}&month=${month}`)
      .then((res) => res.data)
      .then(({ data, success }) => {
        const items = data ? data : [];
        const value = { data: items, success };
        dispatch(setReward(value));
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }

  const onChange = (_, d) => {
    setValue(d);
  }

  const { rows, columns } = useReward();

  return (
    <AppLayout>
      <HeadTitle title="Reward" />
      <div className='flex justify-between'>
        <Breadcrumb>
          <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Montly Reward</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Card className="p-3 mt-5">
        <DateField format='YYYY-MM' picker="month" value={value} onChanged={onChange} />
      </Card>
      <div className='mt-5'>
        {
          width > PC ? <AntTable loading={loading} columns={columns} rows={rows} /> :
            <PhoneReward rows={rows} loading={loading} />
        }
      </div>
    </AppLayout>
  )
}

export default Offer;