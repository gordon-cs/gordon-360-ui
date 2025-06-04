import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import DummyData from '/src/views/Posters/dummy-posters/dummyposters.jsx';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Navigate } from 'react-router-dom';
import { useWindowSize } from 'hooks';
import { getCurrentPosters, getPosters } from 'services/poster';

//could import window
import { Autoplay, Pagination, Navigation, Keyboard, EffectCoverflow } from 'swiper/modules';
//https://swiperjs.com/demos
//https://codesandbox.io/p/devbox/swiper-react-css-mode-jxgdn9?file=%2Fsrc%2Fstyles.css

import './PosterSwiper.scss';
import { Link } from 'react-router-dom';

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

const PosterSwiper = (userName) => {
  const size = useWindowSize();
  const pizzaSlice = DummyData.slice(0, DummyData.length);
  const [currentPosters, setCurrentPosters] = useState([]);
  const [myPosters, setMyPosters] = useState([]);

  useEffect(() => {
    getCurrentPosters().then(setCurrentPosters);
    // getPostersByUser().then(setMyPosters);
  }, []);

  // Determine swiper height based on window size
  const swiperHeight = size.width < 450 ? '10vh' : size.width < 1500 ? '15vh' : '65vh';
  const swiperWidth =
    size.width < 450
      ? '100%' // mobile: full width
      : size.width < 1500
        ? '90%' // tablet: almost full width
        : '81vw'; // desktop: fixed max width

  return (
    <Grid sx={{ mb: 4 }}>
      <Card>
        <CardContent>
          <Link to="/posters" style={{ textDecoration: 'none' }}>
            <Swiper
              effect={'coverflow'}
              spaceBetween={20}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              loop={true}
              navigation={size.width >= 600}
              grabCursor={true}
              centeredSlides={true}
              keyboard={true}
              breakpoints={{
                0: {
                  slidesPerView: 1.6,
                },
                600: {
                  slidesPerView: 2,
                },
                800: {
                  slidesPerView: 3,
                },
              }}
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
              {currentPosters.length === 0 ? (
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
                currentPosters.map((item) => (
                  <SwiperSlide
                    key={item.ID}
                    style={{
                      height: '100%',
                      justifyContent: 'space-around',
                    }}
                  >
                    <Card variant="outlined" sx={{ position: 'relative' }}>
                      {/* Priority Marker */}
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
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PosterSwiper;
