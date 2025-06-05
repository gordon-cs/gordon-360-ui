import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { useWindowSize } from 'hooks';
import { getCurrentPosters, getPosters } from 'services/poster';
import { Autoplay, Pagination, Navigation, Keyboard, EffectCoverflow } from 'swiper/modules';
import './PosterSwiper.scss';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const PosterSwiper = () => {
  const size = useWindowSize();
  const [currentPosters, setCurrentPosters] = useState([]);

  useEffect(() => {
    getCurrentPosters().then(setCurrentPosters);
  }, []);

  return (
    <Grid sx={{ mb: 4 }}>
      <Card>
        <CardContent>
          <Link to="/posters" style={{ textDecoration: 'none' }}>
            <Swiper
              effect={'coverflow'} // animation effect
              spaceBetween={20} // space between slides
              autoplay={{
                delay: 3000, // switch every 3 seconds
                pauseOnMouseEnter: true, // pause on hover
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop={currentPosters.length > 3} // loop if more than 3 posters
              navigation={size.width >= 600}
              grabCursor={true}
              centeredSlides={true}
              keyboard={true} // takes keyboard input
              breakpoints={{
                0: {
                  slidesPerView: 1.6, // 1.6 posters in view for phones
                },
                600: {
                  slidesPerView: 2, // 2 posters in view for tablets
                },
                800: {
                  slidesPerView: 3, // 3 posters in view for small desktops
                },
              }}
              // Adds the effect of the posters "hiding" behind the center poster
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow, Keyboard, Navigation, Pagination, Autoplay]}
              className="mySwiper"
            >
              {currentPosters.length === 0 ? ( // If no posters are available, show a message
                <Typography
                  variant="body1"
                  color="warning.main"
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    fontFamily: '"Orbitron", "Montserrat", "Roboto", sans-serif',
                    letterSpacing: '2px',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                  }}
                >
                  No posters available. Click to add yours!
                </Typography>
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
                      <Card variant="outlined" sx={{ position: 'relative' }}>
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
                    </SwiperSlide>
                  ),
                )
              )}
            </Swiper>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PosterSwiper;
