import '/styles/globals.scss';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import Layout from 'components/Layout';
import Seo from 'components/Seo';
import Loader from 'components/global/loader/Loader';

export default function App({ Component, pageProps }) {
  const seoData = pageProps.seoData;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const paths = ['/inventory', '/models'];

    const handleChangeStart = (url: string) => {
      const isTargetPath = paths.some((path) => {
        const regex = new RegExp(path.replace('[slug]', '.*'));
        return regex.test(url);
      });

      setIsLoading(isTargetPath);
    };

    const handleChangeEnd = (url: string) => {
      const isTargetPath = paths.some((path) => {
        const regex = new RegExp(path.replace('[slug]', '.*'));
        return regex.test(url);
      });

      if (isTargetPath) {
        setIsLoading(false);
      }
    };

    Router.events.on('routeChangeStart', handleChangeStart);
    Router.events.on('routeChangeComplete', handleChangeEnd);
    Router.events.on('routeChangeError', handleChangeEnd);

    return () => {
      Router.events.off('routeChangeStart', handleChangeStart);
      Router.events.off('routeChangeComplete', handleChangeEnd);
      Router.events.off('routeChangeError', handleChangeEnd);
    };
  }, []);

  return (
    <>
      <Seo props={seoData} />
      <Layout>
        {isLoading ? <Loader /> : null}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
