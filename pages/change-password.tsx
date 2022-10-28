import { useFormik } from "formik";
import { useState } from "react";
import { api, handle401Error } from "../api";
import * as Yup from 'yup';
import { PasswordField } from "../components/ui/InputField";
import { AppButton } from "../components/ui/Button";
import { Card } from "../components/AppLayout";

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: ""
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Password should be minimum of 6 character")
                .required()
        }),
        onSubmit: values => {
            setLoading(true);

            api.patch("/user/password", values)
                .then(() => window.location.pathname = "/")
                .catch(handle401Error)
                .finally(() => setLoading(false))
        }
    });

    return (
        <div className="flex h-screen items-center justify-center">
            <Card className="p-10 md:w-105 w-full">
                <h1 className="font-extrabold text-2xl text-gray-500">Change Password</h1>
                <form onSubmit={formik.handleSubmit}>
                    <p className="mb-5 mt-3 text-base text-gray-500">Please enter your password below, so you can start enjoying eazibiz</p>
                    <div className="mb-5">
                        <PasswordField
                            id="password"
                            name="password"
                            label="New Password"
                            placeholder="New password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                            value={formik.values.password}
                        />
                    </div>
                    <AppButton className="w-full" loading={loading} type="submit" >Save</AppButton>
                </form>
            </Card>
        </div>
    );
};

export default ChangePassword;