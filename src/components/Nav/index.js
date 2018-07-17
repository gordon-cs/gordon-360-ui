import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './nav.css';
import GordonNavAvatar from './components/NavAvatar';
import GordonNavLinks from './components/NavLinks';

export default class GordonNav extends Component {
  render() {
    const drawer = (
      <div>
        <GordonNavAvatar onLinkClick={this.props.onDrawerToggle} />
        <Divider />
        <GordonNavLinks onLinkClick={this.props.onDrawerToggle} onSignOut={this.props.onSignOut} />
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
