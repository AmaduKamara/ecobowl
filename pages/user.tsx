import { Breadcrumb, Button } from 'antd';
import type { NextPage } from 'next'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api, handle401Error } from '../api';
import { PC } from '../common';
import { AppLayout } from '../components/AppLayout';
import { UserDrawer } from '../components/drawer/user';
import ViewUser from '../components/drawer/view-user';
import { PhoneUser } from '../components/table/user';
import { AppButton } from '../components/ui/Button';
import { AntTable } from '../components/ui/Table';
import { ShowMessage } from '../contexts/message';
import { useUser } from '../hooks/useUsers';
import { useWindowSize } from '../hooks/useWindowSize';
import { newUser } from '../interface/user';
import { setRoles } from '../redux/roles/slice';
import { setUsers } from '../redux/users/slice';

const Users: NextPage = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [record, setRecord] = useState(newUser);
  const [visible, setVisible] = useState(false);
  const [viewState, setViewState] = useState(false);

  const edit = (record) => {
    setRecord(record);
    setVisible(true);
  }

  const view = (record) => {
    setRecord(record);
    setViewState(true);
  }

  const remove = (record) => {
    setLoading(true);

    api.delete(`/user/${record.id}`)
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

  const { columns } = useUser({ edit, view, remove });

  useEffect(() => {
    fetch();
    roles();
  }, []);

  const roles = () => {
    api('/role')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setRoles(res));
      })
      .catch(handle401Error)
  }

  const fetch = () => {
    setLoading(true);
    api('/user')
      .then((res) => res.data)
      .then((res) => {
        const rows = res.data.map(e => ({ ...e, key: e.id }))
        setRows(rows);
        dispatch(setUsers(res));
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }

  const addUser = () => {
    setVisible(true);
  }

  const onClose = (refresh = false) => {
    setVisible(false);
    setRecord(newUser);
    if (refresh) fetch();
  }

  const closeView = () => {
    setViewState(false);
    setRecord(newUser);
  }

  return (
    <AppLayout>
      <div className='flex justify-between items-center'>
        <Breadcrumb>
          <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Users</Breadcrumb.Item>
        </Breadcrumb>
        <AppButton onClick={addUser}>Add</AppButton>
      </div>

      <div className='mt-5'>
        {
          width > PC ? <AntTable loading={loading} columns={columns} rows={rows} /> :
            <PhoneUser rows={rows} loading={loading} view={view} edit={edit} remove={remove} />
        }
      </div>
      <UserDrawer record={record} visible={visible} onClose={onClose} />
      <ViewUser record={record} visible={viewState} onClose={closeView} />
    </AppLayout>
  )
}

export default Users;