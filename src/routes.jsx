import About from './views/About/About.jsx';
import Admin from './views/Admin/Admin.jsx';
import ApartmentApp from './views/ApartmentApp/ApartmentApp.jsx';
import BannerSubmission from './views/BannerSubmission/BannerSubmission.jsx';
import CoCurricularTranscript from './views/CoCurricularTranscript/CoCurricularTranscript.jsx';
import EnrollmentCheckIn from './views/EnrollmentCheckIn/EnrollmentCheckIn.jsx';
import Events from './views/Events/Events.jsx';
import EventsAttended from './views/EventsAttended/EventsAttended.jsx';
import Feedback from './views/Feedback/Feedback.jsx';
import Help from './views/Help/Help.jsx';
import Home from './views/Home/Home.jsx';
import IDUploader from './views/IDUploader/IDUploader.jsx';
import InvolvementProfile from './views/InvolvementProfile/InvolvementProfile.jsx';
import InvolvementsAll from './views/InvolvementsAll/InvolvementsAll.jsx';
import MyProfile from './views/MyProfile/MyProfile.jsx';
import News from './views/News/News.jsx';
import Page404 from './views/Page404/Page404.jsx';
import PeopleSearch from './views/PeopleSearch/PeopleSearch.tsx';
import ProfileNotFound from './views/ProfileNotFound/ProfileNotFound.jsx';
import PublicProfile from './views/PublicProfile/PublicProfile.jsx';
import Timesheets from './views/Timesheets/Timesheets.jsx';
import WellnessCheck from './views/WellnessCheck/WellnessCheck.jsx';
import RecIM from './views/RecIM/RecIM.jsx';

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
    name: 'Rec-IM',
    path: '/recim/*',
    element: <RecIM />,
  },
  {
    name: 'Page Not Found',
    path: '*',
    element: <Page404 />,
  },
];

export default routes;
