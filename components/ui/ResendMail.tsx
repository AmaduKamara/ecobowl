import { Button } from "antd"
import { useFormik } from "formik";
import { InputField } from "./InputField";
import * as Yup from 'yup';
import { useState } from "react";
import { api, handleError } from "../../api";
import { useAuth } from "../../contexts/auth";
import Router from "next/router";

export const ExpiredToken = () => {
    return (
        <div className="bg-white shadow px-9 p-10 md:w-105 w-full flex flex-col items-center">
            <h1 className="font-extrabold text-2xl text-gray-500 text-center">Verification Token Expired</h1>
            <p className="text-center text-base py-10 text-gray-500 leading-relaxed">
                Hi, your verification token has expired, because you haven't used on time. The token expires in 24 hours and can only be used once. You can create one by clicking on Resend Token button.
            </p>
            <Button onClick={() => Router.push('resend-token')} className="px-10 h-14" size="large" type="primary">Resend Token</Button>
        </div>
    )
}

export const ResendToken = () => {
    const { app } = useAuth();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required()
        }),
        onSubmit: values => {
            setLoading(true);

            api.get(`/auth/resend?email=${values.email}&appId=${app.id}`)
                .then(res => res.data)
                .then(res => {
                    console.log(res);
                })
                .catch(handleError)
                .catch(err => {
                    console.log(err);
                })
                .finally(() => setLoading(false))
        }
    });

    return (
        <div className="bg-white shadow p-16 md:w-105 w-full">
            <h1 className="font-extrabold text-2xl text-gray-500">Resend Verification Token</h1>
            <form onSubmit={formik.handleSubmit}>
                <p className="mb-5 mt-3">Please enter your email address below</p>
                <div className="mb-5">
                    <InputField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                        value={formik.values.email}
                    />
                </div>
                <Button block size="large" loading={loading} htmlType="submit" type="primary">Send</Button>
            </form>
        </div>
    )
}