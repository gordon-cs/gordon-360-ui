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
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const PosterSwiper = () => {
  const [currentPosters, setCurrentPosters] = useState([]);

  useEffect(() => {
    getCurrentPosters().then(setCurrentPosters);
  }, []);

  return (
    <Grid sx={{ mb: 4 }}>
      <Card sx={{ padding: 0 }}>
        <CardContent sx={{ padding: 0 }} class="posterSwiperCardContent">
          <div style={{ width: '100%', overflow: 'visible' }}>
            <Swiper
              effect={'coverflow'} // animation effect
              spaceBetween={50} // space between slides
              autoplay={{
                delay: 3000, // switch every 3 seconds
                pauseOnMouseEnter: true, // pause on hover
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop={false} // loop if more than 3 posters
              grabCursor={true}
              centeredSlides={true}
              keyboard={true} // takes keyboard input
              watchSlidesProgress={true}
              watchSlidesVisibility={true}
              // onSwiper={(swiper) => {
              //   swiperRef.current = swiper;
              // }}
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
                  slidesPerView: 3, // 4 posters in view for small desktops
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
                  <Link to="/posters" style={{ textDecoration: 'none', width: '100%' }}>
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
                        No posters available. Click to add yours!
                      </Typography>
                    </div>
                  </Link>
                </SwiperSlide>
              ) : (
                currentPosters.map(
                  (
                    item, // Map through the posters and create a slide for each
                  ) => (
                    <SwiperSlide
                      key={item.ID}
                      style={{
                        height: '100%',
                        justifyContent: 'space-around',
                      }}
                    >
                      <Link
                        to={`/posters`}
                        style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                      >
                        <Card
                          variant="outlined"
                          sx={{
                            position: 'relative',
                            boxShadow: 'none',
                            border: 'none',
                            m: 0,
                            p: 0,
                          }}
                        >
                          {/* Priority Marker */}
                          {item.Priority === 1 && ( // Add the exclamation mark if the poster is a priority
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
                            src={item.ImagePath} // Image path for the poster
                            title={item.Title} // Title for the poster
                            sx={{
                              height: 300,
                              objectFit: 'cover',
                            }}
                          />
                        </Card>
                      </Link>
                    </SwiperSlide>
                  ),
                )
              )}
            </Swiper>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PosterSwiper;
