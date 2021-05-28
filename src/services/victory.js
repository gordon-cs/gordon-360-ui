/**
 * Victory Promise
 *
 * @module victory
 */

import http from './http';

/**
 * @global
 * @typedef VPScores
 * @property {Number} im Intellectual maturity score
 * @property {Number} cc Christian Character score
 * @property {Number} ls Lives of Service score
 * @property {Number} lw Leadership Worldwide score
 */

/**
 * Get victory promise scores
 * @return {Promise.<VPScores>} scores
 */
const getVPScore = async () => {
  return await http.get(`vpscore`);
};

const victoryPromiseService = {
  getVPScore,
};

export default victoryPromiseService;
