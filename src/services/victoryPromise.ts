import http from './http';
import { theme360 } from 'theme';

export type VictoryPromiseCategory =
  | 'christian_character'
  | 'intellectual_maturity'
  | 'lives_of_service'
  | 'leadership_worldwide';

export const Colors = {
  christian_character: theme360.vars.palette.error.main,
  intellectual_maturity: theme360.vars.palette.success.main,
  lives_of_service: theme360.vars.palette.warning.main,
  leadership_worldwide: theme360.vars.palette.secondary.main,
} as const;

export type VictoryPromiseColor = (typeof Colors)[VictoryPromiseCategory];

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
