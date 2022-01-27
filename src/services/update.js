/**
 *
 * @module update
 * import http from './http';
 */
import user from './user';
const requestInfoUpdate = async (
  userEmail,
  userHomePhone,
  userMobilePhone,
  userAddress1,
  userAddress2,
  userCity,
  userState,
) => {
  const alumniInfo = {
    EMAIL: userEmail,
    HOME_PHONE: userHomePhone,
    MOBILE_PHONE: userMobilePhone,
    ADDRESS1: userAddress1,
    ADDRESS2: userAddress2,
    CITY: userCity,
    STATE: userState,
  };
  console.log('update/updateRequest/');
  console.log(alumniInfo);
  // return await http.post(`update/updateRequest/`, alumniInfo);
};

const updateAlumniInfo = {
  requestInfoUpdate,
};

export default updateAlumniInfo;
