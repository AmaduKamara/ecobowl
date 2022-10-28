import { useFormik } from 'formik';
import { InputField } from '../ui/InputField';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import { Drawer, Select } from 'antd';
import { api, handle401Error } from '../../api';
import { ShowMessage } from '../../contexts/message';
import { TextAreaField } from '../ui/TextAreaField';
import { AppButton } from '../ui/Button';
import { useWindowSize } from '../../hooks/useWindowSize';
import { SelectField } from '../ui/SelectField';
import { DateField } from '../ui/DateField';
import { size } from '../../common';
import { useSelector } from 'react-redux';
import { instituteStore } from '../../redux/institutions/selector';

const { Option } = Select;

export const EventDrawer = ({ visible, onClose, record }) => {
    const [isLoading, setLoading] = useState(false);
    const { width } = useWindowSize();

    const institutions = useSelector((state: any) => instituteStore(state));

    const handleClose = (refresh = false) => {
        formik.resetForm();
        onClose(refresh);
    }

    const handelChange = (name, value) => {
        formik.setFieldValue(name, value);
    }
    const validationSchema = Yup.object({
        name: Yup.string()
            .required(),
        startDate: Yup.string()
            .required(),
        description: Yup.string()
            .required(),
        endDate: Yup.string()
            .required(),
        institute: Yup.string()
            .required()
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            institute: "",
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            description: ""
        },
        validationSchema,
        onSubmit: values => {
            setLoading(true);

            if (record) {
                api.patch(`/event/${record.id}`, { ...values, institutionId: values.institute })
                    .then(res => res.data)
                    .then(({ message }) => {
                        ShowMessage('success', '', message);
                        handleClose(true);
                    })
                    .catch(handle401Error)
                    .finally(() => setLoading(false))
            } else {
                api.post("/event", { ...values, institutionId: values.institute })
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
            const { id, name, startDate, endDate, institutionId, description } = record;

            formik.setFieldValue("name", name);
            formik.setFieldValue("institute", institutionId);
            formik.setFieldValue("description", description);
            formik.setFieldValue("startDate", startDate);
            formik.setFieldValue("endDate", endDate);
            formik.setFieldValue("id", id);
        }
    }, [record])

    return (

        <Drawer width={size(width)} title={`${record ? 'Edit' : 'New'} Event`} placement="right" onClose={() => handleClose()} visible={visible}>
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
                            <SelectField
                                required
                                label='Institute'
                                placeholder="Institute"
                                value={formik.values.institute}
                                onChange={(value) => handelChange("institute", value)}
                                error={formik.touched.institute && formik.errors.institute ? formik.errors.institute : ""}>
                                {
                                    institutions.map((row: any) => <Option value={row.id}>{row.name}</Option>)
                                }
                            </SelectField>
                        </div>
                        <div className='mb-3'>
                            <DateField
                                required
                                label='Start Date'
                                placeholder="Start Date"
                                value={formik.values.startDate}
                                onBlur={formik.handleBlur}
                                onChanged={(value) => handelChange("startDate", value)}
                                error={formik.touched.startDate && formik.errors.startDate ? formik.errors.startDate : ""}
                                name='startDate' />
                        </div>
                        <div className='mb-3'>
                            <DateField
                                required
                                label='End Date'
                                placeholder="End Date"
                                value={formik.values.endDate}
                                onChanged={(value) => handelChange("endDate", value)}
                                onBlur={formik.handleBlur}
                                error={formik.touched.endDate && formik.errors.endDate ? formik.errors.endDate : ""}
                                name='endDate' />
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