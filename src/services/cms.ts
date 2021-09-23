/**
 * CMS
 *
 * @module cms
 */

import http from './http';

/**
 * @global
 * @typedef Slide
 * @property {string} ImagePath Link to image
 * @property {string} AltTag Alternative tag
 * @property {boolean} HasCaption Whether image has a caption
 * @property {string} Title Title
 * @property {string} SubTitle Subtitle
 * @property {string} Action Action
 * @property {string} ActionLink Link of action
 * @property {number} Width Image width
 * @property {number} Height Image height
 * @property {number} SortOrder Order of image in slides
 */

/**
 * Get slides
 *
 * @returns {Promise.<Slide[]>} List of slides
 */
const getSlides = () => http.get('cms/slider');

const cmsService = {
  getSlides,
};

export default cmsService;
