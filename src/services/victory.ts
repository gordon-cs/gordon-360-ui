import http from './http';

type VPScores = {
  /** Intellectual Maturity score */
  im: number;
  /** Christian Character score */
  cc: number;
  /** Lives of Service score */
  ls: number;
  /** Leadership Worldwide score */
  lw: number;
};

const getVPScore = (): Promise<VPScores[]> => http.get(`vpscore`);

const victoryPromiseService = {
  getVPScore,
};

export default victoryPromiseService;
