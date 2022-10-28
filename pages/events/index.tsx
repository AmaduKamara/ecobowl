import { AppLayout } from '../../components/AppLayout';
import { setProducts } from '../../redux/product/slice';
import { api, handle401Error } from "../../api"
import { AntTableExpanded } from '../../components/ui/Table';
import { EventTeams, useEvent } from '../../hooks/useEvent';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { HeadTitle } from '../../components/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppButton } from '../../components/ui/Button';
import { EventDrawer } from '../../components/drawer/events';
import { setInstitute } from '../../redux/institutions/slice';
import { setEvent } from '../../redux/event/slice';

const Product = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [record] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch();
    institutes();
  }, []);

  const fetch = () => {
    setLoading(true);
    api('/event')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setEvent(res));
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }

  const institutes = () => {
    api('/institute')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setInstitute(res));
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }

  const { columns, rows } = useEvent({});

  const addEvent = () => {
    setVisible(true);
  }

  const onClose = (refresh = false) => {
    setVisible(false);
    if (refresh) fetch();
  }

  return (
    <AppLayout>
      <HeadTitle title="Event" />
      <div className='flex justify-between items-center'>
        <Breadcrumb>
          <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Events</Breadcrumb.Item>
        </Breadcrumb>
        <AppButton onClick={addEvent}>Add</AppButton>
      </div>
      <div className='mt-5'>
      <AntTableExpanded loading={loading} expandable={EventTeams} columns={columns} rows={rows} /> 
      </div>
      <EventDrawer record={record} visible={visible} onClose={onClose} />
    </AppLayout>
  )
}

export default Product;