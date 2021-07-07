import React, { useState, useEffect } from 'react';

import cms from 'services/cms';
import ImageGallery from 'react-image-gallery';
import GordonLoader from 'components/Loader';

const GordonCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [carouselContent, setCarouselContent] = useState(null);
  const [imageGallery, setImageGallery] = useState(null);

  useEffect(() => {
    const loadCarousel = async () => {
      setCarouselContent(await cms.getSlides());
      setLoading(false);
    };

    loadCarousel();
  }, []);

  const handleClickSlide = () => {
    if (carouselContent[imageGallery.getCurrentIndex()].ActionLink !== '') {
      window.location = carouselContent[imageGallery.getCurrentIndex()].ActionLink;
    }
  };

  if (loading === true) {
    return <GordonLoader />;
  } else {
    return (
      <ImageGallery
        ref={(i) => {
          setImageGallery(i);
        }}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={true}
        autoPlay={true}
        showNav={false}
        slideInterval={5000}
        items={carouselContent.map((slide) => ({
          original: slide.ImagePath,
          originalAlt: slide.AltTag,
          originalTitle: slide.Title,
        }))}
        onClick={handleClickSlide}
        lazyLoad={true}
      />
    );
  }
};

export default GordonCarousel;
