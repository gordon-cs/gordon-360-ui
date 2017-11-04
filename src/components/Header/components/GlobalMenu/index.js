import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class GordonGlobalMenu extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);

    this.state = {
      anchorEl: null,
    };
  }
  onClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }
  onClose() {
    this.setState({ anchorEl: null });
  }
  render() {
    const open = Boolean(this.state.anchorEl);

    return (
      <div>
        <IconButton
          color="contrast"
          aria-label="More"
          aria-owns={open ? 'global-menu' : null}
          aria-haspopup="true"
          onClick={this.onClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="global-menu"
          anchorEl={this.state.anchorEl}
          open={open}
          onRequestClose={this.onClose}
        >
          <MenuItem onClick={this.onClose}><Link to="/help">Help</Link></MenuItem>
          <MenuItem onClick={this.onClose}><Link to="">Logout</Link></MenuItem>
        </Menu>
      </div>
    );
  }
}
