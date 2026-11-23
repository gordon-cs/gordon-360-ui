import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination } from 'swiper/modules';
import { getCurrentPosters } from 'services/poster';
import 'swiper/css';
import 'swiper/css/pagination';
import './HorizontalPosterCarousel.scss';

const HorizontalPosterCarousel = ({ postersOverride }) => {
  const [posters, setPosters] = useState([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (postersOverride !== undefined) {
      setPosters(postersOverride);
      setLoadError(false);
      return;
    }

    getCurrentPosters()
      .then(setPosters)
      .catch(() => setLoadError(true));
  }, [postersOverride]);

  if (loadError) {
    return <div className="horizontal-poster-message">Could not load posters.</div>;
  }

  if (posters.length === 0) {
    return <div className="horizontal-poster-message">No posters available.</div>;
  }

  return (
    <Swiper
      className="horizontal-poster-carousel"
      slidesPerView={1}
      centeredSlides
      loop={posters.length > 1}
      keyboard
      autoplay={{
        delay: 13000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Keyboard, Pagination]}
    >
      {posters.map((poster) => (
        <SwiperSlide key={poster.ID}>
          <img src={poster.ImagePath} alt={poster.Title || 'Campus TV slide'} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HorizontalPosterCarousel;
