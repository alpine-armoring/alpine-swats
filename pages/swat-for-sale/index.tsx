import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { getPageData } from 'hooks/api';
import routes from 'routes';
import styles from '/components/listing/Listing.module.scss';
import InventoryItem from 'components/listing/listing-item/ListingItem';
import Banner from 'components/global/banner/Banner';
import CustomMarkdown from 'components/CustomMarkdown';
import Accordion from 'components/global/accordion/Accordion';

function Home(props) {
  const router = useRouter();
  const { vehicles_we_armor } = router.query;

  const topBanner = { ...props?.pageData?.attributes?.banner };
  const topBannerSubtitle = props?.pageData?.attributes?.banner.subtitle;
  topBanner.subtitle = null;
  const bottomText = props?.pageData?.attributes?.bottomText;
  const faqs = props?.pageData?.attributes?.faqs;

  const filteredVehicles = useMemo(() => {
    if (!vehicles_we_armor || !props.vehicles?.data)
      return props.vehicles?.data;
    return props.vehicles.data.filter(
      (vehicle) =>
        vehicle.attributes?.vehicles_we_armor?.data?.attributes?.slug ===
        vehicles_we_armor
    );
  }, [props.vehicles?.data, vehicles_we_armor]);

  // Animations
  useEffect(() => {
    const targets = document.querySelectorAll('.observe');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.toggle('in-view', entry.isIntersecting);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      }
    );

    targets.forEach((item) => observer.observe(item));

    return () => {
      targets.forEach((item) => observer.unobserve(item));
      observer.disconnect();
    };
  }, []);

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
          name: 'Armored SWATS in stock',
          item: `https://www.armored-swat.com/swat-for-sale`,
        },
      ],
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
      </Head>

      <div className={`${styles.listing} background-dark`}>
        <div className={`b-breadcrumbs b-breadcrumbs-list container`}>
          <Link href="/">Home</Link>
          <span>&gt;</span>
          Armored SWAT vehicles for sale
        </div>

        {topBanner.title && <Banner props={topBanner} shape="dark" />}

        {topBannerSubtitle ? (
          <p className={`${styles.listing_heading} center container`}>
            {topBannerSubtitle}
          </p>
        ) : null}

        <div
          className={`${styles.listing_wrap} ${styles.listing_wrap_inventory} container mt0`}
        >
          {filteredVehicles && filteredVehicles.length > 0 ? (
            <div className={`${styles.listing_list}`}>
              {filteredVehicles.map((item, index) => (
                <InventoryItem key={item.id} props={item} index={index} />
              ))}
            </div>
          ) : (
            <div className={`${styles.listing_list_error}`}>
              No Vehicles Found
            </div>
          )}
        </div>

        {bottomText ? (
          <div className={`container_small`}>
            <div className={`${styles.listing_bottomText}`}>
              <CustomMarkdown>{bottomText}</CustomMarkdown>
            </div>
          </div>
        ) : null}

        {faqs?.length > 0 ? (
          <div className={`mt2`}>
            <Accordion items={faqs} title="Frequently Asked Questions" />
          </div>
        ) : null}
      </div>

      <div className="shape-margin shape-before shape-before-white"></div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const resolvedLocale = locale || 'en';
  const route = routes.inventory;

  let pageData = await getPageData({
    route: route.collection,
    populate: 'deep',
  }).then((response) => response.data);

  pageData = pageData ? pageData : null;

  const query = `filters[$or][0][categories][slug][$eq]=armored-law-enforcement&filters[$or][1][categories][slug][$eq]=armored-specialty-vehicles&filters[$and][0][slug][$notContains]=mastiff&filters[$and][1][slug][$notContains]=condor&filters[$and][2][slug][$notContains]=toyota-land-cruiser-300`;

  const vehicles = await getPageData({
    route: route.collectionSingle,
    params: query,
    sort: 'order',
    populate: 'rentalsFeaturedImage,vehicles_we_armor',
    fields:
      'fields[0]=vehicleID&fields[1]=armor_level&fields[2]=engine&fields[3]=engine&fields[4]=title&fields[5]=slug&fields[6]=trans&fields[7]=VIN&fields[8]=hide&fields[9]=flag&fields[10]=label',
    pageSize: 100,
    locale: resolvedLocale,
  });

  // Filter out hidden vehicles
  if (vehicles?.data) {
    vehicles.data = vehicles.data.filter((vehicle) => !vehicle.attributes.hide);
  }

  const seoData = pageData?.attributes?.seo ?? null;

  return {
    props: {
      pageData,
      vehicles,
      seoData,
      locale: resolvedLocale,
    },
    revalidate: 604800,
  };
}

export default Home;
