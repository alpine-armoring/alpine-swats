import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import localFont from 'next/font/local';
import dynamic from 'next/dynamic';
import Script from 'next/script';

import Header from './global/header/Header';
import Footer from './global/footer/Footer';
const NavigationPopup = dynamic(
  () => import('components/global/navigation/NavigationPopup'),
  {
    ssr: false,
  }
);
const ScrollToTopButton = dynamic(
  () => import('components/global/scroll-to-top-button/ScrollToTopButton'),
  {
    ssr: false,
  }
);

const termina = localFont({
  src: [
    {
      path: '../public/fonts/Termina-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Termina-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Termina-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Termina-Demi.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

const Layout = ({ children }) => {
  const router = useRouter();

  const isHomepage = router.pathname === '/';

  const pathsHeaderTransparent = ['/armored-vehicle-testing'];
  const isHeaderGray = pathsHeaderTransparent.some(
    (path) => router.pathname.startsWith(path) || isHomepage
  );

  const pathsDarkFooter = ['/armored-vehicle-testing'];
  const isDarkFooter = pathsDarkFooter.some((path) =>
    router.pathname.startsWith(path)
  );

  const pathsDarkMode = ['/swat-for-sale', '/armored-vehicle-testing'];
  const isDarkMode = pathsDarkMode.some((path) =>
    router.pathname.startsWith(path)
  );

  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {isDarkMode && (
          <style>{`
              body {
                background: #101010 url(/assets/noise4.png) !important;
                background-size: 30px !important;
              }
              .c-navigation_item:after{
                background: #b7baa7 !important;
              }
            `}</style>
        )}
        {isHeaderGray && (
          <style>{`
              header{
                background-color: rgba(23, 23, 23, 0.8) !important;
                backdrop-filter: blur(10px) !important;
              }
              .navigation_submenu a{
                color: white;
              }
              .c-navigation_item:after{
                background: #b7baa7 !important;
              }
            `}</style>
        )}
        {isHomepage && (
          <style>{`
              body {
                padding-top: 0 !important;
              }
            `}</style>
        )}
      </Head>

      {/* Google Tag Manager */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KZS55GD5');
          `,
        }}
      />

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KZS55GD5"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <div className={termina.className}>
        <Header
          setNavOpen={setNavOpen}
          isNavOpen={isNavOpen}
          isHeaderGray={isHeaderGray}
          isDarkMode={isDarkMode}
        />

        <NavigationPopup isNavOpen={isNavOpen} setNavOpen={setNavOpen} />

        {children}

        <ScrollToTopButton />

        <Footer isDarkMode={isDarkFooter} />
      </div>
    </>
  );
};

export default Layout;
