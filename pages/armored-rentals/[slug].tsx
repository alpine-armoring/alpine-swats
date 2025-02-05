import styles from './InventoryVehicle.module.scss';
import { getPageData } from 'hooks/api';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const InfoIcon = dynamic(() => import('components/icons/Info'));
import Link from 'next/link';
import Head from 'next/head';
import Button from 'components/global/button/Button';
import Carousel from 'components/global/carousel/Carousel';
import LightboxCustom from 'components/global/lightbox/LightboxCustom';
import PlayIcon from 'components/icons/Play2';
import InquiryForm from 'components/global/form/InquiryForm';
import VideoScale, {
  animateVideo,
} from 'components/global/video-scale/VideoScale';
import { useMarkdownToHtml } from 'hooks/useMarkdownToHtml';

function InventoryVehicle(props) {
  const convertMarkdown = useMarkdownToHtml();

  useEffect(() => {
    const setupObserver = () => {
      const targets = document.querySelectorAll('.observe');
      if (targets.length < 1) {
        setTimeout(setupObserver, 100);
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.toggle('in-view', entry.isIntersecting);
            // observer.unobserve(entry.target);

            // VideoScale
            if (entry.target.classList.contains('videoScaleContainer')) {
              window.addEventListener(
                'scroll',
                () => animateVideo(entry.target),
                { passive: true }
              );
            }
          } else {
            if (entry.target.classList.contains('videoScaleContainer')) {
              window.removeEventListener('scroll', () =>
                animateVideo(entry.target)
              );
            }
          }
        });
      });

      targets.forEach((item) => observer.observe(item));

      return () => {
        targets.forEach((item) => observer.unobserve(item));
        observer.disconnect();
      };
    };

    setupObserver();
  }, []);

  // Lightbox
  const [selectedTitle, setSelectedTitle] = useState('');
  const [contentType, setContentType] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [isLightboxPopupOpen, setLightboxPopupOpen] = useState(false);

  const handleLightboxOpen = (title, location, contentType, url = null) => {
    setSelectedTitle(title);
    setContentType(contentType);
    if (contentType === 'video') {
      setVideoSrc(url);
    }
    setLightboxPopupOpen(true);
  };

  const lightboxData = {
    title: selectedTitle,
    contentType: contentType,
    videoSrc: videoSrc,
  };

  if (!props.data?.data?.[0]) {
    return <div>Loading...</div>;
  }

  const data =
    props && props.data && props.data.data[0] && props.data.data[0].attributes;
  const topGallery = data?.rentalsGallery?.data;
  const mainText = data?.rentalsDescription;
  const videoWebm = data?.video?.data?.attributes;
  const videoMP4 = data?.videoMP4?.data?.attributes;

  const sliderTopOptions = {
    dragFree: false,
    loop: true,
    thumbs: true,
  };

  const vehicleDetailsMain = {
    Level: 'armor_level',
    'Vehicle ID': 'rentalsVehicleID',
    'Engine & Power': 'engine',
    Trans: 'trans',
    Drivetrain: 'driveTrain',
    'Color (Exterior)': 'color_ext',
    'Color (Interior)': 'color_int',
  };

  const formData = {
    title: data?.title.replaceAll(/luxury/gi, ''),
    vehicleID: data?.rentalsVehicleID,
    featuredImage: data?.rentalsFeaturedImage,
  };

  const scroll = () => {
    const element = document.getElementById('request-a-quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          name: 'Available now',
          item: `https://www.armoredautos.com/armored-rentals`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: data?.title,
          item: `https://www.armoredautos.com/armored-rentals/${data?.slug}`,
        },
      ],
    };
    return JSON.stringify(structuredData);
  };

  const getProductStructuredData = () => {
    return {
      '@context': 'https://schema.org/',
      '@type': ['Product', 'Vehicle'],
      name: data?.title?.replace('\n', ' '),
      image: data?.featuredImage?.data?.attributes?.url,
      description:
        props.seoData?.metaDescription || data?.title?.replace('\n', ' '),
      url: `https://www.armoredautos.com/armored-rentals/${data?.slug}`,
      brand: {
        '@type': 'Brand',
        name: 'Alpine Armoring® Armored Vehicles for Rent',
      },
      sku: `Alpine-${data?.slug}`,
      offers: {
        '@type': 'AggregateOffer',
        url: `https://www.armoredautos.com/armored-rentals/${data?.slug}`,
        priceCurrency: 'USD',
        lowPrice: '50000',
        highPrice: '200000',
        offerCount: '1',
        availability: 'https://schema.org/InStock',
        // itemCondition: 'https://schema.org/NewCondition',
        seller: {
          '@type': 'Organization',
          name: 'Alpine Armoring',
        },
        description: 'Price available upon request. Contact us for details.',
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Armoring Level',
          value: data?.armor_level,
        },
        {
          '@type': 'PropertyValue',
          name: 'Vehicle ID',
          value: data?.rentalsVehicleID,
        },
        {
          '@type': 'PropertyValue',
          name: 'Engine & Power',
          value: data?.engine,
        },
        {
          '@type': 'PropertyValue',
          name: 'Trans',
          value: data?.trans,
        },
        {
          '@type': 'PropertyValue',
          name: 'Drivetrain',
          value: data?.driveTrain,
        },
        {
          '@type': 'PropertyValue',
          name: 'Color (Exterior)',
          value: data?.color_ext,
        },
        {
          '@type': 'PropertyValue',
          name: 'Color (Interior)',
          value: data?.color_int,
        },
      ],
    };
  };

  const getVideoStructuredData = () => {
    const videoData = videoMP4 || videoWebm;

    if (!videoData) {
      return null;
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: data?.title?.replace(/\s+/g, ' ').trim() || 'Vehicle Video',
      description: props.seoData.metaDescription || 'Vehicle showcase video',
      thumbnailUrl: data?.featuredImage?.data?.attributes?.url || '',
      uploadDate: videoData.createdAt,
      contentUrl: videoData.url,
      embedUrl: videoData.url,
      duration: 'PT0M30S', // Default duration
      encodingFormat: videoData.mime,
      width: videoData.width || '',
      height: videoData.height || '',
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
        {(videoWebm || videoMP4) && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: getVideoStructuredData() }}
            key="video-jsonld"
          />
        )}
        {getProductStructuredData() && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(getProductStructuredData()),
            }}
            key="product-jsonld"
          />
        )}
      </Head>

      <div className={`${styles.inventory}`}>
        <div className={`${styles.inventory_main}`}>
          <div className={`${styles.inventory_heading}`}>
            <div className={`b-breadcrumbs`}>
              <Link href="/">Home</Link>
              <span>&gt;</span>
              <Link href="/armored-rentals">Ready to rent</Link>
              <span>&gt;</span>
              <span className={`b-breadcrumbs_current`}>{data?.title}</span>
            </div>

            <div className={`${styles.inventory_heading_title}`}>
              {data?.title ? (
                <h1
                  dangerouslySetInnerHTML={{
                    __html: `Rental ${data.title.replaceAll(/luxury/gi, '')}`,
                  }}
                ></h1>
              ) : null}
            </div>

            {data?.flag !== 'sold' ? (
              <div className={`${styles.inventory_heading_description}`}>
                <InfoIcon />
                <p>
                  This {data?.title.replaceAll(/luxury/gi, '')} is now available
                  for rental
                </p>
              </div>
            ) : null}
          </div>

          <div className={`${styles.inventory_top}`}>
            <div className={`${styles.inventory_top_gallery}`}>
              <div
                className={`
                ${styles.inventory_top_gallery_wrap}              
                ${data?.flag == 'sold' ? styles.inventory_top_gallery_wrap_sold : ''} 
              `}
              >
                {topGallery ? (
                  <Carousel slides={topGallery} options={sliderTopOptions} />
                ) : null}

                {data?.flag == 'sold' ? (
                  <div
                    className={`${styles.inventory_top_gallery_wrap_sold_label}`}
                  >
                    <span>Sold</span>
                  </div>
                ) : null}

                {data?.armor_level || data?.videoURL ? (
                  <div className={`${styles.inventory_info}`}>
                    {data?.armor_level ? (
                      <Link
                        href="/ballistic-chart"
                        className={`${styles.inventory_armor}`}
                      >
                        <div className={`${styles.inventory_armor_box}`}>
                          Armor
                          <span>Level</span>
                        </div>
                        <strong>{data?.armor_level}</strong>
                      </Link>
                    ) : null}
                    {data?.videoURL ? (
                      <div
                        onClick={() =>
                          handleLightboxOpen(
                            data.title,
                            '',
                            'video',
                            data.videoURL
                          )
                        }
                        className={`${styles.inventory_armor}`}
                      >
                        <div className={`${styles.inventory_armor_box}`}>
                          Watch
                          <span>Video</span>
                        </div>
                        <PlayIcon />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div
                className={`${styles.inventory_top_shape} shape-before shape-before-dark mobile-only`}
              ></div>
            </div>

            <div className={`${styles.inventory_details}`}>
              <ul className={`${styles.inventory_details_list}`}>
                {Object.entries(vehicleDetailsMain).map(([key, value]) => {
                  let dimensionValue = null;

                  if (
                    data &&
                    data[value] != null &&
                    data[value] != '' &&
                    data[value] != ' '
                  ) {
                    if (key === 'Weight (Armored)') {
                      // Apply thousands separator to the pounds value if it's in the thousands
                      const poundsValue =
                        parseInt(data[value]) >= 1000
                          ? parseInt(data[value]).toLocaleString()
                          : parseInt(data[value]);
                      // Convert pounds to kilograms and round to the nearest whole number
                      const weightInKg = Math.round(data[value] * 0.45359237);
                      // Apply thousands separator to the kilograms value if it's in the thousands
                      const kilogramsValue =
                        weightInKg >= 1000
                          ? weightInKg.toLocaleString()
                          : weightInKg;
                      dimensionValue = `${poundsValue} lbs (${kilogramsValue} kg)`;
                    } else if (
                      ['Height', 'Length', 'Width', 'Wheelbase'].includes(key)
                    ) {
                      // Convert inches to centimeters
                      dimensionValue = `${data[value]} in. (${Math.round(
                        data[value] * 2.54
                      )} cm)`;
                    } else {
                      dimensionValue = data[value];
                    }
                  }

                  return (
                    data &&
                    data[value] != null &&
                    data[value] != '' &&
                    data[value] != ' ' && (
                      <li
                        key={key}
                        className={`${styles.inventory_details_list_item}`}
                      >
                        {`${key}:`}
                        <span>{dimensionValue}</span>
                      </li>
                    )
                  );
                })}
              </ul>

              {data?.rentalsShortDescription ? (
                <div
                  className={`${styles.inventory_details_description}`}
                  dangerouslySetInnerHTML={{
                    __html: convertMarkdown(data?.rentalsShortDescription),
                  }}
                ></div>
              ) : null}

              <div className={`${styles.inventory_cta_wrap}`}>
                <Button
                  onClick={scroll}
                  button={true}
                  className={`${styles.inventory_cta} primary attention`}
                  attention
                >
                  Request a quote
                </Button>
              </div>
            </div>
          </div>
        </div>

        {mainText ? (
          <div
            className={`${styles.inventory_description} container_small`}
            dangerouslySetInnerHTML={{ __html: convertMarkdown(mainText) }}
          ></div>
        ) : null}

        {videoWebm || videoMP4 ? (
          <VideoScale videoWebm={videoWebm} videoMP4={videoMP4} />
        ) : null}

        {formData ? <InquiryForm {...formData} className={`formCTA`} /> : null}

        {isLightboxPopupOpen ? (
          <LightboxCustom
            isLightboxPopupOpen={isLightboxPopupOpen}
            lightboxData={lightboxData}
            setLightboxPopupOpen={setLightboxPopupOpen}
          />
        ) : null}
      </div>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const data = await getPageData({
//     route: 'inventories',
//     params: `filters[slug][$eq]=${context.params.slug}`,
//   });

//   const seoData = data?.data?.[0]?.attributes?.seo ?? null;

//   if (!data || !data.data || data.data.length === 0) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: { data, seoData },
//   };
// }

export async function getStaticPaths() {
  try {
    const slugsResponse = await getPageData({
      route: 'inventories',
      fields: 'fields[0]=slug',
      populate: '/',
    });

    if (!Array.isArray(slugsResponse.data)) {
      throw new Error('Invalid data format');
    }

    const paths = slugsResponse.data.reduce((acc, item) => {
      if (item.attributes && item.attributes.slug) {
        acc.push({ params: { slug: item.attributes.slug } });
      }
      return acc;
    }, []);

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    // console.error('Error fetching slugs:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export async function getStaticProps({ params }) {
  const data = await getPageData({
    route: 'inventories',
    params: `filters[slug][$eq]=${params.slug}`,
  });

  const seoData = data?.data?.[0]?.attributes?.seo ?? null;
  if (seoData) {
    seoData.metaTitle = `Rental ${seoData.metaTitle}`;

    seoData.thumbnail =
      data?.data?.[0]?.attributes?.rentalsFeaturedImage?.data?.attributes ??
      null;

    if (seoData.metaDescription) {
      seoData.metaDescription = seoData.metaDescription.replace(
        /\b(armored)\b/,
        'rental armored'
      );
    }
  }

  if (!data || !data.data || data.data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data, seoData },
  };
}

export default InventoryVehicle;
