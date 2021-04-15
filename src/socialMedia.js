import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedin, FaInstagram, FaHandshake } from 'react-icons/fa';

export const socialMediaInfo = {
  facebook: {
    icon: <FaFacebookF />,
    prefix: 'https://www.facebook.com/',
  },
  twitter: {
    icon: <FaTwitter />,
    prefix: 'https://twitter.com/',
  },
  linkedIn: {
    icon: <FaLinkedin />,
    prefix: 'https://www.linkedin.com/in/',
  },
  instagram: {
    icon: <FaInstagram />,
    prefix: 'https://www.instagram.com/',
  },
  handshake: {
    icon: <FaHandshake />,
    prefix: 'https://gordon.joinhandshake.com/users/',
    prefix2: 'https://app.joinhandshake.com/users/',
  },
};
