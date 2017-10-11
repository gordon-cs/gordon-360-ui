import React, { Component } from 'react';
import {
  Col,
  Container,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import gordonLogoHorizBlack from './gordon-logo-horiz-black.png';
import './header.css';
import GordonGlobalMenu from './components/GlobalMenu';
import GordonNav from './components/Nav';

export default class GordonHeader extends Component {
  render() {
    return (
      <header>
        <Container className="gordon-header" fluid>
          <Row className="header-top">
            <Col>
              <Link to="/">
                <img className="logo" src={gordonLogoHorizBlack} alt="Gordon logo" height="31" width="123" />
              </Link>
            </Col>
            <Col className="app-title d-none d-sm-block">
              Gordon 360
            </Col>
            <Col className="d-none d-sm-block">
              <div className="global-menu-container">
                <GordonGlobalMenu />
              </div>
            </Col>
            <Col className="d-sm-none">
              <GordonNav />
            </Col>
          </Row>
          <Row className="d-none d-sm-block">
            <GordonNav />
          </Row>
        </Container>
      </header>
    );
  }
}
