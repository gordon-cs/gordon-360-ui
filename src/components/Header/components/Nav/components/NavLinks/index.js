import React, { Component } from 'react';
import {
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class GordonNavLinks extends Component {
  render() {
    return (
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
    );
  }
}
