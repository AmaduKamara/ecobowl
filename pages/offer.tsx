import { Breadcrumb } from 'antd';
import type { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, handle401Error } from '../api';
import { AppLayout } from '../components/AppLayout';
import { OfferDrawer } from '../components/drawer/offer';
import { HeadTitle } from '../components/head';
import { AntTable } from '../components/ui/Table';
import { useOffer } from '../hooks/useOffer';
import { setService } from '../redux/service/slice';
import { setStaff } from '../redux/staff/slice';
import { useDispatch } from 'react-redux';
import { setOffer } from '../redux/offer/slice';
import { AppButton } from '../components/ui/Button';
import { ShowMessage } from '../contexts/message';
import { PC } from '../common';
import { PhoneOffer } from '../components/table/offer';
import { useWindowSize } from '../hooks/useWindowSize';

const Offer: NextPage = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState({ id: "", staff: { id: "" }, service: { id: "" }, date: "" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch();
    fetchService();
    fetchStaff();
  }, []);

  const fetch = () => {
    setLoading(true);
    api('/performance')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setOffer(res));
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }

  const fetchService = () => {
    api.get('/service')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setService(res));
      })
      .catch(handle401Error);
  }

  const fetchStaff = () => {
    api('/staff')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setStaff(res));
      })
      .catch(handle401Error);
  }

  const edit = (record) => {
    setRecord(record);
    setVisible(true);
  }

  const remove = (record) => {
    setLoading(true);

    api.delete(`/performance/${record.id}`)
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

  const { rows, columns } = useOffer({ edit, remove });

  const addCustomer = () => {
    setVisible(true);
  }

  const onClose = (refresh = false) => {
    setVisible(false);
    setRecord({ id: "", staff: { id: "" }, service: { id: "" }, date: "" });
    if (refresh) fetch();
  }

  return (
    <AppLayout>
      <HeadTitle title="Service Offer" />
      <div className='flex justify-between items-center'>
        <Breadcrumb>
          <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Service Offer</Breadcrumb.Item>
        </Breadcrumb>
        <AppButton onClick={addCustomer}>Offer</AppButton>
      </div>

      <div className='mt-5'>
        {
          width > PC ? <AntTable loading={loading} columns={columns} rows={rows} /> :
            <PhoneOffer loading={loading} rows={rows} edit={edit} remove={remove} />
        }
      </div>
      <OfferDrawer record={record} visible={visible} onClose={onClose} />
    </AppLayout>
  )
}

export default Offer;