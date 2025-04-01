import { getPageData } from 'hooks/api';
import useAnimationObserver from 'hooks/useAnimationObserver';
import { useMemo } from 'react';
import routes from 'routes';
import styles from './Downloads.module.scss';
import Banner from 'components/global/banner/Banner';

function Downloads(props) {
  // Animations
  useAnimationObserver({
    dependencies: [props.pageData],
  });

  // Sorting function
  const sortItems = useMemo(() => {
    return (items) =>
      items.sort((a, b) => {
        const textA = a.attributes.alternativeText?.toLowerCase();
        const textB = b.attributes.alternativeText?.toLowerCase();
        return textA?.localeCompare(textB);
      });
  }, []);

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // console.error('Error downloading file:', error);
    }
  };

  return (
    <>
      {props.pageData?.banner ? (
        <Banner props={props.pageData.banner} shape="white" />
      ) : null}

      <div className={`${styles.downloads} container_small`}>
        {props?.pageData?.pdfs?.data?.length ? (
          <div className={`${styles.downloads_column}`}>
            <div className={`${styles.downloads_group}`}>
              {/* <h2 className={`${styles.downloads_group_title}`}>
                {lang.OEMBrochures} – 2024
              </h2> */}
              <ul>
                {sortItems(props.pageData.pdfs.data).map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() =>
                        handleDownload(
                          item.attributes.url,
                          item.attributes.name
                        )
                      }
                    >
                      {item.attributes.alternativeText}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export async function getStaticProps({ locale = 'en' }) {
  const route = routes.allDownloads;

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
export default Downloads;
