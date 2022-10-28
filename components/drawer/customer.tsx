import { useFormik } from 'formik';
import { InputField } from '../ui/InputField';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import { Drawer, Radio } from 'antd';
import { RadioField } from '../ui/RadioField';
import { api, handle401Error } from '../../api';
import { ShowMessage } from '../../contexts/message';
import { phoneRegExp, PC, size } from '../../common';
import { AppButton } from '../ui/Button';
import { useWindowSize } from '../../hooks/useWindowSize';

export const CustomerDrawer = ({ visible, onClose, record = null }) => {
    const [loading, setLoading] = useState(false);
    const {width} = useWindowSize();

    const handleClose = (refresh = false) => {
        formik.resetForm();
        onClose(refresh);
    }

    const validationSchema = Yup.object({
        givenNames: Yup.string()
            .required(),
        familyName: Yup.string()
            .required(),
        gender: Yup.string()
            .required(),
        email: Yup.string()
            .email(),
        phone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid eg: 76000000')
            .required(),
        address: Yup.string()
            .required()
    });

    const formik = useFormik({
        initialValues: {
            givenNames: "",
            familyName: "",
            gender: "",
            phone: "",
            email: "",
            address: ""
        },
        validationSchema,
        onSubmit: values => {
            setLoading(true);

            api.post("/customer", { ...values, phone: `${values.phone}` })
                .then(res => res.data)
                .then(({ message }) => {
                    ShowMessage('success', 'New Customer', message);
                    handleClose(true);
                })
                .catch(handle401Error)
                .finally(() => setLoading(false))
        },
    });



    useEffect(() => {
        if (record) {
            const { id, givenNames, familyName, gender, phone, email, company, address } = record;

            formik.setFieldValue("givenNames", givenNames);
            formik.setFieldValue("company", company);
            formik.setFieldValue("address", address);
            formik.setFieldValue("email", email);
            formik.setFieldValue("gender", gender);
            formik.setFieldValue("phone", phone);
            formik.setFieldValue("familyName", familyName);
            formik.setFieldValue("id", id);
        }
    }, [record])

    return (

        <Drawer width={size(width)} title={`${record ? 'Edit' : 'New'} Customer`} placement="right" onClose={() => handleClose()} visible={visible}>
            <div >
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className='mb-5'>
                            <InputField
                                required
                                label='Given Names'
                                placeholder="Given Names"
                                value={formik.values.givenNames}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.givenNames && formik.errors.givenNames ? formik.errors.givenNames : ""}
                                name='givenNames' />
                        </div>
                        <div className='mb-3'>
                            <InputField
                                required
                                label='Family Name'
                                placeholder="Family Name"
                                value={formik.values.familyName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.familyName && formik.errors.familyName ? formik.errors.familyName : ""}
                                name='familyName' />
                        </div>
                        <div className='mb-3'>
                            <RadioField
                                required
                                label='Gender'
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.gender && formik.errors.gender ? formik.errors.gender : ""}
                                name='gender'>
                                <Radio value='Male'>Male</Radio>
                                <Radio value='Female'>Female</Radio>
                            </RadioField>
                        </div>
                        <div className='mb-3'>
                            <InputField
                                required
                                label='Address'
                                placeholder="Address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address && formik.errors.address ? formik.errors.address : ""}
                                name='address' />
                        </div>
                        <div className='mb-3'>
                            <InputField
                                required
                                addonBefore="+232"
                                label='Phone'
                                placeholder="Phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}
                                name='phone' />
                        </div>
                        <div className='mb-3'>
                            <InputField
                                label='Email'
                                placeholder='Email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                                name='email' />
                        </div>
                        <div className='border-t mt-10 pt-3 flex space-x-3'>
                            <AppButton
                                outline
                                onClick={() => handleClose()}
                                style={{ width: "100%" }}>Cancel</AppButton>
                            <AppButton
                                loading={loading}
                                style={{ width: "100%" }}
                                type="submit">Save</AppButton>
                        </div>
                    </div>
                </form>
            </div>
        </Drawer>
    )
}