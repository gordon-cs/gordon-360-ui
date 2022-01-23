import About from './views/About';
import Admin from './views/Admin';
import ApartmentApp from './views/ApartmentApp';
import BannerSubmission from './views/BannerSubmission';
import CoCurricularTranscript from './views/CoCurricularTranscript';
import EnrollmentCheckIn from './views/EnrollmentCheckIn';
import Events from './views/Events';
import EventsAttended from './views/EventsAttended';
import Update from './views/Update';
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
import Timesheets from './views/Timesheets';
import WellnessCheck from './views/WellnessCheck';

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
    name: 'Update',
    path: '/update',
    component: Update,
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
    name: 'Enrollment Check-In',
    path: '/enrollmentcheckin',
    component: EnrollmentCheckIn,
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
