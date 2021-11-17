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
      ImagePath: 'https://i.ibb.co/jTYz32x/1-Chapel-20211115.jpg',
      AltTag: 'Next Chapel',
      HasCaption: false,
      ActionLink: '',
      Width: 1500,
      Height: 600,
      SortOrder: 1,
    },
    {
      ImagePath: 'https://i.ibb.co/Wff0b6B/2-Dining-Services-20211122.png',
      AltTag: 'Dining Services',
      HasCaption: false,
      ActionLink: 'https://gordon.cafebonappetit.com/',
      Width: 1500,
      Height: 600,
      SortOrder: 1,
    },
    {
      ImagePath: 'https://i.ibb.co/gFPC2DY/3-Athletics-Schedule-20211115.jpg',
      AltTag: 'Athletics Schedule',
      HasCaption: false,
      ActionLink: '',
      Width: 1500,
      Height: 600,
      SortOrder: 3,
    },
    {
      ImagePath: 'https://i.ibb.co/gS8yHW7/5-Theatre-Shorts-20211115.jpg',
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
