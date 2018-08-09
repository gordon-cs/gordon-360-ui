/**
 * Emails
 *
 * @module emails
 */

import http from './http';

/**
 * Get the emails for members of the activity with activity code id during the current session.
 * @param {String} id Activity code
 * @return {emails[]} List of all emails for members in the activity
 */
const get = id => http.get(`emails/activity/${id}`);

/**
 * Get the emails for members of the activity with activity code id during the specified session.
 * @param {String} id Activity code
 * @param {String} SessionId Activity code
 * @return {emails[]} List of all emails for members in the activity during the session
 */
const getForSession = (id, SessionId) => http.get(`emails/activity/${id}/session/${SessionId}`);

/**
 * Get the emails for leaders of the activity with activity code id during the current session.
 * @param {String} id Activity code
 * @return {emails[]} List of all emails for leaders in the activity
 */
const getLeaders = id => http.get(`emails/activity/${id}/leaders`);

/**
 * Get the emails for leaders of the activity with activity code id during the specified session.
 * @param {String} id Activity code
 * @param {String} SessionId Activity code
 * @return {emails[]} List of all emails for leaders in the activity during the session
 */
const getLeadersForSession = (id, SessionId) =>
  http.get(`emails/activity/${id}/leaders/session/${SessionId}`);

/**
 * Get the emails for advisors of the activity with activity code id during the current session.
 * @param {String} id Activity code
 * @return {emails[]} List of all emails for advisors in the activity
 */
const getAdvisors = id => http.get(`emails/activity/${id}/advisors`);

/**
 * Get the emails for advisors of the activity with activity code id during the specified session.
 * @param {String} id Activity code
 * @param {String} SessionId Activity code
 * @return {emails[]} List of all emails for advisors in the activity during the session
 */
const getAdvisorsForSession = (id, SessionId) =>
  http.get(`emails/activity/${id}/advisors/session/${SessionId}`);

export default {
  get,
  getForSession,
  getLeaders,
  getLeadersForSession,
  getAdvisors,
  getAdvisorsForSession,
};
