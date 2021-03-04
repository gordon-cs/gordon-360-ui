import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import React from 'react';

import './nav.css';
import GordonNavAvatar from './components/NavAvatar';
import GordonNavLinks from './components/NavLinks';

const GordonNav = ({ onDrawerToggle, authentication, onSignOut, drawerOpen }) => {
  const drawer = (
    <>
      <GordonNavAvatar onLinkClick={onDrawerToggle} authentication={authentication} />
      <Divider />
      <GordonNavLinks
        onLinkClick={onDrawerToggle}
        onSignOut={onSignOut}
        authentication={authentication}
      />
    </>
  );

  return (
    <section className="gordon-nav">
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={drawerOpen}
          classes={{
            paper: 'gordon-nav-drawer',
          }}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: 'drawer',
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </section>
  );
};

export default GordonNav;
