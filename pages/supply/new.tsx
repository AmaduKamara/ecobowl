import { useFormik } from 'formik';
import { AppLayout, TabLayout, ViewLayout } from '../../components/AppLayout';
import { InputField } from '../../components/ui/InputField';
import * as Yup from "yup";
import { api, handleError } from '../../api';
import { useState } from 'react';
import Router from 'next/router';
import SupplyDrawer from '../../components/drawer/supply';
import { useSuppliesItems } from '../../hooks/useSupply';
import { DateField } from '../../components/ui/DateField';
import { AntTable } from '../../components/ui/Table';
import { Breadcrumb } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteItem, resetItems } from '../../redux/supply/supply.slice';
import Link from 'next/link';
import { ShowMessage } from '../../contexts/message';
import { HeadTitle } from '../../components/head';
import { FromCSV } from '../../components/FromCSV';
import { AppButton } from '../../components/ui/Button';
import { FromExcel } from '../../components/FromExcel';
import { PhoneSupplyEditItem } from '../../components/table/supply';
import { PC } from '../../common';
import { useWindowSize } from '../../hooks/useWindowSize';

const NewSupplies = () => {
    const dispatch = useDispatch();
    const { width } = useWindowSize();
    const [item, setItem] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const edit = (record) => {
        setItem(record);
        setOpen(true);
    }

    const remove = (record) => {
        dispatch(deleteItem(record))
    }

    const items = useSuppliesItems(edit, remove, "Are you sure to delete this item?");


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setItem(null);
        setOpen(false);
    };

    const back = () => {
        Router.back();
    }

    const validationSchema = Yup.object({
        supplyInvoice: Yup.string()
            .required(),
        dateSupplied: Yup.date()
            .required()
    });

    const formik = useFormik({
        initialValues: {
            supplyInvoice: "",
            dateSupplied: new Date().toISOString()
        },
        validationSchema,
        onSubmit: values => {
            if (items.rows.length === 0) return;

            setLoading(true)

            api.post("/supply", { ...values, items: items.rows })
                .then(res => res.data)
                .then(({ message }) => {
                    ShowMessage('success', 'New Supply', message);
                    Router.push('/supply')
                    dispatch(resetItems())
                })
                .catch(handleError)
                .catch(err => { })
                .finally(() => setLoading(false))
        },
    });

    return (
        <AppLayout logo='../app.png'>
            <HeadTitle title="New Supply" />
            <Breadcrumb>
                <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link href='/supply'><a>Supply</a></Link></Breadcrumb.Item>
                <Breadcrumb.Item>New Supplie</Breadcrumb.Item>
            </Breadcrumb>
            <form onSubmit={formik.handleSubmit}>
                <TabLayout>
                    <div className='flex lg:flex-col flex-wrap'>
                        <div className='p-2 w-full md:w-1/3 lg:w-full'>
                            <DateField
                                required
                                label='Supplied Date'
                                value={formik.values.dateSupplied}
                                onChange={(date) => {
                                    if (date) formik.setFieldValue('dateSupplied', date)
                                }}
                                error={formik.touched.dateSupplied && formik.errors.dateSupplied ? formik.errors.dateSupplied : ""}
                            />
                        </div>
                        <div className='p-2 w-full md:w-1/3 lg:w-full'>
                            <InputField
                                required
                                label='Supply Invoice'
                                placeholder="Supply Invoice"
                                value={formik.values.supplyInvoice}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.supplyInvoice && formik.errors.supplyInvoice ? formik.errors.supplyInvoice : ""}
                                name='supplyInvoice' />
                        </div>
                        <div className='border-t p-2 items-end w-full md:w-1/3 lg:w-full mt-10 md:mt-0 pt-3 md:pt-0 md:border-0 flex space-x-3'>
                            <div className="w-full">
                                <AppButton
                                    outline
                                    onClick={() => back()}
                                    className="w-full">Cancel</AppButton>
                            </div>
                            <div className="w-full">
                                <AppButton
                                    loading={isLoading}
                                    className="w-full"
                                    type="submit">Save</AppButton>
                            </div>
                        </div>

                    </div>
                    <>
                        <div className='flex justify-between items-center border-b pb-3 mb-4'>
                            <p className='text-base'>Items</p>
                            <div className="flex md:space-x-5 space-x-3">
                                <FromCSV />
                                <FromExcel />
                                <AppButton onClick={handleClickOpen}>Add</AppButton>
                            </div>
                        </div>
                        {
                            width > PC ? <AntTable columns={items.columns} rows={items.rows} /> :
                                <PhoneSupplyEditItem rows={items.rows} edit={edit} remove={remove} />
                        }
                        {
                            items.rows.length === 0 && formik.submitCount > 1 ?
                                <p className="text-xs mt-1 text-red-600">items field must have at least 1 items</p>
                                : null
                        }
                    </>
                </TabLayout>
            </form>
            <SupplyDrawer item={item} open={open} handleClose={handleClose} />
        </AppLayout>
    )
}

export default NewSupplies;