import { useFormik } from 'formik';
import { InputField } from '../ui/InputField';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { api, handle401Error } from '../../api';
import { ShowMessage } from '../../contexts/message';
import { TextAreaField } from '../ui/TextAreaField';
import { AppButton } from '../ui/Button';
import { phoneRegExp, size } from '../../common';
import { useWindowSize } from '../../hooks/useWindowSize';

export const InstitutionDrawer = ({ visible, onClose, record }) => {
    const [isLoading, setLoading] = useState(false);
    const { width } = useWindowSize();

    const handleClose = (refresh = false) => {
        formik.resetForm();
        onClose(refresh);
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required(),
        address: Yup.string()
            .required(),
        description: Yup.string()
            .required(),
        contactPerson: Yup.string()
            .required(),
        contactPersonPhone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid eg: 71000000')
            .required()
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
            contactPerson: "",
            contactPersonPhone: "",
            description: ""
        },
        validationSchema,
        onSubmit: values => {
            setLoading(true);

            const json = {
                ...values,
                contactPerson: {
                    phone: `+232${values.contactPersonPhone}`,
                    name: values.contactPerson
                }
            }

            if (record) {
                api.patch(`/institute/${record.id}`, json)
                    .then(res => res.data)
                    .then(({ message }) => {
                        ShowMessage('success', '', message);
                        handleClose(true);
                    })
                    .catch(handle401Error)
                    .finally(() => setLoading(false))
            } else {
                api.post("/institute", json)
                    .then(res => res.data)
                    .then(({ message }) => {
                        ShowMessage('success', '', message);
                        handleClose(true);
                    })
                    .catch(handle401Error)
                    .finally(() => setLoading(false))
            }
        },
    });

    useEffect(() => {
        if (record) {
            const { id, name, contactPerson, address, description } = record;

            formik.setFieldValue("name", name);
            formik.setFieldValue("address", address);
            formik.setFieldValue("description", description);
            formik.setFieldValue("contactPerson", contactPerson.name);
            formik.setFieldValue("contactPersonPhone", contactPerson.phone);
            formik.setFieldValue("id", id);
        }
    }, [record])

    return (

        <Drawer width={size(width)} title={`${record ? 'Edit' : 'New'} Institution`} placement="right" onClose={() => handleClose()} visible={visible}>
            <div >
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className='mb-5'>
                            <InputField
                                required
                                label='Name'
                                placeholder="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                                name='name' />
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
                                label='Contact Person'
                                placeholder="Contact Person"
                                value={formik.values.contactPerson}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.contactPerson && formik.errors.contactPerson ? formik.errors.contactPerson : ""}
                                name='contactPerson' />
                        </div>
                        <div className='mb-3'>
                            <InputField
                                required
                                addonBefore="+232"
                                label='Contact Person Phone'
                                placeholder="Contact Person Phone"
                                value={formik.values.contactPersonPhone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.contactPersonPhone && formik.errors.contactPersonPhone ? formik.errors.contactPersonPhone : ""}
                                name='contactPersonPhone' />
                        </div>
                        <div className='mb-3'>
                            <TextAreaField
                                required
                                label='Description'
                                placeholder="Description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='description' />
                        </div>
                        <div className='border-t mt-10 pt-3 flex space-x-3'>
                            <AppButton
                                outline
                                onClick={() => handleClose()}
                                style={{ width: "100%" }}>Cancel</AppButton>
                            <AppButton
                                loading={isLoading}
                                style={{ width: "100%" }}
                                type="submit">Save</AppButton>
                        </div>
                    </div>
                </form>
            </div>
        </Drawer>
    )
}