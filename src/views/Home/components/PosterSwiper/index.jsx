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
  const [currentPosters, setCurrentPosters] = useState([]);
  const [myPosters, setMyPosters] = useState([]);

  useEffect(() => {
    getCurrentPosters().then(setCurrentPosters);
    //getPostersByUser().then(setMyPosters);
  }, []);

  return (
    <Grid>
      <Card>
        <CardHeader
          title={
            <Grid container direction="row" alignItems="center">
              <Grid item xs={7} align="left">
                Upcoming Events
              </Grid>
              <Grid item xs={5} align="right">
                <Button variant="contained" color="secondary" component={Link} to="/posters">
                  More
                </Button>
              </Grid>
            </Grid>
          }
          className="gc360_header"
        />
        <CardContent>
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
            navigation={window.innerWidth >= 600 ? true : false}
            grabCursor={true}
            centeredSlides={true}
            keyboard={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Keyboard, Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            {currentPosters.map((item) => (
              <SwiperSlide>
                <Card variant="outlined">
                  <CardActionArea component={Link} to={'/posters'}>
                    <CardMedia
                      loading="lazy"
                      component="img"
                      src={item.ImagePath}
                      title={item.Title}
                    />
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
