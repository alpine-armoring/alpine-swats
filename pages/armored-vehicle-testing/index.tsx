import styles from './Testing.module.scss';
import { getPageData } from 'hooks/api';
import { useEffect } from 'react';
import Image from 'next/image';
import Banner from 'components/global/banner/Banner';
import CustomMarkdown from 'components/CustomMarkdown';
import routes from 'routes';

function Testing(props) {
  const dynamicZone = props?.pageData?.dynamicZone;

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
      <div className={`${styles.testing} background-dark`}>
        {props.pageData?.banner ? (
          <Banner props={props.pageData?.banner} shape="dark" />
        ) : null}

        <div className={`${styles.testing_content} container_small static`}>
          {dynamicZone?.map((component, index) => {
            switch (component.__component) {
              case 'slices.text': {
                return (
                  <div
                    className={`${styles.testing_content_text} text-wrap`}
                    key={index}
                  >
                    <CustomMarkdown>{component.Content}</CustomMarkdown>
                  </div>
                );
              }
              case 'slices.single-media':
                if (component.media.data) {
                  if (
                    component.media.data?.attributes.mime.startsWith('video/')
                  ) {
                    return (
                      <video
                        autoPlay
                        muted
                        loop
                        key={index}
                        className={`${styles.testing_content_video}`}
                      >
                        <source
                          src={component.media.data.attributes.url}
                          type={component.media.data.attributes.mime}
                        />
                      </video>
                    );
                  } else {
                    return (
                      <Image
                        key={index}
                        src={
                          component.media.data?.attributes.formats.large?.url ||
                          component.media.data?.attributes.url
                        }
                        alt={
                          component.media.data?.attributes.alternativeText || ''
                        }
                        width={
                          component.media.data?.attributes.formats.large
                            ?.width || component.media.data?.attributes.width
                        }
                        height={
                          component.media.data?.attributes.formats.large
                            ?.height || component.media.data?.attributes.height
                        }
                        className={`${styles.testing_content_image}`}
                      />
                    );
                  }
                }
                return null;
              default:
                return null;
            }
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  const route = routes.ballisticTesting;

  let pageData = await getPageData({
    route: route.collection,
    populate: 'deep',
    locale,
  });
  pageData = pageData?.data?.attributes || null;

  const seoData = {
    ...(pageData?.seo || {}),
    languageUrls: route.getIndexLanguageUrls(locale),
  };

  return {
    props: { pageData, seoData, locale },
  };
}

export default Testing;
