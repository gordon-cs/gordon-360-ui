import http from './http';

export type RegistrationPeriod = {
  Term: string;
  StartTime: string;
  EndTime: string;
  IsEligible: boolean;
  IsClearedToRegister: boolean;
  HasHolds: boolean;
};

const getRegistrationPeriod = (): Promise<RegistrationPeriod> =>
  http.get<RegistrationPeriod>('registration/window');

const registrationService = {
  getRegistrationPeriod,
};

export default registrationService;
