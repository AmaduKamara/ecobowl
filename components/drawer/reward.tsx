import { useFormik } from 'formik';
import { InputField } from '../ui/InputField';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import { api, handle401Error } from '../../api';
import { ShowMessage } from '../../contexts/message';
import { TextAreaField } from '../ui/TextAreaField';
import { AppButton } from '../ui/Button';
import { useWindowSize } from '../../hooks/useWindowSize';
import { size } from '../../common';
import { newReward } from '../../interface/event';

export const RewardDrawer = ({ visible, onClose, record = newReward }) => {
    const [isLoading, setLoading] = useState(false);
    const { width } = useWindowSize();

    const handleClose = (refresh = false) => {
        formik.resetForm();
        onClose(refresh);
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

            if (record.id) {
                api.patch(`/reward/${record.id}`, { ...values, eventId: record.eventId })
                    .then(res => res.data)
                    .then(({ message }) => {
                        ShowMessage('success', '', message);
                        handleClose(true);
                    })
                    .catch(handle401Error)
                    .finally(() => setLoading(false))
            } else {
                api.post("/reward", values)
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
            const { id, name, eventId, description } = record;

            formik.setFieldValue("name", name);
            formik.setFieldValue("description", description);
            formik.setFieldValue("eventId", eventId);
            formik.setFieldValue("id", id);
        }
    }, [record])

    return (
        <Drawer width={size(width)} title={`${record.id ? 'Edit' : 'New'} Reward`} placement="right" onClose={() => handleClose()} visible={visible}>
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