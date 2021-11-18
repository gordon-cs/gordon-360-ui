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
      ImagePath: '/images/CMS/1Chapel_20211115.jpg',
      AltTag: 'Next Chapel',
      HasCaption: false,
      ActionLink: '',
      Width: 1500,
      Height: 600,
      SortOrder: 1,
    },
    {
      ImagePath: '/images/CMS/2AthleticsCongrats_20211115.png',
      AltTag: 'Dining Services',
      HasCaption: false,
      ActionLink: '',
      Width: 1500,
      Height: 600,
      SortOrder: 1,
    },
    {
      ImagePath: '/images/CMS/3AthleticsSchedule_20211115.jpg',
      AltTag: 'Athletics Schedule',
      HasCaption: false,
      ActionLink: '',
      Width: 1500,
      Height: 600,
      SortOrder: 3,
    },
    {
      ImagePath: '/images/CMS/5TheatreShorts_20211115.jpg',
      AltTag: 'Theatre Shorts',
      HasCaption: false,
      ActionLink: '',
      Width: 1500,
      Height: 600,
      SortOrder: 1,
    },
  ]);

const cmsService = {
  getSlides,
};

export default cmsService;
