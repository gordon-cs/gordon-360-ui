import About from './views/About';
import ActivitiesAll from './views/ActivitiesAll';
//import ActivityEdit from './views/ActivityEdit';
import ActivityProfile from './views/ActivityProfile';
import Home from './views/Home';
import Help from './views/Help';
import CoCurricularTranscript from './views/CoCurricularTranscript';
import Events from './views/Events';
import EventsAttended from './views/EventsAttended';
import Profile from './views/Profile';
import MyProfile from './views/MyProfile';
import Feedback from './views/Feedback';
import PeopleSearch from './views/PeopleSearch';
import ProfileNotFound from './views/ProfileNotFound';
import IDUploader from './views/IDUploader';
import Admin from './views/Admin';
import Timesheets from './views/Timesheets';
import BannerSubmission from './views/BannerSubmission';
import News from './views/News';

// Route order must be from most specific to least specific (i.e. `/user/:username` before `/user`)
export default [
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
    name: 'Involvement Profile',
    path: '/activity/:sessionCode/:activityCode',
    component: ActivityProfile,
  },
  {
    name: 'Involvements',
    path: '/involvements',
    component: ActivitiesAll,
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
    component: Profile,
  },
  {
    name: 'My Profile',
    path: '/myprofile',
    component: MyProfile,
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
    path: '/t1m35433t5',
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
  }
];
