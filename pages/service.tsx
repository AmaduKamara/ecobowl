import { Breadcrumb } from 'antd';
import type { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api, handle401Error } from '../api';
import { PC } from '../common';
import { AppLayout } from '../components/AppLayout';
import { ServiceDrawer } from '../components/drawer/service';
import { HeadTitle } from '../components/head';
import { PhoneService } from '../components/table/service';
import { AppButton } from '../components/ui/Button';
import { AntTable } from '../components/ui/Table';
import { ShowMessage } from '../contexts/message';
import { useService } from '../hooks/useService';
import { useWindowSize } from '../hooks/useWindowSize';
import { setService } from '../redux/service/slice';

const Service: NextPage = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);
    api('/service')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setService(res));
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }

  const edit = (record) => {
    setRecord(record);
    setVisible(true);
  }

  const remove = (record) => {
    setLoading(true);

    api.delete(`/service/${record.id}`)
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

  const { columns, rows } = useService({ edit, remove });

  const addService = () => {
    setVisible(true);
  }

  const onClose = (refresh = false) => {
    setVisible(false);
    if (refresh) fetch();
  }

  return (
    <AppLayout>
      <HeadTitle title="Service" />
      <div className='flex justify-between items-center'>
        <Breadcrumb>
          <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Service</Breadcrumb.Item>
        </Breadcrumb>
        <AppButton onClick={addService}>Add</AppButton>
      </div>

      <div className='mt-5'>
        {
          width > PC ? <AntTable loading={loading} columns={columns} rows={rows} /> :
            <PhoneService rows={rows} edit={edit} remove={remove} loading={loading} />
        }
      </div>
      <ServiceDrawer record={record} visible={visible} onClose={onClose} />
    </AppLayout>
  )
}

export default Service;