/**
 *
 * @module update
 * import http from './http';
 */
//import user from './user';
const requestInfoUpdate = async (
  userSalutation,
  userFirstName,
  userLastName,
  userMiddleName,
  userPreferredName,
  userPersonalEmail,
  userWorkEmail,
  userAlternateEmail,
  userPreferredEmail,
  userDoNotContact,
  userDoNotMail,
  userHomePhone,
  userWorkPhone,
  userMobilePhone,
  userPreferredPhone,
  userMailingStreet,
  userMailingCity,
  userMailingState,
  userMailingZip,
  userMailingCountry,
  userMaritalStatus,
) => {
  const alumniInfo = {
    SALUTATION: userSalutation,
    FIRST_NAME: userFirstName,
    LAST_NAME: userLastName,
    MIDDLE_NAME: userMiddleName,
    PREFERRED_NAME: userPreferredName,
    PERSONAL_EMAIL: userPersonalEmail,
    WORK_EMAIL: userWorkEmail,
    ALTERNATE_EMAIL: userAlternateEmail,
    PREFERRED_EMAIL: userPreferredEmail,
    DO_NOT_CONTACT: userDoNotContact,
    DO_NOT_MAIL: userDoNotMail,
    HOME_PHONE: userHomePhone,
    WORK_PHONE: userWorkPhone,
    MOBILE_PHONE: userMobilePhone,
    PREFERRED_PHONE: userPreferredPhone,
    MAILING_STREET: userMailingStreet,
    MAILING_CITY: userMailingCity,
    MAILING_STATE: userMailingState,
    MAILING_ZIP: userMailingZip,
    MAILING_COUNTRY: userMailingCountry,
    MARITAL_STATUS: userMaritalStatus,
  };
  console.log('update/updateRequest/');
  console.log(alumniInfo);
  // return await http.post(`update/updateRequest/`, alumniInfo);
};

const updateAlumniInfo = {
  requestInfoUpdate,
};

export default updateAlumniInfo;
