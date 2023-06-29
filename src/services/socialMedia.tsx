import {
  FaFacebookF,
  FaHandshake,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaCalendar,
} from 'react-icons/fa';

export enum Platform {
  Facebook = 'Facebook',
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
  Instagram = 'Instagram',
  Handshake = 'Handshake',
  Calendar = 'Calendar',
}

export const platforms = Object.values(Platform);

export type SocialMediaInfo = {
  Icon: JSX.Element;
  prefix: string[];
};

export const socialMediaInfo: {
  [Platform.Facebook]: SocialMediaInfo;
  [Platform.Twitter]: SocialMediaInfo;
  [Platform.LinkedIn]: SocialMediaInfo;
  [Platform.Instagram]: SocialMediaInfo;
  [Platform.Handshake]: SocialMediaInfo;
  [Platform.Calendar]: SocialMediaInfo;
} = {
  Facebook: {
    Icon: <FaFacebookF />,
    prefix: ['https://www.facebook.com/', 'facebook.com/', 'www.facebook.com/'],
  },
  Twitter: {
    Icon: <FaTwitter />,
    prefix: ['https://www.twitter.com/', 'twitter.com/', 'www.twitter.com/'],
  },
  LinkedIn: {
    Icon: <FaLinkedin />,
    prefix: ['https://www.linkedin.com/in/', 'linkedin.com/in/', 'www.linkedin/in/'],
  },
  Instagram: {
    Icon: <FaInstagram />,
    prefix: ['https://www.', 'instagram.com/', 'www.', 'https://'],
  },
  Handshake: {
    Icon: <FaHandshake />,
    prefix: [
      'https://www.gordon.joinhandshake.com/users/',
      'gordon.joinhandshake.com/users/',
      'www.gordon.joinhandshake.com/users/',
      'https://www.app.joinhandshake.com/users/',
      'app.joinhandshake.com/users/',
      'www.app.joinhandshake.com/users/',
    ],
  },
  // TODO - Validation
  // Maybe exclusively a certain URL
  Calendar: {
    Icon: <FaCalendar />,
    prefix: ['https://'],
  },
};
