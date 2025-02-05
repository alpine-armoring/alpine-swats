import { useEffect } from 'react';
import { getPageData } from 'hooks/api';
import Head from 'next/head';

// import { BannerFull } from '@este93/shared-components';
import HPBanner from 'components/hp-banner/HPBanner';
import FillingText from 'components/global/filling-text/FillingText';
import FeaturedVehicles from 'components/global/featured-vehicles/FeaturedVehicles';
import Benefits from 'components/global/benefits/Benefits';

function Home(props) {
  const data = props.homepageData.data?.attributes;

  const getOrganizationStructuredData = () => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      image:
        'https://www.alpineco.com/_next/image?url=https%3A%2F%2Fd102sycao8uwt8.cloudfront.net%2Fmedium_About_us_hompage_thumbnail_1_ea1c33f592.JPG&w=640&q=75',
      url: 'https://www.armoredautos.com/',
      sameAs: ['https://www.alpineco.com/'],
      logo: 'https://www.alpineco.com/assets/Alpine-Armoring-Armored-Vehicles.png',
      name: 'Alpine Armoring Rentals',
      description:
        'The largest collection of high-end, luxury armored sedans and SUVs available for rental in the US.',
      email: 'rental@armoredautos.com',
      telephone: '+1 703 471 0002',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '4170 Lafayette Center Drive #100',
        addressLocality: 'Chantilly',
        addressCountry: 'US',
        addressRegion: 'Virginia',
        postalCode: '20151',
      },
    };

    return JSON.stringify(structuredData);
  };

  const topBanner = {
    title: data?.topBannerTitle,
    description: data?.topBannerDescription,
    video: data?.bannerVideo,
    white: true,
  };

  const quote = data?.quote;

  const featuredVehiclesData = {
    title: data?.featuredVehiclesTitle,
    items: data?.featuredRentalVehicles?.data,
  };

  const benefitsData = {
    section1Title: data?.section1Title,
    section1Text: data?.section1Text,
    section1List: data?.section1List,
    section1Text2: data?.section1text2,
    section2Title: data?.section2title,
    section2Text: data?.section2text,
  };

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

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: getOrganizationStructuredData() }}
          key="organization-jsonld"
        />
      </Head>

      {topBanner ? <HPBanner props={topBanner} /> : null}

      {quote ? <FillingText small dark data={quote} /> : null}

      <FeaturedVehicles data={featuredVehiclesData} />

      <Benefits data={benefitsData} />
    </>
  );
}

export async function getStaticProps() {
  const homepageData = await getPageData({
    route: 'rentals-homepage',
    populate: 'deep',
  });

  const seoData = homepageData.data?.attributes.seo || null;

  return {
    props: { homepageData, seoData },
  };
}

export default Home;
