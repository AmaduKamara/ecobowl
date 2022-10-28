import { Breadcrumb, Select } from 'antd';
import { useFormik } from 'formik';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { api, handle401Error } from '../api';
import { AppLayout, Card } from '../components/AppLayout';
import { HeadTitle } from '../components/head';
import { AppButton } from '../components/ui/Button';
import { InputField } from '../components/ui/InputField';
import { SelectField } from '../components/ui/SelectField';
import { TextAreaField } from '../components/ui/TextAreaField';
import { ShowMessage } from '../contexts/message';
import { appStore } from '../redux/app/selector';
import { countriesData } from '../utils';

const { Option } = Select;

const Sales: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const app = useSelector((state: any) => appStore(state));

  const formik = useFormik({
    initialValues: {
      id: app.id,
      name: app.name,
      caption: app.caption,
      telephone: app.contact.telephone.replace("+232", ""),
      email: app.contact.email,
      address: app.contact.address,
      country: app.contact.country,
      contactPersonFirstName: app.person.firstName,
      contactPersonLastName: app.person.lastName,
      contactPersonPhone: app.person.telephone.replace("+232", ""),
      contactPersonEmail: app.person.email,
      contactPersonAddress: app.person.address,
      contactPersonCountry: app.person.country
    },
    onSubmit: (values) => {
      setLoading(true);

      const payload = {
        name: values.name,
        caption: values.caption,
        domain: app.domain,
        contact: {
          telephone: `+232${values.telephone}`,
          email: values.email,
          address: values.address,
          country: values.country
        },
        contactPerson: {
          firstName: values.contactPersonFirstName,
          lastName: values.contactPersonLastName,
          telephone: `+232${values.contactPersonPhone}`,
          email: values.contactPersonEmail,
          address: values.contactPersonAddress,
          country: values.contactPersonCountry
        }
      };

      api.patch('/app', payload)
        .then(res => res.data)
        .then(({ message, data }) => {
          console.log(data);
          
          ShowMessage('success', 'New Serivce', message);
        })
        .catch(handle401Error)
        .finally(() => setLoading(false));
    }
  })

  const handleChange = (e) => {
    formik.setFieldValue('country', e)
  }

  return (
    <AppLayout>
      <HeadTitle title="General setting" />
      <div className='flex justify-between'>
        <Breadcrumb>
          <Breadcrumb.Item><Link href='/'><a>Dashboard</a></Link></Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <Card className='p-4 pb-0 mt-10'>
        <h1 className='border-b pb-3'>App Configuration</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='py-5 md:pt-8 pt-5'>
            <div className='flex flex-wrap pb-5'>
              <div className='md:w-1/2 lg:w-1/3 w-full md:px-5 md:mb-5 mb-3'>
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
              <div className='md:w-1/2 lg:w-1/3 w-full md:px-5 md:mb-5 mb-3'>
                <InputField
                  required
                  label='Phone'
                  placeholder="Phone"
                  addonBefore="+232"
                  value={formik.values.telephone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.telephone && formik.errors.telephone ? formik.errors.telephone : ""}
                  name='telephone' />
              </div>
              <div className='md:w-1/2 lg:w-1/3 w-full md:px-5 md:mb-5 mb-3'>
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
              <div className='md:w-1/2 lg:w-1/3 w-full md:px-5 md:mb-5 mb-3'>
                <SelectField
                  required
                  label='Country'
                  placeholder="Country"
                  value={formik.values.country}
                  onChange={handleChange}
                  disabled
                  error={formik.touched.country && formik.errors.country ? formik.errors.country : ""}>
                  {
                    countriesData.map((e, key) => <Option key={key} value={e.name}>{e.name}</Option>)
                  }
                </SelectField>
              </div>
              <div className='md:w-1/2 lg:w-1/3 w-full md:px-5 mb-3'>
                <TextAreaField
                  required
                  label='Address'
                  placeholder="Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.address && formik.errors.address ? formik.errors.address : ""}
                  name='address' />
              </div>
              <div className='md:w-1/2 lg:w-1/3 w-full md:px-5 mb-3'>
                <TextAreaField
                  required
                  label='Caption'
                  value={formik.values.caption}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.caption && formik.errors.caption ? formik.errors.caption : ""}
                  placeholder="Caption"
                  name='caption' />
              </div>
            </div>
            <div>
              <p className='border-b mb-5 pb-2'>Contact Person</p>
              <div className='flex flex-wrap'>
                <div className='md:w-1/2 lg:w-1/3 w-full md:px-5 md:mb-5 mb-3'>
                  <InputField
                    required
                    label='First Name'
                    placeholder="First Name"
                    value={formik.values.contactPersonFirstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.contactPersonFirstName && formik.errors.contactPersonFirstName ? formik.errors.contactPersonFirstName : ""}
                    name='firstName' />
                </div>
                <div className='md:w-1/2 lg:w-1/3 w-full md:px-5 md:mb-5 mb-3'>
                  <InputField
                    required
                    label='Last Name'
                    placeholder="Last Name"
                    value={formik.values.contactPersonLastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.contactPersonLastName && formik.errors.contactPersonLastName ? formik.errors.contactPersonLastName : ""}
                    name='contactPersonLastName' />
                </div>
                <div className='md:w-1/2 lg:w-1/3 w-full md:px-5 md:mb-5 mb-3'>
                  <InputField
                    required
                    label='Phone'
                    placeholder="Phone"
                    addonBefore="+232"
                    value={formik.values.contactPersonPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.contactPersonPhone && formik.errors.contactPersonPhone ? formik.errors.contactPersonPhone : ""}
                    name='contactPersonPhone' />
                </div>
                <div className='md:w-1/2 lg:w-1/3 w-full md:px-5 md:mb-5 mb-3'>
                  <InputField
                    required
                    label='Email'
                    placeholder="Email"
                    value={formik.values.contactPersonEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.contactPersonEmail && formik.errors.contactPersonEmail ? formik.errors.contactPersonEmail : ""}
                    name='contactPersonEmail' />
                </div>
                <div className='md:w-1/2 lg:w-1/3 w-full md:px-5 md:mb-5 mb-3'>
                  <InputField
                    required
                    label='Address'
                    placeholder="Address"
                    value={formik.values.contactPersonAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.contactPersonAddress && formik.errors.contactPersonAddress ? formik.errors.contactPersonAddress : ""}
                    name='contactPersonAddress' />
                </div>
                <div className='md:w-1/2 lg:w-1/3 w-full md:px-5 md:mb-5 mb-3'>
                  <SelectField
                    required
                    label='Country'
                    placeholder="Country"
                    value={formik.values.contactPersonCountry}
                    onChange={handleChange}
                    error={formik.touched.contactPersonCountry && formik.errors.contactPersonCountry ? formik.errors.contactPersonCountry : ""}>
                    {
                      countriesData.map((e, key) => <Option key={key} value={e.name}>{e.name}</Option>)
                    }
                  </SelectField>
                </div>
              </div>
            </div>
            <div className='border-t pt-5 lg:px-5'>
              <div className='flex space-x-3'>
                <AppButton type='submit' className='w-full' loading={loading}>Update App</AppButton>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </AppLayout>
  )
}

export default Sales;
