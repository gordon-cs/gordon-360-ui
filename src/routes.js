import About from './views/About';
import ActivitiesAll from './views/ActivitiesAll';
import ActivityEdit from './views/ActivityEdit';
import Home from './views/Home';
import Help from './views/Help';

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
    name: 'Activities',
    path: '/activities',
    component: ActivitiesAll,
  },
  {
    name: 'Edit Activity',
    path: '/activity/:activityId/edit',
    component: ActivityEdit,
  },
  {
    name: 'Help',
    path: '/help',
    component: Help,
  },
];
