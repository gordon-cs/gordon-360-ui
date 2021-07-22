import About from './views/About';
import InvolvementsAll from './views/InvolvementsAll';
import InvolvementProfile from './views/InvolvementProfile';
import Home from './views/Home';
import WellnessCheck from './views/WellnessCheck';
import ApartmentApp from './views/ApartmentApp';
import Help from './views/Help';
import CoCurricularTranscript from './views/CoCurricularTranscript';
import Events from './views/Events';
import EventsAttended from './views/EventsAttended';
import PublicProfile from './views/PublicProfile';
import MyProfile from './views/MyProfile';
import Feedback from './views/Feedback';
import PeopleSearch from './views/PeopleSearch';
import ProfileNotFound from './views/ProfileNotFound';
import IDUploader from './views/IDUploader';
import Admin from './views/Admin';
import Timesheets from './views/Timesheets';
import BannerSubmission from './views/BannerSubmission';
import News from './views/News';
import Page404 from './views/Page404';
import AcademicCheckIn from './views/AcademicCheckIn';

// Route order must be from most specific to least specific (i.e. `/user/:username` before `/user`)
const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: Home,
  },
  {
    name: 'About',
    path: '/about',
    component: About,
  },
  {
    name: 'Wellness',
    path: '/wellness',
    component: WellnessCheck,
  },
  {
    name: 'Apartment Application',
    path: '/ApartApp',
    component: ApartmentApp,
  },
  {
    name: 'Involvement Profile',
    path: '/activity/:sessionCode/:involvementCode',
    component: InvolvementProfile,
  },
  {
    name: 'Involvements',
    path: '/involvements',
    component: InvolvementsAll,
  },
  {
    name: 'Help',
    path: '/help',
    component: Help,
  },
  {
    name: 'Experience Transcript',
    path: '/transcript',
    component: CoCurricularTranscript,
  },
  {
    name: 'Events',
    path: '/events',
    component: Events,
  },
  {
    name: 'Attended',
    path: '/attended',
    component: EventsAttended,
  },
  {
    name: 'Feedback',
    path: '/feedback',
    component: Feedback,
  },
  {
    name: 'Not Found',
    path: '/profile/null',
    component: ProfileNotFound,
  },
  {
    name: 'Profile',
    path: '/profile/:username',
    component: PublicProfile,
  },
  {
    name: 'My Profile',
    path: '/myprofile',
    component: MyProfile,
  },
  {
    name: 'Academic Check In',
    path: '/academiccheckin',
    component: AcademicCheckIn,
  },
  {
    name: 'People',
    path: '/people',
    component: PeopleSearch,
  },
  {
    name: 'ID Uploader',
    path: '/id',
    component: IDUploader,
  },
  {
    name: 'Admin',
    path: '/admin',
    component: Admin,
  },
  {
    name: 'Timesheets',
    path: '/timesheets',
    component: Timesheets,
  },
  {
    name: 'Banner',
    path: '/banner',
    component: BannerSubmission,
  },
  {
    name: 'News',
    path: '/news',
    component: News,
  },
  {
    name: 'Page Not Found',
    path: '*',
    component: Page404,
  },
];

export default routes;
