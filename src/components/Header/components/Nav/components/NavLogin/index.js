import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';

export default class GordonNavLogin extends Component {
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
          </InputGroup>
        </NavItem>
        <NavItem>
          <Button color="primary">Login</Button>
        </NavItem>
      </Nav>
    );
  }
}
