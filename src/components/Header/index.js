import React, { Component } from 'react';
import {
  Col,
  Container,
  Row,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import gordonLogoHorizBlack from './gordon-logo-horiz-black.svg';
import './header.css';
import GordonGlobalMenu from './components/GlobalMenu';
import GordonNav from './components/Nav';

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
