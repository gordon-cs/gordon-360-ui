import { FaFacebookF, FaHandshake, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export enum Platform {
  Facebook = 'Facebook',
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
  Instagram = 'Instagram',
  Handshake = 'Handshake',
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
} = {
  Facebook: {
    Icon: <FaFacebookF />,
    prefix: ['https://www.', 'facebook.com/', 'www.', 'https://'],
  },
  Twitter: {
    Icon: <FaTwitter />,
    prefix: ['https://www.', 'twitter.com/', 'www.', 'https://'],
  },
  LinkedIn: {
    Icon: <FaLinkedin />,
    prefix: ['https://www.', 'linkedin.com/in/', 'www.', 'https://'],
  },
  Instagram: {
    Icon: <FaInstagram />,
    prefix: ['https://www.', 'instagram.com/', 'www.', 'https://'],
  },
  Handshake: {
    Icon: <FaHandshake />,
    prefix: [
      'https://www.',
      'gordon.joinhandshake.com/users/',
      'app.joinhandshake.com/users/',
      'www.',
      'https://',
    ],
  },
};
