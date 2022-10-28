import { Breadcrumb } from 'antd';
import type { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api, handle401Error } from '../api';
import { AppLayout } from '../components/AppLayout';
import { InstitutionDrawer } from '../components/drawer/institution';
import { HeadTitle } from '../components/head';
import { AppButton } from '../components/ui/Button';
import { AntTable } from '../components/ui/Table';
import { ShowMessage } from '../contexts/message';
import { useInstitution } from '../hooks/useInstitution';
import { setInstitute } from '../redux/institutions/slice';

const Institutions: NextPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);
    api('/institute')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setInstitute(res));
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

    api.delete(`/institute/${record.id}`)
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

  const { columns, rows } = useInstitution({ edit, remove });

  const addInstitute = () => {
    setVisible(true);
  }

  const onClose = (refresh = false) => {
    setVisible(false);
    if (refresh) fetch();
  }

  return (
    <AppLayout>
      <HeadTitle title="Institutions" />
      <div className='flex justify-between items-center'>
        <Breadcrumb>
          <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Institutions</Breadcrumb.Item>
        </Breadcrumb>
        <AppButton onClick={addInstitute}>Add</AppButton>
      </div>

      <div className='mt-5'>
        <AntTable loading={loading} columns={columns} rows={rows} />
      </div>
      <InstitutionDrawer record={record} visible={visible} onClose={onClose} />
    </AppLayout>
  )
}

export default Institutions;