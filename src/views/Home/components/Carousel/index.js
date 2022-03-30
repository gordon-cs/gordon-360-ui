import GordonLoader from 'components/Loader';
import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import cms from 'services/cms';

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
    const currentSlideLink = carouselContent[imageGallery.getCurrentIndex()].LinkURL;
    if (currentSlideLink !== '') {
      window.location = currentSlideLink;
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
          original: slide.Path,
          originalAlt: slide.Title,
          originalTitle: slide.Title,
        }))}
        onClick={handleClickSlide}
        lazyLoad={true}
      />
    );
  }
};

export default GordonCarousel;
