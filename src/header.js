import React, { Component } from 'react';
import {
  ButtonDropdown,
  Col,
  Collapse,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import gordonLogoHorizBlack from './gordon-logo-horiz-black.svg';
import './header.css';
import GordonGlobalMenu from './global-menu';
import GordonNav from './nav';

export default class GordonHeader extends Component {
  render() {
    return (
      <header>
        <Container fluid>
          <Row className="header-top">
            <Col>
              <Link to="/">
                <img src={gordonLogoHorizBlack} alt="Gordon logo" height="35" width="140" />
              </Link>
            </Col>
            <Col>
              Gordon 360
            </Col>
            <Col>
              <GordonGlobalMenu />
            </Col>
          </Row>
          <Row>
            <GordonNav />
          </Row>
        </Container>
      </header>
    );
  }
}
