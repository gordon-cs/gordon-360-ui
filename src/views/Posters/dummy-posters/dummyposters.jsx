import TestPoster from 'views/Posters/images/TestPoster.jpg';
import DiscoPoster from 'views/Posters/images/DiscoPoster.jpg';
import HamburgerPoster from 'views/Posters/images/HamburgerPoster.jpg';
import MoviePoster from 'views/Posters/images/MoviePoster.jpg';
import SportPoster from 'views/Posters/images/sport.jpg';

export const DATA = [
  {
    key: '0',
    title: 'Poster Title',
    image: TestPoster,
    alt: 'alt text for poster 1',
    desc: 'this is a short descirption for poster 1',
    org: null,
    uploader: 'hunter.simpson',
    status: 'unexpired',
  },
  {
    key: '1',
    title: 'Poster 2 Title',
    image: DiscoPoster,
    alt: 'alt text for poster 2',
    desc: 'this is a short descirption',
    org: 'CATHSTU',
    uploader: 'collin.williams',
    status: 'strike',
  },

  {
    key: '2',
    title: 'Event 3',
    image: TestPoster,
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
  {
    key: '5',
    title: 'Movie Night',
    image: MoviePoster,
    alt: 'alt text for poster hunter1',
    desc: 'this is a short descirption',
    org: 'I-95 Rocks',
  },
  {
    key: '6',
    title: 'Poster 6 Title',
    image: TestPoster,
    alt: 'alt text for poster 6',
    desc: 'this is2 a short descirption',
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
    title: 'Computer Science Disco Night',
    image: DiscoPoster,
    alt: 'alt text for poster 10',
    desc: 'Come one come all to the Computer Science Disco Night! Join us for a night of fun, dancing, and networking with fellow CS enthusiasts.',
    org: 'COMPS',
  },
  {
    key: '11',
    title: 'Woah, Test',
    image: SportPoster,
    alt: 'alt text for poster 11',
    desc: "Imagine playing Sports as a Computer Science Major.... Couldn't be me.",
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
