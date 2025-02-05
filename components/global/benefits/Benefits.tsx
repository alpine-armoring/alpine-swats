import styles from './Benefits.module.scss';
import { useMarkdownToHtml } from 'hooks/useMarkdownToHtml';
import Image from 'next/image';
import Button from 'components/global/button/Button';

const Benefits = (props) => {
  const convertMarkdown = useMarkdownToHtml();

  return (
    <div className={`${styles.benefits} container_small`}>
      {props.data.section1Title ? (
        <div className={`block-reveal-title-wrap`}>
          <h2 className={`block-reveal-title observe block-reveal`}>
            <span
              dangerouslySetInnerHTML={{ __html: props.data.section1Title }}
            ></span>
          </h2>
        </div>
      ) : null}

      {props.data?.section1Text ? (
        <div
          dangerouslySetInnerHTML={{
            __html: convertMarkdown(props.data.section1Text),
          }}
        ></div>
      ) : null}

      {props.data?.section1List ? (
        <div className={`${styles.benefits_list}`}>
          {props.data?.section1List.map((item, index) => (
            <div className={`${styles.benefits_item}`} key={index}>
              <div className={`${styles.benefits_item_heading}`}>
                {item.image.data ? (
                  <Image
                    src={item.image?.data[0].attributes?.url}
                    alt="armored vehicles"
                    width={40}
                    height={40}
                    className={`${styles.benefits_item_icon}`}
                  />
                ) : null}

                {item.title ? (
                  <h3 className={`${styles.benefits_item_title}`}>
                    {item.title}
                  </h3>
                ) : null}
              </div>

              {item.description ? (
                <div
                  className={`${styles.benefits_item_text}`}
                  dangerouslySetInnerHTML={{
                    __html: convertMarkdown(item.description),
                  }}
                ></div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {props.data?.section1Text2 ? (
        <div
          dangerouslySetInnerHTML={{
            __html: convertMarkdown(props.data.section1Text2),
          }}
        ></div>
      ) : null}

      <div className={`${styles.benefits_button} center`}>
        <Button className={`primary rounded`} href="contact">
          Request a Quote
        </Button>
      </div>

      {props.data.section2Title ? (
        <div className={`block-reveal-title-wrap`}>
          <h2
            className={`${styles.benefits_section2} block-reveal-title observe block-reveal`}
          >
            <span
              dangerouslySetInnerHTML={{ __html: props.data.section2Title }}
            ></span>
          </h2>
        </div>
      ) : null}

      {props.data?.section2Text ? (
        <div
          className={`${styles.benefits_text}`}
          dangerouslySetInnerHTML={{
            __html: convertMarkdown(props.data.section2Text),
          }}
        ></div>
      ) : null}

      <div className={`${styles.benefits_button} center`}>
        <Button className={`primary rounded`} href="contact">
          Contact Us!
        </Button>
      </div>
    </div>
  );
};

export default Benefits;
