import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getPageData } from 'hooks/api';
import styles from '/components/listing/Listing.module.scss';
import InventoryItem from 'components/listing/listing-item/ListingItem';
import Banner from 'components/global/banner/Banner';

function Home(props) {
  const topBanner = { ...props?.pageData?.attributes?.banner };
  const topBannerSubtitle = props?.pageData?.attributes?.banner.subtitle;
  topBanner.subtitle = null;

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
          item: 'https://www.armoredautos.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Armored Vehicles Ready to rent',
          item: `https://www.armoredautos.com/armored-rentals`,
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

      <div className={`${styles.listing}`}>
        <div className={`b-breadcrumbs b-breadcrumbs-list container`}>
          <Link href="/">Home</Link>
          <span>&gt;</span>
          Armored Vehicles Ready to rent
        </div>

        {topBanner.title && <Banner props={topBanner} shape="white" />}

        {topBannerSubtitle ? (
          <p className={`${styles.listing_heading} center container`}>
            {topBannerSubtitle}
          </p>
        ) : null}

        <div
          className={`${styles.listing_wrap} ${styles.listing_wrap_inventory} container mt0`}
        >
          {props.vehicles.data && props.vehicles.data.length > 0 ? (
            <div className={`${styles.listing_list}`}>
              {props.vehicles.data.map((item, index) => (
                <InventoryItem key={item.id} props={item} index={index} />
              ))}
            </div>
          ) : (
            <div className={`${styles.listing_list_error}`}>
              No Vehicles Found
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const query = `filters[categories][slug][$eq]=armored-rental`;

  const vehicles = await getPageData({
    route: 'inventories',
    params: query,
    sort: 'order',
    populate: 'rentalsFeaturedImage',
    fields:
      'fields[0]=rentalsVehicleID&fields[1]=armor_level&fields[2]=engine&fields[3]=engine&fields[4]=title&fields[5]=slug&fields[6]=trans',
    pageSize: 100,
  });

  let pageData = await getPageData({
    route: 'rentals-listing',
    populate: 'deep',
  }).then((response) => response.data);

  pageData = pageData ? pageData : null;

  const seoData = pageData?.attributes?.seo ?? null;

  return {
    props: {
      pageData,
      vehicles,
      seoData,
    },
  };
}

export default Home;
