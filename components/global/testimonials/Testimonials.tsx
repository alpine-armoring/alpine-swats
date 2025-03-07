import { useState } from 'react';
import styles from './Testimonials.module.scss';

function Testimonials(props) {
  const testimonials = props.data.testimonials;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  //   const [autoplayEnabled, setAutoplayEnabled] = useState(false)
  const [displayedTestimonial, setDisplayedTestimonial] = useState(
    testimonials[0]
  );

  // Auto-rotate testimonials (disabled by default)
  //   useEffect(() => {
  //     if (autoplayEnabled) {
  //       const interval = setInterval(() => {
  //         handleNext()
  //       }, 5000)

  //       return () => clearInterval(interval)
  //     }
  //     return () => {}
  //   }, [autoplayEnabled])

  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      const newIndex =
        currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      setDisplayedTestimonial(testimonials[newIndex]);

      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 500); // This should match the CSS transition duration
  };

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      const newIndex =
        currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setDisplayedTestimonial(testimonials[newIndex]);

      setTimeout(() => {
        setIsAnimating(false);
      }, 50);
    }, 500); // This should match the CSS transition duration
  };

  //   const toggleAutoplay = () => {
  //     setAutoplayEnabled((prev) => !prev)
  //   }

  return (
    <section className={styles.testimonials}>
      <div className={`${styles.testimonials__container} container_small`}>
        <div className={`block-reveal-title-wrap`}>
          <h3 className={`block-reveal-title observe block-reveal`}>
            <span dangerouslySetInnerHTML={{ __html: props.data.title }}></span>
          </h3>
        </div>

        <div className={styles.testimonials__slider}>
          <button
            className={`${styles.testimonials__button} ${styles['testimonials__button--prev']}`}
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <span className={styles.testimonials__arrow}></span>
          </button>

          <div className={styles.testimonials__content}>
            <div
              className={`${styles.testimonials__item} ${isAnimating ? styles['testimonials__item--animating'] : ''}`}
            >
              <div className={styles.testimonials__quote}>
                &quot;{displayedTestimonial.description}&quot;
              </div>

              <div className={styles.testimonials__author}>
                <span className={styles.testimonials__name}>
                  {displayedTestimonial.title}
                </span>
                <span className={styles.testimonials__company}>
                  {displayedTestimonial.titleNav}
                </span>
              </div>
            </div>
          </div>

          <button
            className={`${styles.testimonials__button} ${styles['testimonials__button--next']}`}
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <span className={styles.testimonials__arrow}></span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
