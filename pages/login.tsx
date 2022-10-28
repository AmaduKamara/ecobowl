import Link from "next/link";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from "react";
import { useAuth } from "../contexts/auth";
import { InputField, PasswordField } from "../components/ui/InputField";
import { Checkbox } from "antd";
import { HeadTitle } from "../components/head";
import { phoneRegExp } from "../common";
import { AppButton } from "../components/ui/Button";
import { Card } from "../components/AppLayout";

const Login = () => {

    const [isLoading, setLoading] = useState(false);
    const { login } = useAuth();
    const [error, setError] = useState([]);


    const formik = useFormik({
        initialValues: {
            phone: "",
            password: ""
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .matches(phoneRegExp, 'Phone number is not valid eg: 76000000')
                .required(),
            password: Yup.string()
                .min(6, "Must be 8 characters or greater")
                .required()
        }),
        onSubmit: values => {
            setError([]);
            setLoading(true);

            login(`+232${values.phone}`, values.password)
                .catch(({ errors }) => {
                    setError(errors);
                    setLoading(false)
                })
        }
    });

    return <>
        <HeadTitle title="Login" />
        <div className="flex h-screen items-center justify-center px-4">
            <Card className="w-full md:w-96 px-8 py-6">
                <div className="mb-5">
                    <div className="flex items-center mb-7 space-x-2">
                        <p className="text-xl font-bold">ecobowl</p>
                    </div>
                </div>
                {
                    error.length > 0 ? <ul className='mb-5'>
                        {
                            error.map((e, i) => (<li key={i} className="mb-1 text-xs text-red-500 font-bold">{i + 1}. {e}</li>))
                        }
                    </ul> : null
                }
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-7">
                        <InputField
                            id="phone"
                            name="phone"
                            type="phone"
                            addonBefore="+232"
                            placeholder="Phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}
                            value={formik.values.phone}
                        />
                    </div>
                    <div className="mb-7">
                        <PasswordField
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                            value={formik.values.password}
                        />
                    </div>
                    <div className="mb-5 md:mb-7 flex justify-between">
                        <Checkbox>Remember me</Checkbox>
                        <Link href="/create-password">
                            <a className="text-blue-600 text-sm">Forget password?</a>
                        </Link>
                    </div>
                    <div>
                        <div className="flex items-center justify-between space-x-5 text-sm mb-5">
                            <AppButton className="w-full" loading={isLoading} type="submit">Sign in</AppButton>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    </>
};

export default Login;