import { AppLayout, Card } from '../components/AppLayout';
import { CountChat } from '../components/chart/count';
import { BarChat } from '../components/chart/Bar';
import { setSales } from '../redux/sales/slice';
import { api, handle401Error } from '../api';
import Last4 from '../components/chart/Last4';
import { useAuth } from '../contexts/auth';
import { HeadTitle } from '../components/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DoughnutChat } from '../components/chart/Doughnut';
import { Loading } from '../components/table';

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState({ counters: [], salesChart: { labels: [], data: [] }, serviceChart: { labels: [], data: [] } });

  const { user } = useAuth();

  // useEffect(() => {
  //   fetch();
  //   sales();
  // }, []);

  const fetch = () => {
    setLoading(true);
    api("/dashboard")
      .then((res) => res.data)
      .then(({ data }) => {
        setRecord(data);
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }


  const sales = () => {
    api('/sales')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setSales(res));
      })
      .catch(handle401Error);
  }

  return (
    <AppLayout>
      {
        loading ? <div className='flex items-end justify-center h-96'><Loading /></div>
          : record ? <>
            <HeadTitle title="Dashboard" />
            <CountChat record={record.counters} />
            <div className='space-y-3 lg:space-y-0 flex lg:-mx-2 lg:flex-row flex-col mb-3 lg:mb-5'>
              <div className='lg:w-2/3 w-full lg:px-2 lg:pr-5'>
                <BarChat labels={record.salesChart.labels} records={record.salesChart.data} />
              </div>
              <div className='lg:w-1/3 lg:pr-2 w-full'>
                <DoughnutChat labels={record.serviceChart.labels} records={record.serviceChart.data} />
              </div>
            </div>
            <div className='flex md:space-x-5 space-y-3 md:space-y-0 flex-col md:flex-row'>
              <div className='lg:w-3/4 pt:w-full w-full'>
                <Last4 />
              </div>
              <div className='lg:w-1/4 lg:block pt:hidden md:hidden w-full'>
                {
                  user ? <Card className='bg-white pt-5 px-5 rounded-lg'>
                  <div className='text-sm'>
                    <div className='flex border-b pb-1'>
                      <p className='truncate text-base'>{`${user.firstName} ${user.lastName}`}</p>
                    </div>
                    <div className='flex justify-between py-3 border-b'>
                      <p>Email:</p><p className='truncate text-right'>{user.email}</p>
                    </div>
                    <div className='flex justify-between py-3 border-b'>
                      <p>Phone:</p><p>{user.phone}</p>
                    </div>
                    <div className='flex justify-between py-3'>
                      <p>Role:</p><p>{user.role.name}</p>
                    </div>
                  </div>
                </Card> : null
                }
              </div>
            </div>
          </> : <div className='flex items-end justify-center h-96'><p>No Data Found</p></div>
      }
    </AppLayout>
  )
}

export default Home;
