import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import EditIcon from '@material-ui/icons/Edit';

export const socialMediaInfo = {
  facebook: {
    icon: <FaFacebookF />,
    prefix: 'https://www.facebook.com/',
    error: 'Invalid Facebook link. ',
  },
  twitter: {
    icon: <FaTwitter />,
    prefix: 'https://twitter.com/',
    error: 'Invalid Twitter link. ',
  },
  linkedIn: {
    icon: <FaLinkedin />,
    prefix: 'https://www.linkedin.com/in/',
    error: 'Invalid LinkedIn link. ',
  },
  instagram: {
    icon: <FaInstagram />,
    prefix: 'https://www.instagram.com/',
    error: 'Invalid Instagram link. ',
  },
  edit: {
    icon: <EditIcon />,
  },
};
