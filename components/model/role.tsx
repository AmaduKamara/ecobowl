import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { Button, Modal } from 'antd';
import { InputField } from '../ui/InputField';
import { api, handle401Error, trimErrors } from '../../api';
import { TextAreaField } from '../ui/TextAreaField';
import { ShowMessage } from '../../contexts/message';
import { AppButton } from '../ui/Button';

export const RoleModel = ({ open, record, handleClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);

    useEffect(() => {
        if (record) {
            formik.setFieldValue('name', record.name);
            formik.setFieldValue('description', record.description);
        }
    }, [record]);

    const close = (refresh = false) => {
        setError([]);
        formik.resetForm();
        handleClose(refresh);
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required(),
        description: Yup.string()
            .required()
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            description: ""
        },
        validationSchema,
        onSubmit: values => {
            setLoading(true);
            setError([]);

            if (record) {
                api.patch(`/role/${record.id}`, { ...values })
                    .then(res => res.data)
                    .then(({ message }) => {
                        ShowMessage('success', 'New Role', message);
                        close(true);
                    })
                    .catch(handle401Error)
                    .catch(trimErrors)
                    .catch(({ errors }) => {
                        setError(errors);
                    })
                    .finally(() => setLoading(false));
            } else {
                api.post("/role", values)
                    .then(res => res.data)
                    .then(({ message }) => {
                        ShowMessage('success', 'New Role', message);
                        close(true);
                    })
                    .catch(handle401Error)
                    .catch(trimErrors)
                    .catch(({ errors }) => {
                        setError(errors);
                    })
                    .finally(() => setLoading(false));
            }
        },
    });

    return (
        <div>
            <Modal footer={false} title={`${record ? 'Edit' : 'New'} Role`} visible={open} onCancel={() => close()}>
                <form onSubmit={formik.handleSubmit}>
                    {
                        error && error.length > 0 ? <ul className='mb-5'>
                            {
                                error.map((e, i) => (<li key={i} className="mb-1 text-xs text-red-500 font-bold">{i + 1}. {e}</li>))
                            }
                        </ul> : null
                    }
                    <div className='border-b pb-5'>
                        <div className='flex space-x-2'>
                            <div className='mb-5 flex-1'>
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
                                <div className='mb-5'>
                                    <TextAreaField
                                        required
                                        label='Description'
                                        placeholder="Description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.description && formik.errors.description ? formik.errors.description : ""}
                                        name='description' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex space-x-3 pt-4 justify-end'>
                    <AppButton
                                outline
                                onClick={() => close()}
                                style={{ width: "100%" }}>Cancel</AppButton>
                            <AppButton
                                loading={loading}
                                style={{ width: "100%" }}
                                type="submit">Save</AppButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}