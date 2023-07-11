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
  validationRegex?: RegExp; // Add validationRegex property for URL validation
};

export const socialMediaInfo: {
  [key in Platform]: SocialMediaInfo;
} = {
  Facebook: {
    Icon: <FaFacebookF />,
    prefix: 'https://facebook.com/',
    prefix2: 'https://www.facebook.com',
  },
  Twitter: {
    Icon: <FaTwitter />,
    prefix: 'https://twitter.com/',
    prefix2: 'https://www.twitter.com',
  },
  LinkedIn: {
    Icon: <FaLinkedin />,
    prefix: 'https://linkedin.com/in/',
    prefix2: 'https://www.linkedin.com/in/',
  },
  Instagram: {
    Icon: <FaInstagram />,
    prefix: 'https://www.instagram.com/',
    prefix2: 'https://instagram.com',
  },
  Handshake: {
    Icon: <FaHandshake />,
    prefix: 'https://gordon.joinhandshake.com/',
    prefix2: 'https://app.joinhandshake.com/',
  },
  Calendar: {
    Icon: <FaCalendar />,
    prefix: 'https://',
  },
};
