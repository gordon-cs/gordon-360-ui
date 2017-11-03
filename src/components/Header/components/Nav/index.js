import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
} from 'reactstrap';
import GordonNavLinks from './components/NavLinks';
import GordonNavLogin from './components/NavLogin';
import './nav.css';
import { isAuthenticated } from '../../../../services/auth';

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
    let nav;
    if (isAuthenticated) {
      nav = <GordonNavLinks />;
    } else {
      nav = <GordonNavLogin />;
    }

    return (
      <Navbar className="gordon-nav" color="faded" light expand="sm">
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          { nav }
        </Collapse>
      </Navbar>
    );
  }
}
