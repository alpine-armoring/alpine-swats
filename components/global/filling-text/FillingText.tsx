import styles from './FillingText.module.scss';
import CustomMarkdown from 'components/CustomMarkdown';

const FillingText = ({ data, dark = false, className = '', small = false }) => {
  const title = data.title;
  const text = data.text || data;

  return (
    <div
      className={`
        ${styles.fillingText} container
        ${styles[className]}
        ${dark ? styles.fillingText_dark : ''}
        ${small ? styles.fillingText_small : ''}
      `}
    >
      <div className={`${styles.fillingText_content}`}>
        {title ? (
          <div className={`block-reveal-title-wrap`}>
            <h2 className={`block-reveal-title observe block-reveal`}>
              <span dangerouslySetInnerHTML={{ __html: title }}></span>
            </h2>
          </div>
        ) : null}

        {text ? (
          <div className={`${styles.fillingText_text} observe fade-in`}>
            <CustomMarkdown>{text}</CustomMarkdown>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FillingText;
