import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import PropTypes from 'prop-types';

import React, { Component } from 'react';

import './header.css';
import GordonGlobalMenu from './components/GlobalMenu';

export default class GordonHeader extends Component {
  render() {
    return (
      <section className="gordon-header">
        <AppBar className="app-bar" position="static">
          <Toolbar>
            <IconButton
              className="menu-button"
              color="contrast"
              aria-label="open drawer"
              onClick={this.props.onDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography className="title" type="title" color="inherit">
              Gordon 360
            </Typography>
            <div className="global-menu-container">
              <GordonGlobalMenu onSignOut={this.props.onSignOut} />
            </div>
          </Toolbar>
        </AppBar>
      </section>
    );
  }
}

GordonHeader.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
