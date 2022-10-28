import { Breadcrumb } from 'antd';
import type { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api, handle401Error } from '../../api';
import { PC } from '../../common';
import { AppLayout } from '../../components/AppLayout';
import { CustomerDrawer } from '../../components/drawer/customer';
import { HeadTitle } from '../../components/head';
import { PhoneCustomer } from '../../components/table/customer';
import { AppButton } from '../../components/ui/Button';
import { AntTable } from '../../components/ui/Table';
import { ShowMessage } from '../../contexts/message';
import { useCustomer } from '../../hooks/useCustomer';
import { useWindowSize } from '../../hooks/useWindowSize';
import { setCustomer } from '../../redux/customer/slice';

const Customer: NextPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { width } = useWindowSize();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);
    api.get('/customer')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setCustomer(res));
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }

  const edit = (record) => {
    setData(record);
    setVisible(true);
  }

  const remove = (record) => {
    setLoading(true);

    api.delete(`/customer/${record.id}`)
      .then(res => res.data)
      .then(({ message }) => {
        ShowMessage('success', '', message);
        fetch();
      })
      .catch(handle401Error)
      .catch(({ data }) => {
        ShowMessage('warning', '', data.data);
      })
      .finally(() => setLoading(false));
  }

  const { rows, columns } = useCustomer({ edit, remove });

  const [visible, setVisible] = useState(false)
  const [data, setData] = useState(null)

  const addCustomer = () => {
    setVisible(true);
  }

  const onClose = (refresh = false) => {
    setVisible(false);
    if (refresh) fetch();
  }

  return (
    <AppLayout>
      <HeadTitle title="Customer" />
      <div className='flex justify-between items-center'>
        <Breadcrumb>
          <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Customer</Breadcrumb.Item>
        </Breadcrumb>
        <AppButton onClick={addCustomer}>Add</AppButton>
      </div>

      <div className='mt-5'>
        {
          width > PC ? <AntTable loading={loading} scroll={{ x: 1500 }} columns={columns} rows={rows} />
            : <PhoneCustomer loading={loading} rows={rows} edit={edit} remove={remove} />
        }
      </div>
      <CustomerDrawer record={data} visible={visible} onClose={onClose} />
    </AppLayout>
  )
}

export default Customer;