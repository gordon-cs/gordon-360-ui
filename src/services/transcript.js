/**
 * Transcript
 *
 * @module transcript
 */
import http from './http';

const getMemberships = async id => {
  let memberships;
  memberships = await http.get(`memberships/student/${id}`);
  console.log(memberships);
  return memberships;
};

export default {
  getMemberships,
};
