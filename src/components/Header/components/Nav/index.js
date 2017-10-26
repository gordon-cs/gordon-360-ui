import React, { Component } from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './nav.css';

export default class GordonNav extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <Navbar className="gordon-nav" color="faded" light expand="sm">
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/">My Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/">Activities</Link>
            </NavItem>
            <NavItem>
              <Link to="/">Events</Link>
            </NavItem>
            <NavItem>
              <Link to="/about">About</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
