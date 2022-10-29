import * as Yup from "yup";
import { useState } from 'react';
import { Radio } from 'antd';
import { api, ApiServer, handle401Error } from '../../api';
import { ShowMessage } from '../../contexts/message';
import { useFormik } from "formik";
import { InputField } from "../../components/ui/InputField";
import { RadioField } from "../../components/ui/RadioField";
import { DateField } from "../../components/ui/DateField";
import { AppButton } from "../../components/ui/Button";
import { TextAreaField } from "../../components/ui/TextAreaField";
import { wrapper } from "../../redux";
import { DateFormater } from "../../hooks";
import Router from "next/router";

const Event = ({ record }) => {
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    Router.push("/")
  }

  const handleChange = (name, value) => {
    formik.setFieldValue(name, value)
  }

  const validationSchema = Yup.object({
    forename: Yup.string()
      .required(),
    surname: Yup.string()
      .required(),
    birthDate: Yup.string()
      .required(),
    email: Yup.string()
      .email()
      .required(),
    phone: Yup.string()
      .required(),
    qualification: Yup.string()
      .required(),
    gender: Yup.string()
      .required()
  });

  const formik = useFormik({
    initialValues: {
      qualification: "",
      phone: "",
      gender: "",
      email: "",
      forename: "",
      surname: "",
      birthDate: new Date().toISOString()
    },
    validationSchema,
    onSubmit: values => {
      setLoading(true);

      api.post(`/auth/${record.id}/trainee`, {...values, phone: `+232${values.phone}`})
        .then(res => res.data)
        .then(({ message }) => {
          ShowMessage('success', '', message);
        })
        .catch(handle401Error)
        .finally(() => setLoading(false))
    },
  });

  return (
    <section className="event-reg-bg flex items-center">
      <div className="flex container mx-auto">
        <div className="w-3/5"></div>
        <div className="w-2/5">
          <h1 className="text-xl font-semibold">
            Event Trainee
          </h1>
          <p className="text-sm">
            Register to be part of this event
          </p>
          <div className="mt-8">
            <p className="pb-2 border-b text-sm font-bold text-gray-500">Event Details</p>
            <div className="flex text-sm pt-3 flex-wrap">
              <div className="w-1/2 px-2 py-2 flex space-x-2">
                <p>Name:</p>
                <p className="font-bold">{record.name}</p>
              </div>
              <div className="w-1/2 px-2 py-2 flex space-x-2">
                <p>Institution:</p>
                <p className="font-bold">{record.institution.name}</p>
              </div>
              <div className="w-1/2 px-2 py-2 flex space-x-2">
                <p>Start Date:</p>
                <p className="font-bold">{DateFormater(record.startDate)}</p>
              </div>
              <div className="w-1/2 px-2 py-2 flex space-x-2">
                <p>End Date:</p>
                <p className="font-bold">{DateFormater(record.endDate)}</p>
              </div>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <p className="pb-2 border-b mt-5 text-sm font-bold text-gray-500">Personal Details</p>
            <div className="flex -mx-1 pt-2 flex-wrap">
              <div className="w-1/2 p-3">
                <InputField
                  required
                  label='Forename'
                  placeholder="Forename"
                  value={formik.values.forename}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.forename && formik.errors.forename ? formik.errors.forename : ""}
                  name='forename' />
              </div>
              <div className="w-1/2 p-3">
                <InputField
                  required
                  label='Surname'
                  placeholder="Surname"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.surname && formik.errors.surname ? formik.errors.surname : ""}
                  name='surname' />
              </div>
              <div className="w-1/2 p-3">
                <DateField
                  required
                  label='Date Of Birth'
                  placeholder="Date Of Birth"
                  value={formik.values.birthDate}
                  onChanged={(value) => handleChange('birthDate', value)}
                  onBlur={formik.handleBlur}
                  error={formik.touched.birthDate && formik.errors.birthDate ? formik.errors.birthDate : ""} />
              </div>
              <div className="w-1/2 p-3">
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
              <div className="w-1/2 p-3">
                <InputField
                  required
                  label='Phone'
                  placeholder="Phone"
                  addonBefore="+232"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}
                  name='phone' />
              </div>
              <div className="w-1/2 p-3">
                <InputField
                  required
                  label='Email'
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                  name='email' />
              </div>
              <div className="w-full p-3">
                <TextAreaField
                  required
                  label='Qualification'
                  placeholder="Qualification"
                  value={formik.values.qualification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.qualification && formik.errors.qualification ? formik.errors.qualification : ""}
                  name='qualification' />
              </div>
            </div>
            <div className="flex tems-center mt-4 space-x-5 border-t pt-5 px-2">
              <AppButton onClick={handleClose} outline>Cancel</AppButton>
              <AppButton type="submit" loading={loading}>Register</AppButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Event;

export const getServerSideProps = wrapper.getServerSideProps(() => async (ctx: any) => {

  const { req, query } = ctx;

  const id = query.eid;

  const response: any = await ApiServer.getOneWithAuth(`/event/${id}`, req);

  return response;
})
