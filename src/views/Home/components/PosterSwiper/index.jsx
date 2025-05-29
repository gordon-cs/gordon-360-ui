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
  const getSwiperHeight = () => {
    if (size.width < 450) return '10vh'; // mobile
    if (size.width < 1500) return '15vh'; // tablet
    return '40vh'; // desktop
  };

  return (
    <Grid
      style={{
        width: '100%',
        maxWidth: 900,
        margin: 'auto',
        height: getSwiperHeight(),
        maxHeight: '100%',
        padding: 0,
      }}
    >
      <Card style={{ height: '100%', boxShadow: 'none' }}>
        <CardContent style={{ height: '100%', padding: 0 }}>
          <Swiper
            effect={'coverflow'}
            spaceBetween={30}
            autoplay={{
              delay: 2500,
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
            slidesPerView={'2.5'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Keyboard, Navigation, Pagination, Autoplay]}
            className="mySwiper"
            style={{ height: '100%' }}
          >
            {pizzaSlice.map((item) => (
              <SwiperSlide key={item.id}>
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
