import { useFormik } from 'formik';
import { InputField } from '../ui/InputField';
import * as Yup from "yup";
import { api, handleError, trimErrors } from '../../api';
import { useEffect, useState } from 'react';
import { Drawer, Select } from 'antd';
import { SelectField } from '../ui/SelectField';
import { phoneRegExp, PC, size } from '../../common';
import { ShowMessage } from '../../contexts/message';
import { AppButton } from '../ui/Button';
import { useWindowSize } from '../../hooks/useWindowSize';

const { Option } = Select;

export const UserDrawer = ({ visible, record, onClose }) => {
    const [loading, setLoading] = useState(false);
    const roles = ["Admin"];
    const { width } = useWindowSize();

    const handleClose = (refresh = false) => {
        formik.resetForm();
        onClose(refresh);
    }

    useEffect(() => {
        if (record) {
            formik.setFieldValue('firstName', record.firstName);
            formik.setFieldValue('lastName', record.lastName);
            formik.setFieldValue('email', record.email);
            formik.setFieldValue('phone', record.phone.replace("+232", ""));
            formik.setFieldValue('role', record.role.id);
        }
    }, [record]);

    const roleClick = (e) => {
        formik.setFieldValue("role", e)
    }

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required(),
        lastName: Yup.string()
            .required(),
        phone: Yup
            .string()
            .matches(phoneRegExp, 'Phone number is not valid eg: 76000000')
            .required(),
        role: Yup.string()
            .required()
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            role: "",
            phone: ""
        },
        validationSchema,
        onSubmit: values => {
            setLoading(true);

            if (record.id) {
                api.patch(`/user/${record.id}`, { ...values, phone: `+232${values.phone}` })
                    .then(res => res.data)
                    .then(({ message }) => {
                        ShowMessage('success', 'New Role', message);
                        handleClose(true);
                    })
                    .catch(handleError)
                    .catch(trimErrors)
                    .finally(() => setLoading(false))
            } else {
                api.post("/user", { ...values, phone: `+232${values.phone}` })
                    .then(res => res.data)
                    .then(({ message }) => {
                        ShowMessage('success', 'New Role', message);
                        handleClose(true);
                    })
                    .catch(handleError)
                    .catch(trimErrors)
                    .finally(() => setLoading(false))
            }
        },
    });

    return (

        <Drawer width={size(width)} title={`${record.id ? 'Edit' : 'New'} User`} placement="right" onClose={() => handleClose()} visible={visible}>
            <div >
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className='mb-5'>
                            <InputField
                                required
                                label='Given Names'
                                placeholder="Given Names"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : ""}
                                name='firstName' />
                        </div>
                        <div className='mb-5'>
                            <InputField
                                required
                                label='Family Name'
                                placeholder="Family Name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : ""}
                                name='lastName' />
                        </div>
                        <div className='mb-5'>
                            <SelectField
                                required
                                disabled={record && record.role.name === "Owner" ? true : false}
                                label='Role'
                                placeholder="Role"
                                value={formik.values.role}
                                onChange={roleClick}
                                error={formik.touched.role && formik.errors.role ? formik.errors.role : ""}>
                                {
                                    roles.map(role => <Option value={role}>{role}</Option>)
                                }
                            </SelectField>
                        </div>
                        <div className='mb-5'>
                            <InputField
                                required
                                addonBefore="+232"
                                label='Phone'
                                placeholder="Phone"
                                disabled={record.id ? true : false}
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}
                                name='phone' />
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