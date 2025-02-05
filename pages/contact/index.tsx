import styles from './Contact.module.scss';
import { getPageData } from 'hooks/api';
import { useEffect } from 'react';
import Head from 'next/head';
import Banner from 'components/global/banner/Banner';
import Form from 'components/global/form/Form';
import Accordion from 'components/global/accordion/Accordion';
import { useMarkdownToHtml } from 'hooks/useMarkdownToHtml';

function Contact(props) {
  const convertMarkdown = useMarkdownToHtml();
  const faqs = props?.pageData?.fa_qs;
  const vehicles = props?.vehicles;

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

  // FAQ structured data
  const getFAQStructuredData = () => {
    if (!faqs) return null;

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.data.map((faq) => ({
        '@type': 'Question',
        name: faq.attributes.title,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.attributes.text,
        },
      })),
    };

    return JSON.stringify(structuredData);
  };

  return (
    <>
      <Head>
        {faqs && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: getFAQStructuredData() }}
            key="faq-jsonld"
          />
        )}
      </Head>

      <div className={`${styles.contact}`}>
        {props.pageData?.banner ? (
          <Banner props={props.pageData.banner} shape="white" />
        ) : null}
        <div className={`${styles.contact_main} container_small`}>
          <div className={`${styles.contact_main_left}`}>
            <Form vehicles={vehicles} />
          </div>

          <div className={`${styles.contact_main_right}`}>
            <div className={`${styles.contact_main_right_boxes}`}>
              <div className={`${styles.contact_main_right_column}`}>
                <h3 className={`${styles.contact_main_right_title}`}>
                  Our rental support team is available on:
                </h3>
                {props.pageData?.salesInfo ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: convertMarkdown(props.pageData.salesInfo),
                    }}
                  ></div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {faqs?.data.length > 0 ? (
          <Accordion
            items={faqs.data}
            title="Frequently Asked Questions"
            button
          />
        ) : null}
      </div>
    </>
  );
}

export async function getStaticProps() {
  let pageData = await getPageData({
    route: 'rentals-contact-page',
    populate: 'banner.media, banner.imageMobile, banner.mediaMP4, fa_qs, seo',
  });
  pageData = pageData.data?.attributes || null;

  const seoData = pageData?.seo ?? null;

  const vehicles = await getPageData({
    route: 'inventories',
    params: 'filters[categories][slug][$eq]=armored-rental',
    sort: 'order',
    populate: '/',
    fields: 'fields[0]=title',
    pageSize: 100,
  });

  return {
    props: { pageData, vehicles, seoData },
  };
}

export default Contact;
