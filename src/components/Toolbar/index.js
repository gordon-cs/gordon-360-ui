import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './toolbar.css';

export default class GordonToolbar extends Component {
  render() {
    return (
      <section className="gordon-toolbar">
        <AppBar className="app-bar" position="static">
          <Toolbar>
            <Typography className="title" type="title" color="inherit">
              YO DIS SOME TEXT BOI
            </Typography>
          </Toolbar>
        </AppBar>
      </section>
    );
  }
}

// GordonHeader.propTypes = {
//   onDrawerToggle: PropTypes.func.isRequired,
//   onSignOut: PropTypes.func.isRequired,
// };
