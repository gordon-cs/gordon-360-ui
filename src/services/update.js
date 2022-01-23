/**
 *
 * @module update
 */

import http from './http';

const requestInfoUpdate = async (
    userEmail,
    userHomePhone,
    userMobilePhone,
    userAddress,
    userCity,
    userState,
) => {
    const alumniInfo = {
        EMAIL: userEmail,
        HOME_PHONE: userHomePhone,
        MOBILE_PHONE: userMobilePhone,
        ADDRESS: userAddress,
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