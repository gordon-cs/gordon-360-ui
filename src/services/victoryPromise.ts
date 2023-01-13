import http from './http';

type VPScores = {
  /** Intellectual Maturity score */
  TOTAL_VP_IM_SCORE: number;
  /** Christian Character score */
  TOTAL_VP_CC_SCORE: number;
  /** Lives of Service score */
  TOTAL_VP_LS_SCORE: number;
  /** Leadership Worldwide score */
  TOTAL_VP_LW_SCORE: number;
};

const getVPScore = (): Promise<VPScores[]> => http.get(`victorypromise`);

const victoryPromiseService = {
  getVPScore,
};

export default victoryPromiseService;
