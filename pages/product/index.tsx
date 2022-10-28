import { AppLayout } from '../../components/AppLayout';
import { setProducts } from '../../redux/product/slice';
import { api, handle401Error } from "../../api"
import { useProducts } from '../../hooks/useProcucts';
import { AntTable } from '../../components/ui/Table';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import { HeadTitle } from '../../components/head';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppButton } from '../../components/ui/Button';
import { useWindowSize } from '../../hooks/useWindowSize';
import PhoneProduct from '../../components/table/product';
import { PC, PT } from '../../common';

const Product = () => {
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);
    api('/product')
      .then((res) => res.data)
      .then((res) => {
        dispatch(setProducts(res));
      })
      .catch(handle401Error)
      .finally(() => setLoading(false));
  }

  const { columns, rows } = useProducts();

  const makeSales = () => {
    Router.push('/product/make-sales');
  }

  return (
    <AppLayout>
      <HeadTitle title="Product" />
      <div className='flex justify-between items-center'>
        <Breadcrumb>
          <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item>Products</Breadcrumb.Item>
        </Breadcrumb>
        <AppButton onClick={makeSales}>Make Sales</AppButton>
      </div>
      <div className='mt-5'>
        {
          width > PC && PT < width ? <AntTable loading={loading} columns={columns} rows={rows} /> : <PhoneProduct loading={loading} rows={rows} />
        }
      </div>
    </AppLayout>
  )
}

export default Product;