import React, { useEffect } from 'react';
import { InputField } from '../ui/InputField';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { GuidGenerator } from '../../hooks';
import { addItem, editItem } from '../../redux/supply/supply.slice';
import { DateField } from '../ui/DateField';
import { Drawer, Modal } from 'antd';
import { TextAreaField } from '../ui/TextAreaField';
import { AppButton } from '../ui/Button';
import { size } from '../../common';
import { useWindowSize } from '../../hooks/useWindowSize';

export default function SupplyDrawer({ open, handleClose, item = null }) {
    const dispatch = useDispatch();

    const { width } = useWindowSize();

    const close = () => {
        formik.resetForm();
        handleClose();
    }

    const validationSchema = Yup.object({
        itemName: Yup.string()
            .required(),
        quantity: Yup.number()
            .min(1)
            .required(),
        normalCost: Yup.number()
            .min(1)
            .required(),
        wholesaleCost: Yup.number()
            .min(1),
        retailCost: Yup.number()
            .min(1)
            .required("Retail cost is required"),
        expiryDate: Yup.date(),
        description: Yup.string()
    });

    const formik = useFormik({
        initialValues: {
            id: "",
            itemName: "",
            quantity: "",
            normalCost: "",
            wholesaleCost: "",
            retailCost: "",
            expiryDate: new Date().toISOString(),
            isExpiry: false,
            description: ""
        },
        validationSchema,
        onSubmit: values => {
            if (item) {
                dispatch(editItem({
                    ...values,
                    quantity: Number.parseInt(values.quantity),
                    wholesaleCost: Number.parseInt(values.wholesaleCost),
                    retailCost: Number.parseInt(values.retailCost),
                    normalCost: Number.parseInt(values.normalCost),
                    expiryDate: values.expiryDate
                }));
            } else {
                values.id = GuidGenerator();
                dispatch(addItem({
                    ...values,
                    quantity: Number.parseInt(values.quantity),
                    wholesaleCost: Number.parseInt(values.wholesaleCost),
                    retailCost: Number.parseInt(values.retailCost),
                    normalCost: Number.parseInt(values.normalCost),
                    expiryDate: values.expiryDate
                }));
            }

            close();
        },
    });

    useEffect(() => {
        if (item) {
            const { id, itemName, description, normalCost, expiryDate, retailCost, quantity, wholesaleCost, isExpiry } = item;
            formik.setFieldValue("itemName", itemName);
            formik.setFieldValue("quantity", quantity);
            formik.setFieldValue("wholesaleCost", wholesaleCost);
            formik.setFieldValue("retailCost", retailCost);
            formik.setFieldValue("normalCost", normalCost);
            formik.setFieldValue("expiryDate", new Date(expiryDate));
            formik.setFieldValue("description", description);
            formik.setFieldValue("isExpiry", isExpiry);
            formik.setFieldValue("id", id);
        }
    }, [item])

    return (
        <div>
            <Drawer width={size(width)} title={`${item ? 'Edit' : 'New'} Supply Item`} visible={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-3'>
                        <InputField
                            required
                            label='Name'
                            placeholder="Name"
                            value={formik.values.itemName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.itemName && formik.errors.itemName ? formik.errors.itemName : ""}
                            name='itemName' />
                    </div>
                    <div className='mb-3'>
                        <InputField
                            required
                            label='Quantity'
                            placeholder="Quantity"
                            value={formik.values.quantity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.quantity && formik.errors.quantity ? formik.errors.quantity : ""}
                            name='quantity' />
                    </div>
                    <div className='mb-3'>
                        <InputField
                            required
                            label='Normal Cost'
                            placeholder="Normal Cost"
                            value={formik.values.normalCost}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.normalCost && formik.errors.normalCost ? formik.errors.normalCost : ""}
                            name='normalCost' />
                    </div>
                    <div className='mb-3'>
                        <InputField
                            required
                            label='Wholesale Cost'
                            placeholder="Wholesale Cost"
                            value={formik.values.wholesaleCost}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.wholesaleCost && formik.errors.wholesaleCost ? formik.errors.wholesaleCost : ""}
                            name='wholesaleCost' />
                    </div>
                    <div className='mb-3'>
                        <InputField
                            required
                            label='Retail Cost'
                            placeholder="Retail Cost"
                            value={formik.values.retailCost}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.retailCost && formik.errors.retailCost ? formik.errors.retailCost : ""}
                            name='retailCost' />
                    </div>
                    <div className='mb-3'>
                        <DateField
                            required
                            label='Expirey Date'
                            value={formik.values.expiryDate}
                            onChange={(date) => {
                                if (date) formik.setFieldValue('isExpiry', true)
                                if (date) formik.setFieldValue('expiryDate', date)
                            }}
                            onBlur={formik.handleBlur}
                            name='expiryDate' />
                    </div>
                    <div className='mb-3 w-full'>
                        <TextAreaField
                            required
                            type='textarea'
                            label='Description'
                            rows={3}
                            placeholder="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='description' />
                    </div>
                    <div className='border-t mt-10 pt-3 flex space-x-3'>
                        <AppButton
                            outline
                            onClick={() => close()}
                            style={{ width: "100%" }}>Cancel</AppButton>
                        <AppButton
                            style={{ width: "100%" }}
                            type="submit">Save</AppButton>
                    </div>
                </form>
            </Drawer>
        </div>
    );
}