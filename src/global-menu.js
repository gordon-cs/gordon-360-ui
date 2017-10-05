import React, { Component } from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './global-menu.css';

export default class GordonGlobalMenu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false,
      firstName: 'Test',
      lastName: 'User',
      userName: 'test.user',
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret size="sm" className="global-menu">
          {this.state.firstName} {this.state.lastName}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem><Link to="/help">Help</Link></DropdownItem>
          <DropdownItem><Link to={`/profile/${this.state.userName}`}>Profile</Link></DropdownItem>
          <DropdownItem divider />
          <DropdownItem><Link to="">Logout</Link></DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
