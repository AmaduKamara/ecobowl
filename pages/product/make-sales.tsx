import { useFormik } from 'formik';
import { TabLayout, AppLayout, ViewLayout } from '../../components/AppLayout';
import * as Yup from "yup";
import { api, handle401Error, handleError } from '../../api';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import { SelectField } from '../../components/ui/SelectField';
import { DateField } from '../../components/ui/DateField';
import { AntTableFooter } from '../../components/ui/Table';
import { Breadcrumb, Select } from 'antd';
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

const MakeSales = () => {
    const [item, setItem] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [editState, setEditState] = useState(false);
    const { width } = useWindowSize();

    const dispatch = useDispatch();

    useEffect(() => {
        fetchProducts();
        fetchCustomers();
    }, []);

    const fetchProducts = () => {
        api('/product')
            .then((res) => res.data)
            .then((res) => {
                dispatch(setProducts(res));
            })
            .catch(handle401Error);
    }

    const fetchCustomers = () => {
        api('/customer')
            .then((res) => res.data)
            .then((res) => {
                setCustomers(res.data);
            })
            .catch(handle401Error);
    }

    const { Option } = Select;

    const payments = [
        "Cash",
        "Orange Money",
        "AfriMoney",
        "Cheque",
        "Bank Transfer"
    ]

    const sales = [
        "Wholesale",
        "Retail"
    ]


    const edit = (record) => {
        setItem(record);
        setEditState(true);
    }

    const remove = (record) => {
        dispatch(deleteItem(record))
    }

    const products = useSelector((state: any) => productForSaleStore(state));
    const { columns, rows } = useSaleProducts(edit, remove, "Are you sure to delete this item?");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const editClose = () => {
        setItem(null);
        setEditState(false);
    }

    const validationSchema = Yup.object({
        salesType: Yup.string()
            .required(),
        discount: Yup.number(),
        customerId: Yup.string(),
        date: Yup.date()
            .required(),
        paymentType: Yup.string()
            .required()
    });

    const formik = useFormik({
        initialValues: {
            customerId: "",
            salesType: "",
            discount: 0,
            paymentType: "",
            date: new Date().toISOString()
        },
        validationSchema,
        onSubmit: values => {
            if (rows.length === 0) return;

            setLoading(true)

            api.post("/sales", {
                ...values,
                items: rows,
                customerId: values.customerId === "" ? null : values.customerId,
                discount: values.discount
            })
                .then(res => res.data)
                .then(() => {
                    ShowMessage('success', 'Make Sales', "New sales ah been made successfully");
                    Router.push('/sales')
                    formik.resetForm();
                    dispatch(resetItems())
                })
                .catch(handleError)
                .catch(err => { })
                .finally(() => setLoading(false))
        },
    });

    const customerChange = (e) => {
        formik.setFieldValue("customerId", e);
    };

    const typeChange = (e) => {
        dispatch(editSales(e));
        formik.setFieldValue("salesType", e);
    };

    const paymentChange = (e) => {
        formik.setFieldValue("paymentType", e);
    };


    const discountChange = (e) => {
        formik.setFieldValue("discount", e);
    };

    const back = () => {
        Router.back()
    }

    const { app } = useAuth();

    return (
        <AppLayout logo='../app.png'>
            <HeadTitle title="Make sales" app={app.name} />
            <Breadcrumb>
                <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link href='/product'><a>Products</a></Link></Breadcrumb.Item>
                <Breadcrumb.Item>Make Sales</Breadcrumb.Item>
            </Breadcrumb>
            <form onSubmit={formik.handleSubmit}>
                <TabLayout>
                    <div className='flex lg:flex-col pt:flex-row flex-wrap'>
                        <div className='p-2 w-full md:w-1/3 pt:w-1/3 lg:w-full'>
                            <SelectField
                                required
                                label='Sales Type'
                                placeholder="Sales Type"
                                value={formik.values.salesType}
                                onChange={typeChange}
                                error={formik.touched.salesType && formik.errors.salesType ? formik.errors.salesType : ""}>
                                {
                                    sales.map((e, index) => (<Option key={index} value={e}>{e}</Option>))
                                }
                            </SelectField>
                        </div>
                        <div className='p-2 w-full md:w-1/3 pt:w-1/3 lg:w-full'>
                            <DateField
                                required
                                label='Date'
                                value={formik.values.date}
                                onChange={(date) => {
                                    if (date) formik.setFieldValue('date', date)
                                }}
                                error={formik.touched.date && formik.errors.date ? formik.errors.date : ""}
                            />
                        </div>
                        <div className='p-2 w-full md:w-1/3 pt:w-1/3 lg:w-full'>
                            <SelectField
                                required
                                label='Payment Type'
                                placeholder="Payment Type"
                                value={formik.values.paymentType}
                                onChange={paymentChange}
                                error={formik.touched.paymentType && formik.errors.paymentType ? formik.errors.paymentType : ""}>
                                {
                                    payments.map((e, index) => (<Option key={index} value={e}>{e}</Option>))
                                }
                            </SelectField>
                        </div>
                        <div className='p-2 w-full md:w-1/3 pt:w-1/3 lg:w-full'>
                            <NumberField
                                label='Discount'
                                placeholder="Discount"
                                value={formik.values.discount}
                                max={100}
                                onChange={discountChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.discount && formik.errors.discount ? formik.errors.discount : ""}
                                name='discount' />
                        </div>
                        <div className='p-2 w-full md:w-1/3 pt:w-1/3 lg:w-full'>
                            <SelectField
                                label='Customer'
                                placeholder="Customer"
                                value={formik.values.customerId}
                                onChange={customerChange}
                                error={formik.touched.customerId && formik.errors.customerId ? formik.errors.customerId : ""}>
                                {
                                    customers.map((e: any) => (<Option key={e.id} value={e.id}>{e.givenNames} {e.familyName}</Option>))
                                }
                            </SelectField>
                        </div>
                        <div className='border-t p-2 items-end w-full md:w-1/3 pt:w-1/3 lg:w-full mt-10 md:mt-0 pt-3 md:pt-0 md:border-0 flex space-x-3'>
                            <div className="w-full">
                                <AppButton
                                    outline
                                    onClick={() => back()}
                                    className="w-full">Cancel</AppButton>
                            </div>
                            <div className='w-full'>
                                <AppButton
                                    loading={isLoading}
                                    className="w-full"
                                    type="submit">Save</AppButton>
                            </div>
                        </div>
                    </div>
                    <>
                        {
                            formik.values.salesType ?
                                <>
                                    <div className='flex justify-between items-center border-b pb-3 mb-4'>
                                        <p>Items</p>
                                        <AppButton onClick={handleClickOpen}>Add Item</AppButton>
                                    </div>
                                    {
                                        width > PC && PT < width ? <AntTableFooter footer={(e) => Footer(e, formik.values.discount)} columns={columns} rows={rows} /> :
                                            <PhoneProductItem edit={edit} remove={remove} rows={rows} />
                                    }

                                </> : null
                        }
                        {
                            rows.length == 0 && formik.submitCount > 0 ?
                                <p className="text-xs mt-1 text-red-200">items field must have at least 1 items </p>
                                : null

                        }
                    </>
                </TabLayout>
            </form>
            {
                item ? <EditItemModel open={editState} item={item} handleClose={editClose} /> : null
            }
            <SalesItemsDrawer key="make-items" products={products} salesType={formik.values.salesType} visible={open} onClose={handleClose} />
        </AppLayout>
    )
}

export default MakeSales;