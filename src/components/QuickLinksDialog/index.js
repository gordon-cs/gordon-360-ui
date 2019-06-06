import React, { Component } from 'react';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinkIcon from '@material-ui/icons/InsertLink';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';

import { ListItemIcon } from '@material-ui/core';
import PropTypes from 'prop-types';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

export default class QuickLinksDialog extends Component {
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
      <Dialog
        onClose={this.props.handleLinkClose}
        aria-labelledby="useful-links"
        open={this.props.linkopen}
      >
        <DialogTitle id="useful-links">These are some useful links for you</DialogTitle>
        <DialogContent dividers="true">
          <Typography>
            <List
              component="nav"
              subheader={
                <ListSubheader component="div">
                  Academics
                  <IconButton
                    className={styles.button}
                    style={{ float: 'right' }}
                    aria-label="Edit"
                  >
                    <EditIcon style={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton className={styles.button} style={{ float: 'right' }} aria-label="Add">
                    <AddIcon style={{ fontSize: 16 }} />
                  </IconButton>
                </ListSubheader>
              }
            >
              <ListItemLink target="_blank" rel="noopener noreferrer" href="https://www.gordon.edu">
                <ListItemIcon>
                  <img
                    className="mygordon"
                    src="https://www.gordon.edu/favicon.ico"
                    alt="my gordon"
                    width="16"
                    height="16"
                  />
                </ListItemIcon>
                <ListItemText primary="Gordon Main" />
              </ListItemLink>
              <ListItemLink target="_blank" rel="noopener noreferrer" href="https://my.gordon.edu">
                <ListItemIcon>
                  <img
                    className="mygordon"
                    src="https://my.gordon.edu/ics/favicon.ico"
                    alt="my gordon"
                    width="16"
                    height="16"
                  />
                </ListItemIcon>
                <ListItemText primary="My Gordon" />
              </ListItemLink>
              <ListItemLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://blackboard.gordon.edu"
              >
                <ListItemIcon>
                  <img
                    className="blackboard"
                    src="https://blackboard.gordon.edu/favicon.ico"
                    alt="blackboard learn"
                    width="16"
                    height="16"
                  />
                </ListItemIcon>
                <ListItemText primary="Blackboard" />
              </ListItemLink>
            </List>
            <List
              component="nav"
              subheader={
                <ListSubheader component="div">
                  Information
                  <IconButton
                    className={styles.button}
                    style={{ float: 'right' }}
                    aria-label="Edit"
                  >
                    <EditIcon style={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton className={styles.button} style={{ float: 'right' }} aria-label="Add">
                    <AddIcon style={{ fontSize: 16 }} />
                  </IconButton>
                </ListSubheader>
              }
            >
              <ListItemLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.gordon.edu/titleix"
              >
                <ListItemIcon>
                  <LinkIcon style={{ fontSize: 16 }} />
                </ListItemIcon>
                <ListItemText primary="Title IX Policy" />
              </ListItemLink>
            </List>
            <Button color="primary" size="small">
              Add Section
            </Button>
          </Typography>
        </DialogContent>
      </Dialog>
    );
  }
}

QuickLinksDialog.propTypes = {
  handleLinkClickOpen: PropTypes.func.isRequired,
  handleLinkClose: PropTypes.func.isRequired,
};
