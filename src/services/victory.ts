/**
 * Victory Promise
 *
 * @module victory
 */

import http from './http';

/**
 * @global
 * @typedef VPScores
 * @property {number} im Intellectual maturity score
 * @property {number} cc Christian Character score
 * @property {number} ls Lives of Service score
 * @property {number} lw Leadership Worldwide score
 */

/**
 * Get victory promise scores
 *
 * @returns {Promise.<VPScores>} scores
 */
const getVPScore = async () => {
  return await http.get(`vpscore`);
};

const victoryPromiseService = {
  getVPScore,
};

export default victoryPromiseService;
