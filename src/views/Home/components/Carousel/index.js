import GordonLoader from 'components/Loader';
import { useEffect, useRef, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import contentManagementService from 'services/contentManagement';
import { compareByProperty, sort } from 'services/utils';

const GordonCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [carouselContent, setCarouselContent] = useState(null);
  const imageGalleryRef = useRef();

  useEffect(() => {
    contentManagementService
      .getSlides()
      .then(sort(compareByProperty('SortOrder')))
      .then(setCarouselContent)
      .then(() => setLoading(false));
  }, []);

  const handleClickSlide = () => {
    const currentSlideLink = carouselContent[imageGalleryRef.current.getCurrentIndex()].LinkURL;
    if (currentSlideLink !== '') {
      window.location = currentSlideLink;
    }
  };

  if (loading) {
    return <GordonLoader />;
  }

  return (
    <ImageGallery
      ref={imageGalleryRef}
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
};

export default GordonCarousel;
