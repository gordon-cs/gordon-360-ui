import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import PropTypes from 'prop-types';

import React, { Component } from 'react';

import GordonGlobalMenu from './components/GlobalMenu';

const styles = () => ({
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class GordonHeader extends Component {
  render() {
    const { classes } = this.props;
    return (
      <header className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              Gordon 360
            </Typography>
            <GordonGlobalMenu />
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}

GordonHeader.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(GordonHeader);
