import HorizontalPosterCarousel from './HorizontalPosterCarousel';
import horizontalTestImage from 'views/Posters/images/Horizontal-3.png';

// This route is a public, direct-link version of the poster carousel.
// It reuses the live poster feed but removes the normal app chrome so the posters can
// be viewed without logging in and without the regular site navigation around them.
const testPosters = [
  {
    ID: 'tv-slide-test-1',
    Title: 'Landscape TV Slide Test 1',
    ImagePath: horizontalTestImage,
  },
];

// Change this to 'test' when you want the hidden page to use the local poster set.
// Leave it as 'live' to use the live posters that the main site uses.
const POSTER_SOURCE = 'test';

const HiddenPosters = () => {
  const postersOverride = POSTER_SOURCE === 'test' ? testPosters : undefined;

  return <HorizontalPosterCarousel postersOverride={postersOverride} />;
};

export default HiddenPosters;
