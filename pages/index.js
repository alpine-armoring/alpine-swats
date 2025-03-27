import { useEffect } from 'react';
import { getPageData } from 'hooks/api';
import Head from 'next/head';

import HPBanner from 'components/hp-banner/HPBanner';
import FillingText from 'components/global/filling-text/FillingText';
import FeaturedVehicles from 'components/global/featured-vehicles/FeaturedVehicles';
import Testimonials from 'components/global/testimonials/Testimonials';
import Button from 'components/global/button/Button';
import Partners from 'components/global/partners/Partners';
import Accordion from 'components/global/accordion/Accordion';

function Home(props) {
  const data = props.homepageData.data?.attributes;

  const topBanner = {
    title: data?.topBannerTitle,
    description: data?.topBannerDescription,
    video: data?.bannerVideo,
    white: true,
  };

  const topText = data?.topText;

  const featuredVehiclesData = {
    title: data?.featuredVehiclesTitle,
    items: data?.vehicles_we_armors?.data,
  };

  const middleText = data?.middleText;
  const GSA = data?.GSA;
  const testimonials = data?.testimonials;
  const partners = data?.industryPartners;
  const faqsTitle = data?.faqsTitle;
  const faqs = data?.faqs;

  const getOrganizationStructuredData = () => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      image:
        'https://www.alpineco.com/_next/image?url=https%3A%2F%2Fd102sycao8uwt8.cloudfront.net%2Fmedium_About_us_hompage_thumbnail_1_ea1c33f592.JPG&w=640&q=75',
      url: 'https://www.armored-swat.com/',
      sameAs: ['https://www.alpineco.com/'],
      logo: 'https://www.alpineco.com/assets/alpine-armoring-logo-goldbox-curved.png',
      name: 'Alpine Armoring Rentals',
      description:
        'The largest collection of high-end, luxury armored sedans and SUVs available for rental in the US.',
      email: 'rental@armored-swat.com',
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

      {topText ? <FillingText small dark data={topText} /> : null}

      <div className={`center observe fade-in-up`}>
        <Button className={`primary rounded`} href="swat-for-sale">
          View Available Tactical Vehicles
        </Button>
      </div>

      <FeaturedVehicles data={featuredVehiclesData} />

      {middleText ? <FillingText small dark data={middleText} /> : null}

      {GSA ? (
        <>
          <FillingText small dark data={GSA} />
          <div className={`center observe fade-in-up`}>
            <Button className={`primary rounded`} href="contact">
              Contact Us
            </Button>
          </div>
        </>
      ) : null}

      {testimonials ? <Testimonials data={testimonials} /> : null}

      {partners ? <Partners props={partners} /> : null}

      {faqs?.length > 0 ? (
        <div className={`mt2`}>
          <Accordion
            items={faqs}
            title={`${faqsTitle || 'Frequently Asked Questions'}`}
          />
        </div>
      ) : null}
    </>
  );
}

export async function getStaticProps() {
  const homepageData = await getPageData({
    route: 'swat-homepage',
    populate:
      'bannerVideo.video_webm, bannerVideo.video_mp4, industryPartners.image, vehicles_we_armors.featuredImage, vehicles_we_armors.swatsStock, GSA, topText, middleText, seo, testimonials.testimonials, faqs',
    // populate: 'deep',
  });

  const seoData = homepageData.data?.attributes.seo || null;

  return {
    props: { homepageData, seoData },
  };
}

export default Home;
