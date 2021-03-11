import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './nav.css';
import GordonNavAvatar from './components/NavAvatar';
import GordonNavLinks from './components/NavLinks';

import { Drawer, Divider, Hidden } from '@material-ui/core';

export default class GordonNav extends Component {
  render() {
    const drawer = (
      <div>
        <GordonNavAvatar
          onLinkClick={this.props.onDrawerToggle}
          authentication={this.props.authentication}
        />
        <Divider />
        <GordonNavLinks
          onLinkClick={this.props.onDrawerToggle}
          onSignOut={this.props.onSignOut}
          authentication={this.props.authentication}
        />
      </div>
    );

    return (
      <section className="gordon-nav">
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={this.props.drawerOpen}
            classes={{
              paper: 'gordon-nav-drawer',
            }}
            onClose={this.props.onDrawerToggle}
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
  }
}

GordonNav.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
