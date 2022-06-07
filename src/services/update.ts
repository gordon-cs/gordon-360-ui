import http from './http';

type ProfileFieldUpdate = {
  field: string;
  value: string;
}

const requestInfoUpdate = async ( updatedFields: Array<ProfileFieldUpdate> ) => {
  console.log(updatedFields);
  await http.post('profiles/updateRequest/', updatedFields);
};

export default requestInfoUpdate;
