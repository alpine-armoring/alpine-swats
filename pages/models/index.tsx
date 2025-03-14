import React from 'react';
import Banner from 'components/global/banner/Banner';
import InventoryItem from 'components/listing/listing-item-all/ListingItemAll';
import styles from '/components/listing/Listing.module.scss';
import { getPageData } from 'hooks/api';
import routes from 'routes';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import CustomMarkdown from 'components/CustomMarkdown';
import Accordion from 'components/global/accordion/Accordion';

function VehicleWeArmor(props) {
  const topBanner = props.pageData?.banner;
  const bottomText = props.pageData?.bottomText;
  const faqs = props.pageData?.faqs;
  const vehiclesData = props.pageData.vehicles_we_armors.data;

  useEffect(() => {
    const targets = document.querySelectorAll('.observe');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.toggle('in-view', entry.isIntersecting);
          observer.unobserve(entry.target);
        }
      });
    });

    targets.forEach((item) => observer.observe(item));

    return () => {
      targets.forEach((item) => observer.unobserve(item));
      observer.disconnect();
    };
  });

  const getBreadcrumbStructuredData = () => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.armored-swat.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Models',
          item: `https://www.armored-swat.com/models`,
        },
      ],
    };
    return JSON.stringify(structuredData);
  };

  // FAQ structured data
  const getFAQStructuredData = () => {
    if (!faqs || !Array.isArray(faqs)) {
      console.error('FAQs is not an array:', faqs);
      return null;
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq, index) => {
        const title =
          faq?.attributes?.title || faq?.title || `FAQ ${index + 1}`;
        const text = faq?.attributes?.text || faq?.text || 'No answer provided';

        return {
          '@type': 'Question',
          name: title,
          acceptedAnswer: {
            '@type': 'Answer',
            text: text,
          },
        };
      }),
    };

    return JSON.stringify(structuredData);
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: getBreadcrumbStructuredData() }}
          key="breadcrumb-jsonld"
        />
        {faqs?.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: getFAQStructuredData() }}
            key="faq-jsonld"
          />
        )}
      </Head>

      <div className={`${styles.listing}`}>
        <div
          className={`b-breadcrumbs b-breadcrumbs-list b-breadcrumbs-dark container`}
        >
          <Link href="/">Home</Link>
          <span>&gt;</span>
          Models
        </div>

        {topBanner ? <Banner props={topBanner} shape="white" small /> : null}

        <div className={`${styles.listing_wrap} container`}>
          {vehiclesData?.length < 1 ? (
            <div className={`${styles.listing_empty}`}>
              <h2>No Vehicles Found</h2>
            </div>
          ) : null}

          {vehiclesData ? (
            <div className={`${styles.listing_list}`}>
              {vehiclesData.map((item, index) => (
                <InventoryItem
                  key={index}
                  props={item}
                  index={index === 0 ? index : 1}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {bottomText ? (
        <div className={`container_small`}>
          <div className={`${styles.listing_bottomText} darkColor`}>
            <CustomMarkdown>{bottomText}</CustomMarkdown>
          </div>
        </div>
      ) : null}

      {faqs?.length > 0 ? (
        <div className={`mt2`}>
          <Accordion items={faqs} title="Frequently Asked Questions" />
        </div>
      ) : null}
    </>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context;
  const route = routes.models;

  try {
    let pageData = await getPageData({
      route: route.collection,
      // populate: 'deep',
      populate:
        'banner.media, banner.imageMobile, banner.mediaMP4, faqs, vehicles_we_armors.featuredImage',
      locale,
    });
    pageData = pageData?.data?.attributes || null;

    const seoData = pageData?.seo || null;

    return {
      props: { pageData, seoData },
    };
  } catch (error) {
    // console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
}

export default VehicleWeArmor;
