import { lazy } from 'react';

const ApartmentApp = lazy(() => import('./views/ApartmentApp'));
const BannerSubmission = lazy(() => import('./views/BannerSubmission'));
const CoCurricularTranscript = lazy(() => import('./views/CoCurricularTranscript'));
const EnrollmentCheckIn = lazy(() => import('./views/EnrollmentCheckIn'));
const Events = lazy(() => import('./views/Events'));
const EventsAttended = lazy(() => import('./views/EventsAttended'));
const Feedback = lazy(() => import('./views/Feedback'));
const Help = lazy(() => import('./views/Help'));
const Home = lazy(() => import('./views/Home'));
const IDUploader = lazy(() => import('./views/IDUploader'));
const InvolvementProfile = lazy(() => import('./views/InvolvementProfile'));
const InvolvementsAll = lazy(() => import('./views/InvolvementsAll'));
const MyProfile = lazy(() => import('./views/MyProfile'));
const News = lazy(() => import('./views/News'));
const Page404 = lazy(() => import('./views/Page404'));
const PeopleSearch = lazy(() => import('./views/PeopleSearch'));
const ProfileNotFound = lazy(() => import('./views/ProfileNotFound'));
const PublicProfile = lazy(() => import('./views/PublicProfile'));
const Timesheets = lazy(() => import('./views/Timesheets'));
const RecIM = lazy(() => import('./views/RecIM'));
const Admin = lazy(() => import('./views/Admin'));
const About = lazy(() => import('./views/About'));

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
