import React from 'react';
import FacebookIcon from 'react-icons/lib/fa/facebook';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import LinkedInIcon from 'react-icons/lib/fa/linkedin';
import InstagramIcon from 'react-icons/lib/fa/instagram';
import EditIcon from 'react-icons/lib/fa/edit';

export const socialMediaInfo = {
  facebook: {
    icon: <FacebookIcon />,
    prefix: 'https://www.facebook.com/',
    error: 'Not a valid facebook link',
  },
  twitter: {
    icon: <TwitterIcon />,
    prefix: 'https://twitter.com/',
    error: 'Not a valid twitter link',
  },
  linkedIn: {
    icon: <LinkedInIcon />,
    prefix: 'https://www.linkedin.com/in/',
    error: 'Not a valid linkedIn link',
  },
  instagram: {
    icon: <InstagramIcon />,
    prefix: 'https://www.instagram.com/',
    error: 'Not a valid instagram link',
  },
  edit: {
    icon: <EditIcon />,
  },
};
