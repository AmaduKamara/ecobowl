import { Breadcrumb } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api, handle401Error } from '../../api';
import { PC } from '../../common';
import { AppLayout } from '../../components/AppLayout';
import { HeadTitle } from '../../components/head';
import {PhoneSales} from '../../components/table/sales';
import { AppButton } from '../../components/ui/Button';
import { EventTeams } from '../../hooks/useEvent';
import { AntTableExpanded } from '../../components/ui/Table';
import { useSales } from '../../hooks/useSales';
import { useWindowSize } from '../../hooks/useWindowSize';
import { setSales } from '../../redux/sales/slice';

const Sales = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);
    api('/sales')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setSales(res));
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }

  const {columns, rows} = useSales();

  const makeSales = () => {
    Router.push('/product/make-sales')
  }

  return (
    <AppLayout>
      <HeadTitle title="Sales" />
      <div className='flex justify-between items-center'>
        <Breadcrumb>
          <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Sales</Breadcrumb.Item>
        </Breadcrumb>
        <AppButton onClick={makeSales}>Make Sales</AppButton>
      </div>
      <div className='mt-5'>
        {
          width > PC ? <AntTableExpanded loading={loading} expandable={EventTeams} columns={columns} rows={rows} /> : 
          <PhoneSales loading={loading} rows={rows} />
        }
      </div>
    </AppLayout>
  )
}

export default Sales;