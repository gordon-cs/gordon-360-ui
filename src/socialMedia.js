import { FaFacebookF, FaTwitter, FaLinkedin, FaInstagram, FaHandshake } from 'react-icons/fa';

export const socialMediaInfo = {
  platforms: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'Handshake'],
  Facebook: {
    icon: <FaFacebookF />,
    prefix: 'https://www.facebook.com/',
  },
  Twitter: {
    icon: <FaTwitter />,
    prefix: 'https://twitter.com/',
  },
  LinkedIn: {
    icon: <FaLinkedin />,
    prefix: 'https://www.linkedin.com/in/',
  },
  Instagram: {
    icon: <FaInstagram />,
    prefix: 'https://www.instagram.com/',
  },
  Handshake: {
    icon: <FaHandshake />,
    prefix: 'https://gordon.joinhandshake.com/users/',
    prefix2: 'https://app.joinhandshake.com/users/',
  },
};
