import { Breadcrumb } from 'antd';
import type { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api, handle401Error } from '../../api';
import { PC } from '../../common';
import { AppLayout } from '../../components/AppLayout';
import { StaffDrawer } from '../../components/drawer/staff';
import { HeadTitle } from '../../components/head';
import { PhoneStaff } from '../../components/table/staff';
import { AppButton } from '../../components/ui/Button';
import { AntTable } from '../../components/ui/Table';
import { ShowMessage } from '../../contexts/message';
import { useStaff } from '../../hooks/useStaff';
import { useWindowSize } from '../../hooks/useWindowSize';
import { setStaff } from '../../redux/staff/slice';

const Staff: NextPage = () => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);
    api('/staff')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setStaff(res));
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

    api.delete(`/staff/${record.id}`)
      .then(res => res.data)
      .then(({ message }) => {
        ShowMessage('success', '', message);
        fetch();
      })
      .catch(handle401Error)
      .catch(({ data }) => {
        ShowMessage('warning', '', data.message);
      })
      .finally(() => setLoading(false));
  }

  const { columns, rows } = useStaff({ edit, remove });


  const addStaff = () => {
    setVisible(true);
  }

  const onClose = (refresh = false) => {
    setVisible(false);
    if (refresh) fetch();
  }

  return (
    <AppLayout>
      <HeadTitle title="Staff" />
      <div className='flex justify-between items-center'>
        <Breadcrumb>
          <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Staff</Breadcrumb.Item>
        </Breadcrumb>
        <AppButton onClick={addStaff}>Add</AppButton>
      </div>
      <div className='mt-5'>
        {
          width > PC ? <AntTable loading={loading} scroll={{ x: 1500 }} columns={columns} rows={rows} /> :
            <PhoneStaff remove={remove} edit={edit} rows={rows} loading={loading} />
        }
      </div>
      <StaffDrawer record={record} visible={visible} onClose={onClose} />
    </AppLayout>
  )
}

export default Staff;