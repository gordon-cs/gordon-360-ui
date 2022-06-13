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

const informationChangeRequest_dbo = async ( updatedFields : Array<ProfileFieldUpdate> ) => {
  for(const field of updatedFields)
    await http.post('profiles/informationChangeRequest_dbo/', field);
}

export { requestInfoUpdate, getAllStates, informationChangeRequest_dbo };
