import http from 'services/http';

export type Hall = {
  Name: string;
  BuildingCode: string;
};

const getAllHalls = (): Promise<Hall[]> => http.get('Housing/halls');

export { getAllHalls };
