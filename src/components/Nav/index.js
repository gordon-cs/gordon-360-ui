import { Divider, Drawer, Hidden } from '@material-ui/core';
import React from 'react';
import GordonNavAvatar from './components/NavAvatar';
import GordonNavLinks from './components/NavLinks';
import './nav.css';

const GordonNav = ({ onDrawerToggle, authentication, onSignOut, drawerOpen }) => {
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
          <GordonNavAvatar onLinkClick={onDrawerToggle} authentication={authentication} />
          <Divider />
          <GordonNavLinks
            onLinkClick={onDrawerToggle}
            onSignOut={onSignOut}
            authentication={authentication}
          />
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
