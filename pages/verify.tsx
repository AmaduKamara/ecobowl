import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api, handleError } from "../api";
import { Loader } from "../components/Loader";
import { ExpiredToken } from "../components/ui/ResendMail";

const Verify = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = router.query.token;

        api.get(`/auth/verify/${token}`)
            .then(() => Router.push('/change-password'))
            .catch(handleError)
            .finally(() => setLoading(false));
    }, [])

    return (
        <div className="flex h-screen items-center justify-center">
            {
                loading ? <Loader /> : <ExpiredToken/>
            }
        </div>
    );
};

export default Verify;