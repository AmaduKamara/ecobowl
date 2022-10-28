import { useFormik } from 'formik';
import { InputField } from '../ui/InputField';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { api, handle401Error } from '../../api';
import { ShowMessage } from '../../contexts/message';
import { TextAreaField } from '../ui/TextAreaField';
import { AppButton } from '../ui/Button';
import { PC, size } from '../../common';
import { useWindowSize } from '../../hooks/useWindowSize';

export const ServiceDrawer = ({ visible, onClose, record }) => {
    const [isLoading, setLoading] = useState(false);
    const {width} = useWindowSize();

    const handleClose = (refresh = false) => {
        formik.resetForm();
        onClose(refresh);
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required(),
        cost: Yup.string()
            .required(),
        staffReward: Yup.string()
            .required()
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            cost: "",
            staffReward: "",
            description: ""
        },
        validationSchema,
        onSubmit: values => {
            setLoading(true);

            if (record) {
                const json = {
                    ...values,
                    cost: Number.parseFloat(values.cost),
                    staffReward: Number.parseFloat(values.staffReward)
                }

                api.patch(`/service/${record.id}`, json)
                    .then(res => res.data)
                    .then(({ message }) => {
                        ShowMessage('success', 'New Serivce', message);
                        handleClose(true);
                    })
                    .catch(handle401Error)
                    .finally(() => setLoading(false))
            } else {
                const json = {
                    ...values,
                    cost: Number.parseFloat(values.cost),
                    staffReward: Number.parseFloat(values.staffReward)
                }

                api.post("/service", json)
                    .then(res => res.data)
                    .then(({ message }) => {
                        ShowMessage('success', 'New Serivce', message);
                        handleClose(true);
                    })
                    .catch(handle401Error)
                    .finally(() => setLoading(false))
            }
        },
    });

    useEffect(() => {
        if (record) {
            const { id, name, cost, staffReward, description } = record;

            formik.setFieldValue("name", name);
            formik.setFieldValue("staffReward", staffReward);
            formik.setFieldValue("description", description);
            formik.setFieldValue("cost", cost);
            formik.setFieldValue("id", id);
        }
    }, [record])

    return (

        <Drawer width={size(width)} title={`${record ? 'Edit' : 'New'} Service`} placement="right" onClose={() => handleClose()} visible={visible}>
            <div >
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className='mb-5'>
                            <InputField
                                required
                                label='Service Name'
                                placeholder="Service Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                                name='name' />
                        </div>
                        <div className='mb-3'>
                            <InputField
                                required
                                label='Cost'
                                placeholder="Cost"
                                value={formik.values.cost}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.cost && formik.errors.cost ? formik.errors.cost : ""}
                                name='cost' />
                        </div>
                        <div className='mb-3'>
                            <InputField
                                required
                                label='Staff Reward'
                                placeholder="Staff Reward"
                                value={formik.values.staffReward}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.staffReward && formik.errors.staffReward ? formik.errors.staffReward : ""}
                                name='staffReward' />
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