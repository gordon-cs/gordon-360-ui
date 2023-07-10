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
  prefix: string;
  prefix2?: string;
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
    prefix: 'https://www.facebook.com/',
  },
  Twitter: {
    Icon: <FaTwitter />,
    prefix: 'https://www.twitter.com/',
  },
  LinkedIn: {
    Icon: <FaLinkedin />,
    prefix: 'https://www.linkedin.com/in/',
  },
  Instagram: {
    Icon: <FaInstagram />,
    prefix: 'https://www.instagram.com/',
  },
  Handshake: {
    Icon: <FaHandshake />,
    prefix: 'https://gordon.joinhandshake.com/users/',
    prefix2: 'https://app.joinhandshake.com/users/',
  },
  // TODO - Validation
  // Maybe exclusively a certain URL
  // https and www cannot be both missing, and handshake link cannot contains www
  // using RegExp to check valid url or make it as valid url
  Calendar: {
    Icon: <FaCalendar />,
    prefix: 'https://',
  },
};
