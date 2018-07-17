import React from 'react';
import FacebookIcon from 'react-icons/lib/fa/facebook';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import LinkedInIcon from 'react-icons/lib/fa/linkedin';
import InstagramIcon from 'react-icons/lib/fa/instagram';
import EditIcon from '@material-ui/icons/Edit';

export const socialMediaInfo = {
  facebook: {
    icon: <FacebookIcon />,
    prefix: 'https://www.facebook.com/',
    error: 'Invalid Facebook link. ',
  },
  twitter: {
    icon: <TwitterIcon />,
    prefix: 'https://twitter.com/',
    error: 'Invalid Twitter link. ',
  },
  linkedIn: {
    icon: <LinkedInIcon />,
    prefix: 'https://www.linkedin.com/in/',
    error: 'Invalid LinkedIn link. ',
  },
  instagram: {
    icon: <InstagramIcon />,
    prefix: 'https://www.instagram.com/',
    error: 'Invalid Instagram link. ',
  },
  edit: {
    icon: <EditIcon />,
  },
};
