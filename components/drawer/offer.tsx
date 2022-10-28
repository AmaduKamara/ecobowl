import { useFormik } from 'formik';
import * as Yup from "yup";
import { useEffect, useState } from 'react';
import { Drawer, Select } from 'antd';
import { api, handle401Error } from '../../api';
import { ShowMessage } from '../../contexts/message';
import { SelectField } from '../ui/SelectField';
import { DateField } from '../ui/DateField';
import { useSelector } from 'react-redux';
import { serviceStore } from '../../redux/service/selector';
import { staffStore } from '../../redux/staff/selector';
import { AppButton } from '../ui/Button';
import { useWindowSize } from '../../hooks/useWindowSize';
import { PC, size } from '../../common';

export const OfferDrawer = ({ visible, onClose, record = { id: "", staff: { id: "" }, service: { id: "" }, date: "" } }) => {
    const [loading, setLoading] = useState(false);
    const {width} = useWindowSize();

    const { Option } = Select;

    const services = useSelector((state: any) => serviceStore(state));
    const staffs = useSelector((state: any) => staffStore(state));

    const handleClose = (refresh = false) => {
        formik.resetForm();
        onClose(refresh);
    }

    const validationSchema = Yup.object({
        staffId: Yup.string()
            .required(),
        serviceId: Yup.string()
            .required(),
        date: Yup.date()
            .required()
    });

    const formik = useFormik({
        initialValues: {
            staffId: "",
            serviceId: "",
            date: new Date().toISOString()
        },
        validationSchema,
        onSubmit: values => {
            setLoading(true);

            if (record.id) {
                api.post(`/performance/${record.id}`, values)
                    .then(res => res.data)
                    .then(({ message }) => {
                        ShowMessage('success', 'New Offer', message);
                        handleClose(true);
                    })
                    .catch(handle401Error)
                    .finally(() => setLoading(false));
            } else {
                api.post("/performance", values)
                    .then(res => res.data)
                    .then(({ message }) => {
                        ShowMessage('success', 'New Offer', message);
                        handleClose(true);
                    })
                    .catch(handle401Error)
                    .finally(() => setLoading(false));
            }
        },
    });


    const onChange = (field, e) => {
        formik.setFieldValue(field, e);
    };

    useEffect(() => {
        if (record.id) {
            const { id, staff, service, date } = record;

            formik.setFieldValue("staffId", staff.id);
            formik.setFieldValue("serviceId", service.id);
            formik.setFieldValue("date", date);
            formik.setFieldValue("id", id);
        }
    }, [record])

    return (

        <Drawer width={size(width)} title={`${record.id ? 'Edit' : 'New'} Offer`} placement="right" onClose={() => handleClose()} visible={visible}>
            <div >
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className='mb-5'>
                            <SelectField
                                required
                                label='Service'
                                placeholder="Service"
                                value={formik.values.serviceId}
                                onChange={(e) => onChange("serviceId", e)}
                                error={formik.touched.serviceId && formik.errors.serviceId ? formik.errors.serviceId : ""}>
                                {
                                    services.map((e, index) => (<Option key={index} value={e.id}>{e.name}</Option>))
                                }
                            </SelectField>
                        </div>
                        <div className='mb-4'>
                            <SelectField
                                required
                                label='Staff'
                                placeholder="Staff"
                                value={formik.values.staffId}
                                onChange={(e) => onChange("staffId", e)}
                                error={formik.touched.staffId && formik.errors.staffId ? formik.errors.staffId : ""}>
                                {
                                    staffs.map((e, index) => (<Option key={index} value={e.id}>{e.givenNames} {e.familyName}</Option>))
                                }
                            </SelectField>
                        </div>
                        <div className='mb-4'>
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