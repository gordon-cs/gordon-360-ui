import http from './http';

type Version = {
  GitHash: string;
  BuildTime: string;
};

const getVersion = (): Promise<Version> => http.get('version');

const versionService = {
  getVersion,
};

export default versionService;
