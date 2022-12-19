import About from './views/About';
import Admin from './views/Admin';
import ApartmentApp from './views/ApartmentApp';
import BannerSubmission from './views/BannerSubmission';
import CoCurricularTranscript from './views/CoCurricularTranscript';
import EnrollmentCheckIn from './views/EnrollmentCheckIn';
import Events from './views/Events';
import EventsAttended from './views/EventsAttended';
import Feedback from './views/Feedback';
import Help from './views/Help';
import Home from './views/Home';
import IDUploader from './views/IDUploader';
import InvolvementProfile from './views/InvolvementProfile';
import InvolvementsAll from './views/InvolvementsAll';
import MyProfile from './views/MyProfile';
import News from './views/News';
import Page404 from './views/Page404';
import PeopleSearch from './views/PeopleSearch';
import ProfileNotFound from './views/ProfileNotFound';
import PublicProfile from './views/PublicProfile';
import MySettings from './views/MySettings';
import Timesheets from './views/Timesheets';
import WellnessCheck from './views/WellnessCheck';

// Route order must be from most specific to least specific (i.e. `/user/:username` before `/user`)
const routes = [
  {
    name: 'Home',
    path: '/',
    element: <Home />,
  },
  {
    name: 'About',
    path: '/about',
    element: <About />,
  },
  {
    name: 'Wellness',
    path: '/wellness',
    element: <WellnessCheck />,
  },
  {
    name: 'Apartment Application',
    path: '/ApartApp',
    element: <ApartmentApp />,
  },
  {
    name: 'Involvement Profile',
    path: '/activity/:sessionCode/:involvementCode',
    element: <InvolvementProfile />,
  },
  {
    name: 'Involvements',
    path: '/involvements',
    element: <InvolvementsAll />,
  },
  {
    name: 'Help',
    path: '/help',
    element: <Help />,
  },
  {
    name: 'Experience Transcript',
    path: '/transcript',
    element: <CoCurricularTranscript />,
  },
  {
    name: 'Events',
    path: '/events',
    element: <Events />,
  },
  {
    name: 'Attended',
    path: '/attended',
    element: <EventsAttended />,
  },
  {
    name: 'Feedback',
    path: '/feedback',
    element: <Feedback />,
  },
  {
    name: 'Not Found',
    path: '/profile/null',
    element: <ProfileNotFound />,
  },
  {
    name: 'Profile',
    path: '/profile/:username',
    element: <PublicProfile />,
  },
  {
    name: 'My Profile',
    path: '/myprofile',
    element: <MyProfile />,
  },
  {
    name: 'Enrollment Check-In',
    path: '/enrollmentcheckin',
    element: <EnrollmentCheckIn />,
  },
  {
    name: 'People',
    path: '/people',
    element: <PeopleSearch />,
  },
  {
    name: 'ID Uploader',
    path: '/id',
    element: <IDUploader />,
  },
  {
    name: 'Admin',
    path: '/admin',
    element: <Admin />,
  },
  {
    name: 'Timesheets',
    path: '/timesheets',
    element: <Timesheets />,
  },
  {
    name: 'Banner',
    path: '/banner',
    element: <BannerSubmission />,
  },
  {
    name: 'News',
    path: '/news',
    element: <News />,
  },
  {
    name: 'Settings',
    path: '/settings',
    component: MySettings,
  },
  {
    name: 'Page Not Found',
    path: '*',
    element: <Page404 />,
  },
];

export default routes;
