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
  await http.get('profiles/getAllStates/');

const informationChangeSQL = async ( updatedFields : Array<ProfileFieldUpdate> ) => {
  await http.post('profiles/informationChange/', updatedFields);
}

export { requestInfoUpdate, getAllStates, informationChangeSQL };
