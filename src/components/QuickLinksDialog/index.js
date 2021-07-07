import { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import GordonLinksList from './components/LinksList';

import {
  Dialog as GordonDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  Typography,
} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    margin: 0,
  },
  button: {
    margin: 0,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
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
        <DialogContent dividers>
          <GordonLinksList onClose={this.props.handleLinkClose} />
        </DialogContent>
      </GordonDialog>
    );
  }
}

GordonQuickLinksDialog.propTypes = {
  handleLinkClickOpen: PropTypes.func.isRequired,
  handleLinkClose: PropTypes.func.isRequired,
};
