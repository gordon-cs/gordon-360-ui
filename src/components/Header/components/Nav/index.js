import React, { Component } from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
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
  authenticatedNav() {
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

  loginNav() {
    return (
      <Navbar className="gordon-nav" color="faded" light expand="sm">
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <InputGroup>
                <InputGroupAddon>@gordon.edu</InputGroupAddon>
                <Input placeholder="username" />
              </InputGroup>
            </NavItem>
            <NavItem>
              <InputGroup>
                <InputGroupAddon>@gordon.edu</InputGroupAddon>
                <Input placeholder="Password" />
              </InputGroup>
            </NavItem>
            <NavItem>
              <Button color="primary">Login</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }

  rendernav(authenticated) {
    let nav;
    if (authenticated) {
      nav = this.authenticatedNav();
    } else {
      nav = this.loginNav();
    }
    return (nav);
  }

  render() {
    const authenticated = true;
    return (
      this.rendernav(authenticated)
    );
  }
}
