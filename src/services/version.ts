import http from './http';

const getVersion = (): Promise<string> => http.get('version');

const versionService = {
  getVersion,
};

export default versionService;
