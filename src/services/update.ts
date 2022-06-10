import http from './http';

type ProfileFieldUpdate = {
  field: string;
  value: string;
  label: string;
}

type State = {
  Name: string;
  Abbreviation: string;
}

const requestInfoUpdate = async ( updatedFields: Array<ProfileFieldUpdate> ) => {
  console.log(updatedFields);
  await http.post('profiles/updateRequest/', updatedFields);
};

const getAllStates = async(): Promise<State[]> =>
  http.get('profiles/getAllStates/');



export { requestInfoUpdate, getAllStates };
