import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
} from 'reactstrap';
import GordonNavLinks from './components/UnauthenticatedNav';
import GordonLogin from './components/AuthenticatedNav';
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

  navMenue(authenticated) {
    const nav = null;
    if (authenticated) {
      this.nav = <GordonNavLinks />;
    } else {
      this.nav = <GordonLogin />;
    }
    return (nav);
  }

  render() {
    return (
      <Navbar className="gordon-nav" color="faded" light expand="sm">
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <navMenue />
        </Collapse>
      </Navbar>
      // this.rendernav(authenticated)
    );
  }
}
