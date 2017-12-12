/**
 * CMS
 *
 * @module cms
 */

import http from './http';

/**
 * @global
 * @typedef Slide
 * @property {String} ImagePath Link to image
 * @property {String} AltTag Alternative tag
 * @property {boolean} HasCaption Whether image has a caption
 * @property {String} Title Title
 * @property {String} SubTitle Subtitle
 * @property {String} Action Action
 * @property {String} ActionLink Link of action
 * @property {Number} Width Image width
 * @property {Number} Height Image height
 * @property {Number} SortOrder Order of image in slides
 */

/**
 * Get slides
 * @return {Promise.<Slide[]>} List of slides
 */
const getSlides = () => http.get('cms/slider');

export default {
  getSlides,
};
