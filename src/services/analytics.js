/**
 * Analytics
 *
 * @module analytics
 */

import ReactGA from 'react-ga';

/**
 * Track an error
 *
 * @param {string} description Error description
 */
const onError = (description) => {
  ReactGA.exception({ description });
};

/**
 * Track an event
 *
 * @param {string} category Top level category for the event, e.g. 'User', 'Navigation', etc.
 * @param {string} action Description of what happened in the event, e.g. 'Edited activity'
 * @param {string} [label] More specific description of the action
 * @param {number} [value] If applicable, a numerical value for the event
 */
const onEvent = (category, action, label, value) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

/**
 * Track a page view
 */
const onPageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search);
};

/**
 * Initialize tracking, using the analytics ID defined in environment variables
 */
const initialize = () => {
  ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID);
  // Set user role
  // @todo get user role from JWT
  ReactGA.set({ dimension1: 'god' });
  onPageView();
};

const analyticsService = {
  initialize,
  onError,
  onEvent,
  onPageView,
};

export default analyticsService;
