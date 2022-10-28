import React, { createContext, useState, useContext, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { api, handleError, trimErrors } from '../api';
import { GlobalLoad } from '../components/ui/Loading';
import { useDispatch } from 'react-redux';
import { activeUser } from '../redux/user/slice';
import { setApp } from '../redux/app/slice';
import { UnAuthRoutes } from './privent';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const [eazibiz, setEazibiz] = useState({ id: "" });
    const [loading, setLoading] = useState(true);
    const path = router.pathname;

    useEffect(() => {
        setLoading(true);

        async function loadUserFromCookies() {
            app()
                .then(async ({ data }) => {

                    setEazibiz(data);
                    dispatch(setApp(data));

                    const unAuthRoutes = UnAuthRoutes(path);

                    await api.get('/user/me')
                        .then(res => res.data)
                        .then(({ record }) => {
                            setUser(record)
                            dispatch(activeUser(record))
                            if (unAuthRoutes) Router.push('/');
                        })
                        .catch(handleError)
                        .catch((err) => {
                            if (unAuthRoutes) return;
                            throw err;
                        })
                })
                .catch(err => {
                    if (err.status === 307 && router.pathname !== "/network") {
                        Router.push('/network');
                        throw err;
                    }

                    if (err.status === 404 && router.pathname !== "/not-found") {
                        Router.push('/not-found');
                        throw err;
                    }

                    throw err;
                })
                .finally(() => setLoading(false));

        }
        loadUserFromCookies();
    }, []);


    const login = async (phone, password, appId) => {
        return api.post("/auth/login", { phone, password, appId })
            .then(res => res.data)
            .then(({ user }) => {
                if (user.status === "Password Pending") window.location.pathname = '/change-password';
                if (user.status === "Active") window.location.pathname = '/';
            })
            .catch(handleError)
            .catch(trimErrors);
    }

    const logout = async () => {
        setLoading(true);

        await api.get('/user/logout')
            .then(() => window.location.pathname = '/login')
            .catch(handleError)
            .catch(() => window.location.pathname = '/login')
    }

    const app = async () => {
        const domain = window.location.hostname === "localhost" ? "robbystouch.eazibizz.com" : window.location.hostname;

        return api.get(`/app/domain/${domain}`)
            .then(res => res.data)
            .catch(handleError);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, app: eazibiz, isLoading: loading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth: any = () => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        if (isLoading || (!isAuthenticated && window.location.pathname !== '/login' && window.location.pathname !== '/not-found' && window.location.pathname !== '/network')) return <GlobalLoad />;
    }

    return children;
};

export const UnAuthorize = {
    redirect: {
        permanent: false,
        destination: `/login`
    },
};

export const NoNetwork = {
    redirect: {
        permanent: false,
        destination: `/network`
    },
};