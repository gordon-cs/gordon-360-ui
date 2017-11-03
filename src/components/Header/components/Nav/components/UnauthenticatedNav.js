import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';
import '../nav.css';

export default class GordonLogin extends Component {
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
          <InputGroup>
            <Input placeholder="Username" />
            <InputGroupAddon>@gordon.edu</InputGroupAddon>
          </InputGroup>
        </NavItem>
        <NavItem>
          <InputGroup>
            <Input placeholder="Password" />
            <InputGroupAddon>@gordon.edu</InputGroupAddon>
          </InputGroup>
        </NavItem>
        <NavItem>
          <Button color="primary">Login</Button>
        </NavItem>
      </Nav>

    );
  }
}
