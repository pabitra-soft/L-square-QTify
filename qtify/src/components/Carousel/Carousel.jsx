import React, { useRef } from 'react';
import { Swiper } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import LeftArrow from '../LeftArrow/LeftArrow';
import RightArrow from '../RightArrow/RightArrow';
import styles from './Carousel.module.css';

const Carousel = ({ children }) => {
  const swiperRef = useRef(null);

  return (
    <div className={styles.carouselWrapper}>
      <button 
        className={styles.navButton}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <LeftArrow />
      </button>

      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className={styles.swiper}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {children}
      </Swiper>

      <button 
        className={styles.navButton}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <RightArrow />
      </button>
    </div>
  );
};

export default Carousel;