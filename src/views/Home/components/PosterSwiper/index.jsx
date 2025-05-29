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
  const swiperHeight = size.width < 450 ? '10vh' : size.width < 1500 ? '15vh' : '60vh';
  const swiperWidth =
    size.width < 450
      ? '100%' // mobile: full width
      : size.width < 1500
        ? '90%' // tablet: almost full width
        : '81vw'; // desktop: fixed max width

  return (
    <Grid>
      <Card>
        <CardContent>
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
                slidesPerView: 1.3,
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
            {pizzaSlice.map((item) => (
              <SwiperSlide key={item.id} style={{ height: '100%', justifyContent: 'space-around' }}>
                <Card variant="outlined">
                  <CardActionArea component={Link} to={'/posters'}>
                    <CardMedia loading="lazy" component="img" src={item.image} title={item.title} />
                  </CardActionArea>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PosterSwiper;
