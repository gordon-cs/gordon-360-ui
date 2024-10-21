//import HunterImage from "/users/collin.williams/s24-williams/gordon-360-ui/src/views/Posters/images/hunter.jpg";
import TestPoster from 'views/Posters/images/TestPoster.jpg';
//i/mport IsaiahPoster from 'views/Posters/images/isaiah.jpg';
//import LukePoster from 'views/Posters/images/lukehart.jpg';
import DiscoPoster from 'views/Posters/images/DiscoPoster.jpg';
import HamburgerPoster from 'views/Posters/images/HamburgerPoster.jpg';
import MoviePoster from 'views/Posters/images/MoviePoster.jpg';
import SportPoster from 'views/Posters/images/sport.jpg';

const pathToDataURL = async (filePath) => {
  const response = await fetch(filePath); // Fetch file
  const blob = await response.blob(); // convert response to blob
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve(reader.result); // resolve with data url
    };

    reader.onerror = () => {
      reject(new Error('Error reading file')); // reject promise on error
    };

    reader.readAsDataURL(blob); // read blob as data url
  });
};

export const DATA = [
  {
    key: '0',
    displayAfter: '2024-10-18T17:03',
    displayUntil: '2024-10-20T17:00',
    title: 'Poster Title',
    image: TestPoster,
    dataImage: await pathToDataURL(TestPoster),
    alt: 'alt text for poster 1',
    desc: 'this is a short descirption for poster 1',
    org: null,
    uploader: 'hunter.simpson',
    status: 'unexpired',
    clubCode: 'CATHSTU',
  },
  {
    key: '1',
    displayAfter: '2024-10-18T17:03',
    displayUntil: '2024-10-20T17:00',
    title: 'Poster 2 Title',
    image: DiscoPoster,
    dataImage: await pathToDataURL(DiscoPoster),
    alt: 'alt text for poster 2',
    desc: 'this is a short descirption',
    org: 'CATHSTU',
    uploader: 'collin.williams',
    status: 'strike',
  },

  {
    key: '2',
    displayAfter: '2024-10-18T17:03',
    displayUntil: '2024-10-20T17:00',
    title: 'Event 3',
    image: TestPoster,
    dataImage: await pathToDataURL(TestPoster),
    alt: 'alt text for poster hunter',
    desc: 'this is a short descirption',
    org: 'CEC',
    uploader: 'collin.williams',
    status: 'unexpired',
  },
  {
    key: '3',
    title: 'Poster 4 Title',
    image: HamburgerPoster,
    alt: 'alt text for poster 4',
    desc: 'this is a short descirption',
    org: null,
  },
  {
    key: '4',
    title: 'Poster 5 Title',
    image: SportPoster,
    alt: 'alt text for poster 5',
    desc: 'this is a short descirption',
    org: null,
  },
  // {
  //   key: '5',
  //   title: 'Movie Night',
  //   image: MoviePoster,
  //   alt: 'alt text for poster hunter1',
  //   desc: 'this is a short descirption',
  //   org: 'I-95 Rocks',
  // },
  {
    key: '6',
    title: 'Poster 6 Title',
    image: TestPoster,
    alt: 'alt text for poster 6',
    desc: 'this is a short descirption',
    org: 'I-95 Rocks',
  },
  {
    key: '7',
    title: 'Hamburger',
    image: HamburgerPoster,
    alt: 'alt text for poster 7',
    desc: 'this is a short descirption',
    org: 'I-95 Rocks',
  },
  {
    key: '8',
    title: 'Poster 6 Title',
    image: SportPoster,
    alt: 'alt text for poster 6',
    desc: 'this is a short descirption',
    org: null,
  },
  {
    key: '10',
    title: 'test Poster',
    image: DiscoPoster,
    alt: 'alt text for poster 10',
    desc: 'this is a short descirption',
    org: 'COMPS',
  },
  {
    key: '9',
    title: 'Poster 6 Title',
    image: TestPoster,
    alt: 'alt text for poster 6',
    desc: 'this is a short descirption',
    org: null,
  },
];

export default DATA;
