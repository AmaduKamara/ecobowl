import axios from "axios"
import getConfig from 'next/config';
import { setApp } from "../redux/app/slice";
const { publicRuntimeConfig } = getConfig();


const NoCookie = {
    props: {

    }
};

const UnAuthorize = {
    redirect: {
        permanent: false,
        destination: `/login`
    },
};

const Authorize = {
    redirect: {
        permanent: false,
        destination: `/`
    },
};

const NotFound = {
    redirect: {
        permanent: false,
        destination: `/not-found`
    },
};

const NoNetwork = {
    redirect: {
        permanent: false,
        destination: `/network`
    },
};

export const handle401Error = err => {
    const { response, code, } = err;

    if (code === "ERR_NETWORK") throw { status: 307, data: "Network issue" };

    if (!response) throw err;

    const { status, data, statusText } = response;

    if (status === 401) window.location.pathname = '/login';
    
    throw {
        status, data, statusText
    }
}

export const handleError = err => {
    const { response, code, } = err;

    if (code === "ERR_NETWORK") throw { status: 307, data: "Network issue" };

    if (!response) throw err;

    const { status, data, statusText } = response;
    
    throw {
        status, data, statusText
    }
}

export const trimErrors = ({ data, status, statusText }) => {
    const errors: Array<string> = [];

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            errors.push(data[key]);
        }
    }

    throw { errors, status, statusText };
}

export const api = axios.create({
    baseURL: publicRuntimeConfig.backendUrl,
    withCredentials: true
})
const app = async (host, store) => {

    const domain = host;

    return api.get(`/app/domain/${domain}`)
        .then(res => res.data)
        .then(({ data }) => {
            store.dispatch(setApp(data));
            return data;
        })
        .catch(handleError)
        .catch(err => err);
};

export const ApiServer = {
    getWithAuth: async (route, req, store, action) => {
        const { cookie } = req.headers;

        if (!cookie) return NoCookie;

        const response = await api.get(route, { headers: { cookie } })
            .then(res => res.data)
            .catch(handleError)
            .catch(err => err)

        if (response.status === 307) return NoNetwork;

        if (response.status === 401) return UnAuthorize;

        store.dispatch(action(response));

        return {
            props: {
                record: response.data
            }
        };
    },
    getOneWithAuth: async (route, req) => {
        const { cookie } = req.headers;

        if (!cookie) return UnAuthorize;

        const response = await api.get(route, { headers: { cookie } })
            .then(res => res.data)
            .catch(handleError)
            .catch(err => err)

        if (response.status === 307) return NoNetwork;

        if (response.status === 401) return UnAuthorize;

        if (response.status === 404) return NotFound;

        return {
            props: {
                record: response.data
            }
        };
    },
    app: async ({ req, store, isLogin = false, is404 = false }) => {
        const { cookie, host } = req.headers;

        const res = await app(host, store);

        if (res.status === 404 && !is404) return NotFound;

        if (!cookie && !isLogin && !is404) return UnAuthorize;

        if (res.name && is404) return Authorize;

        return {
            props: {
                app: res
            }
        };
    }
}