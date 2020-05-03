import React, { Component } from 'react';

import GordonDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

import GordonLinksList from './components/LinksList';
import './quicklinksdialog.css';

const styles = theme => ({
  root: {
    margin: 0,
  },
  button: {
    margin: 0,
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {},
}))(MuiDialogContent);

export default class GordonQuickLinksDialog extends Component {
  constructor(props) {
    super(props);

    this.handleLinkClickOpen = this.handleLinkClickOpen.bind(this);
    this.handleLinkClose = this.handleLinkClose.bind(this);

    this.state = {
      linkopen: false,
    };
  }

  handleLinkClickOpen = () => {
    this.setState({
      linkopen: true,
    });
  };

  handleLinkClose = () => {
    this.setState({ linkopen: false });
  };

  render() {
    return (
      <GordonDialog
        onClose={this.props.handleLinkClose}
        aria-labelledby="useful-links"
        open={this.props.linkopen}
      >
        <DialogTitle id="useful-links">Useful links</DialogTitle>
        <DialogContent dividers="true">
          <GordonLinksList onClose={this.props.handleLinkClose}/>
        </DialogContent>
      </GordonDialog>
    );
  }
}

GordonQuickLinksDialog.propTypes = {
  handleLinkClickOpen: PropTypes.func.isRequired,
  handleLinkClose: PropTypes.func.isRequired,
};
