/**
 * CMS
 *
 * @module cms
 */

// import http from './http';

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
 * @description Temporarily hard-coded while WWW is under maintenance
 * @returns {Promise.<Slide[]>} List of slides
 */
const getSlides = () =>
  // http.get('cms/slider');
  Promise.resolve(() => [
    {
      ImagePath:
        'https://gordonedu.sharepoint.com/StudentLife/Gordon360/Shared%20Documents/360%20Banner%20Images/Current-Next%20posts/1Chapel_20211115.jpg',
      AltTag: 'Next Chapel',
      HasCaption: false,
      ActionLink: '',
      Width: 1500,
      Height: 600,
      SortOrder: 1,
    },
    {
      ImagePath:
        'https://gordonedu.sharepoint.com/StudentLife/Gordon360/Shared%20Documents/360%20Banner%20Images/Current-Next%20posts/3AthleticsSchedule_20211115.jpg',
      AltTag: 'Athletics Schedule',
      HasCaption: false,
      ActionLink: '',
      Width: 1500,
      Height: 600,
      SortOrder: 3,
    },
  ]);

const cmsService = {
  getSlides,
};

export default cmsService;
