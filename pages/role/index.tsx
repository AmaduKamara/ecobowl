import { Breadcrumb } from 'antd';
import type { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api, handle401Error } from '../../api';
import { PC } from '../../common';
import { AppLayout } from '../../components/AppLayout';
import { HeadTitle } from '../../components/head';
import { RoleModel } from '../../components/model/role';
import { PhoneRole } from '../../components/table/role';
import { AppButton } from '../../components/ui/Button';
import { AntTable } from '../../components/ui/Table';
import { ShowMessage } from '../../contexts/message';
import { useRole } from '../../hooks/useRole';
import { useWindowSize } from '../../hooks/useWindowSize';
import { setRoles } from '../../redux/roles/slice';

const Role: NextPage = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);
    api('/role')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setRoles(res));
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }

  const addRole = () => {
    setVisible(true);
  }

  const onClose = (refresh = false) => {
    setVisible(false);
    setRecord(null);
    if (refresh) fetch();
  }

  const edit = (record) => {
    setRecord(record);
    setVisible(true);
  }

  const remove = (record) => {
    setLoading(true);

    api.delete(`/role/${record.id}`)
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

  const { columns, rows } = useRole({ remove, edit });

  return (
    <AppLayout>
      <HeadTitle title="Role" />
      <div className='flex justify-between items-center'>
        <Breadcrumb>
          <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Roles</Breadcrumb.Item>
        </Breadcrumb>
        <AppButton onClick={addRole}>Add</AppButton>
      </div>

      <div className='mt-5'>
        {
          width > PC ? <AntTable loading={loading} columns={columns} rows={rows} />
            : <PhoneRole loading={loading} rows={rows} edit={edit} remove={remove} />
        }
      </div>
      <RoleModel open={visible} record={record} handleClose={onClose} />
    </AppLayout>
  )
}

export default Role;