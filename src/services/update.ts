import http from './http';

type ProfileFieldUpdate = {
  Field: string;
  Value: string;
  Label: string;
};

type State = {
  Name: string;
  Abbreviation: string;
};

type Country = {
  CTY: string;
  COUNTRY: string;
};

const requestInfoUpdate = async (updatedFields: Array<ProfileFieldUpdate>) => {
  await http.post('profiles/update/', updatedFields);
};

const getAllStates = async (): Promise<State[]> => await http.get('addresses/states/');

const getAllCountries = async (): Promise<Country[]> => await http.get('addresses/countries/');

export { requestInfoUpdate, getAllStates, getAllCountries };
