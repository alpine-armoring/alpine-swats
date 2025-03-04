import { useEffect } from 'react';
import { getPageData } from 'hooks/api';
import routes from 'routes';
import styles from './About.module.scss';
import Banner from 'components/global/banner/Banner';
import CustomMarkdown from 'components/CustomMarkdown';
import FillingText from 'components/global/filling-text/FillingText';
import Gallery from 'components/global/carousel/CarouselCurved';
import Accordion from 'components/global/accordion/Accordion';
import Button from 'components/global/button/Button';
// import useLocale from 'hooks/useLocale';
import 'yet-another-react-lightbox/styles.css';

function About(props) {
  // const { lang } = useLocale();
  const boxes = props?.pageData?.boxes;
  const faqs = props?.pageData?.faqs;

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
      <div className={`${styles.about}`}>
        {props.pageData?.banner ? (
          <Banner props={props.pageData.banner} shape="white" />
        ) : null}

        {props.pageData?.topText ? (
          <div className={`${styles.about_quote}`}>
            <FillingText data={props.pageData?.topText} dark />
          </div>
        ) : null}

        {props.pageData?.text ? (
          <div
            className={`${styles.about_text} observe fade-in container_small`}
          >
            <CustomMarkdown>{props.pageData.text}</CustomMarkdown>
          </div>
        ) : null}

        <div className={`${styles.about_box_wrap}`}>
          {boxes?.map((item, index) => (
            <div
              className={`${styles.about_box_item} background-dark observe fade-in`}
              key={index}
            >
              <div
                className={`${styles.about_box_item_shape} shape-before`}
              ></div>

              <div className={`${styles.about_box_item_content}`}>
                {item.title ? (
                  <h2
                    className={`${styles.about_box_item_title}`}
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  ></h2>
                ) : null}

                {item.description ? (
                  <div className={`${styles.about_box_item_text}`}>
                    <CustomMarkdown>{item.description}</CustomMarkdown>
                  </div>
                ) : null}
              </div>

              {item.image.data ? (
                <div className={`${styles.about_box_item_image}`}>
                  <Gallery props={item.image.data} singular />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {faqs?.length > 0 ? (
          <div className={`mt2`}>
            <Accordion items={faqs} title="Frequently Asked Questions" />
          </div>
        ) : null}

        <div className={`center mt2`}>
          <Button className={`primary rounded`} href="contact">
            Contact Us
          </Button>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  const route = routes.about;

  let pageData = await getPageData({
    route: route.collection,
    populate: 'deep',
    locale,
  });
  pageData = pageData.data?.attributes || null;

  const seoData = {
    ...(pageData?.seo || {}),
    languageUrls: route.getIndexLanguageUrls(locale),
  };

  return {
    props: { pageData, seoData, locale },
  };
}

export default About;
