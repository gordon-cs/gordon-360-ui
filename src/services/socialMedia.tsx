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
    validationRegex: /^(?:https?:\/\/)?(?:www\.)?facebook\.com\/[A-Za-z0-9.]{1,}$/,
  },
  Twitter: {
    Icon: <FaTwitter />,
    prefix: 'https://twitter.com/',
    validationRegex: /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/[A-Za-z0-9.]{1,}$/,
  },
  LinkedIn: {
    Icon: <FaLinkedin />,
    prefix: 'https://linkedin.com/in/',
    validationRegex: /^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9.]{1,}$/,
  },
  Instagram: {
    Icon: <FaInstagram />,
    prefix: 'https://www.instagram.com/',
    validationRegex: /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/[A-Za-z0-9.]{1,}$/,
  },
  Handshake: {
    Icon: <FaHandshake />,
    prefix: 'https://gordon.joinhandshake.com/users/',
    prefix2: 'https://app.joinhandshake.com/users/',
    validationRegex: /^(?:http?:\/\/)?(?:[a-zA-Z0-9-]+\.)?handshake\.com\/[A-Za-z0-9,]{1,}$/,
  },
  Calendar: {
    Icon: <FaCalendar />,
    prefix: 'https://',
    validationRegex: /^(?:https?:\/\/)[^\s/$.?#].[^\s]*$/,
  },
};
