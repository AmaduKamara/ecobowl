import React, { useEffect } from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { editItem } from '../../redux/sale/slice';
import { Button, Modal, Select } from 'antd';
import { SelectField } from '../ui/SelectField';
import { NumberField } from '../ui/NumberField';
import { AppButton } from '../ui/Button';

export const EditItemModel = ({ open, handleClose, item }) => {
    const { Option } = Select;

    const dispatch = useDispatch();

    const close = () => {
        formik.resetForm();
        handleClose();
    }

    const validationSchema = Yup.object({
        productId: Yup.string()
            .required(),
        quantity: Yup.number().required()
    });

    const formik = useFormik({
        initialValues: {
            id: "",
            productId: "",
            quantity: 0,
            discount: 0,
        },
        validationSchema,
        onSubmit: values => {

            dispatch(editItem({
                ...item,
                ...values,
            }));

            close();
        },
    });

    useEffect(() => {
        if (item) {
            const { id, productId, quantity, discount } = item;
            formik.setFieldValue("productId", productId);
            formik.setFieldValue("quantity", quantity);
            formik.setFieldValue("discount", discount);
            formik.setFieldValue("id", id);
        }
    }, [item])

    const handleChange = (e, name) => {
        formik.setFieldValue(name, Number.parseInt(e));
    };

    return (
        <div>
            <Modal footer={false} title={`${item ? 'Edit' : 'New'} Item`} visible={open} onCancel={close}>
                <form onSubmit={formik.handleSubmit}>
                    <div className='border-b pb-5'>
                        <div className='flex md:space-x-2 flex-col md:flex-row space-y-3 md:space-y-0'>
                            <div className='md:mb-5 flex-1'>
                                <SelectField
                                    label='Product'
                                    placeholder="Product"
                                    disabled
                                    value={formik.values.productId}
                                    onChange={(e) => handleChange(e, 'productId')}
                                    error={formik.touched.productId && formik.errors.productId ? formik.errors.productId : ""}>
                                    <Option key={item.id} value={item.id}>{item.name}</Option>
                                </SelectField>
                            </div>
                            {
                                formik.values.productId ?
                                    <>
                                        <div className='md:mb-5 flex-1'>
                                            <NumberField
                                                label='Quantity'
                                                placeholder="Quantity"
                                                value={formik.values.quantity}
                                                max={item.inStock}
                                                onChange={(e) => handleChange(e, 'quantity')}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ""}
                                                name='quantity' />
                                        </div>
                                        <div className='md:mb-5 flex-1'>
                                            <NumberField
                                                label='Discount'
                                                placeholder="discount"
                                                value={formik.values.discount}
                                                max={100}
                                                onChange={(e) => handleChange(e, 'discount')}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ""}
                                                name='quantity' />
                                        </div>
                                    </> : null
                            }
                        </div>
                    </div>
                    <div className='flex space-x-3 pt-4 justify-end'>
                        <AppButton
                            outline
                            onClick={() => close()}
                            style={{ width: "100%" }}>Cancel</AppButton>
                        <AppButton
                            style={{ width: "100%" }}
                            type="submit">Save</AppButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
