import http from './http';

const getVersion = async (): Promise<string> => {
  return await http.get('version');
};

const versionService = {
  getVersion,
};

export default versionService;
