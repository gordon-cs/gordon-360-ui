import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { getCurrentPosters } from 'services/poster';
import { Autoplay, Pagination, Navigation, Keyboard, EffectCoverflow } from 'swiper/modules';
import './PosterSwiper.scss';
import { Link } from 'react-router-dom';
import { Card, CardMedia, Grid, Typography } from '@mui/material';

const PosterSwiper = ({ showManagementLinks = true, postersOverride }) => {
  const [currentPosters, setCurrentPosters] = useState([]);

  useEffect(() => {
    if (postersOverride !== undefined) {
      setCurrentPosters(postersOverride);
      return;
    }

    getCurrentPosters().then(setCurrentPosters);
  }, [postersOverride]);

  const noPostersContent = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0',
        width: '100%',
      }}
    >
      <Typography
        variant="body1"
        color="warning.main"
        sx={{
          textAlign: 'center',
          fontFamily: '"Orbitron", "Montserrat", "Roboto", sans-serif',
          letterSpacing: '2px',
          fontWeight: 700,
          fontSize: '1.3rem',
        }}
      >
        {showManagementLinks
          ? 'No posters available. Click to add yours!'
          : 'No posters available.'}
      </Typography>
    </div>
  );

  return (
    <Grid sx={{ mb: 4 }}>
      <div style={{ width: '100%', overflow: 'visible' }}>
        <Swiper
          effect={'coverflow'} // animation effect
          spaceBetween={50} // space between slides
          autoplay={{
            delay: 3000, // switch every 3 seconds
            pauseOnMouseEnter: true, // pause on hover
            disableOnInteraction: false,
          }}
          pagination={{ dynamicBullets: true, clickable: true }}
          loop={false} // loop if more than 3 posters
          grabCursor={true}
          centeredSlides={true}
          keyboard={true} // takes keyboard input
          watchSlidesProgress={true}
          watchSlidesVisibility={true}
          onTransitionEnd={(swiper) => {
            setTimeout(() => {
              swiper.update();
            }, 0);
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.6, // 1.6 posters in view for phones
            },
            600: {
              slidesPerView: 2, // 2 posters in view for tablets
            },
            1200: {
              slidesPerView: 3, // 3 posters in view for small desktops
            },
            1500: {
              slidesPerView: 4, // 4 posters in view for larger desktops
            },
          }}
          // Adds the effect of the posters "hiding" behind the center poster
          coverflowEffect={{
            rotate: 30,
            stretch: 30,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Keyboard, Navigation, Pagination, Autoplay]}
          className="mySwiper"
        >
          {currentPosters.length === 0 ? (
            <SwiperSlide
              style={{
                height: '10vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {showManagementLinks ? (
                <Link to="/posters" style={{ textDecoration: 'none', width: '100%' }}>
                  {noPostersContent}
                </Link>
              ) : (
                noPostersContent
              )}
            </SwiperSlide>
          ) : (
            currentPosters.map((item) => {
              const posterCard = (
                <Card
                  variant="outlined"
                  sx={{
                    position: 'relative',
                    boxShadow: '0 16px 10px -10px rgba(0, 0, 0, 0.5)',
                    border: 'none',
                    m: 0,
                    p: 0,
                  }}
                >
                  {item.Priority === 1 && (
                    <Typography
                      variant="h3"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 12,
                        color: 'red',
                        fontWeight: 'bold',
                        fontSize: '5rem',
                        zIndex: 3,
                        userSelect: 'none',
                        fontFamily: '"Orbitron", "Montserrat", "Roboto", sans-serif',
                        textShadow: '2px 2px 8px #00000055',
                      }}
                    >
                      !
                    </Typography>
                  )}
                  <CardMedia
                    loading="lazy"
                    component="img"
                    src={item.ImagePath}
                    title={item.Title}
                    sx={{
                      height: 300,
                      objectFit: 'cover',
                    }}
                  />
                </Card>
              );

              return (
                <SwiperSlide
                  key={item.ID}
                  style={{
                    height: '100%',
                    justifyContent: 'space-around',
                  }}
                >
                  {showManagementLinks ? (
                    <Link
                      to="/posters"
                      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                    >
                      {posterCard}
                    </Link>
                  ) : (
                    posterCard
                  )}
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </div>
    </Grid>
  );
};

export default PosterSwiper;
