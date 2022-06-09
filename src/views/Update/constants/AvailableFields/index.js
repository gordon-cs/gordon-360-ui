// SQL DATABASE HOLDS NAME CHAR ARRAYS WITH MAX SIZE OF 20
// VALUES ARE CHAR ARRAYS WITH MAX SIZE OF 128
// [possible limitation if adding more fields]

const personalInfoFields = [
  { label: 'Salutation', name: 'salutation', type: 'textfield' },
  { label: 'First Name', name: 'firstName', type: 'textfield' },
  { label: 'Last Name', name: 'lastName', type: 'textfield' },
  {},
  { label: 'Middle Name', name: 'middleName', type: 'textfield' },
  { label: 'Preferred Name', name: 'nickName', type: 'textfield' },
  { label: 'Married', name: 'married', type: 'checkbox' },
];
const emailInfoFields = [
  { label: 'Personal Email', name: 'personalEmail', type: 'textfield' },
  { label: 'Work Email', name: 'workEmail', type: 'textfield' },
  { label: 'Alternate Email', name: 'aEmail', type: 'textfield' },
  {
    label: 'Preferred Email',
    name: 'preferredEmail',
    type: 'select',
    menuItems: [{ value: 'Personal Email' }, { value: 'Work Email' }, { value: 'Alternate Email' }],
  },
];
const phoneInfoFields = [
  { label: 'Home Phone', name: 'homePhone', type: 'textfield' },
  { label: 'Work Phone', name: 'workPhone', type: 'textfield' },
  { label: 'Mobile Phone', name: 'mobilePhone', type: 'textfield' },
  {
    label: 'Preferred Phone',
    name: 'preferredPhone',
    type: 'select',
    menuItems: [{ value: 'Home Phone' }, { value: 'Work Phone' }, { value: 'Mobile Phone' }],
  },
];
const mailingInfoFields = [
  { label: 'Address', name: 'address1', type: 'textfield' },
  { label: 'Address Line 2 (optional)', name: 'address2', type: 'textfield' },
  { label: 'City', name: 'city', type: 'textfield' },
  { label: 'State', name: 'state', type: 'textfield' },
  { label: 'Zip Code', name: 'zip', type: 'textfield' },
  { label: 'Country', name: 'country', type: 'textfield' },
];
const shouldContactFields = [
  { label: 'Do Not Contact', name: 'doNotContact', type: 'checkbox' },
  { label: 'Do Not Mail', name: 'doNotMail', type: 'checkbox' },
];
const allFields = [
  personalInfoFields,
  emailInfoFields,
  phoneInfoFields,
  mailingInfoFields,
  shouldContactFields,
].flat();

export {
  personalInfoFields,
  emailInfoFields,
  phoneInfoFields,
  mailingInfoFields,
  shouldContactFields,
  allFields,
};
