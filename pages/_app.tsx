import 'antd/dist/antd.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { wrapper } from "../redux";
import { AuthProvider, ProtectRoute } from '../contexts/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RouteLoader } from '../components/ui/Loading';
import { Permission } from '../contexts/permission';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

  }, [router]);

  return <>
    <AuthProvider>
      <ProtectRoute>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <RouteLoader loading={loading} />
          <Component {...pageProps} />
      </ProtectRoute>
    </AuthProvider>
  </>
}


export default wrapper.withRedux(MyApp);