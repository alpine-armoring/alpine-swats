import { useEffect, useState, useCallback } from 'react';
import styles from './MediaList.module.scss';
import EmblaCarousel from 'embla-carousel';
import VideoSingle from './VideoSingle';
import LightboxCustom from 'components/global/lightbox/LightboxCustom';

function MediaList({ props, itemType }) {
  // Slider setup
  const [emblaApi, setEmblaApi] = useState(null);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const emblaNode = document.querySelector('.embla') as HTMLElement;
    if (!emblaNode) return;

    const sliderOptions = { dragFree: true };
    const api = EmblaCarousel(emblaNode, sliderOptions);
    setEmblaApi(api);

    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());

    api.on('scroll', () => {
      setPrevBtnDisabled(!api.canScrollPrev());
      setNextBtnDisabled(!api.canScrollNext());
    });

    return () => {
      api.destroy();
    };
  }, []);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  // Lightbox
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [contentType, setContentType] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [imageSrcs, setGallery] = useState('');
  const [isLightboxPopupOpen, setLightboxPopupOpen] = useState(false);

  const handleLightboxOpen = (
    title,
    location,
    contentType,
    url = null,
    gallery = null,
    date = null,
    year = null
  ) => {
    setSelectedTitle(title);
    setSelectedLocation(location);
    setContentType(contentType);
    if (contentType === 'video') {
      setVideoSrc(url);
    } else if (contentType === 'content') {
      setGallery(gallery);
    }
    setSelectedDate(date);
    setSelectedYear(year);
    setLightboxPopupOpen(true);
  };

  const lightboxData = {
    title: selectedTitle,
    location: selectedLocation,
    contentType: contentType,
    videoSrc: videoSrc,
    gallery: imageSrcs,
    date: selectedDate,
    year: selectedYear,
  };

  const prevButtonClass = prevBtnDisabled
    ? `${styles.mediaList_list_slider_arrow} ${styles.mediaList_list_slider_arrow_disabled}`
    : `${styles.mediaList_list_slider_arrow}`;

  const nextButtonClass = nextBtnDisabled
    ? `${styles.mediaList_list_slider_arrow} ${styles.mediaList_list_slider_arrow_next} ${styles.mediaList_list_slider_arrow_disabled}`
    : `${styles.mediaList_list_slider_arrow} ${styles.mediaList_list_slider_arrow_next}`;

  return (
    <div className={`${styles.mediaList_list}`}>
      <div className={`${styles.mediaList_list_slider} embla`}>
        <div className={`${styles.mediaList_list_slider_inner}`}>
          {props.map((item, index) =>
            itemType === 'video' ? (
              <VideoSingle
                props={item}
                key={index}
                onLightboxOpen={handleLightboxOpen}
              />
            ) : (
              <></>
            )
          )}
        </div>

        <div className={`${styles.mediaList_list_slider_arrows}`}>
          <button onClick={onPrevButtonClick} className={prevButtonClass}>
            <svg viewBox="0 0 532 532">
              <path
                fill="currentColor"
                d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
              />
            </svg>
          </button>

          <button onClick={onNextButtonClick} className={nextButtonClass}>
            <svg viewBox="0 0 532 532">
              <path
                fill="currentColor"
                d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
              />
            </svg>
          </button>
        </div>
      </div>

      {isLightboxPopupOpen ? (
        <LightboxCustom
          isLightboxPopupOpen={isLightboxPopupOpen}
          lightboxData={lightboxData}
          setLightboxPopupOpen={setLightboxPopupOpen}
        />
      ) : null}
    </div>
  );
}

export default MediaList;
