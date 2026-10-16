import PosterSwiper from 'views/Home/components/PosterSwiper';

// This route is a public, direct-link version of the poster carousel.
// It reuses the live poster feed but removes the normal app chrome so the posters can
// be viewed without logging in and without the regular site navigation around them.
const HiddenPosters = () => <PosterSwiper showManagementLinks={false} />;

export default HiddenPosters;
