import React, { Component } from 'react';
import {
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../nav.css';

export default class GordonNavLinks extends Component {
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
