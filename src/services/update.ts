import http from './http';

type ProfileFieldUpdate = {
  field: string;
  value: string;
  label: string;
}

const requestInfoUpdate = async ( updatedFields: Array<ProfileFieldUpdate> ) => {
  console.log(updatedFields);
  await http.post('profiles/updateRequest/', updatedFields);
};

const getAllStates = async() => {
  let info = await http.get('profiles/getAllStates/');
  console.log(JSON.stringify(info));
}

export { requestInfoUpdate, getAllStates };
