import { Breadcrumb } from 'antd';
import type { NextPage } from 'next'
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { api, ApiServer, handle401Error } from '../api';
import { AppLayout } from '../components/AppLayout';
import { UserDrawer } from '../components/drawer/user';
import ViewUser from '../components/drawer/view-user';
import { AppButton } from '../components/ui/Button';
import { AntTable } from '../components/ui/Table';
import { ShowMessage } from '../contexts/message';
import { useUser } from '../hooks/useUsers';
import { newUser } from '../interface/user';
import { wrapper } from '../redux';
import { setUsers } from '../redux/users/slice';

const Users: NextPage = () => {
  const [loading, setLoading] = useState(false);
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
        Router.reload();
      })
      .catch(handle401Error)
      .catch(({ data }) => {
        ShowMessage('warning', '', data.message);
      })
      .finally(() => setLoading(false));
  }

  const { columns, rows } = useUser({ edit, view, remove });

  const addUser = () => {
    setVisible(true);
  }

  const onClose = (refresh = false) => {
    setVisible(false);
    setRecord(newUser);
    if (refresh) Router.reload();
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
         <AntTable loading={loading} columns={columns} rows={rows} />
      </div>
      <UserDrawer record={record} visible={visible} onClose={onClose} />
      <ViewUser record={record} visible={viewState} onClose={closeView} />
    </AppLayout>
  )
}

export default Users;

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx: any) => {

  const { req } = ctx;

  const response: any = await ApiServer.getWithAuth("/user", req, store, setUsers);

  return response;
})