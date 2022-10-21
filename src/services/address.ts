import httpUtils from './http';

type State = {
  Name: string;
  Abbreviation: string;
};

type Country = {
  Name: string;
  Abbreviation: string;
};

const getStates = (): Promise<State[]> => httpUtils.get('addresses/states/');

const getCountries = (): Promise<Country[]> => httpUtils.get('addresses/countries/');

const addressService = {
  getStates,
  getCountries,
};

export default addressService;
