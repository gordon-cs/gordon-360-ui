
/**
 * Event
 *
 * @module Event
 */
import http from './http';

/**
 * Get all activities for a session, sorted alphabetically by description
 * @return {Promise.<Event[]>}
 */

const getEvents = () =>
  http.get('events/25Live/All');

const getAllEvents = async () => {
  const eventList = await getEvents();
  return {
    eventList,
  };
};

export default {
  getAllEvents,
  getEvents,
};
