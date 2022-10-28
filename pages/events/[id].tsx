import { useFormik } from 'formik';
import { TabLayout, AppLayout, ViewLayout } from '../../components/AppLayout';
import * as Yup from "yup";
import { api, handle401Error, handleError } from '../../api';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { SelectField } from '../../components/ui/SelectField';
import { DateField } from '../../components/ui/DateField';
import { AntTable, AntTableFooter } from '../../components/ui/Table';
import { Breadcrumb, Select, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, editSales, resetItems } from '../../redux/sale/slice';
import Link from 'next/link';
import { useSaleProducts } from '../../hooks/useProcucts';
import { setProducts } from '../../redux/product/slice';
import { EditItemModel } from '../../components/model/sales';
import { NumberField } from '../../components/ui/NumberField';
import { SalesItemsDrawer } from '../../components/drawer/sales-items';
import { productForSaleStore } from '../../redux/product/selector';
import { Footer } from '../../components/ui/price-content';
import { ShowMessage } from '../../contexts/message';
import { useAuth } from '../../contexts/auth';
import { HeadTitle } from '../../components/head';
import { AppButton } from '../../components/ui/Button';
import { PhoneProductItem } from '../../components/table/product';
import { useWindowSize } from '../../hooks/useWindowSize';
import { PC, PT } from '../../common';
import { DateFormater } from '../../hooks';
import { SMTab } from '../../components/ui/Tab';
import { newEvent } from '../../interface/event';

const { TabPane } = Tabs;

const MakeSales = () => {
    const [item, setItem] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState(newEvent);
    const [customers, setCustomers] = useState([]);
    const [editState, setEditState] = useState(false);
    const { width } = useWindowSize();

    const dispatch = useDispatch();

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        api(`/event/${Router.query.id}`)
            .then((res) => res.data)
            .then((res) => {
                setRecord(res.data);
            })
            .catch(handle401Error);
        
    }

    const edit = (record) => {
        setItem(record);
        setEditState(true);
    }

    const remove = (record) => {
        dispatch(deleteItem(record))
    }

    const { columns, rows } = useSaleProducts(edit, remove, "Are you sure to delete this item?");

    return (
        <AppLayout logo='../app.png'>
            <HeadTitle title="View Event" />
            <Breadcrumb>
                <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link href='/events'><a>Events</a></Link></Breadcrumb.Item>
                <Breadcrumb.Item>View Event</Breadcrumb.Item>
            </Breadcrumb>
            <ViewLayout>
                <div className='flex lg:flex-col pt:flex-row flex-wrap'>
                    <div className='flex justify-between  px-2 py-3 border-b'>
                            <p>Name:</p><p>{record.name}</p>
                        </div>
                        <div className='flex justify-between  px-2 py-3 border-b'>
                            <p>Institution:</p><p>{record.description}</p>
                        </div>
                        <div className='flex justify-between px-2 py-3 border-b'>
                            <p>Start Date:</p><p>{DateFormater(record.dateSupplied)}</p>
                        </div>
                        <div className='flex justify-between px-2 py-3 border-b'>
                            <p>End Date:</p><p>{DateFormater(record.dateSupplied)}</p>
                        </div>
                </div>
                <>
                    <SMTab>
                        <TabPane tab='Teams' key='1'>
                            <AntTable
                                columns={columns}
                                rows={rows} />
                        </TabPane>
                        <TabPane tab='Solutions' key='2'>
                            <AntTable
                                columns={columns}
                                rows={rows} />
                        </TabPane>
                        <TabPane tab='Members' key='3'>
                            <AntTable
                                columns={columns}
                                rows={rows} />
                        </TabPane>
                    </SMTab>
                </>
            </ViewLayout>
        </AppLayout>
    )
}

export default MakeSales;